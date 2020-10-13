import React from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

class Tag extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">{this.props.tagName}</span></div>
        );
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);

        // process the content to show a truncated content
        var string = this.props.content.replace('\n', " ");
        var length = 305;
        var processedContent = string.length > length ? 
                    string.substring(0, length - 3) + "..." : string;
        
        // process the title to show a truncated title
        length = 55;
        string = this.props.title;
        var processedTitle = string.length > length ? 
        string.substring(0, length - 3) + "..." : string;

        this.state = {
            successSnkOpen: false,
            failedSnkOpen: false,
            warnSnkOpen: false,
            errorText: '',
            successText: '',
            warnText: '',
            content: processedContent,
            title: processedTitle
        };

        this.handleReadMore = this.handleReadMore.bind(this);
    }

    handleReadMore() {
        this.setState({
            warnSnkOpen: true,
            warnText: 'Not yet implemented!'
        })
    }

    render() {
        return (
            <div className="p-12 md:w-1/2 flex flex-col items-start border-dashed">
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-white mt-4 mb-4">{this.state.title}</h2>
                <p className="leading-relaxed mb-4">{this.state.content}</p>
                <div
                    className="flex flex-col items-start flex-wrap pb-4 mb-4 border-b-2 border-gray-800 mt-auto w-full">
                    <Link to={{
                        pathname: '/post',
                        query: {postId: this.props.id}
                    }} className="text-purple-500 inline-flex items-center mb-8">Read
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                    <div className="grid-flow-row">

                        {this.props.tags.map((tag) => 
                            <div className="inline-block mb-3 mr-2"><span className="inline-block py-1 px-3 rounded bg-gray-800 text-gray-500 text-xs font-medium tracking-widest">{tag.replace("_", " ").toUpperCase()}</span></div>
                        )}

                    </div>
                    <div className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm">
                        <span
                            className="text-gray-600 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                </path>
                            </svg>{this.props.nPosReactions}
                            <span className="ml-4"></span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5">
                                </path>
                            </svg>{this.props.nNegReactions}
                        </span>
                        <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                <path
                                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                </path>
                            </svg>{this.props.nComments}
                        </span>
                    </div>
                </div>
                <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-white">{this.props.viewReqType ? ('Author: ' + (this.props.anonymous ? 'anonymous' : this.props.postedbyUsername) + ', sent by ' + this.props.sentbyUsername)  : (this.props.anonymous ? '<anonymous>' : this.props.postedbyUsername) }</span>
                    </span>
                </a>

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

export default Post;