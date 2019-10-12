import { createSlice } from "redux-starter-kit";

const unitsSlice = createSlice({
  slice: "units",
  initialState: "lbs",
  reducers: {
    changeToLbs(state, action) {
      state = "lbs";
      return state;
    },
    changeToKg(state, action) {
      state = "kg";
      return state;
    }
  }
});

export const { changeToLbs, changeToKg } = unitsSlice.actions;
export default unitsSlice.reducer;
