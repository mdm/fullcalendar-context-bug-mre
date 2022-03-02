import { EventInput } from '@fullcalendar/common';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface EventsState {
  counter: number;
  data: EventInput[];
}

const now = new Date();
const DATE_VOLATILE = `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, '0')}-${`${now.getDate()}`.padStart(2, '0')}`
const DATE_NORMAL = `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, '0')}-${`${(now.getDate() + 2) % 28 + 1}`.padStart(2, '0')}`

const initialState: EventsState = {
  counter: 0,
  data: [
    { title: 'volatile 0', date: DATE_VOLATILE },
    { title: 'drag me', date: DATE_NORMAL },
  ],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateVolatile: (state) => {
      state.counter += 1;
      state.data[0] = { title: `volatile ${state.counter}`, date: DATE_VOLATILE };
    },
  },
});

export const selectEvents = (state: RootState) => state.events.data;

export const { updateVolatile } = eventsSlice.actions;

export default eventsSlice.reducer;
