import axios from 'axios';

import { 
  GET_DATA,
  APPLY_FILTER,
  CLEAR_FILTER,
} from './types';

import data from '../../data.json';

export const loadData = () => async (dispatch) => {
  try {
    // Normally would call API, but Heroku is having issues making calls to http links
    // const rawData = await axios.post('http://api.interview.staging.foodieorders.com/v3/orders/search', {});

    // Using import data to make it workable on heroku
    const importedData = data;
    if (importedData) {
      dispatch({
        type: GET_DATA,
        // payload: rawData.data,
        payload: importedData,
      })
    }
  } catch (err) {
    console.log(err, 'data load error');
  }
}

export const applyFilter = (filteredData) => async (dispatch) => {
  try {
    dispatch({
      type: APPLY_FILTER,
      payload: filteredData,
    })
  } catch (err) {
    console.log(err, 'filter error')
  }
}

export const clearFilter = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_FILTER,
    })
  } catch (err) {
    console.log(err, 'filter clear issue')
  }
}