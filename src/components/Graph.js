/*******************************************************************************
 *Copyright (C) 2017 Resin.io, FBK, Jolocom.
 *All rights reserved. This program and the accompanying materials
 *are made available under the terms of the Eclipse Public License 2.0
 *which accompanies this distribution, and is available at
 *https://www.eclipse.org/legal/epl-2.0/
 *
 *SPDX-License-Identifier: EPL-2.0
 *
 *Contributors:
 *    Resin.io, FBK, Jolocom - initial API and implementation
 ******************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  recordsFetch,
  deviceSubscribe,
  deviceUnsubscribe
} from '../actions';

class Graph extends Component {
  constructor(props){
    super(props)
    this.state = {
      g: undefined,
      data: [],
      recordsAdded: false
    }
  }

  componentDidMount(){
    const {deviceId, componentId} = this.props
    this.props.recordsFetch(deviceId, componentId)
    this.props.deviceSubscribe(deviceId, componentId)
  }

  componentWillUnmount() {
    const { deviceId, componentId } = this.props
    this.props.deviceUnsubscribe(deviceId, componentId)
  }

  componentDidUpdate() {
    this.renderGraph()
  }

  componentWillReceiveProps(nextProps){
    let toAdd = this.state.data.concat()

    const { deviceId, componentId } = this.props
    const agileDataRecords = nextProps.records[deviceId] && nextProps.records[deviceId][componentId]

    if (
      !this.state.recordsAdded &&
      agileDataRecords &&
      agileDataRecords.length
    ) {
      this.setState({recordsAdded: true})
      toAdd = agileDataRecords
    }

    if (nextProps.streams[deviceId]) {
      const realTimeRecord = nextProps.streams[deviceId]
        .find(str => str.componentID === componentId)

      if (realTimeRecord) {
        const {lastUpdate, value} = realTimeRecord
        toAdd.push([new Date(lastUpdate), parseInt(value, 10)])
      }
    }

    this.setState({data: toAdd})
  }

  render(){
    if (this.state.data.length === 0)
      return null

    if (document.getElementById(`graphdiv${this.props.componentId}`))
      this.renderGraph()

    return (
      <div className='graph'>
        <div
          id={`graphdiv${this.props.componentId}`}
          style={{
            "width": "100%",
            "height": "100%"
          }}
        >
        </div>
      </div>
    )
  }

  renderGraph(){
    if (!document.getElementById(`graphdiv${this.props.componentId}`))
      return

    if (this.state.g) {
      this.state.g.updateOptions( {'file': this.state.data} );
    } else {
      const {unit} = this.props.streams[this.props.deviceId][0]
      const g = new window.Dygraph(
        document.getElementById(`graphdiv${this.props.componentId}`),
        this.state.data,
        {
          title: ' ',
          legend: 'always',
          fillGraph: true,
          strokeWidth: 1.5,
          color: '#00BCD4',
          labels: ['Time', this.props.componentId],
          axes: { y: { valueFormatter: (v) => `${v} ${unit}` } },
          animatedZooms: true,
          stackedGraphNaNFill: 'inside'
        }
      );

      this.props.graphsArray.push(g)
      this.setState({ g: g })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams,
    records: state.records
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deviceSubscribe: (deviceId, componentId) => dispatch(deviceSubscribe(deviceId, componentId)),
    deviceUnsubscribe: (deviceId, componentId) => dispatch(deviceUnsubscribe(deviceId, componentId)),
    recordsFetch: (deviceId, componentId) => dispatch(recordsFetch(deviceId, componentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
