import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { List, ListItem } from 'material-ui/List';

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';

import {
  redA400,
  greenA700,
} from 'material-ui/styles/colors';

const colorCode = {
  AVAILABLE: greenA700,
  UNAVAILBLE: redA400
}

const computeColor = (status) => {
  return colorCode[status]
}

const renderMeta = (meta, id) => {
  if (meta) {
    const keys = Object.keys(meta).filter(i => i !== 'streams');
    return keys.map((key, i) => {
      return (
        <ListItem key={`${id}-${key}`}>
          {key}: <code>{!isEmpty(meta[key]) ? JSON.stringify(meta[key]) : 'null'}</code>
        </ListItem>
      )
    })
  }
}

class Device extends React.Component {
  render() {
    return (
      <div>
      <Card>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          actAsExpander={this.props.actAsExpander}
          showExpandableButton={this.props.showExpandableButton}
          avatar={
            <Avatar
              backgroundColor={computeColor(this.props.status)}
              >{this.props.title && this.props.title.charAt(0)}
            </Avatar>}
        />
        <CardText expandable>
          <List>
            {renderMeta(this.props.meta, this.props.subtitle)}
          </List>
        </CardText>
        <CardActions>
          {this.props.actions}
        </CardActions>
      </Card>
      </div>
    );
  }
}

export default Device
