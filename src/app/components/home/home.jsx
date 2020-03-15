import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Helmet from 'react-helmet';
import DevTools from '../dev_tools';

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwtDecode from './jwt-decode';

import { refreshUser, logout } from '../../actions/user_actions';

// Import Actions
import { toggleAddPost } from '../../actions/home_actions';

const fontAwesome = {
  rel: 'stylesheet',
  type: 'text/css',
  href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line

    let token = localStorage.getItem('token');

	 	if (!token || token === '') {
      this.props.dispatch(logout());
    }

    this.props.dispatch(refreshUser(token));
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Live"
            titleTemplate="%s - PlutoTV"
            link={[fontAwesome]}
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
              { name: 'twitter:site', content: "pluto.tv/whatson" },
              { name: 'twitter:creator', content: "Pluto TV" },
              { name: 'twitter:title', content: "Pluto TV Live" },
              { name: 'twitter:description', content: "Watch, chat and interact with us live on Pluto TV" },
              { name: 'twitter:image', content: "https://cf-whatson.pluto.tv/logo-1.jpg" },
            ]}
          />
          <div className={'container'}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {}
}

export default connect(mapStateToProps)(App);
