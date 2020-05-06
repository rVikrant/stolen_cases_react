// import dependencies
import React, {Component} from 'react';
// import DatePicker from 'react-date-picker';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Switch
} from 'react-router-dom';

// import local dependencies
import './App.css';
import Home from "./components/home/Home";
import Case from "./components/case/Case";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route exact path='/case/:caseId' component={Case}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}


// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <div className = "Filter-container">
//           <div className = "Input-div"><input className = "Input-text" type = "text" placeholder = "Search case descriptions"></input></div>
//           <div className = "Date-div"><DatePicker className = "Date"/></div>
//           <div className = "Date-div"><DatePicker/></div>
//           <span className = "Span-button"><button className = "Button">Find cases</button></span>
//       </div>
//         <ListCases />
//     </div>
//   );
// }

export default App;
