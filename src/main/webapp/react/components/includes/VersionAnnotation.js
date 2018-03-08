import React from 'react';
import IceOutputLink from '../../jsf/components/IceOutputLink';

export default class VersionAnnotation extends React.Component {
  render() {
    return (
        <React.Fragment>
          <h4>Master Prototype React Version</h4>
          <IceOutputLink styleClass="ice-linkbutton" type="text/html"
                         value="https://github.com/denny99/master-prototype/tree/react">
            Github Repo
          </IceOutputLink>
        </React.Fragment>
    );
  }
}