import { fromPairs } from 'lodash';
import React from 'react';
import { AuthRoute, ProtRoute } from '../util/route_utils';
import { Route } from "react-router-dom";

import SignUpForm from '../components/session/signup_form';

class App extends React.Component{
    render(){
        
        return (
            <div>
                <p>hello world</p>
                {/* <Route path="/signup" component={SignUpForm}/> */}
            </div>
        )
    }
}

export default App;