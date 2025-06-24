import { useEffect, useState } from "react";
import MealItem from './MealItem.jsx';

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {

            //try {
                const response = await fetch('http://localhost:3000/meals');

                if (!response.ok) {
                    console.log('response not ok');

                }

           // } catch (error) {
           //     console.log('Whooospie!!');
           // }

            const meals = await response.json();
            setLoadedMeals(meals);
        }
        fetchMeals();
    }, []);



    return (
        <ul id="meals">
            {loadedMeals.map(meal => 
            <MealItem key={meal.id} meal={meal} />)}
        </ul>
    );
}