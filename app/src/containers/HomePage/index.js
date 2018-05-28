import React, { Component } from 'react';
import Header from '../../components/Header';
import FilterableList from '../../components/FilterableList';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      launchPads: [],
      launches: [],
      filters: {
        keywords: '',
        launchPad: '',
        minYear: 0,
        maxYear: 0,
      },
      filteredList: [],
    };
  }

  componentWillMount() {
    const baseURL = 'http://localhost:8001';

    fetch(`${baseURL}/launchpads`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          launchPads: data,
        });
      });

    fetch(`${baseURL}/launches`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          launches: data,
          filteredList: data,
        });
      });
  }

  onFilterInputChange = (field) => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...field,
      },
    });
  }

  getFilteredLaunches = () => {
    const filteredList = this.state.launches.filter((launch) => {
      const { keywords, launchPad, minYear, maxYear } = this.state.filters;
      const launchYear = (new Date(launch.launch_date_local)).getFullYear();

      return (!keywords || (keywords && !((launch.flight_number.toString().indexOf(keywords) === -1
        && launch.rocket.rocket_name.toLowerCase().indexOf(keywords.toLowerCase()) === -1
        && !launch.payloads.some((payload) => payload.payload_id.toLowerCase().indexOf(keywords.toLowerCase()) >= 0)))))
        && (!launchPad || (launchPad && !(launch.launch_site.site_id.toLowerCase() !== launchPad.toLowerCase())))
        && (!minYear || (minYear && !(launchYear < minYear)))
        && (!maxYear || (maxYear && !(launchYear > maxYear)));
    });

    this.setState({
      filteredList,
    });
  }

  scrollTo(id) {
    const elem = document.getElementById(id);
    window.scrollTo(0, elem.offsetTop);
  }

  render() {
    return (
      <div className="App">
        <Header
          title="Space Savvy"
          banner="Discover Space Missions"
          handleClick={this.scrollTo.bind(null, 'main')}
        />
        <main id="main" role="main">
          <FilterableList
            launchPads={this.state.launchPads}
            launches={this.state.launches}
            onInputChange={this.onFilterInputChange}
            onFilter={this.getFilteredLaunches}
            items={this.state.filteredList}
          />
        </main>
        <footer role="contentinfo">
          <p>Copyright &copy; {(new Date()).getFullYear()} Space Savvy</p>
          <button
            className="back-to-top"
            onClick={this.scrollTo.bind(null, 'main')}
          >
            Back to Top
          </button>
        </footer>
      </div>
    );
  }
}

export default Home;
