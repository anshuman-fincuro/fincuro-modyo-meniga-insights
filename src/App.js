import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { setAuthToken } from './store/actions/auth-action';
import Insights from './components/Insights/Insights';
// import CarbonFootprint from './components/CarbonFootprint/CarbonFootprint';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.setAuth();
  }

  render() {
    return (
     <Insights/>
    // <CarbonFootprint/>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuthToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
