import { combineReducers } from 'redux';
import actions from '../actions';

function todos(state = [], action) {
  switch (action.type) {
    case actions.ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case actions.TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

function visibilityFilter(state = actions.SHOW_ALL, action) {
  switch (action.type) {
    case actions.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default combineReducers({
  todos,
  visibilityFilter
});
