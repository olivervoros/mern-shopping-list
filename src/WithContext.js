import React, {Component, Fragment} from 'react';

// 1. First create the context
const MyContext = React.createContext();

// 2. Then create the provider
class MyProvider extends Component {

    state = {
        name : "Oliver",
        age : 39,
        job : "Programmer"
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                growYearOlder: () => this.setState({
                    age: this.state.age + 1
                })
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }


}

const Family = (props) => (
    <div>
        <Person />
    </div>
)


// The consumer always has a function embedded such as below...
class Person extends Component {

    render() {
        return(
            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <Fragment>
                        <p>Name {context.state.name}</p>
                        <p>Age: {context.state.age}</p>
                        <p>Job: {context.state.job}</p>
                            <button onClick={context.growYearOlder}>Get older ! 🍩</button>
                        </Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }
}

class AppWithContext extends Component {

    render() {
        return(
            <MyProvider>
            <div>
                <h2>I am the app!</h2>
                <Family />
            </div>
        </MyProvider>
        )
    }
}

export default AppWithContext;