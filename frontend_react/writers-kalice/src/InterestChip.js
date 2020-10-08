import Chip from '@material-ui/core/Chip';
import React from 'react';

export default class InterestChip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.on) {
            this.props.onOff();
            this.setState(state => ({
                on: false
            }));
        }
        else {
            this.props.onOn();
            this.setState(state => ({
                on: true
            }));
        }
    }

    render() {
        return (
            <div className="inline-block mb-3 mr-2"><Chip label={this.props.text} onClick={this.handleClick} variant={this.state.on ? 'default' : 'outline'} color="primary" /></div>
        );
    }
}