import React from 'react';
import PropTypes from 'prop-types';
import InvalidChildException from '../../exceptions/InvalidChildException';
import AceColumn from './AceColumn';
import Header from './datatable/Header';
import Row from './datatable/Row';
import Paginator from './datatable/Paginator';
import ApiResponse from '../../entity/ApiResponse';
import JsfElement from '../superclass/JsfElement';

export default class AceDataTable extends JsfElement {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.instanceOf(ApiResponse).isRequired,
    onLoad: PropTypes.func.isRequired,
    rows: PropTypes.number.isRequired,
    var: PropTypes.string.isRequired,
    paginator: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.first = this.first.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  getChildContext() {
    return {
      getFormId: this.context.getFormId,
      first: this.first,
      prev: this.prev,
      next: this.next,
      last: this.last,
      setPage: this.setPage,
    };
  }

  render() {
    this.currentPage = this.props.value.offset / this.props.rows + 1;
    let paginatorTop = this.props.paginator ?
        <Paginator top={true}
                   pageSize={this.props.rows}
                   currentPage={this.currentPage}
                   maxResults={this.props.value.max}/> :
        null;
    let paginatorBottom = this.props.paginator ?
        <Paginator pageSize={this.props.rows} top={false}
                   currentPage={this.currentPage}
                   maxResults={this.props.value.max}/> :
        null;
    let headers = [];
    let columns = [];

    // create all headers and determine all requested columns
    React.Children.forEach(this.props.children, (child, i) => {
      if (child.type === AceColumn) {
        let column = new child.type(child.props);
        headers.push(
            <Header key={i} index={i}
                    parentId={this.state.id}>{column.header}</Header>);
        columns.push(column.column);
      } else {
        throw new InvalidChildException();
      }
    });
    // generate table rows and insert variable value
    let rows = [];
    for (let i = 0, j = this.props.value.data.length; i < j; i++) {
      rows.push(<Row key={i} parentId={this.state.id} index={i}
                     currentPage={this.props.value.offset / this.props.rows}
                     pageSize={this.props.rows} var={this.props.value.data[i]}
                     varName={this.props.var}>{columns}</Row>);
    }

    return (<div className="ui-datatable ui-widget"
                 id={this.state.id}>
      {paginatorTop}
      <div>
        <table>
          <thead>
          <tr>
            {headers}
          </tr>
          </thead>
          <tbody className="ui-datatable-data ui-widget-content">
          {rows}
          </tbody>
        </table>
      </div>
      {paginatorBottom}
    </div>);
  }

  /**
   * goto first page
   */
  first() {
    this.props.onLoad(1);
  }

  /**
   * goto prev page
   */
  prev() {
    this.props.onLoad(this.currentPage - 1,);
  }

  /**
   * goto next page
   */
  next() {
    this.props.onLoad(this.currentPage + 1);
  }

  /**
   * goto last page
   */
  last() {
    this.props.onLoad(Math.ceil(this.props.value.max / this.props.rows));
  }

  /**
   * goto given page
   */
  setPage(i) {
    this.props.onLoad(i);
  }
}

AceDataTable.childContextTypes = {
  getFormId: PropTypes.func,
  first: PropTypes.func,
  prev: PropTypes.func,
  next: PropTypes.func,
  last: PropTypes.func,
  setPage: PropTypes.func,
};

AceDataTable.contextTypes = {
  getFormId: PropTypes.func,
};
