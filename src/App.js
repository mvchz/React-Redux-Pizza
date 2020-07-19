import React from 'react';

import {Header} from "./components";
import {Home, Cart} from "./pages";

import {Route} from "react-router-dom";
import axios from "axios";
import {setPizzas} from "./redux/actions/pizzas";
import {connect} from "react-redux";


// function App() {
//     React.useEffect(() => {
//         axios.get('http://localhost:3000/db.json').then(({data}) => {
//             setPizzas(data.pizzas);
//         })
//     }, [])
//
//     return (
//         <div className="wrapper">
//             <Header/>
//             <div className="content">
//                 <Route path={"/"} render={() => <Home items={pizzas} />} exact/>
//                 <Route path={"/cart"} component={Cart} exact/>
//             </div>
//         </div>
//     );
// }

class App extends React.Component{
    componentDidMount() {
        axios.get('http://localhost:3000/db.json').then(({data}) => {
            console.log(data.pizzas);
            this.props.setPizzas(data.pizzas);
        })
    }

    render() {
        return (
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Route path={"/"} render={() => <Home items={this.props.items} />} exact/>
                    <Route path={"/cart"} component={Cart} exact/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.pizzas.items,
        filters: state.filters,
    }
}
const mapDispatchToProps = {
    setPizzas,
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
