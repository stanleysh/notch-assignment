import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '../stories/Button';
import { applyFilter, clearFilter } from '../app/actions/orders'; 

const OrdersFilter = ({ orders, dispatchApplyFilter, dispatchClearFilter }) => {
  const [filterColumn, setFilterColumn] = useState('');
  const [filterOptions, setFilterOptions] = useState('');
  const [filterBy, setFilterBy] = useState('');

  // Sets filter type
  const handleChange = (event) => {
    setFilterColumn(event.target.value);
    setFilterBy('');
    const uniqueOptions = [...new Set(orders.map(order => order[event.target.value]))];
    setFilterOptions(uniqueOptions);
  }

  // Sets the actual filter
  const handleChange2 = (event) => {
    if (event.target.value === 'No Date') {
      setFilterBy(event.target.value);
      const filteredData = orders.filter(order => {
        return order[filterColumn] === ''
      })
      return dispatchApplyFilter(filteredData);
    }
    setFilterBy(event.target.value);
    const filteredData = orders.filter(order => {
      return order[filterColumn] === event.target.value
    })
    return dispatchApplyFilter(filteredData)
  }

  const resetFilter = () => {
    setFilterColumn('');
    setFilterOptions('');
    setFilterBy('');
    return dispatchClearFilter();
  }

  return (
    <div className="order-filter">
      <FormControl className='filters'>
        <InputLabel id="filter-Column">Filter Column</InputLabel>
        <Select
          id="filter-type"
          value={filterColumn}
          onChange={handleChange}
        >
          <MenuItem value={'orderBuyerStatus'}>Status</MenuItem>
          <MenuItem value={'deliveryDay'}>Delivery Date</MenuItem>
          <MenuItem value={'vendorName'}>Supplier</MenuItem>
        </Select>
      </FormControl>
      {/* Only when filter by is set will the options show up */}
      {filterColumn && 
        <FormControl className='filters'>
          <InputLabel id="filter-select">Data</InputLabel>
          <Select
            id="filter-data"
            value={filterBy}
            onChange={handleChange2}
          >
            {filterOptions && filterOptions.map(option => 
              <MenuItem value={option ? option : 'No Date'} key={option}>{option ? option : 'No Date'}</MenuItem>)
            }
          </Select>
        </FormControl> }
      {filterColumn && <Button className='storybook-button reset' label='X Reset Filters' onClick={resetFilter}/>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  orders: state.orders.data,
})

export default connect(mapStateToProps, {
  dispatchApplyFilter: applyFilter,
  dispatchClearFilter: clearFilter,
})(OrdersFilter);