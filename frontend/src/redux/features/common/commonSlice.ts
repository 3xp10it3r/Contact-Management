import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrentModalEnum } from "../../../utils/constants";

export interface CommonState {
  value: number;
  search: string;
  currentModal: CurrentModalEnum | null;
  currentId: string | null;
}

const initialState: CommonState = {
  value: 0,
  search: "",
  currentModal: null,
  currentId: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSearchString: (
      state,
      action: PayloadAction<{ searchString: string }>
    ) => {
      state.search = action.payload.searchString;
    },

    setCurrentModal: (
      state,
      action: PayloadAction<{
        modalName: CurrentModalEnum | null;
        currentId?: string | null;
      }>
    ) => {
      state.currentModal = action.payload.modalName;

      state.currentId =
        action.payload.modalName === null ||
        action.payload?.currentId === undefined
          ? null
          : action.payload.currentId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchString, setCurrentModal } = commonSlice.actions;

export default commonSlice.reducer;
