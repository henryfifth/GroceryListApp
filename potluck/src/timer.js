import openSocket from 'socket.io-client';
import React, { Component } from 'react';
const  socket = openSocket('http://localhost:8000');

export default class Timer extends Component{
    constructor(props) {
        super(props);
        this.subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp
        }));
    }

    subscribeToTimer(cb) {
        socket.on('timer', timestamp => cb(null, timestamp));
        socket.emit('subscribeToTimer', 1000);
    }

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    This is the timer value: {this.state.timestamp}
                </p>
            </div>
        );
    }
}