import axios from 'axios';
import { 
  GET_DATA,
  APPLY_FILTER,
  CLEAR_FILTER,
} from './types';

// Import data for heroku in case it has a problem
// import data from '../../data.json';

// Loads data from API, should only be called once
export const loadData = () => async (dispatch) => {
  try {
    // Normally would call API, but Heroku is having issues making calls to http links
    const response = await axios.post('api.interview.staging.foodieorders.com/v3/orders/search', {});

    // Using import data to make it workable on heroku
    // const importedData = data;
    if (response.data) {
      dispatch({
        type: GET_DATA,
        payload: response.data,
        // payload: importedData,
      })
    }
  } catch (err) {
    console.log(err, 'data load error');
  }
}

// Applies filter, received data from the filter component
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

// Clears filter
export const clearFilter = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_FILTER,
    })
  } catch (err) {
    console.log(err, 'filter clear issue')
  }
}