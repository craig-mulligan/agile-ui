import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {FloatingActionButton, FlatButton} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {fetchEntityLocks, deleteLock, setLock} from '../actions';
import {LockItem} from '../components';

const deleteButtonStyle = {
  margin: 0,
  top: 2,
  right: 2,
  position: 'absolute'
};

class Locks extends Component {

  renderAddWriteLockButton(field) {
    return (
      <Link key={'addread_' + field} to={`/lock/add/${this.props.params.id}/${this.props.params.type}/${field}/write`}>
        <FlatButton label={`Add write lock`}/>
      </Link>
    )
  }

  renderAddReadLockButton(field) {
    return (
      <Link key={'addwrite_' + field} to={`/lock/add/${this.props.params.id}/${this.props.params.type}/${field}/read`}>
        <FlatButton label={`Add read lock`}/>
      </Link>
    )
  }

  renderDeleteButton(field) {
    return (
      <FlatButton
        id={'delete_' + this.props.params.id + '_' + field}
        key={'delete_' + this.props.params.id + '_' + field}
        label='Delete'
        onClick={() => {
          this.props.deleteLock({
            entityId: this.props.params.id,
            entityType: this.props.params.type,
            field: field
          })
        }}>
      </FlatButton>
    )
  }

  renderBlockDeleteButton(field, i) {
    return (
      <FloatingActionButton mini={true}
                            id={'delete_' + this.props.params.id + '_' + field + '_' + i}
                            key={this.props.params.id + '_' + field + '_' + i}
                            label='Delete'
                            style={deleteButtonStyle}
                            onClick={() => {
                              let blocks = this.props.policies[field].flows.map(block => {
                                block.locks.forEach(lock => {
                                  delete lock.deleteButton;
                                  return lock;
                                });
                                delete block.deleteButton;
                                return block;
                              }).filter((block, j) => {
                                return j !== i;
                              });

                              this.props.setLock({
                                entityId: this.props.params.id,
                                entityType: this.props.params.type,
                                field: field,
                                policy: blocks
                              })
                            }}>
        <ContentRemove/>
      </FloatingActionButton>
    )
  }

  renderLockDeleteButton(field, i, j) {
    return (
      <FloatingActionButton mini={true}
                            id={'delete_' + this.props.params.id + '_' + field + '_' + i + '_' + j}
                            key={this.props.params.id + '_' + field + '_' + i + '_' + j}
                            label='Delete'
                            style={deleteButtonStyle}
                            onClick={() => {
                              let blocks = this.props.policies[field].flows.map((block, m) => {
                                block.locks = block.locks.filter((lock, k) => {
                                  return !(m === i && k === j);
                                }).map(lock => {
                                  delete lock.deleteButton;
                                  return lock;
                                });
                                delete block.deleteButton;
                                return block;
                              });

                              this.props.setLock({
                                entityId: this.props.params.id,
                                entityType: this.props.params.type,
                                field: field,
                                policy: blocks
                              })
                            }}>
        <ContentRemove/>
      </FloatingActionButton>
    )
  }

  deleteButtons(policy, block, i) {
    block.deleteButton = this.renderBlockDeleteButton(policy, i);
    block.locks.forEach((lock, j) => {
      lock.deleteButton = this.renderLockDeleteButton(policy, i, j);
    })
  }

  renderButtons() {
    let policies = {};
    for (var policy in this.props.policies) {
      policies[policy] = this.props.policies[policy];
      policies[policy].buttons = [this.renderDeleteButton(policy), this.renderAddWriteLockButton(policy), this.renderAddReadLockButton(policy)];
      policies[policy].flows.forEach(this.deleteButtons.bind(this, policy))
    }
    return policies;
  }

  getPolicyItems() {
    let policies = this.renderButtons();
    let policyItems = [];
    for (var policy in policies) {
      policyItems.push((<LockItem
        expandable
        showExpandableButton
        title={policy}
        policy={policies[policy]}
        key={`${policy}_locks`}
      />));
    }
    return policyItems;
  }

  componentWillMount() {
    this.props.fetchEntityLocks(this.props.params.id, this.props.params.type);
  }

  render() {
    if (this.props.policies && Object.keys(this.props.policies).length > 0) {
      return (
        <div>
          {this.getPolicyItems()}
        </div>)
    } else {
      return (<div>No locks found</div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    policies: state.policies
  };
};

const
  mapDispatchToProps = (dispatch) => {
    return {
      fetchEntityLocks: (entity_id, entity_type) => dispatch(fetchEntityLocks(entity_id, entity_type)),
      deleteLock: (params) => dispatch(deleteLock(params)),
      setLock: (params) => dispatch(setLock(params))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Locks);