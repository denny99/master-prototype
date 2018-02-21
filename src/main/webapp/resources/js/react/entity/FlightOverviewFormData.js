export class FlightOverviewFormData {
  constructor() {
    this.body = {
      arrivalFilter: '',
    };
  }

  get arrivalFilter() {
    return this.body.arrivalFilter;
  }

  set arrivalFilter(filter) {
    this.body.arrivalFilter = filter;
  }
}