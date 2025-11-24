import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createUserApi, fetchUsersApi } from '@/utils/reqresApi';
import { buildCreatedUser, mapReqresUsersToDomain, User } from '@/utils/userHelpers';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UsersState {
  items: User[];
  status: RequestStatus;
  error: string | null;
  page: number;
  totalPages: number;
  createStatus: RequestStatus;
  createError: string | null;
  successMessage: string | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  createStatus: 'idle',
  createError: null,
  successMessage: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const data = await fetchUsersApi(page);
      return {
        users: mapReqresUsersToDomain(data.data),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado al obtener usuarios.';
      return rejectWithValue(message);
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (
    payload: { name: string; job: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await createUserApi(payload.name, payload.job);
      return buildCreatedUser(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado al crear el usuario.';
      return rejectWithValue(message);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearSuccess(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.users;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'No se pudo cargar la información de los usuarios.';
      })
      .addCase(createUser.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
        state.successMessage = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.items = [action.payload, ...state.items];
        state.successMessage = 'Usuario creado exitosamente';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = (action.payload as string) ?? 'No se pudo crear el usuario.';
      });
  },
});

export const { setPage, clearSuccess } = usersSlice.actions;
export default usersSlice.reducer;
