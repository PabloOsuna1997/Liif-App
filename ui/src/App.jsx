import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css'


import  Providers  from './pages/Providers'
import { FormCredit } from './pages/FormCredit'
import { CalculatorCredits } from './pages/CalculatorCredits'

const initialValue = {
    providers: [],
    fields: {}
};

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'ADD_PROVIDER':
            return {providers: action.payload}
        case 'ADD_FIELDS':
            return {...state, fields: action.payload}
        case "RESET":
                return initialValue;        
        default:            
            return state;
    }
}
const store = createStore(reducer,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/"><Providers/></Route>
                    <Route exact path="/credits"><FormCredit/></Route>
                    <Route exact path="/calculator"><CalculatorCredits/></Route>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
