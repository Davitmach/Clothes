import { combineReducers } from "redux";
 function OpenMenuRed(state = {open:false}, action) {
    switch(action.type) {
      case 'Open':
        return {...state, open: action.payload};
      default:
        return state;
    }
  }
  function UserFuncHidElRed(state = {open:false},action) {
    switch(action.type) {
      case 'Hide':
        return {...state, open: true};
        case 'Visible':
          return {...state, open: false};
      default:
        return state;
    }
  }
function LoggedRed(state = {regged:false},action) {
  switch(action.type) {
    case 'Logged':
      return {...state, regged: true};
      case 'Logout':
        return {...state, regged: false};
    default:
      return state;
  }
}
function SubmitUserInfo(state = {submited:false},action) {
  switch(action.type) {
    case 'Submited':
      return {...state,submited:true};
      case 'NoSubmit':
        return {...state,submited:false};
        default:
          return state;
  }
}
function FullAddress(state = {full:false},action) {
  switch(action.type) {
    case 'Full':
      return {...state,full:true};
      case 'NoFull':
        return {...state,full:false};
        default:
          return state;
  }
}

function CheckBan(state = {ban:false},action) {
  switch(action.type) {
    case 'ban':
      return {...state,ban:true};
      case 'unban':
        return {...state,ban:false};
        default:
          return state;
  }
}

  export const reducer = combineReducers({
menu:OpenMenuRed,
userHidEl:UserFuncHidElRed,
regged:LoggedRed,
userInfoSubmit: SubmitUserInfo,
fullAddress:FullAddress,
checkBan:CheckBan,




  })