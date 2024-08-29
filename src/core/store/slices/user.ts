import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { InitDataParsed } from "@telegram-apps/sdk-react";

import type { UserStateType } from "@types";
import { RootState } from "@/core/store";
import { api } from "@/core/api";

const initialState: UserStateType = {
  status: "idle",
  error: null,
  inventory: [],
  missions: [],
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
  nfts: [],
  upgrades: [],
  referrals: [],
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
        headers: { "x-auth-token": token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const referralActivate = createAsyncThunk(
  "user/referralActivate",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("/referral/activate", {
        headers: { "x-auth-token": token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      if (err instanceof Error) {
        const errorWithResponse = err as {
          response?: { data?: { message?: string } };
        };

        if (errorWithResponse.response?.data?.message) {
          return rejectWithValue(errorWithResponse.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
    }
  }
);

export const referralStat = createAsyncThunk(
  "user/referralStat",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.get("/referral/stat", {
        headers: { "x-auth-token": token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getMissions = createAsyncThunk(
  "user/getMissions",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.get("/missions", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const missionActivate = createAsyncThunk(
  "user/missionActivate",
  async ({ id }: { id: number }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;

    try {
      const response = await api.post(
        "/missions",
        { mission_id: id },
        { headers: { "x-auth-token": token } }
      );
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
        headers: { "x-auth-token": token },
      });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getInventory = createAsyncThunk(
  "user/getInventory",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    const headers = { "x-auth-token": token };

    try {
      const responses = await Promise.all([
        api.get("/inventory", { headers }),
        api.get("/user/inventory", { headers }),
      ]);
      return {
        upgrades: responses[0].data,
        userUpgraded: responses[1].data.inventory,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const byUpgrade = createAsyncThunk(
  "user/byUpgrade",
  async ({ id }: { id: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.post(
        "/inventory",
        { inventory_id: id },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        const errorWithResponse = err as {
          response?: { data?: { message?: string } };
        };

        if (errorWithResponse.response?.data?.message) {
          return rejectWithValue(errorWithResponse.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
    }
  }
);

export const transferLove = createAsyncThunk(
  "user/transferLove",
  async (
    data: { currency: string; amount: string; receiver: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.post("/transfer/internal", data, {
        headers: { "x-auth-token": token },
      });
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        const errorWithResponse = err as {
          response?: { data?: { message?: string } };
        };

        if (errorWithResponse.response?.data?.message) {
          return rejectWithValue(errorWithResponse.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
    }
  }
);
export const transferLike = createAsyncThunk(
  "user/transferLike",
  async (
    data: { currency: string; amount: string; receiver: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { token } = state.user;
    try {
      const response = await api.post("/transfer/onchain", data, {
        headers: { "x-auth-token": token },
      });
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        const errorWithResponse = err as {
          response?: { data?: { message?: string } };
        };

        if (errorWithResponse.response?.data?.message) {
          return rejectWithValue(errorWithResponse.response.data.message);
        }

        return rejectWithValue(err.message);
      }

      return rejectWithValue("Error!");
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
    addBalance: (
      state,
      action: PayloadAction<{ amount: number; currency: "TLove" | "TLike" }>
    ) => {
      const key = action.payload.currency.toLowerCase() as "tlove" | "tlike";
      state.balances[key] += action.payload.amount;
    },
    changeStatusNFT: (state, action) => {
      state.nfts.forEach((nft, index) => {
        if (nft.nft_id === action.payload.nft_id) {
          state.nfts[index].active = action.payload.active;
        }
      });
    },
    endMissionLoading: (state, action) => {
      state.missions.forEach((mission, index) => {
        if (mission.id === action.payload.id) {
          state.missions[index].loading = false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(missionActivate.pending, (state, action) => {
        state.missions.forEach((mission, index) => {
          if (mission.id === action.meta.arg.id) {
            state.missions[index].loading = true;
          }
        });
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
      })
      .addCase(getMissions.fulfilled, (state, action) => {
        state.missions = action.payload;
      })
      .addCase(getNFT.fulfilled, (state, action) => {
        state.nfts = action.payload;
      })
      .addCase(missionActivate.fulfilled, (state, action) => {
        if (action.payload.mission_activated) {
          state.missions.forEach((mission, index) => {
            if (mission.id === action.meta.arg.id) {
              state.missions[index].mission_actived = true;
            }
          });
          state.balances.tlove =
            state.balances.tlove + action.payload.award.amount;
        }
      })
      .addCase(fetchReferral.fulfilled, (state, action) => {
        if (action.payload.status === "non-used") {
          state.referal = action.payload;
        }
      })
      .addCase(referralActivate.fulfilled, (state) => {
        state.balances.tlove += state.referal?.amount || 0;
        state.referal = undefined;
      })
      .addCase(getInventory.fulfilled, (state, action) => {
        action.payload.upgrades.forEach(
          (upgrade: {
            id: 1 | 2 | 3 | 4;
            costs: string;
            increase_value: string;
          }) => {
            state.upgrades.push({
              id: upgrade.id,
              costs: Number(upgrade.costs),
              value: Number(upgrade.increase_value),
              count: 0,
            });
          }
        );
        action.payload.userUpgraded.forEach(
          (upgrade: { item_id?: number; count?: string }) => {
            if (upgrade.item_id && upgrade.count) {
              state.upgrades.forEach((u, i) => {
                if (u.id === upgrade.item_id) {
                  state.upgrades[i].count += Number(upgrade.count);
                }
              });
            }
          }
        );
      })
      .addCase(byUpgrade.fulfilled, (state, action) => {
        state.balances.tlike -= Number(action.payload.inventory_info?.costs);
        if (action.payload.inventory_info?.increase_value) {
          state.mining_speed.tlove +=
            Number(action.payload.inventory_info.increase_value) / 3600;
        }
        state.upgrades.forEach((u, i) => {
          if (u.id === action.payload.inventory_info?.id) {
            state.upgrades[i].count += 1;
          }
        });
      })
      .addCase(referralStat.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.referrals = action.payload;
        }
      })
      .addCase(transferLove.fulfilled, (state, action) => {
        state.balances.tlove -= Number(action.meta.arg.amount);
      })
      .addCase(transferLike.fulfilled, (state, action) => {
        state.balances.tlike -= Number(action.meta.arg.amount);
      });
  },
});

export default userSlice.reducer;
export const {
  setWallet,
  setOld,
  addBalance,
  changeStatusNFT,
  endMissionLoading,
} = userSlice.actions;
