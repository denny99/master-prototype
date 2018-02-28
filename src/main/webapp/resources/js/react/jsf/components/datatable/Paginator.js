import React from 'react';
import PropTypes from 'prop-types';

export class Paginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    maxResults: PropTypes.number,
    top: PropTypes.bool,
  };

  render() {
    let pageLinks = '';
    // TODO iterate over pages and create links
    return (
        <div
            className="ui-paginator ui-paginator-top ui-widget-header ui-corner-tl ui-corner-tr"
            id="datatableForm:flightsTable_paginatortop">
          <span id="yui-pg0-0-first-span"
                className="ui-paginator-first ui-state-default ui-corner-all ui-state-disabled">
            <span className="ui-icon ui-icon-seek-first">First</span>
          </span>
          <span id="yui-pg0-0-prev-span"
                className="ui-paginator-previous ui-state-default ui-corner-all ui-state-disabled">
            <span className="ui-icon ui-icon-seek-prev">Prev</span>
          </span>
          <span id="yui-pg0-0-pages" className="ui-paginator-pages">
            <span
                className="ui-paginator-page ui-state-default ui-corner-all ui-paginator-current-page ui-state-active">1</span>
            <a href="#"
               className="ui-paginator-page ui-state-default ui-corner-all"
               page="2">2</a>
          </span>
          <a id="yui-pg0-0-next-link" href="#"
             className="ui-paginator-next ui-state-default ui-corner-all">
            <span className="ui-icon ui-icon-seek-next">Next</span>
          </a>
          <a id="yui-pg0-0-last-link" href="#"
             className="ui-paginator-last ui-state-default ui-corner-all">
            <span className="ui-icon ui-icon-seek-end">Last</span>
          </a>
        </div>
    );
  }
}
