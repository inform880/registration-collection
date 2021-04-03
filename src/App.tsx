import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SubmissionConfirmation from './screens/SubmissionConfirmation';
import SubmissionForm from './screens/SubmissionForm';
import Submissions from './screens/Submissions';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/submissions/:id">
          <SubmissionConfirmation />
        </Route>
        <Route path="/submissions">
          <Submissions />
        </Route>
        <Route path="/">
          <SubmissionForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
