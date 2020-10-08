import React from 'react';
import logo from './public/assets/logo.png';
import './css/build/tailwind.css';
import PopupMenuList from './PopupMenuList';
import Chip from '@material-ui/core/Chip';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Post from './Post';
import InterestChip from './InterestChip';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default class NewPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interestTags: [],
            title: '',
            content: '',
            anonymous: false,
            above_eighteen: false,
            successSnkOpen: false,
            failedSnkOpen: false,
            warnSnkOpen: false,
            errorText: '',
            successText: '',
            warnText: '',
        };

        this.handleProfileSettings = this.handleProfileSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleVR = this.handleVR.bind(this);
        
        this.handlePost = this.handlePost.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
    }

    handleOptions(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const optionName = target.name;

        this.setState(state => ({
            [optionName]: value
        }));
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

    handleProfileSettings() {
        console.log("Profile Settings");
    }

    handleLogout() {
        console.log("Logout");
    }

    handleVR() {
        console.log("View requests");
    }

    handlePost() {
        if (!this.state.title || !this.state.content) {
            this.setState({
                errorText: 'A blank post? Really?',
                failedSnkOpen: true,
            });
            return;
        }

        // send post
        this.setState({
            successText: 'Posted!',
            successSnkOpen: true,
        });

        window.setTimeout(() => this.props.history.push('/feed'), 1000);
    }

    render() {
        return (
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
                                        <a href="#"
                                            className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Feed</a>

                                        <a href="#"
                                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Saved Posts</a>
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

                <header className="bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-white">
                            Write
                </h1>
                    </div>
                </header>

                <main className="flex-grow">
                    <section className="text-gray-500 bg-gray-900 body-font relative">
                        <div className="container px-5 py-12 mx-auto">
                            <div className="flex flex-col text-center w-full mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Scream out your genius!</h1>
                                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Markdown support is planned for the future. Also, feel free to drag down the text area to enlarge it for comfort!</p>
                            </div>
                            <div className="lg:w-full h-full md:w-full mx-auto">
                                <div className="flex flex-col flex-wrap -m-2">
                                    <div className="p-2 w-full">
                                        <input className="w-full bg-gray-900 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-800 text-base px-4 py-2" placeholder="Title" type="text" onChange={this.handleOptions} name="title" />
                                    </div>

                                    <div className="p-2 w-full">
                                        <textarea className="w-full  bg-gray-900 rounded border h-56 border-gray-700 text-white focus:outline-none focus:border-indigo-800 text-base px-4 py-2 block" placeholder="Content" onChange={this.handleOptions} name="content"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="mt-10 block text-gray-400">
                                    <p className="font-semibold text-lg mb-2 mt-2">Post Settings</p>
                                    <div className="mt-2 text-gray-400">
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox form-checkbox-dark text-indigo-600" checked={this.state.anonymous} onChange={this.handleOptions} name="anonymous" />
                                                <span className="ml-2 form text-gray-400 font-thin">Post anonymously</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox form-checkbox-dark text-pink-500" checked={this.state.above_eighteen} onChange={this.handleOptions} name="above_eighteen" />
                                                <span className="font-thin text-gray-400 ml-2">For 18+ audience</span>
                                            </label>
                                        </div>

                                        <div className="p-2 w-full">
                                            <button className="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-10 focus:outline-none hover:bg-indigo-700 rounded text-lg"
                                            onClick={this.handlePost}>Post</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 block text-gray-400">
                                    <p className="font-semibold text-lg mb-1 mt-2">Add Tags</p>
                                    <p className="text-hairline mb-3">Click on tags to toggle them. Filled tags are applied, and outlined ones are not.</p>
                                    <div className="grid-flow-row">
                                        
                                        <InterestChip text="Poetry" onOn={() => this.addTag('poetry')} onOff={() => this.removeTag('poetry')} />
                                        <InterestChip text="Prose" onOn={() => this.addTag('prose')} onOff={() => this.removeTag('prose')} />
                                        <InterestChip text="Short stories" onOn={() => this.addTag('short_stories')} onOff={() => this.removeTag('short_stories')} />
                                        <InterestChip text="Idle thoughts" onOn={() => this.addTag('idle_thoughts')} onOff={() => this.removeTag('idle_thoughts')} />
                                        <InterestChip text="Parody" onOn={() => this.addTag('parody')} onOff={() => this.removeTag('parody')} />
                                        <InterestChip text="Jokes" onOn={() => this.addTag('jokes')} onOff={() => this.removeTag('jokes')} />
                                        <InterestChip text="Nature" onOn={() => this.addTag('nature')} onOff={() => this.removeTag('nature')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="text-gray-500 bg-gray-900 body-font min-h-0">
                    <div className="container px-5 py-8 mx-auto text-gray-500 bg-gray-900 flex items-center sm:flex-row flex-col">
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