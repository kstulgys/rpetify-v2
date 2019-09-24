import { combineReducers } from "redux-starter-kit";
import workouts from "features/workouts/slice";
import oneRepMax from "features/one-rep-max/slice";
import warmups from "features/warmups/slice";
import variants from "features/variants/slice";

const rootReducer = combineReducers({
  workouts,
  oneRepMax,
  warmups,
  variants
});

export default rootReducer;
