/*******************************************************************************
 *Copyright (C) 2017 Resin.io, FBK, Jolocom.
 *All rights reserved. This program and the accompanying materials
 *are made available under the terms of the Eclipse Public License v1.0
 *which accompanies this distribution, and is available at
 *http://www.eclipse.org/legal/epl-v10.html
 *
 *Contributors:
 *    Resin.io, FBK, Jolocom - initial API and implementation
 ******************************************************************************/
import React, { Component } from 'react';
import { DeviceItem } from '../components';
import { FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { devicesAndStreamsFetch, devicesDelete } from '../actions';
import CircularProgress from 'material-ui/CircularProgress'

class Devices extends Component {
  renderActions(device) {
    return (
      <div className='devices'>
        <FlatButton label='Disconnect' onClick={() => {
          this.props.devicesDelete(device.deviceId)}
        } />
        <Link to={`/graphs/${device.deviceId}`}>
          <FlatButton label='View Data' />
        </Link>
        <Link to={`/devices/${device.deviceId}`}>
          <FlatButton label='Configure' />
        </Link>
      </div>
    )
  }

  renderItems(devices) {
    if (devices) {
      return Object.keys(devices).map((deviceId, i) => {
        const device = devices[deviceId]

        return(
          <DeviceItem
            expandable
            showExpandableButton
            key={i}
            title={device.name}
            subtitle={device.deviceId}
            status={device.status}
            actions={this.renderActions(device)}
            meta={device}
          />)
      })
    }
  }

  componentDidMount() {
    this.props.devicesAndStreamsFetch()
  }

  render() {
    if (this.props.loading.devices) {
      return (
        <div className='loadingScreen'>
          <CircularProgress size={250} thickness={10}/>
        </div>
      )
    }

    return (
      <div className="devices">
        {this.renderItems(this.props.devices)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    devices: state.devices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    devicesAndStreamsFetch: () => dispatch(devicesAndStreamsFetch()),
    devicesDelete: (deviceId) => dispatch(devicesDelete(deviceId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
