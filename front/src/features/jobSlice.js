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
      const { experience, types, date } = action.payload;

      if ((!experience || experience.length === 0) && (!types || types.length === 0) && (!date || date.length === 0)) {
        state.filteredJobs = state.jobs;
        return;
      }

      state.filteredJobs = state.jobs.filter(job => {
        const experienceCondition = !experience || experience.length === 0 || experience.includes(job.experience);
        const typeCondition = !types || types.length === 0 || types.includes(job.type);
        const dateCondition = !date || date.length === 0 || dateIncludes(job.date, date);

        return experienceCondition && typeCondition && dateCondition;
      });
    },
  },
});


const dateIncludes = (jobDate, selectedDates) => {
  const today = new Date();
  const thisWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const jobDateTime = new Date(jobDate).getTime();

  if (selectedDates.includes('Today')) {
    return jobDateTime >= today.setHours(0, 0, 0, 0);
  } else if (selectedDates.includes('This Week')) {
    return jobDateTime >= thisWeekStart.getTime();
  } else if (selectedDates.includes('This Month')) {
    return jobDateTime >= thisMonthStart.getTime() && jobDateTime <= today.getTime();
  }

  return false;
};


export const { filterJobs } = jobSlice.actions;
export default jobSlice.reducer;
