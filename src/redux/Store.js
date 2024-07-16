export function CreateStore(reducer,initalState = {open:false}) {
    var state = reducer(initalState, { type: '__InitialState__' });
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
  