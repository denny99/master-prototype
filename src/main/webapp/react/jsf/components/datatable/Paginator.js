import React from 'react';
import PropTypes from 'prop-types';

export default class Paginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    maxResults: PropTypes.number.isRequired,
    top: PropTypes.bool.isRequired,
  };

  render() {
    const maxPage = Math.ceil(this.props.maxResults / this.props.pageSize);
    let firstLink = this.props.currentPage === 1 ?
        <span id="yui-pg0-0-first-span"
              className="ui-paginator-first ui-state-default ui-corner-all ui-state-disabled">
            <span className="ui-icon ui-icon-seek-first">First</span>
          </span> :
        <a id="yui-pg1-0-first-link" href="#" onClick={this.context.first}
           className="ui-paginator-first ui-state-default ui-corner-all"><span
            className="ui-icon ui-icon-seek-first">First</span></a>;
    let prevLink = this.props.currentPage === 1 ?
        <span id="yui-pg0-0-prev-span"
              className="ui-paginator-previous ui-state-default ui-corner-all ui-state-disabled">
            <span className="ui-icon ui-icon-seek-prev">Prev</span>
          </span> :
        <a id="yui-pg1-0-prev-link" href="#" onClick={this.context.prev}
           className="ui-paginator-previous ui-state-default ui-corner-all"><span
            className="ui-icon ui-icon-seek-prev">Prev</span></a>;
    let nextLink = this.props.currentPage === maxPage ?
        <span id="yui-pg2-0-next-span"
              className="ui-paginator-next ui-state-default ui-corner-all ui-state-disabled"><span
            className="ui-icon ui-icon-seek-next">Next</span></span> :
        <a id="yui-pg0-0-next-link" href="#" onClick={this.context.next}
           className="ui-paginator-next ui-state-default ui-corner-all">
          <span className="ui-icon ui-icon-seek-next">Next</span>
        </a>;
    let lastLink = this.props.currentPage === maxPage ?
        <span id="yui-pg2-0-last-span"
              className="ui-paginator-last ui-state-default ui-corner-all ui-state-disabled"><span
            className="ui-icon ui-icon-seek-end">Last</span></span> :
        <a id="yui-pg0-0-last-link" href="#" onClick={this.context.last}
           className="ui-paginator-last ui-state-default ui-corner-all">
          <span className="ui-icon ui-icon-seek-end">Last</span>
        </a>;
    let pageLinks = [];

    let startPage = Math.max(1, this.props.currentPage -
        (this.props.currentPage + 5 > maxPage ?
            9 - (maxPage - this.props.currentPage) : 5));
    let endPage = Math.min(maxPage,
        this.props.currentPage < 7 ? 10 : (this.props.currentPage + 4));

    for (let i = startPage, j = endPage; i <=
    j; i++) {
      if (i === this.props.currentPage) {
        pageLinks.push(<span key={i}
                             className="ui-paginator-page ui-state-default ui-corner-all ui-paginator-current-page ui-state-active">{i}</span>);
      } else {
        pageLinks.push(<a href="#" onClick={() => {
          this.context.setPage(i);
        }}
                          className="ui-paginator-page ui-state-default ui-corner-all"
                          key={i}>{i}</a>);
      }
    }

    return (
        <div
            className={`ui-paginator ${this.props.top ?
                'ui-paginator-top' :
                'ui-paginator-bottom'} ui-widget-header ui-corner-tl ui-corner-tr`}
            id={`datatableForm:flightsTable_paginator${this.props.top ?
                'top' :
                'bottom'}`}>
          {firstLink}
          {prevLink}
          <span id="yui-pg0-0-pages" className="ui-paginator-pages">
            {pageLinks}
          </span>
          {nextLink}
          {lastLink}
        </div>
    );
  }
}

Paginator.contextTypes = {
  first: PropTypes.func,
  prev: PropTypes.func,
  next: PropTypes.func,
  last: PropTypes.func,
  setPage: PropTypes.func,
};
