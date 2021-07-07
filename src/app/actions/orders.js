import axios from 'axios';

import { 
  GET_DATA,
  APPLY_FILTER,
  CLEAR_FILTER,
} from './types';

export const loadData = () => async (dispatch) => {
  try {
    const rawData = await axios.post('http://api.interview.staging.foodieorders.com/v3/orders/search', {});
    if (rawData.data) {
      dispatch({
        type: GET_DATA,
        payload: rawData.data,
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