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
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {entityFetch} from '../actions'
import {SecurityDetails} from './'

class Entity extends Component {

  renderEntity(entity) {
    const { schemas } = this.props
    const fieldProperties = schemas.ui.entities && schemas.ui.entities[entity.type]
      ? schemas.ui.entities[entity.type].attributes
      : {}

    return (<SecurityDetails
      expandable
      showExpandableButton
      key={`${entity.id}_${entity.type}`}
      title={entity.id}
      subtitle={entity.owner}
      entity={entity}
      entityType={entity.type}
      fieldProperties={fieldProperties}
    />)
  }

  componentWillMount() {
    this.props.entityFetch(this.props.params.type)
  }

  render() {
    const {id, type} = this.props.params

    const relevantEntity = this.props.entityList.find(entity =>
      entity.id === id && entity.type.replace('/', '') === type
    )

    if (relevantEntity) {
      return (
        <div> {this.renderEntity(relevantEntity)} </div>
      )
    }

    return (<div> No Entity data was found </div>)
  }
}

const mapStateToProps = state => {
  return {
    entityList: state.entityList,
    schemas: state.schemas
  }
}

const
  mapDispatchToProps = dispatch => {
    return {
      entityFetch: (id, type, actions) => dispatch(entityFetch(id, type, actions))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Entity)
