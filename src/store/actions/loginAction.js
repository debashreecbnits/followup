import * as ACT from './actionTypes';
import Api from '../../Api/Api';

export const signup = userDetails => async dispatch => {
    try {  
        const response = await Api.postApi('signUp', userDetails);
        if (response) {
          dispatch({type: ACT.SIGNUP, payload: response});  
        }
        } catch (error) {
        console.log(error);
        dispatch({type: ACT.SIGNUP, payload: {response: error}});
        }
  };

  export const login = userDetails => async dispatch => {
      console.log("action", userDetails);
      
    try {
      const response = await Api.postApi('login', userDetails);
      if (response) {
          console.log("login response",response);
        dispatch({type: ACT.LOGIN, payload: {...response}});
      }
    } catch (error) {
      console.log(error);
      dispatch({type: ACT.LOGIN, payload: {response: error}});
    }
  };

  export const logout = () => dispatch => { 
  dispatch({type: ACT.LOGOUT});
};

export const storageToLogin = data => dispatch => { 
  dispatch({type: ACT.STORAGETOTOKEN, payload: data});
};
export const updateUserFunc = data => dispatch => { 
  dispatch({type: ACT.UPDATEUSER, payload: data});
};
export const orientationData = data => dispatch => { 
  console.log ('dispatch', data)
  dispatch({type: ACT.ORIENTATIONDATA, payload: data});
};