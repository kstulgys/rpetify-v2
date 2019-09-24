import { configureStore } from "redux-starter-kit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState()
});

store.subscribe(() => {
  saveState(store.getState());
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

function saveState(state) {
  let stringifiedState = JSON.stringify(state);
  localStorage.setItem("state", stringifiedState);
}

function loadState() {
  let json = localStorage.getItem("state") || "{}";
  let state = JSON.parse(json);

  if (state) {
    return state;
  } else {
    return undefined; // To use the defaults in the reducers
  }
}

export default store;
