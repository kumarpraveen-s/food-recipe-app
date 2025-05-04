import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchMeals = async () => {
            setError(null);
            const URL = import.meta.env.VITE_DATABASE_URL;
            const response = await fetch(`${URL}/meals.json`);
            if (!response.ok) {
                throw new Error("Failed to fetch data!...");
            }
            const mealsData = await response.json();
            console.log(mealsData);
            const loadedMeals = [];
            for (const key in mealsData) {
                loadedMeals.push({
                    id: key,
                    name: mealsData[key].name,
                    description: mealsData[key].description,
                    price: mealsData[key].price,
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading....</p>
            </section>
        );
    }
    if (error) {
        return (
            <section className={classes.LoadingError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
