import React from 'react';
import logo from './public/assets/logo.png';
import './css/build/tailwind.css';
import serverUrl from './appconfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';
import { tagToId } from './utils';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export class InterestTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.handleUncheck = this.handleUncheck.bind(this);
    }

    handleCheck() {
        this.setState(state => ({
            checked: true,
        }));
        this.props.onCheck();
    }

    handleUncheck() {
        this.setState({
            checked: false,
        });
        this.props.onUncheck();
    }

    render() {
        if (!this.state.checked) {
            return (
                <div className="xl:w-2/3 md:w-2/3 mt-2" onClick={this.handleCheck}>
                    <div className="border border-gray-300 font-sans hover:border-indigo-600 px-6 py-3 rounded-lg">
                        <h2 className="text-base text-gray-900  title-font">{this.props.itemText}</h2>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="xl:w-2/3 md:w-2/3 mt-2" onClick={this.handleUncheck}>
                    <div class="bg-indigo-700 border border-indigo-700 hover:border-white px-6 py-3 rounded-lg">
                        <h2 class="text-base text-white  title-font">{this.props.itemText}</h2>
                    </div>
                </div>
            );
        }
    }
}

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAboveEighteen: true,
            showBio: true,
            showName: true,
            interestTags: [],
            name: '',
            username: '',
            email: '',
            password: '',
            bio: '',
            successSnkOpen: false,
            failedSnkOpen: false,
            warnSnkOpen: false,
            errorText: '',
            successText: '',
            warnText: '',
        };

        this.handleOptions = this.handleOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log(this.state);

        fetch(serverUrl + "/users/createuser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                bio: this.state.bio,
                isAboveEighteen: this.state.isAboveEighteen,
                showInterestTags: false,
                showName: this.showName,
                showBio: this.showBio,
                tags: this.state.interestTags.map((tag) => tagToId(tag)),
            })
        }).then(response => {
            if (response.status == 200) {
              window.localStorage.setItem('wKusername', this.state.username);
              window.localStorage.setItem('wKpassword', this.state.password);
    
              response.json().then((data) => {
                console.log(data)
    
                if (data.success) {
                  window.localStorage.setItem('wKuid', data.userId);
                  this.setState({
                    successText: 'Signed up successfully!',
                    successSnkOpen: true,
                  });
    
                  window.setTimeout(() => this.props.history.push('/feed'), 1000);
                }
                else {
                  this.setState({
                    errorText: 'Could not sign up!',
                    failedSnkOpen: true,
                  });
                }
              });
            }
            else {
              this.setState({
                errorText: 'Sign up failed!',
                failedSnkOpen: true,
              });
            }
        });
        
        /*this.setState({
            successText: 'Signed up successfully!',
            successSnkOpen: true,
          });

          window.setTimeout(() => this.props.history.push('/feed'), 1000);*/
    }

    addTag(interest) {
        console.log(this.state.interestTags);
        this.setState(state => {
            const interestTags = state.interestTags.concat(interest);
            return {
                interestTags: interestTags
            };
        });
    }

    removeTag(interest) {
        console.log(this.state.interestTags);
        function arrayRemove(arr, value) {

            return arr.filter(function (elem) {
                return elem != value;
            });

        }
        this.setState(state => ({
            interestTags: arrayRemove(state.interestTags, interest)
        }));
    }

    handleOptions(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const optionName = target.name;

        this.setState(state => ({
            [optionName]: value
        }));
    }

    render() {
        return (
            <div className="flex flex-col bg-gray-800">
                <div className="flex flex-col h-screen bg-gray-900">
                    <nav className="bg-gray-800">
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}

                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0">
                                        <img className="block lg:hidden h-8 w-auto" src={logo} alt="wK logo" />
                                        <img className="hidden lg:block h-8 w-auto" src={logo} alt="wK logo" />
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">

                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out" aria-label="Notifications">
                                        {/* Heroicon name: bell */}

                                    </button>

                                    {/* Profile dropdown */}
                                    <div className="ml-3 relative">
                                        <div>

                                        </div>
                                        {/*
                            Profile dropdown panel, show/hide based on dropdown state.
                
                            Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                            Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            */}
                                        <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*
                    Mobile menu, toggle classes based on menu state.
                
                    Menu open: "block", Menu closed: "hidden"
                    */}
                        <div className="hidden sm:hidden">
                        </div>
                    </nav>
                    <main className="profile-page">
                        <section className="relative block h-1/3" style={{ height: 300 + 'px' }}>
                            <div className="absolute top-0 w-full bg-center bg-cover">
                                <p className="text-white mt-6 text-3xl text-center">Sign Up</p>
                                <div className="flex mt-4 justify-center">
                                    <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                                </div>
                                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-gray-900"></span>
                            </div>
                        </section>
                        <section className="relative py-24 bg-gray-800">
                            <div className="container mx-auto px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words bg-white w- mb-6 shadow-2xl rounded-lg -mt-64">
                                    {/*<h1 className="mt-16 text-3xl font-semibold" style="padding-left: 5.5rem;">Sign Up</h1>*/}
                                    <section className="text-gray-700 body-font relative px-5">
                                        <div className="container px-5 mb-5 mx-auto flex sm:flex-no-wrap flex-wrap">
                                            <div
                                                className="lg:w-5/12 md:w-5/12 sm:w-5/12 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                                                <p className="font-semibold text-lg mb-6 mt-2">Login Details</p>
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Name" type="text" name="name" onChange={this.handleOptions} />
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Email" type="email" name="email" onChange={this.handleOptions} />
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Username" name="username" onChange={this.handleOptions} />
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Password" type="password" name="password" onChange={this.handleOptions} />
                                                <p className="font-semibold text-lg mb-2 mt-2">About Me</p>
                                                <p className="font-thin mb-4">A short description about yourself.</p>
                                                <textarea
                                                    className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-purple-500 text-base px-4 py-2 mb-4 resize-none"
                                                    placeholder="Bio" name="bio" onChange={this.handleOptions}></textarea>

                                                <div className="block">
                                                    <p className="font-semibold text-lg mb-2 mt-2">A few more things:</p>
                                                    <div className="mt-2">
                                                        <div>
                                                            <label className="inline-flex items-center">
                                                                <input type="checkbox" className="form-checkbox text-indigo-600" checked={this.state.isAboveEighteen} onChange={this.handleOptions} name="isAboveEighteen" />
                                                                <span className="ml-2 font-thin">I am more than 18 years old (for content tailoring)</span>
                                                            </label>
                                                        </div>
                                                        <p className="mt-4 mb-2">Privacy options</p>
                                                        <div>
                                                            <label className="inline-flex items-center">
                                                                <input type="checkbox" className="form-checkbox text-green-500" checked={this.state.showName} onChange={this.handleOptions} name="showName" />
                                                                <span className="font-thin ml-2">Show my name to others</span>
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className="inline-flex items-center">
                                                                <input type="checkbox" className="form-checkbox text-pink-600" checked={this.state.showBio} onChange={this.handleOptions} name="showBio" />
                                                                <span className="font-thin ml-2">Show my bio to others</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    className="text-white bg-purple-500 border-0 mt-6 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={this.handleSubmit}>Sign Up</button>
                                                <p className="text-xs text-gray-500 mt-3">By signing up, you agree with our <a
                                                    href="#" className="text-indigo-500 hover:text-indigo-800">terms of
                                                    service.</a></p>
                                            </div>
                                            {/* Interests */}
                                            <div
                                                className="lg:w-5/12 md:w-1/2 sm:w-5/12 sm:ml-10 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                                                <p className="font-semibold text-lg mb-1 mt-2">Interests</p>
                                                <p className="font-thin leading-5">Select the topics you're interested in.</p>
                                                <p className="font-thin mb-4">This will help us personalize your feed.</p>
                                                {/* Interest Cards */}
                                                <InterestTag onCheck={() => this.addTag("prose")} onUncheck={() => this.removeTag("prose")} itemText="Prose" />
                                                <InterestTag onCheck={() => this.addTag("poetry")} onUncheck={() => this.removeTag("poetry")} itemText="Poetry" />
                                                <InterestTag onCheck={() => this.addTag("short_stories")} onUncheck={() => this.removeTag("short_stories")} itemText="Short stories" />
                                                <InterestTag onCheck={() => this.addTag("composition")} onUncheck={() => this.removeTag("composition")} itemText="Composition" />
                                                <InterestTag onCheck={() => this.addTag("idle_thoughts")} onUncheck={() => this.removeTag("idle_thoughts")} itemText="Idle thoughts" />
                                                <InterestTag onCheck={() => this.addTag("jokes")} onUncheck={() => this.removeTag("jokes")} itemText="Jokes" />
                                                <InterestTag onCheck={() => this.addTag("parody")} onUncheck={() => this.removeTag("parody")} itemText="Parody" />
                                                <InterestTag onCheck={() => this.addTag("nature")} onUncheck={() => this.removeTag("nature")} itemText="Nature" />
                                            </div>
                                        </div>

                                    </section>
                                    <footer className="text-gray-500 bg-gray-900 body-font min-h-0">
                                        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                                            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                                                <img src={logo} className="h-10" />
                                            </a>
                                            {/*<p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 tailblocks —
                            <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@knyttneve</a>
                        </p>*/}
                                            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                                                <a className="text-gray-600">
                                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-3 text-gray-600">
                                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path
                                                            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                                        </path>
                                                    </svg>
                                                </a>
                                                <a className="ml-3 text-gray-600">
                                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-3 text-gray-600">
                                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path stroke="none"
                                                            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                                                        </path>
                                                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                <Snackbar open={this.state.successSnkOpen} autoHideDuration={2000} onClose={() => this.setState({ successSnkOpen: false })}>
                    <Alert onClose={() => this.setState({ successSnkOpen: false })} severity="success">
                        {this.state.successText}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.failedSnkOpen} autoHideDuration={2000} onClose={() => this.setState({ failedSnkOpen: false })}>
                    <Alert onClose={() => this.setState({ successSnkOpen: false })} severity="error">
                        {this.state.errorText}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.warnSnkOpen} autoHideDuration={2000} onClose={() => this.setState({ warnSnkOpen: false })}>
                    <Alert onClose={() => this.setState({ warnSnkOpen: false })} severity="warning">
                        {this.state.warnText}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default SignUpPage;