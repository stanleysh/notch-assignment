import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Button from '../stories/Button';
import OrdersPagination from './OrdersPagination';
import { loadData } from '../app/actions/orders';

const OrdersTable = ({ dispatchLoadData, filteredData }) => {
  const [displayedData, setDisplayedData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage)

  // Makes api call to get data
  useEffect(() => {
    dispatchLoadData();
  }, [dispatchLoadData])

  // Whenever filtered data comes in, set the display data, reset sort and page
  useEffect(() => {
    setDisplayedData(filteredData);
    setSortColumn('');
    setSortDirection('asc');
    setPage(0);
  }, [filteredData])

  // Handle pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table row component
  const OrderRow = (order) => {
    // Changes button color depending on status
    let buttonColor;
    switch (order.orderBuyerStatus) {
      case 'Paid':
        buttonColor = '#b0ddcb';
        break;
      case 'Delivered':
        buttonColor = '#c4c4fe';
        break;
      case 'Order Sent':
        buttonColor = '#caf4fe';
        break;
      case 'In Shopping Cart':
        buttonColor = '#fffee3';
        break;
      default:
        buttonColor = '#391279';
        break;
    }

    // Returns a order row with accompanying data
    return (
      <TableRow key={order.id}>
        <TableCell className='body-cell status-cell'>
          <Button label={order.orderBuyerStatus.toUpperCase()} backgroundColor={buttonColor} size='small' />
        </TableCell>
        <TableCell className='body-cell sm-shift'>{order.deliveryDay}</TableCell>
        <TableCell className='vendor-cell'>
          {order.vendorName}
          <div className='vendor-stickers'>
            {!order.isBYOS && <Button className="storybook-button market" label='MARKET' backgroundColor='black' size='small' primary={true} />}
            {order.isPendingVendorOnboarding && <Button label='1st' backgroundColor='#ffea6a' size='small' />}
          </div>
        </TableCell>
        <TableCell className='body-cell sm-shift'>{order.total > 0 ? `$${order.total}` : ''}</TableCell>
      </TableRow>
    )
  }

  // Function to handle sorting
  const handleSortClick = (column) => {
    // If any sort happens, bring to the first page of pagination
    let tempData;
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
    if (column === 'total') {
      // Have to use isAsc since the setSortDirection is not async and will not reflect accurately
      tempData = filteredData.sort((a, b) => {return a[column] - b[column]});
      if (!isAsc) {
        return setDisplayedData(tempData);
      } 
      return setDisplayedData(tempData.reverse());
    } else {
      tempData = filteredData.sort((a, b) => {
        if (a[column] < b[column]) {return -1}
        if (a[column] > b[column]) {return 1}
        return 0;
      })
      if (!isAsc) {
        return setDisplayedData(tempData);
      } 
      return setDisplayedData(tempData.reverse());
    }
  }

  return(
    <div className='orders-container'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='header-cell status-cell'>
                <div className='sort-button' onClick={() => handleSortClick('orderBuyerStatus')}>
                  STATUS 
                  {sortColumn !== 'orderBuyerStatus' ? <SortIcon /> : sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </div>
              </TableCell>
              <TableCell className='header-cell'>
                <div className='sort-button' onClick={() => handleSortClick('deliveryDay')}>
                  DELIVERY DATE
                  {sortColumn !== 'deliveryDay' ? <SortIcon /> : sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </div>
              </TableCell>
              <TableCell className='header-cell'>
                <div className='sort-button' onClick={() => handleSortClick('vendorName')}>
                  SUPPLIER 
                  {sortColumn !== 'vendorName' ? <SortIcon /> : sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </div>
              </TableCell>
              <TableCell className='header-cell'>
                <div className='sort-button' onClick={() => handleSortClick('total')}>
                  TOTAL 
                  {sortColumn !== 'total' ? <SortIcon /> : sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          {displayedData && 
          <TableBody>
            {(rowsPerPage > 0
              ? displayedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order => (OrderRow(order))))
              : displayedData.map((order => (OrderRow(order))))
            )}
            {/* Create empty rows so table stays the same size */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 59 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} 
          </TableBody>}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={displayedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={OrdersPagination}
              />
            </TableRow>
          </TableFooter>
        </Table> 
      </TableContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.orders.data,
  filteredData: state.orders.filteredData,
})

export default connect(mapStateToProps, {
  dispatchLoadData: loadData,
})(OrdersTable);