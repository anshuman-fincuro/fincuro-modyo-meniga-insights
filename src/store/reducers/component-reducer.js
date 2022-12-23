import TYPES from '../types';

// Initial State
const initialState = {
  accountsData: [],
  categoriesData: [],
  merchantData: [],
  planningData: [],
  spendingData: [],
  budgetData: [],
  expenseData: [],
  feedData:[],
  billData:[],
  carbonData:[],
};

const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.COMPONENT.ON_ACCOUNTS_SUCCESS:
      return {
        accountsData: action.payload.accountsData,
      };
    case TYPES.COMPONENT.ON_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesData: action.payload.categoriesData,
      };
    case TYPES.COMPONENT.ON_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchantData: action.payload.merchantData,
      };
    case TYPES.COMPONENT.ON_PLANNING_SUCCESS:
      return {
        ...state,
        planningData: action.payload.planningData,
      };
    case TYPES.COMPONENT.ON_SPENDING_SUCCESS:
      return {
        ...state,
        spendingData: action.payload.spendingData,
      };
      case TYPES.COMPONENT.ON_BUDGET_SUCCESS:
      return {
        ...state,
        budgetData: action.payload.budgetData,
      };
      case TYPES.COMPONENT.ON_EXPENSE_SUCCESS:
      return {
        ...state,
        expenseData: action.payload.expenseData,
      };
      case TYPES.COMPONENT.ON_FEED_SUCCESS:
      return {
        ...state,
        feedData: action.payload.feedData,
      };
      case TYPES.COMPONENT.ON_BILL_SUCCESS:
      return {
        ...state,
        billData: action.payload.billData,
      };
      case TYPES.COMPONENT.ON_CARBON_SUCCESS:
        return {
          ...state,
          carbonData: action.payload.carbonData,
        };
    default:
      return {
        ...state,
      };
  }
};

export default componentReducer;
