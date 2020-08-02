import React from 'react';

import {Categories, SortPopup, PizzaBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import pizzas from "../redux/reducers/pizzas";
import {fetchPizzas} from "../redux/actions/pizzas";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = ['Мясние', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItem = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price',order: 'desc'},
    {name: 'алфавиту', type: 'name',order: 'asc'},
];

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);

    console.log(cartItems);

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type))
    }, []);

    const handleAddPizzaToCart = (obj) => {
        dispatch(addPizzaToCart(obj));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category }
                            onClickCategory={onSelectCategory}
                            items={categoryNames}
                />
                <SortPopup activeSortType={sortBy.type}
                           onClickSortType={onSelectSortType}
                           items={sortItem}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => <PizzaBlock onClickAddPizza={handleAddPizzaToCart}
                                                     key={obj.id}
                                                     isLoading={true}
                                                     addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                                                     {...obj}/>)
                    : Array(12)
                        .fill(0)
                        .map((_, index) => (<LoadingBlock key={index}/>))}
            </div>
        </div>
    );
};

export default Home;