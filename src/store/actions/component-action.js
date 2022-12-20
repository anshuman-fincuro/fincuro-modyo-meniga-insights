import axios from 'axios';
import TYPES from '../types';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export function getToDate(){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
  }

  export function getFromDate(){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() -2;
    let year = newDate.getFullYear();
    return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
    }
export const setAccountsData = (token) => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/accounts?token=Bearer ${token}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TYPES.COMPONENT.ON_ACCOUNTS_SUCCESS,
            payload:  { accountsData: response.data.data },
          });
        }
      });
  };
};

export const setCategoriesData = (token) => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/categories?token=Bearer ${token}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TYPES.COMPONENT.ON_CATEGORIES_SUCCESS,
            payload: { categoriesData: response.data.data },
          });
        }
      });
  };
};

export const setPlanningData = (token) => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/budgets?token=Bearer ${token}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TYPES.COMPONENT.ON_PLANNING_SUCCESS,
            payload: { planningData: response.data.data },
          });
        }
      });
  };
};

export const setSpendingData = (token) => {
  return (dispatch) => {
    axios
      .get(`${API_URL}/transactions?token=Bearer ${token}&periodFrom=2021-12-02&periodTo=2022-12-01`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TYPES.COMPONENT.ON_SPENDING_SUCCESS,
            payload: { spendingData: response.data.data },
          });
        }
      });
  };
};

export const setMerchantData = (token) => {
  return (dispatch) => {
    axios.get(`${API_URL}/merchants?token=Bearer ${token}`).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: TYPES.COMPONENT.ON_MERCHANTS_SUCCESS,
          payload: { merchantData: response.data.data },
        });
      }
    });
  };
};

export const setBudgetData = (token,dateValue = {}) => {
  let param = {
    "transactionFilter": {
      "periodFrom": dateValue.periodFrom,
      "periodTo": dateValue.periodTo,
      "hideExcluded": true
  },
  "options": {
      "timeResolution": "Month",
      "overTime": true,
      "includeTransactionIds": true
  },
  "seriesSelectors": [
      {
          "filter": {
              "categoryTypes": [
                  "Expenses"
              ]
          }
      },
      {
          "filter": {
              "categoryTypes": [
                  "Income"
              ]
          }
      }
  ]
  }
  return (dispatch) => {
    axios.post(`${API_URL}/transactions/series?token=Bearer ${token}`,param).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: TYPES.COMPONENT.ON_BUDGET_SUCCESS,
          payload: { budgetData: response.data.data},
        });
      }
      
    });
  };
};

export const setExpenseData = (token,dateValue = {}) => {
  let param = {  "transactionFilter": {
    "periodFrom": "2022-01-01",
    "periodTo": "2022-12-31",
    "hideExcluded": true
},
"options": {
    "timeResolution": "Month",
    "overTime": true,
    "type": "yearSeries",
    "includeCarbonFootprint": true
},
"seriesSelectors": [
    {
        "filter": {
            "categoryIds": [
                37
            ]
        }
    },
    {
        "filter": {
            "merchantIds": [
                36
            ],
            "useParentMerchantIds": true
        }
    }
] }
  return (dispatch) => {
    axios.post(`${API_URL}/transactions/series?token=Bearer ${token}`,param).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: TYPES.COMPONENT.ON_EXPENSE_SUCCESS,
          payload: { expenseData: response.data.data},
        });
      }
    });
  };
};