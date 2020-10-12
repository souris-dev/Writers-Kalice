import React from 'react';
import logo from './public/assets/logo.png';
import './css/build/tailwind.css';
import PopupMenuList from './PopupMenuList';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Post from './Post';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default class ViewRequestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleWrite = this.handleWrite.bind(this);
        this.handleProfileSettings = this.handleProfileSettings.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleVR = this.handleVR.bind(this);
    }

    handleWrite() {
        console.log("Write");
        window.setTimeout(() => this.props.history.push('/write'), 10);
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

    render() {
        return (
            <div className="flex flex-col bg-gray-900">
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

                <header className="bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-white">
                            View Requests
                </h1>
                    </div>
                </header>

                <main className="flex-grow">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-gray-900">
                        {/* Replace with your content */}
                        <section className="text-gray-500 bg-gray-900 body-font overflow-hidden">
                            <div className="container px-5 py-24 mx-auto">
                                <div className="flex flex-wrap -m-12">
                                    <Post content="Live-edge letterpress cliche, salvia fanny pack
                                                        humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund.
                                                        Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
                                                        slow-carb etsy tumeric. Cray pug you probably haven't heard of them hexagon
                                    kickstarter craft beer pork chic."
                                        title="Roof party
                                    normcore before they sold out, cornhole vape"
                                        nPosReactions='10K' nNegReactions='5K' nComments="3" anonymous={false} postedbyUsername='sachett' viewReqType={true} sentByUsername='sachett' />
                                    {/* Post component */}
                                    <div className="p-12 md:w-1/2 flex flex-col items-start border-dashed">
                                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">Roof party
                                    normcore before they sold out, cornhole vape</h2>
                                        <p className="leading-relaxed mb-4"></p>
                                        <div
                                            className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 mt-auto w-full">
                                            <a className="text-purple-500 inline-flex items-center mb-8">Read
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <div className="grid-flow-row">
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                            </div>
                                            <span
                                                className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>1.2K
                                        <span className="ml-4"></span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                                    </path>
                                                </svg>1K
                                    </span>
                                            <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                                    </path>
                                                </svg>6
                                    </span>
                                        </div>
                                        <a className="inline-flex items-center">
                                            <span className="flex-grow flex flex-col pl-4">
                                                <span className="title-font font-medium text-white">Holden Caulfield</span>
                                            </span>
                                        </a>
                                    </div>
                                    {/*End post component*/}

                                    <div className="p-12 md:w-1/2 flex flex-col items-start border-dashed">
                                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">Roof party
                                    normcore before they sold out, cornhole vape</h2>
                                        <p className="leading-relaxed mb-4">Live-edge letterpress cliche, salvia fanny pack
                                        humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund.
                                        Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
                                        slow-carb etsy tumeric. Cray pug you probably haven't heard of them hexagon
                                    kickstarter craft beer pork chic.</p>
                                        <div
                                            className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 mt-auto w-full">
                                            <a className="text-purple-500 inline-flex items-center mb-8">Read
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <div className="grid-flow-row">
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                            </div>
                                            <span
                                                className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>1.2K
                                        <span className="ml-4"></span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                                    </path>
                                                </svg>1K
                                    </span>
                                            <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                                    </path>
                                                </svg>6
                                    </span>
                                        </div>
                                        <a className="inline-flex items-center">
                                            <span className="flex-grow flex flex-col pl-4">
                                                <span className="title-font font-medium text-white">Holden Caulfield</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="p-12 md:w-1/2 flex flex-col items-start border-dashed">
                                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">Roof party
                                    normcore before they sold out, cornhole vape</h2>
                                        <p className="leading-relaxed mb-4">Live-edge letterpress cliche, salvia fanny pack
                                        humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund.
                                        Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
                                        slow-carb etsy tumeric. Cray pug you probably haven't heard of them hexagon
                                    kickstarter craft beer pork chic.</p>
                                        <div
                                            className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 mt-auto w-full">
                                            <a className="text-purple-500 inline-flex items-center mb-8">Read
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <div className="grid-flow-row">
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                            </div>
                                            <span
                                                className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>1.2K
                                        <span className="ml-4"></span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                                    </path>
                                                </svg>1K
                                    </span>
                                            <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                                    </path>
                                                </svg>6
                                    </span>
                                        </div>
                                        <a className="inline-flex items-center">
                                            <span className="flex-grow flex flex-col pl-4">
                                                <span className="title-font font-medium text-white">Holden Caulfield</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="p-12 md:w-1/2 flex flex-col items-start border-dashed">
                                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">Roof party
                                    normcore before they sold out, cornhole vape</h2>
                                        <p className="leading-relaxed mb-4">Live-edge letterpress cliche, salvia fanny pack
                                        humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund.
                                        Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
                                        slow-carb etsy tumeric. Cray pug you probably haven't heard of them hexagon
                                    kickstarter craft beer pork chic.</p>
                                        <div
                                            className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-800 mt-auto w-full">
                                            <a className="text-purple-500 inline-flex items-center mb-8">Read
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <div className="grid-flow-row">
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                                <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">CATEGORY</span></div>
                                            </div>
                                            <span
                                                className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>1.2K
                                        <span className="ml-4"></span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                                    </path>
                                                </svg>1K
                                    </span>
                                            <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                    <path
                                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                                    </path>
                                                </svg>6
                                    </span>
                                        </div>
                                        <a className="inline-flex items-center">
                                            <span className="flex-grow flex flex-col pl-4">
                                                <span className="title-font font-medium text-white">Holden Caulfield</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 place-content-center h-48">
                                <div className="text-gray-700 text-center px-4 py-2 m-2"></div>
                                <div className="text-gray-700 text-center px-4 py-2 m-2"></div>
                                <button className="text-white  bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded justify-center text-lg" onClick={this.handleProfileMenuOpen}>
                                    More
                        </button>
                                <div className="text-gray-700 text-center px-4 py-2 m-2"></div>
                                <div className="text-gray-700 text-center px-4 py-2 m-2"></div>
                            </div>
                        </section>
                        {/* /End replace */}

                    </div>
                </main>
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
        );
    }
}