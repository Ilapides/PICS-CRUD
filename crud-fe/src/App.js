import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import { Schools, Campus } from './features/schools/Schools';
import { Students, Student } from './features/students/Students';
// import './App.css';

function App() {
  return (
    <Router>
    <link rel="stylesheet" href="https://unpkg.com/teutonic-css@0.7.13/teutonic.min.css"></link>
      <div>
        <nav className='flex gap-no'>
              <Link className="box" to="/">Home</Link>
              <Link className="box" to="/students">Students</Link>
              <Link className="box" to="/campuses">Campuses</Link>
        </nav>

        <Switch>
          <Route path="/students/:id" >
            <Student />
          </Route>
          <Route path="/students">
            <div>
              <Students />
            </div>
          </Route>
          <Route path="/campuses/:id" >
            <Campus />
          </Route>
          <Route path="/campuses">
            <div>
              <Schools />
            </div>
          </Route>
          <Route path="/">
            <div>
              <Schools />
            </div>
            <div>
              <Students />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
