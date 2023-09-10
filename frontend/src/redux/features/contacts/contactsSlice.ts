import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosClient from "../../../lib/AxiosClient";
import { RowData } from "../../../utils/types";

export interface ContactsState {
  value: number;
  data: {
    name: string;
    email: string;
    phone: string;
    id: string;
    created_at: string;
  }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  editStatus: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactsState = {
  value: 0,
  data: [],
  status: "idle",
  deleteStatus: "idle",
  editStatus: "idle",
  error: null,
  addStatus: "idle",
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const response = await AxiosClient.get("/contacts");
    return response?.data?.contacts?.map((contact: any) => ({
      name: contact?.name || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
      created_at: contact?.created_at || "",
      id: contact?._id || "",
    }));
  }
);
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: string) => {
    const response = await AxiosClient.delete(`/delete/${id}`);
    return response?.data?._id;
  }
);

export const editContact = createAsyncThunk(
  "contact/editContact",
  async (values: RowData) => {
    const response = await AxiosClient.put(`/contact/${values?.id}`, {
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
    return response?.data;
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (values: RowData) => {
    const response = await AxiosClient.post(`/contact`, {
      name: values.name,
      email: values.email,
      phone: values.phone,
      created_at: new Date().toLocaleDateString(),
    });
    return response?.data;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(deleteContact.pending, (state, action) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data?.filter((ct) => ct.id !== action.payload);
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(editContact.pending, (state, action) => {
        state.editStatus = "loading";
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const idx = state.data?.findIndex(
          (ct) => ct.id === action.payload?._id
        );
        if (idx !== -1) {
          state.data[idx] = {
            ...state.data[idx],
            name: action.payload.name,
            email: action.payload.email,
            phone: action.payload.phone,
          };
        }
        state.editStatus = "succeeded";
      })
      .addCase(editContact.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message || "";
      });

    builder
      .addCase(addContact.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.data = [
          ...state.data,
          {
            name: action.payload.name,
            email: action.payload.email,
            phone: action.payload.phone,
            id: action.payload?._id,
            created_at: action.payload.created_at,
          },
        ];
        state.addStatus = "succeeded";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const {} = contactsSlice.actions;

export default contactsSlice.reducer;
