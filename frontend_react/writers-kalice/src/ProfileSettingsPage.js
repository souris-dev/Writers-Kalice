import React from 'react';
import logo from './public/assets/logo.png';
import './css/build/tailwind.css';

import { InterestTag } from './SignUpPage';
import PopupMenuList from './PopupMenuList';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { Link, useHistory } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

class ProfileSettingsPage extends React.Component {
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

    handleWrite() {
        console.log("Write");
        window.setTimeout(() => this.props.history.push('/write'), 10);
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
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="block lg:hidden h-8 w-auto" src={logo} alt="wK logo" />
                                        <img className="hidden lg:block h-8 w-auto" src={logo} alt="wK logo" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            <Link to="/feed">
                                            <a href="#"
                                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Feed</a>
                                            </Link>
                                            
                                            <Link to="/savedPosts">
                                            <a href="#"
                                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Saved Posts</a>
                                            </Link>

                                            <Link to="/seenPosts">
                                            <a href="#"
                                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Seen Posts</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/*<button
                                        className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                                        aria-label="Notifications">
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </button>*/}

                                        <button className="text-white  bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded justify-center text-lg" onClick={this.handleWrite}>
                                            Write
                                        </button>
                                        {/* Profile dropdown */}
                                        <div className="ml-3 mt-1 relative">
                                            <PopupMenuList name='User' onLogout={this.handleLogout} onVR={this.handleVR} onProfile={this.handleProfileSettings} />
                                        </div>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                                        {/* Menu open: "hidden", Menu closed: "block" */}
                                        <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        {/* Menu open: "block", Menu closed: "hidden" */}
                                        <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*
        Mobile menu, toggle classes based on menu state.
  
        Open: "block", closed: "hidden"
      */}
                        <div className='hidden'>
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Feed</a>

                                <a href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>

                                <a href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Projects</a>

                                <a href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Calendar</a>

                                <a href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Reports</a>
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5 space-x-3" onClick={() => this.setState(state => ({ profileMenuOpen: !state.profileMenuOpen }))}>
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <a href="#"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your
                            Profile</a>

                                    <a href="#"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Settings</a>

                                    <a href="#"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign
                            out</a>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="profile-page">
                        <section className="relative block h-1/3" style={{ height: 300 + 'px' }}>
                            <div className="absolute top-0 w-full bg-center bg-cover">
                                <p className="text-white mt-6 text-3xl text-center">Profile Settings</p>
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
                                                <p className="font-semibold text-lg mb-6 mt-2">Personal Details</p>
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Name" type="text" name="name" onChange={this.handleOptions} value={this.state.name} />
                                                <input
                                                    className="bg-white rounded border border-gray-400 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4 tracking-widest font-mono"
                                                    placeholder="Email" type="email" name="email" onChange={this.handleOptions} value={this.state.email} />

                                                <p className="font-semibold text-lg mb-2 mt-2">About Me</p>
                                                <p className="font-thin mb-4">A short description about yourself.</p>
                                                <textarea
                                                    className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-purple-500 text-base px-4 py-2 mb-4 resize-none"
                                                    placeholder="Bio" name="bio" onChange={this.handleOptions} value={this.state.bio}></textarea>

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
                                                    className="text-white bg-purple-500 border-0 mt-6 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={this.handleSubmit}>Save Settings</button>

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

export default ProfileSettingsPage;