import { configureStore } from '@reduxjs/toolkit';
import jobSlice from '../features/jobSlice'; 

export default configureStore({
  reducer: {
    jobs: jobSlice, 
  },
});
