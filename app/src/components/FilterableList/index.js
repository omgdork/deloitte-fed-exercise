import React from 'react';
import Filters from './Filters';
import FilteredList from './FilteredList';

const FilterableList = (props) => {
  return (
    <div className="filterable-list">
      <Filters
        launchPads={props.launchPads}
        launches={props.launches}
        onInputChange={props.onInputChange}
        onFilter={props.onFilter}
      />
      <FilteredList items={props.items} />
    </div>
  );
};

export default FilterableList;
