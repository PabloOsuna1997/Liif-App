import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Card} from 'react-bootstrap';
import './App.css'


import Providers from './pages/Providers'
import FormCredit from './pages/FormCredit'
import CalculatorCredits from './pages/CalculatorCredits'
import Footer from './components/Footer';

const initialValue = {
    provider: {},
    fields: {},
    data: {}
};

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'ADD_PROVIDER':
            return { providers: action.payload }
        case 'ADD_FIELDS':
            return { ...state, fields: action.payload }
        case 'ADD_DATA':
            return { ...state, data: action.payload }
        case "RESET":
            return initialValue;
        default:
            return state;
    }
}
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const App = () => {
    return (
        <div className="page-container">
            <Provider store={store}>
                <Card style={{
                    height: '60em'
                }}>
                    <Router>
                        <Switch>
                            <Route exact path="/"><Providers /></Route>
                            <Route exact path="/credits"><FormCredit /></Route>
                            <Route exact path="/calculator"><CalculatorCredits /></Route>
                        </Switch>
                    </Router>
                </Card>
                <Footer />
            </Provider>
        </div>
    )
}

export default App
