import { combineReducers } from "redux-starter-kit";
import workouts from "features/workouts/slice";
import oneRepMax from "features/one-rep-max/slice";
import warmups from "features/warmups/slice";
import variants from "features/variants/slice";
import units from "features/weight-units/slice";
import barbellWeight from "features/barbell-weight/slice";

const rootReducer = combineReducers({
  workouts,
  oneRepMax,
  warmups,
  variants,
  units,
  barbellWeight
});

export default rootReducer;
