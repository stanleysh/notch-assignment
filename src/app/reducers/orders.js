import { GET_DATA, APPLY_FILTER, CLEAR_FILTER } from '../actions/types';

const initialState = {
  data: [],
  filteredData: [],
};

const orders = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        data: payload.data,
        filteredData: payload.data,
      }
    case APPLY_FILTER:
      return {
        ...state,
        filteredData: payload,
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filteredData: state.data,
      }
    default:
      return state;
  }
}

export default orders;