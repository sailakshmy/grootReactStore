import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Product from './components/Product';
import {Provider} from 'react-redux';
import store from './components/Store';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <div style={{textAlign:"center"}}>
                    <Navbar/>
                </div>
                <Switch>
                    <Route path='/'  component={Homepage} exact/>
                    <Route path='/product/:id' component={Product}/>
                </Switch>
            </Router>
        </Provider>
       
    )
}

export default App;