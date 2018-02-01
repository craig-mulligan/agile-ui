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
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { FlatButton } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import { 
  GenericListItem,
  LocalStoragePolicies
} from './';

const styles = {
  subheader : {
    padding: '0px',
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#000'
  },
  fullWidthButton: {
    width: '100%'
  }
}

const LocStorSettingsSummary = (props) => {
  const {
    deviceId,
    streams,
    interval,
    retention,
    localStorage,
    locStorPolicyDelete,
    selectedComponent,
    handleComponentChange,
    handleIntervalChange,
    handleRetentionChange,
    handleButtonClick
  } = props

  const locStorageSection = localStorage.length
    ? <LocalStoragePolicies
        policies={localStorage}
        handleRemoval={locStorPolicyDelete}
      />
    : null

  return (
    <Card>
      <CardHeader
        title={'Local Storage Settings'}
        actAsExpander
        showExpandableButton
      />
    <CardText expandable>
      <Subheader style={styles.subheader}> Add new policy </Subheader>
      <Divider />
      <List>
        <GenericListItem
          leftEl='Device Id'
          rightEl={<code>{deviceId}</code>}
        />

        <GenericListItem
          leftEl='Component Id'
          rightEl={
            <SelectField
              value={selectedComponent}
              onChange={handleComponentChange}>
              {formatStreams(streams)}
            </SelectField>
          }
        />

        <GenericListItem
          leftEl='Interval'
          rightEl={
            <TextField
              value={interval}
              onChange={handleIntervalChange}
              hintText='Frequency in MS'/>
          }
        />

        <GenericListItem
          leftEl='Retention'
          rightEl={
            <TextField
              value={retention}
              onChange={handleRetentionChange}
              hintText='Period in days'/>
          }
        />

        <FlatButton
          style={styles.fullWidthButton}
          label='Add'
          onClick={handleButtonClick}
        />
      </List>

      {locStorageSection}
    </CardText>
  </Card>
  )
}

const formatStreams = (streams) => {
  if(streams) {
    return streams.map(s => {
      return <MenuItem key={s.id} value={s.id} primaryText={s.id} />
    })
  }
}

export default LocStorSettingsSummary
