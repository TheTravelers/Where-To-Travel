import { Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Filter from './Components/Filter/Filter';
import UserList from './Components/UserList/UserList';

export default (

    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/main" component={Filter} />
        <Route path="/my-list" component={UserList} />
    </Switch>

)
