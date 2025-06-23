import { useEffect, useState } from "react";

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
            {loadedMeals.map(meal => <li key={meal.id}>{meal.name}</li>)}
        </ul>
    );
}