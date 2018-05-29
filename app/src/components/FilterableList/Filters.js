import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      keywords: '',
      launchPad: '',
      minYear: 0,
      maxYear: 0,
      isFilterDisabled: false,
    };
  }

  onInputChange = (e) => {
    const field = {};
    const { name, value } = e.target;

    field[name] = value;
    
    this.setState({
      ...field,
    }, () => {
      if ((name === 'minYear' && this.state.maxYear !== 0 && parseInt(this.state.maxYear, 10) < parseInt(value, 10))
        || (name === 'maxYear' && this.state.minYear !== 0 && parseInt(this.state.minYear, 10) > parseInt(value, 10))) {

          console.log(name, value, this.state);
        this.setState({
          isFilterDisabled: true,
        }, () => alert('Invalid year range.'));
      } else {
        this.setState({
          isFilterDisabled: false,
        });
      }
    });

    this.props.onInputChange(field);
  };

  getLaunchPadOptions = () => {
    return this.props.launchPads.map((launchPad, i) => (
      <option value={launchPad.id} key={i}>
        {launchPad.full_name}
      </option>
    ));
  };

  getYearOptions = () => {
    const years = this.props.launches.reduce((arr, launch) => {
      const year = (new Date(launch.launch_date_local)).getFullYear();

      if (arr.indexOf(year) === -1) {
        arr.push(year);
      }

      return arr;
    }, []);

    return years.sort().map((year, i) => (
      <option key={i} value={year}>
        {year}
      </option>
    ));
  };

  render() {
    return (
      <ul className="filterable-list-filters">
        <li>
          <label htmlFor="filter-keywords">Keywords</label>
          <input
            id="filter-keywords"
            name="keywords"
            type="text"
            placeholder="e.g. Falcon"
            onChange={this.onInputChange}
          />
        </li>
        <li>
          <label htmlFor="filter-launch-pad">Launch Pad</label>
          <select
            id="filter-launch-pad"
            name="launchPad"
            onChange={this.onInputChange}>
            <option value="">Any</option>
            {this.getLaunchPadOptions()}
          </select>
        </li>
        <li>
          <label htmlFor="filter-min-year">Min Year</label>
          <select
            id="filter-min-year"
            name="minYear"
            onChange={this.onInputChange}>
            <option value="">Any</option>
            {this.getYearOptions()}
          </select>
        </li>
        <li>
          <label htmlFor="filter-max-year">Max Year</label>
          <select
            id="filter-max-year"
            name="maxYear"
            onChange={this.onInputChange}>
            <option value="">Any</option>
            {this.getYearOptions()}
          </select>
        </li>
        <li>
          <button
            disabled={this.state.isFilterDisabled}
            onClick={this.props.onFilter}>
            Apply
          </button>
        </li>
      </ul>
    );
  }
}

Filters.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.object),
  launchPads: PropTypes.arrayOf(PropTypes.object),
  onInputChange: PropTypes.func,
  onFilter: PropTypes.func,
};

export default Filters;
