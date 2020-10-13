import React from 'react';
import './css/build/tailwind.css';

export default class Comment extends React.Component {
    render() {
        return (
            <div className="py-8 flex flex-wrap md:flex-no-wrap border-b-2 border-gray-800">
                <div className="md:flex-grow">
                    <h2 className="text-lg font-medium text-white title-font mb-2"><span className="font-semibold">{this.props.anonymous ? 'anonymous' : this.props.postedbyUsername}</span> says:</h2>
                    <p className="leading-relaxed text-gray-400">{this.props.content}</p>
                </div>
            </div>
        );
    }
}