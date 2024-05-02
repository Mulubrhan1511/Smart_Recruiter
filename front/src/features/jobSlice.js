import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  filteredJobs: [],
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  return axios.get('/api/jobs').then((response) => response.data);
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.filteredJobs = action.payload;
    });
  },
  reducers: {
    filterJobs: (state, action) => {
      const { titles, types } = action.payload;
      
      if ((!titles || titles.length === 0) && (!types || types.length === 0)) {
        state.filteredJobs = state.jobs;
        return;
      }

      state.filteredJobs = state.jobs.filter(job => {
        const titleCondition = !titles || titles.length === 0 || titles.includes(job.title);
        const typeCondition = !types || types.length === 0 || types.includes(job.type);
        return titleCondition && typeCondition;
      });
    },
  },
});

export const { filterJobs } = jobSlice.actions;
export default jobSlice.reducer;
