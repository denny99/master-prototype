import React from 'react';
import PropTypes from 'prop-types';
import {InvalidChildException} from '../../exceptions/InvalidChildException';
import {AceColumn} from './AceColumn';
import {Header} from './datatable/Header';
import {Row} from './datatable/Row';
import {Paginator} from './datatable/Paginator';
import {ApiResponse} from '../../entity/ApiResponse';

export class AceDataTable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.instanceOf(ApiResponse),
    onLoad: PropTypes.func,
    rows: PropTypes.number,
    var: PropTypes.string,
    paginator: PropTypes.bool,
  };

  static demo = [
    {
      'aircraft': {
        'id': '82006467',
        'model': 'Boeing 645',
        'name': '9605858',
        'passengerCount': 180,
      },
      'arrival': {
        'city': 'Rom',
        'code': 'LIRA',
        'country': 'IT',
        'name': 'Rom Ciampino',
      },
      'costs': 147,
      'dateTime': '2018-01-10T01:04:20.113Z[UTC]',
      'departure': {
        'city': 'Rom',
        'code': 'LIRA',
        'country': 'IT',
        'name': 'Rom Ciampino',
      },
      'id': '60138905',
    },
    {
      'aircraft': {
        'id': '36354374',
        'model': 'Boeing 606',
        'name': '1302610',
        'passengerCount': 158,
      },
      'arrival': {
        'city': 'München',
        'code': 'EDDM',
        'country': 'DE',
        'name': 'München',
      },
      'costs': 328,
      'dateTime': '2018-02-19T15:41:11.331Z[UTC]',
      'departure': {
        'city': 'Hamburg',
        'code': 'EDDH',
        'country': 'DE',
        'name': 'Hamburg',
      },
      'id': '16358214',
    },
    {
      'aircraft': {
        'id': '33934580',
        'model': 'Boeing 296',
        'name': '9351597',
        'passengerCount': 276,
      },
      'arrival': {
        'city': 'Hamburg',
        'code': 'EDDH',
        'country': 'DE',
        'name': 'Hamburg',
      },
      'costs': 220,
      'dateTime': '2018-04-05T10:45:00.392Z[UTC]',
      'departure': {
        'city': 'Düsseldorf',
        'code': 'EDDL',
        'country': 'DE',
        'name': 'Düsseldorf',
      },
      'id': '599302',
    },
    {
      'aircraft': {
        'id': '62808625',
        'model': 'Boeing 405',
        'name': '6200660',
        'passengerCount': 226,
      },
      'arrival': {
        'city': 'Rom',
        'code': 'LIRA',
        'country': 'IT',
        'name': 'Rom Ciampino',
      },
      'costs': 341,
      'dateTime': '2018-05-05T23:20:30.646Z[UTC]',
      'departure': {
        'city': 'Düsseldorf',
        'code': 'EDDL',
        'country': 'DE',
        'name': 'Düsseldorf',
      },
      'id': '8918361',
    },
    {
      'aircraft': {
        'id': '91927457',
        'model': 'Airbus 333',
        'name': '3123310',
        'passengerCount': 158,
      },
      'arrival': {
        'city': 'München',
        'code': 'EDDM',
        'country': 'DE',
        'name': 'München',
      },
      'costs': 298,
      'dateTime': '2018-05-21T15:00:11.169Z[UTC]',
      'departure': {
        'city': 'München',
        'code': 'EDDM',
        'country': 'DE',
        'name': 'München',
      },
      'id': '28597575',
    },
    {
      'aircraft': {
        'id': '3228806',
        'model': 'Boeing 596',
        'name': '3933050',
        'passengerCount': 197,
      },
      'arrival': {
        'city': 'London',
        'code': 'EGGL',
        'country': 'GB',
        'name': 'London Heathrow',
      },
      'costs': 113,
      'dateTime': '2018-07-28T10:31:39.369Z[UTC]',
      'departure': {
        'city': 'München',
        'code': 'EDDM',
        'country': 'DE',
        'name': 'München',
      },
      'id': '28919427',
    },
    {
      'aircraft': {
        'id': '33934580',
        'model': 'Boeing 296',
        'name': '9351597',
        'passengerCount': 276,
      },
      'arrival': {
        'city': 'Saarbrücken',
        'code': 'EDDR',
        'country': 'DE',
        'name': 'Saarbrücken',
      },
      'costs': 216,
      'dateTime': '2018-08-24T14:47:36.047Z[UTC]',
      'departure': {
        'city': 'Düsseldorf',
        'code': 'EDDL',
        'country': 'DE',
        'name': 'Düsseldorf',
      },
      'id': '72756982',
    },
    {
      'aircraft': {
        'id': '85307275',
        'model': 'Boeing 722',
        'name': '5705085',
        'passengerCount': 177,
      },
      'arrival': {
        'city': 'Rom',
        'code': 'LIRA',
        'country': 'IT',
        'name': 'Rom Ciampino',
      },
      'costs': 85,
      'dateTime': '2018-10-19T01:25:39.473Z[UTC]',
      'departure': {
        'city': 'Paris',
        'code': 'LFPG',
        'country': 'FR',
        'name': 'Charles de Gaulle',
      },
      'id': '29535243',
    },
    {
      'aircraft': {
        'id': '57846504',
        'model': 'Boeing 645',
        'name': '8110882',
        'passengerCount': 258,
      },
      'arrival': {
        'city': 'London',
        'code': 'EGGL',
        'country': 'GB',
        'name': 'London Heathrow',
      },
      'costs': 197,
      'dateTime': '2018-10-26T08:13:47.94Z[UTC]',
      'departure': {
        'city': 'Hamburg',
        'code': 'EDDH',
        'country': 'DE',
        'name': 'Hamburg',
      },
      'id': '9780130',
    },
    {
      'aircraft': {
        'id': '21240404',
        'model': 'Boeing 533',
        'name': '5444556',
        'passengerCount': 190,
      },
      'arrival': {
        'city': 'Hamburg',
        'code': 'EDDH',
        'country': 'DE',
        'name': 'Hamburg',
      },
      'costs': 139,
      'dateTime': '2018-12-04T09:11:05.085Z[UTC]',
      'departure': {
        'city': 'Hamburg',
        'code': 'EDDH',
        'country': 'DE',
        'name': 'Hamburg',
      },
      'id': '25521904',
    },
  ];

  constructor(props, context) {
    super(props);
    this.state = {
      id: context.getFormId(this.props.id),
    };

    this.first = this.first.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
  }

  getChildContext() {
    return {
      getFormId: this.context.getFormId,
      first: this.first,
      prev: this.prev,
      next: this.next,
      last: this.last,
    };
  }

  render() {
    let paginatorTop = this.props.paginator ?
        <Paginator top={true}
                   pageSize={this.props.rows}
                   currentPage={this.props.value.offset / this.props.rows}
                   maxResults={this.props.value.max}/> :
        null;
    let paginatorBottom = this.props.paginator ?
        <Paginator pageSize={this.props.rows} top={false}
                   currentPage={this.props.value.offset / this.props.rows}
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
    let rows = [];
    for (let i = 0, j = AceDataTable.demo.length; i < j; i++) {
      rows.push(<Row key={i} parentId={this.state.id} index={i}
                     currentPage={this.props.value.offset / this.props.rows}
                     pageSize={this.props.rows} var={AceDataTable.demo[i]}
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
    this.props.onLoad(this.props.value.offset / this.props.rows - 1,);
  }

  /**
   * goto next page
   */
  next() {
    this.props.onLoad(this.props.value.offset / this.props.rows + 1);
  }

  /**
   * goto last page
   */
  last() {
    this.props.onLoad(Math.ceil(this.props.value.max / this.props.rows));
  }
}

AceDataTable.childContextTypes = {
  getFormId: PropTypes.func,
  first: PropTypes.func,
  prev: PropTypes.func,
  next: PropTypes.func,
  last: PropTypes.func,
};

AceDataTable.contextTypes = {
  getFormId: PropTypes.func,
};
