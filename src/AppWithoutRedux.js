import React, {Component} from 'react';

class AppWithoutRedux extends Component {

    state = {
        age: 39
    }

    onAgeUp = () => {
        this.setState({
            ...this.state,
            age: ++this.state.age

        })
    }

    onAgeDown = () => {
        this.setState({
            ...this.state,
            age: --this.state.age

        })
    }

    render() {
        return(
            <div className="AppWithoutRedux">
                <div>Age: <span>{this.state.age}</span></div>
                <p>
                <button onClick={this.onAgeUp}>Age up</button>
                </p>
                <p>
                <button onClick={this.onAgeDown}>Age down</button>
                </p>
            </div>
        )
    }
}

export default AppWithoutRedux;