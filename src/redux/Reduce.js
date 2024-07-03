export function OpenMenuRed(state, action) {
    switch(action.type) {
      case 'Open':
        return {...state, open: action.payload};
      default:
        return state;
    }
  }