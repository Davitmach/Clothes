export function CreateStore(reducer, initialState = { open: false }) {
    var state = reducer(initialState, { type: '__InitialState__' });
    var subscribers = [];
  
    return {
      dispatch(action) {
        state = reducer(state, action);
        subscribers.forEach((subscriber) => subscriber());
      },
      subscribe(callback) {
        subscribers.push(callback);
      },
      getState() {
        return state;
      }
    }
  }
  