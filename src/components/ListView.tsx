// components are "dumb" react components that are not aware of anything but themselves
// they receive data from their parents through regular react props
// any local component state and logic should be handled by presenters

import * as _ from 'lodash';
import * as React from 'react';
import * as autobind from 'react-autobind';

interface Props {
  rowsById: {};
  rowsIdArray: string[];
  renderRow?: (rowId: string, row: {}) => JSX.Element;
}

export default class ListView extends React.Component<Props, void> {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    return (
      <ul>
        {_.map(this.props.rowsIdArray, this.renderRowById)}
      </ul>
    );
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.renderRowThroughProps(rowId)}
      </li>
    );
  }

  renderRowThroughProps(rowId) {
    if (typeof this.props.renderRow === 'function') {
      return this.props.renderRow(rowId, _.get(this.props.rowsById, rowId));
    } else {
      return undefined;
    }
  }
}
