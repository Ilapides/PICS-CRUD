import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// first create the thunk
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async studentAdd => {
      console.log("studentAdd", studentAdd)
      const resp = await fetch(`http://localhost:5000/`)
  }
)
export const editStudent = createAsyncThunk(
  'students/editStudent',
  async studentEdit => {
      console.log("studentEdit",studentEdit)
      const resp = await fetch(`http://localhost:5000/students/${studentEdit.studentID}`, {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json'
          },
          body: JSON.stringify(studentEdit)
      })
      const data = await resp.json()
      console.log("data", data)
      return data;
  }
)
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async studentDelete => {
    console.log("in deleteStudent")
    const resp = await fetch(`http://localhost:5000/students/${studentDelete.studentID}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(studentDelete)
    })
    console.log("in deleteStudent after fetch")
    const data = await resp.json()
    return data.data
  }
)
export const addNewStudent = createAsyncThunk(
  'students/addNewStudent',
  async postStudent => {
    const resp = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json'
      },
      body: JSON.stringify(postStudent)
    })
    const data = await resp.json()
    if (!data.status) {
      alert(data.message.errors[0].message)
    }
    return data.data
  }
)
export const fetchStudents = createAsyncThunk(
    'students/fetchAll',
    async () => {
        const response = await fetch('http://localhost:5000/students').then(r=>r.json())
        // console.log("Response from fetchStudents", response);
        return response;
    }

)
// then handle actions in reducers
export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: []
  },
  reducers: {
  },
  // add reducers for additional action types here, and handle loading state as needed
  extraReducers: {
    [fetchStudents.pending]: (state, action) => {
        state.status = 'loading'
    },
    [fetchStudents.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        if (state.students.length == 0) {
            state.students = state.students.concat(action.payload)
        }
    },
    [fetchStudents.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    },
    [addNewStudent.fulfilled]: (state, action) => {
      if (action.payload === undefined) {
        console.log("Error occured!")
      } else {
        state.students.push(action.payload)
      }
    },
    [deleteStudent.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      /*
      state.students.filter((student)=>student.id !== action.payload.studentID);
      */
     console.log(action.payload)
      const { studentID } = action.payload;
      const index = state.students.findIndex((student) => student.studentID === studentID);
      state.students.splice(index, 1);
    },
    [editStudent.pending]: (state, action) => {
        state.status = 'loading'
    },
    [editStudent.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        console.log("editStudent action.payload", action.payload)
        const { studentID } = action.payload;
        const index = state.students.findIndex(student=>student.studentID === studentID);
        console.log(index)
        // state.campuses.splice(index, 1)
        // state.campuses.push(action.payload.campus)
        //  state.campuses = action.payload
        state.students[index] = action.payload;
    }
  }
});

// export const {  } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/* export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
}; */

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStudents = state => state.students;
export const wholeState = state => state;

export default studentsSlice.reducer;
