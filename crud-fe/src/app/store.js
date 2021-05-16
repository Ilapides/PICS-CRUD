import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import schoolsReducer from '../features/schools/schoolsSlice';
import studentsReducer from '../features/students/studentsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    schools: schoolsReducer,
    students: studentsReducer,
  },
});
