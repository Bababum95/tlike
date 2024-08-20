import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { InitDataParsed } from "@telegram-apps/sdk-react";

import { UserStateType } from "@types";
import { RootState } from "@/core/store";
import { api } from "@/core/api";

const initialState: UserStateType = {
  status: "idle",
  error: null,
  balances: {
    tlike: 0,
    tlove: 0,
  },
  mining_speed: {
    tlike: 0,
    tlove: 0,
  },
  token: "",
  type: "old",
  language: "en",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data: InitDataParsed, { rejectWithValue }) => {
    try {
      const response = await api.post("telegram/front", data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const connectWallet = createAsyncThunk(
  "user/connectWallet",
  async (data: { wallet: string }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.put(
        "wallet/link",
        {
          wallet: data.wallet,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchReferral = createAsyncThunk(
  "user/fetchReferral",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.get("/referral/notifications", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getNFT = createAsyncThunk(
  "user/getNFT",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.get("/nft/check", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
    setOld: (state) => {
      state.type = "old";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.balances = action.payload.balances;
        state.mining_speed = action.payload.mining_speed;
        state.token = action.payload.token;
        state.type = action.payload.type;
        state.language = action.payload.language;
        if (action.payload.photo) state.photo = action.payload.photo;
        state.status = "successed";
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        if (action.payload && action.payload.message) {
          state.error = action.payload.message;
        }
        console.log(action.payload);
      })
      .addCase(connectWallet.pending, (state, action) => {
        state.wallet = action.meta.arg.wallet;
      })
      .addCase(connectWallet.rejected, (_, action) => {
        console.log(action.payload);
      });
  },
});

export default userSlice.reducer;
export const { setWallet, setOld } = userSlice.actions;
