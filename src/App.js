import React from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";

import {Header} from "./components";

import {Home, Cart} from "./pages";
import {Route} from "react-router-dom";
import {fetchPizzas} from "./redux/actions/pizzas";


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route path={"/"} component={Home} exact/>
                <Route path={"/cart"} component={Cart} exact/>
            </div>
        </div>
    );
}

export default App;


// export default connect(
//     (state) => {
//         return {
//             items: state.pizzas.items,
//             filters: state.filters,
//         };
//     },
//     {
//         setPizzas
//     },
// )(App);
