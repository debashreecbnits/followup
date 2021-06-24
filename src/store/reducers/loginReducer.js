import * as ACT from '../actions/actionTypes';
const intialState = {
   userDetails: {},
   loginDetails: {},
   error: '',
   signupDetails: [],
   strogedetails: {},
   loc: [],
   orientation:''
  };

  export default function(state = intialState, action) {
    switch (action.type) {
      
      case ACT.LOGIN:
      return {
        ...state,
        loginDetails: action.payload,
        error: action.payload.response,
      };
      case ACT.SIGNUP:
        return {
          ...state,
          userDetails: action.payload,
          error: action.payload.response,
        };
        case ACT.LOGOUT: 
        return {
          userDetails: {},
          loginDetails: {},
          error: '',
          signupDetails: [],
      }   
      case ACT.STORAGETOTOKEN : 
        return {
          ...state,
         strogedetails: action.payload
        }

        case ACT.ORIENTATIONDATA: 
        return{
          ...state,
          orientation : action.payload
        }

        case ACT.UPDATEUSER : 
        return {
          ...state,
         updatedUserDetails: action.payload
        }
        
      default:
        return state;
    }
  }