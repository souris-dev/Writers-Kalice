import React from 'react';
import './css/build/tailwind.css';
import PopupMenuList from './PopupMenuList';
import Post from './Post';
import logo from './public/assets/logo.png';

import Comment from './Comment';

export default class PostDisplayPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            thisUserComment: ' ',
            thisAnononymousComment: false,
            thisUserPositiveComment: true,
            comments: [
                // Sample data
                {
                    content: "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.",
                    postedbyUsername: "sachett",
                    anonymous: false
                },
                {
                    content: "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.",
                    postedbyUsername: "sachett",
                    anonymous: true
                },
                {
                    content: "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.",
                    postedbyUsername: "sachett",
                    anonymous: false
                }
            ],
            post: {
                postedbyUsername: '(Loading...)',
                title: '(Loading...)',
                postedbyBio: '(Loading...)',
                postedDate: '(Loading...)',
                content: '(Loading...)'
            },
            liked: null,
        };
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
            <main className="profile-page">
                        <section className="relative block h-1/3" style={{ height: 300 + 'px' }}>
                    
                </section>
                <section className="relative py-24 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white w- mb-6 shadow-2xl rounded-lg -mt-80">
                            {/*<h1 className="mt-16 text-3xl font-semibold" style="padding-left: 5.5rem;">Sign Up</h1>*/}
                            <section className="text-gray-700 body-font relative px-5">
                                <div className="container px-5 mb-5 mx-auto flex sm:flex-no-wrap flex-wrap">

                                    <div className=" bg-white flex flex-col md:ml-auto w-full">
                                        <p className="text-4xl mb-1 mt-6">Lorem ipsum dolor sit amet</p>
                                        <p className="font-thin text-xl mt-2 leading-5">By <span className="font-normal">sachett</span> on 02-02-02 <span className="ml-6"></span>
                                        <span
                                        className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-gray-800">

                                            {/* Like, dislike view request buttons*/}
                                            <button onClick={() => console.log(this.props.location.query.postId)}>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>
                                            </button>1.2K
                                            <span className="ml-4"></span>
                                            <button>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                                    </path>
                                                </svg>
                                            </button>1K
                                            <span className="ml-4"></span>
                                            <button>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                                </svg>
                                            </button>
                                        </span></p>
                                        <div className="mt-4 leading-7">
                                        <p className="text-xl font-semibold mt-6 leading-5">Introduction</p>
<p className="text-lg font-normal mt-4">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit suscipit eu eu urna. Proin bibendum urna mattis ante malesuada ultrices. Etiam in turpis vitae elit dictum aliquet. Donec mattis risus in turpis dapibus, eget tempus sem tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In est enim, imperdiet sed ornare quis, pellentesque vel risus. Nunc vitae vestibulum turpis. Quisque eget eleifend urna. Etiam et vulputate purus, ut egestas sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis quis neque non urna venenatis mollis et at massa. Pellentesque sem lacus, malesuada vel hendrerit molestie, mollis vel elit.
<p className="text-xl font-semibold mt-6 mb-4 leading-5">Heading</p>

Vivamus nec facilisis elit, quis congue justo. In non augue ex. Aenean pretium facilisis hendrerit. Sed sed imperdiet dui. Etiam faucibus a diam sed vehicula. Nullam commodo lacus tincidunt, tincidunt orci sed, dapibus leo. Vivamus vulputate quis risus a ultricies. Aliquam luctus id tellus non condimentum. Aenean maximus viverra ipsum eget vestibulum. Morbi ut tincidunt sem, efficitur volutpat tortor. Donec scelerisque, ipsum eu efficitur semper, neque turpis sodales quam, in aliquam elit lacus varius lorem. Ut ut diam id leo efficitur malesuada eget in velit. Pellentesque tristique orci nunc, vitae fermentum nibh luctus eu. Mauris condimentum justo sed ipsum egestas varius.

Sed sagittis odio a volutpat feugiat. Cras aliquam varius justo, a rhoncus ante bibendum id. Nulla maximus nisl sed enim maximus, ut dictum lectus hendrerit. Fusce venenatis tincidunt eros. Phasellus quis augue vulputate ipsum pellentesque fringilla. Morbi nec tempor felis. Maecenas sollicitudin pellentesque dui, sit amet scelerisque mauris elementum nec. Cras ante metus, mattis in malesuada in, fermentum a nunc. Suspendisse potenti. Sed tempor lacus sed commodo dignissim. Quisque dictum, dolor auctor iaculis cursus, ipsum urna porttitor ex, sed consequat nisi tellus eget ante. Duis molestie mollis eros, eu sollicitudin mauris lobortis quis.

