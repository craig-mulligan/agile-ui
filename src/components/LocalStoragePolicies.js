import React from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const LocalStoragePolicies = (props) => {
  const { policies, handleRemoval } = props
  const styles= {
    bar: {
      marginTop: "15px",
      marginBottom: "15px",
      backgroundColor: "#f2f2f2",
      fontSize: "1.2em"
    },
    subheader : {
      padding: '0px',
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#000'
    },
    removeButton: {
      color: "#c14f54",
      cursor: "pointer"
    }
  }

  return (
    <List>
      <Subheader style={styles.subheader}> Manage existing policies </Subheader>
      <Divider />
      {
        policies.map(pol => {
          return <Toolbar style={styles.bar}>
            <ToolbarGroup>
              Storing data from component <code>{pol.componentID}</code> 
              every <code>{pol.interval}</code> ms.
            </ ToolbarGroup>
            <ToolbarGroup>
              <NavigationClose style={styles.removeButton} onClick={
                () => handleRemoval(pol.deviceID, pol.componentID)
              }/>
            </ToolbarGroup>
          </Toolbar>
        })
      }
    </List>
  )
}

export default LocalStoragePolicies