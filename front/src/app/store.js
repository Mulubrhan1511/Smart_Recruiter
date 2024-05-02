import { configureStore } from '@reduxjs/toolkit';
import jobSlice from '../features/jobSlice'; // Import the jobSlice reducer

export default configureStore({
  reducer: {
    jobs: jobSlice, // Add the jobSlice reducer to the store  
  },
});