Vivamus sed neque nec massa scelerisque imperdiet eget id sapien. Fusce elementum mi id malesuada luctus. Proin quis lorem id leo porta interdum non ac nisl. Integer nulla sem, ultrices sed neque eget, blandit condimentum metus. Aliquam eget malesuada sapien. Curabitur aliquet orci sit amet ex tincidunt convallis. Mauris urna mi, consequat mattis mollis a, dignissim eget sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam facilisis sem diam, viverra consequat metus consequat vel. Cras a mi eu ex luctus malesuada quis eu ante. Aliquam erat volutpat.
Conclusion

Donec vulputate auctor leo lobortis congue. Sed elementum pharetra turpis. Nulla at condimentum odio. Vestibulum ullamcorper enim eget porttitor bibendum. Proin eros nibh, maximus vitae nisi a, blandit ultricies lectus. Vivamus eu maximus lacus. Maecenas imperdiet iaculis neque, vitae efficitur felis vestibulum sagittis. Nunc a eros aliquet, egestas tortor hendrerit, posuere diam. Proin laoreet, ligula non eleifend bibendum, orci nulla luctus ipsum, dignissim convallis quam dolor et nulla.</p>
                                    </div></div>

                                </div>
                                <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow border-indigo-50 mt-10 mb-10 p-6 rounded-lg">
                                    
                                    <div className="flex-1 flex flex-col justify-center md:justify-start rounded-lg pb-4">
                                        <p className="font-bold ml-4 text-2xl">Author</p>
                                                <p className="font-semibold mt-4 ml-4 text-xl">{this.state.post.postedbyUsername}</p>
                                                <p className="pt-2 ml-4">{this.state.post.postedbyBio}</p>
                                        
                                    </div>
                                </div>
                            </section>
                            <footer className="text-gray-500 bg-gray-900 body-font min-h-0">
                                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                                    <div className="flex flex-col ml-4">
                                        <p className="text-white text-4xl px-3">Comments</p>
                                        
                                        <div className="w-full mt-8 px-4">
                                            <textarea className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-20 focus:border-blue-500 text-base px-4 py-2 resize-none block" placeholder="Post your comment"></textarea>
                                        </div>
                                        
                                        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
                                            <label className="inline-flex items-center ml-6 mt-2">
                                                <input type="checkbox" className="form-checkbox form-checkbox-dark text-indigo-600" checked />
                                                <span className="ml-2 text-gray-400 font-thin">Anonymous</span>
                                            </label>
                                            <label className="inline-flex items-center ml-6 mt-3">
                                                <input type="radio" className="form-radio form-radio-dark text-green-500" name="accountType" value="personal" />
                                                <span className="ml-2">Positive</span>
                                              </label>
                                              <label className="inline-flex items-center ml-6 mt-3">
                                                <input type="radio" className="form-radio form-radio-dark text-red-600" name="accountType" value="busines" />
                                                <span className="ml-2">Negative</span>
                                              </label>
                                            <div className="p-2 w-full mt-3">
                                                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Post</button>
                                            </div>
                                        </div>

                                        <section className="text-gray-500 bg-gray-900 body-font overflow-hidden">
                                            <div className="container px-5 py-24 mx-auto">
                                                <div className="-my-8">
                                                
                                                    {this.state.comments.map((comment) => 
                                                        <Comment content={comment.content}
                                                            postedbyUsername={comment.postedbyUsername}
                                                            anonymous={comment.anonymous} />
                                                    )}

                                                </div>
                                            </div>
                                          </section>
                                    </div>
                                </div>
                            </footer>
                        </div>

                    </div>

                </section>
            </main>
            <footer className="text-gray-500 bg-gray-900 body-font min-h-0">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a
                        className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src={logo} className="h-10" />
                    </a>
                    {/*<p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 tailblocks —
        <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@knyttneve</a>
      </p>*/}
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="text-gray-600">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z">
                                </path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-600">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                </path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-600">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01">
                                </path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-600">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="0" className="w-5 h-5"
                                viewBox="0 0 24 24">
                                <path stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                                </path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </footer>
        </div></div>
        );
    }
}