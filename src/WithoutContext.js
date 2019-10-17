import React, {Component} from 'react';

const Family = (props) => (
    <div>
        <Person name={props.name} />
    </div>
)


class Person extends Component {

    render() {
        return(
            <div>
                <p>Hey my name is {this.props.name}</p>
            </div>
        )
    }
}

class AppWithoutContext extends Component {

    state = {
        name : "Oliver",
        age : 39,
        job : "Programmer"
    }

    render() {
        return(
        <div>
            <h2>I am the app!</h2>
            <Family name={this.state.name} />
        </div>
        )
    }
}

export default AppWithoutContext;