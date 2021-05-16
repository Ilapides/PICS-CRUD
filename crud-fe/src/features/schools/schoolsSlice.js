import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// first create the thunk
export const editCampus = createAsyncThunk(
    'schools/editCampus',
    async campusEdit => {
        console.log(campusEdit)
        const resp = await fetch(`http://localhost:5000/campuses/${campusEdit.campusID}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(campusEdit)
        })
        const data = await resp.json()
        console.log("data", data)
        return data;
    }
)
export const deleteCampus = createAsyncThunk(
    'schools/deleteCampus',
    async campusDelete => {
      const resp = await fetch(`http://localhost:5000/campuses/${campusDelete.campusID}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(campusDelete)
      })
      const data = await resp.json()
      return data.data
    }
)
export const addNewCampus = createAsyncThunk(
    'campuses/addNewCampus',
    async postCampus => {
      const resp = await fetch('http://localhost:5000/campuses', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(postCampus)
      })
      const data = await resp.json()
      return data.data
    }
  )
export const fetchCampuses = createAsyncThunk(
    'campuses/fetchAll',
    async () => {
        const response = await fetch('http://localhost:5000/campuses').then(r=>r.json())
        return response;
    }
)
export const fetchCampusById = createAsyncThunk(
    'campuses/fetchById',
    async(id) => {
        const response = await fetch(`http://localhost:5000/campus/${id}`).then(r=>r.json())
        return response;
    }
)
// then handle actions in reducers
export const schoolsSlice = createSlice({
  name: 'campuses',
  initialState: {
    campuses: [],
    activeCampus: {}
  },
  reducers: {
  },
  // add reducers for additional action types here, and handle loading state as needed
  extraReducers: {
    [fetchCampuses.pending]: (state, action) => {
        state.status = 'loading'
    },
    [fetchCampuses.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        if (state.campuses.length === 0) {
            state.campuses = state.campuses.concat(action.payload)
        }
    },
    [fetchCampuses.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    },
    [addNewCampus.fulfilled]: (state, action) => {
        state.campuses.push(action.payload)
    },
    [fetchCampusById.pending]: (state, action) => {
        state.status = 'loading'
    },
    [fetchCampusById.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.activeCampus = action.payload
    },
    [fetchCampusById.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    },
    [deleteCampus.pending]: (state, action) => {
        state.status = 'loading'
    },
    [deleteCampus.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        /*
        state.students.filter((student)=>student.id !== action.payload.studentID);
        */
       console.log(action.payload)
        const { campusID } = action.payload;
        const index = state.campuses.findIndex((campus) => campus.campusID === campusID);
        state.campuses.splice(index, 1);
    },
    [editCampus.pending]: (state, action) => {
        state.status = 'loading'
    },
    [editCampus.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        console.log("editCampus action.payload", action.payload)
        const { campusID } = action.payload;
        const index = state.campuses.findIndex(campus=>campus.campusID === campusID);
        console.log(index)
        // state.campuses.splice(index, 1)
        // state.campuses.push(action.payload.campus)
        //  state.campuses = action.payload
        state.campuses[index] = action.payload;
    }
  }
});

export const { builder } = schoolsSlice.actions;

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
export const selectCampuses = state => state.schools; //.campuses;

export default schoolsSlice.reducer;
