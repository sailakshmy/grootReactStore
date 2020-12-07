import React,{Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Product from './components/Product';


function App() {
    return (
        <Router>
            <div style={{textAlign:"center"}}>
                <Navbar/>
            </div>
            <Switch>
                <Route path='/'  component={Homepage} exact/>
                <Route path='/product/:id' component={Product}/>
            </Switch>
        </Router>

    )
}

export default App;