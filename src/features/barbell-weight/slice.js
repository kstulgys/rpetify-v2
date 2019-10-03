import { createSlice } from "redux-starter-kit";

const barbellWeightSlice = createSlice({
  slice: "barbellWeight",
  initialState: 45,
  reducers: {
    changeBarbellWeight(state, action) {
      state = action.payload.weight;
    }
  }
});

export const { changeBarbellWeight } = barbellWeightSlice.actions;
export default barbellWeightSlice.reducer;
