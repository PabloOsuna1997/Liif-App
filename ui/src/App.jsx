import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import { Providers } from './pages/Providers'
import { FormCredit } from './pages/FormCredit'
import { CalculatorCredits } from './pages/CalculatorCredits'

const App = () => {
    return (
        <div>
            <h1>app</h1>
            <Router>
                <Switch>
                    <Route exact path="/"><Providers/></Route>
                    <Route exact path="/credits"><FormCredit/></Route>
                    <Route exact path="/calculator"><CalculatorCredits/></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
