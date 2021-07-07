import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '../stories/Button';
import { applyFilter, clearFilter } from '../app/actions/orders'; 

const OrdersFilter = ({ orders, dispatchApplyFilter, dispatchClearFilter }) => {
  const [filterColumn, setFilterColumn] = useState('');
  const [filterOptions, setFilterOptions] = useState('all');
  const [filterBy, setFilterBy] = useState('');

  // Sets filter column
  const handleChange = (event) => {
    setFilterColumn(event.target.value);
    setFilterBy('all');
    const uniqueOptions = [...new Set(orders.map(order => order[event.target.value]))];
    setFilterOptions(uniqueOptions);
  }

  // Sets the filter
  const handleChange2 = (event) => {
    let filteredData;
    setFilterBy(event.target.value);
    if (event.target.value === 'No Date') {
      filteredData = orders.filter(order => {
        return order[filterColumn] === ''
      })
      return dispatchApplyFilter(filteredData);
    }
    if (event.target.value === 'all') {
      return dispatchApplyFilter(orders);
    }
    setFilterBy(event.target.value);
    filteredData = orders.filter(order => {
      return order[filterColumn] === event.target.value
    })
    return dispatchApplyFilter(filteredData)
  }

  // Resets and clears filter
  const resetFilter = () => {
    setFilterColumn('');
    setFilterOptions('');
    setFilterBy('');
    return dispatchClearFilter();
  }

  // Translates the all selector to more friendly UI
  const translateAllSelect = () => {
    if (filterColumn === 'orderBuyerStatus')
      return 'Status'
    if (filterColumn === 'deliveryDay')
      return 'Dates'
    if (filterColumn === 'vendorName')
      return 'Suppliers'
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
      {/* Only when filter column is set will the options show up */}
      {filterColumn && 
        <FormControl className='filters'>
          <InputLabel id="filter-select">Filter By</InputLabel>
          <Select
            id="filter-data"
            value={filterBy}
            onChange={handleChange2}
          >
            <MenuItem value={'all'}>All {`${translateAllSelect()}`}</MenuItem>
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