import React, {Component} from 'react';
import {connect} from 'react-redux';

class AppWithRedux extends Component {

    render() {
        return(
            <div className="AppWithRedux">
                <div>Age: <span>{this.state.age}</span></div>
                <p>
                    <button onClick={this.props.onAgeUp}>Age up</button>
                </p>
                <p>
                    <button onClick={this.props.onAgeDown}>Age down</button>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        age: state.age
    }
}
const mapDispatchToProps =  (dispatch) => {
    return {
        onAgeUp: () => dispatch({type: 'AGE_UP'}),
        onAgeDown: () => dispatch({type: 'AGE_DOWN'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithRedux);