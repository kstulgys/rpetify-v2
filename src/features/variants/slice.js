import { createSlice } from "redux-starter-kit";
import uuid from "uuid/v4";

const variantsSlice = createSlice({
  slice: "variants",
  initialState: { isActive: false, variants: [...getDefaultVariants()] },
  reducers: {
    changeVariantOneRepMax(state, action) {
      const { id, name, value } = action.payload;
      const variant = state.variants.find(v => v.id === id);
      variant[name] = value;
    },
    addVariant(state, action) {
      state.variants.push({ ...action.payload, id: uuid() });
    },
    removeVariant(state, action) {
      const { id } = action.payload;
      state.variants = state.variants.filter(v => v.id !== id);
    },
    setActiveTrue(state) {
      state.isActive = true;
    },
    setActiveFalse(state) {
      state.isActive = false;
    }
  }
});

export const {
  changeVariantOneRepMax,
  addVariant,
  removeVariant,
  setActiveTrue,
  setActiveFalse
} = variantsSlice.actions;
export default variantsSlice.reducer;

function getDefaultVariants() {
  return [
    {
      id: uuid(),
      name: "Front-Squat",
      main: "SQ",
      percent: 80,
      oneRM: null
    },
    {
      id: uuid(),
      name: "DL-mid-shin",
      main: "DL",
      percent: 105,
      oneRM: null
    }
  ];
}
