import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import bg from '../../../../assets/images/bg_new_branding.jpg';

export class AppIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['home']} style={{background: `transparent url("${bg}") center no-repeat`}}>
        <div className={styles['copy-container']}></div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(AppIndex);
