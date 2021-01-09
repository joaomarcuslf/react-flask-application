import React from 'react';

import { Switch, Route } from 'react-router-dom';

import UsersList from './views/users/list';
import UserShow from './views/users/show';
import UserEdit from './views/users/edit';
import UserDelete from './views/users/delete';

const App = () => (
  <>
    <Switch>
      <Route path="/users" exact>
        <UsersList />
      </Route>

      <Route
        path="/user/:userid/edit"
        exact
        render={(props) => <UserEdit userid={props.match.params.userid} />}
      />
      <Route
        path="/user/:userid/delete"
        exact
        render={(props) => <UserDelete userid={props.match.params.userid} />}
      />

      <Route
        path="/user/:userid"
        exact
        render={(props) => <UserShow userid={props.match.params.userid} />}
      />

      <Route
        component={({ location }) => (
          <h3>
            Route not found: <code>{location.pathname}</code>
          </h3>
        )}
      />
    </Switch>
  </>
);

export default App;
