import { createSlice } from "redux-starter-kit";

const unitsSlice = createSlice({
  slice: "units",
  initialState: "lbs",
  reducers: {
    changeToLbs(state, action) {
      return (state = "lbs");
    },
    changeToKg(state, action) {
      return (state = "kg");
    }
  }
});

export const { changeToLbs, changeToKg } = unitsSlice.actions;
export default unitsSlice.reducer;
