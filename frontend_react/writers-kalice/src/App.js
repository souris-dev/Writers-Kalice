import React from 'react';
import serverUrl from './appconfig';
import { Link, Redirect } from 'react-router-dom';
import logo from './public/assets/logo.png';
//import './App.css';
import './css/build/tailwind.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';
import Feed from './ViewRequestsPage';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Landing() {
  var username = '';
  var halfkey = '';
  var password = '';
  if (window.localStorage) {
    username = window.localStorage.getItem('wKusername');
    password = window.localStorage.getItem('wKpassword');
  }

  console.log(username)
  console.log(password)

  if (username == '' || username == null || password == '' || password == null) {
    return new SignInPage();
  }
  else {
    return <Redirect to="/feed" />
  }
}

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      successSnkOpen: false,
      failedSnkOpen: false,
      warnSnkOpen: false,
      errorText: '',
      successText: '',
      warnText: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    if (!this.state.username || !this.state.password) {
      this.setState({
        errorText: 'Please enter the password and username!',
        failedSnkOpen: true,
      });
      return;
    }

    if (window.localStorage) {
      
      console.log(JSON.stringify({ username: this.state.username, password: this.state.password }));

      fetch(serverUrl + "/users/checksignin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: this.state.password, username: this.state.username })
      }).then(response => {
        if (response.status == 200) {
          window.localStorage.setItem('wKusername', this.state.username);
          window.localStorage.setItem('wKpassword', this.state.password);

          response.json().then((data) => {
            console.log(data)

            if (data.success) {
              window.localStorage.setItem('wKuid', data.userId);
              this.setState({
                successText: 'Signed in successfully!',
                successSnkOpen: true,
              });

              window.setTimeout(() => this.props.history.push('/feed'), 1000);
            }
            else {
              this.setState({
                errorText: 'Invalid username/password!',
                failedSnkOpen: true,
              });
            }
          });
        }
        else if (response.status == 401) {
          this.setState({
            errorText: 'Invalid username/password!',
            failedSnkOpen: true,
          });
        }
      }).catch(() => {

      });
    }

      //window.localStorage.setItem('wKuid', data.userId);
      /*this.setState({
        successText: 'Signed in successfully!',
        successSnkOpen: true,
      });

      window.setTimeout(() => this.props.history.push('/feed'), 1000);*/
    }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const optionName = target.name;

    this.setState(state => ({
      [optionName]: value
    }));
  }

  render() {
    return (
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
        <main className="flex-grow">
          <section className="text-gray-500 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-semibold text-3xl text-white">The outlet for all your creative ideas and literary grace isn't just the diary.</h1>
                <p className="leading-relaxed mt-4">Ever thought of wanting to share all those ideas popping in your
                head? All those ideas that pop up into your head in the shower, or while dining alone?
                Well, now you have a platform to share all that with the world.

                  <br /><p className="leading-relaxed mt-4">Because we all know that a <i>diary</i> just isn't the place deserved by your magnificent ideas.</p>
                  <p className="mt-4"></p><span className="text-indigo-500 font-semibold">Writer's Kalice</span> is the place for the literary genius that hides within you that never stepped out of the lonely confines of your diary till now. </p>
              </div>
              <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-white text-lg font-medium title-font mb-5">Sign In</h2>
                <input className="bg-gray-900 rounded border font-mono tracking-widest text-white border-gray-900 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4" placeholder="Username" type="text" name="username" onChange={this.handleChange} />
                <input type="password" className="bg-gray-900 tracking-widest rounded border font-mono text-white border-gray-900 focus:outline-none focus:border-purple-500 text-base px-4 py-2 mb-4" placeholder="Password" name="password" onChange={this.handleChange} />
                <p><br /><br /></p>
                {/*<p className="text-sm text-gray-600 mb-6"><a className="text-purple-500 inline-flex items-center" href="#" onClick={() => { this.setState({ warnText: 'Planned for the future!', warnSnkOpen: true }) }}>Forgot password?</a></p>*/}
                <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={this.handleSubmit}>
                  Open Sesame!
              </button>
                <p className="text-sm text-gray-600 mt-6">If you don't have an account yet, &nbsp;
              <Link to="/signup"><a className="text-purple-500 inline-flex items-center" href="/signup">sign up here.</a></Link></p>
              </div>
            </div>
          </section>
        </main>
        <footer className="text-gray-500 bg-gray-900 body-font">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
              {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Writer's Kalice</span>*/}
              <img src={logo} className="h-10" />
            </a>
            {/*<p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 tailblocks —
              <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@knyttneve</a>
            </p>*/}
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-gray-600">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-600">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
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

// //export default SignInPage;
export default Landing;