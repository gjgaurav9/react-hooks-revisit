import React, { useState, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
// not required now
  // useEffect(() => {
  //   fetch("https://reacthooks-a1311.firebaseio.com/ingredients.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseBody) => {
  //       const loadedIngrd = [];
  //       for (const key in responseBody) {
  //         loadedIngrd.push({
  //           id: key,
  //           title: responseBody[key].title,
  //           amount: responseBody[key].amount,
  //         });
  //       }
  //       setIngredientsList(loadedIngrd);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Rendering Ingredients ", ingredientsList);
  }, [ingredientsList]);

  const handleAddIngredients = (ingrd) => {
    fetch("https://reacthooks-a1311.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingrd),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseBody) => {
        setIngredientsList((preIngrd) => [
          ...preIngrd,
          {
            id: responseBody.name,
            title: ingrd.title,
            amount: ingrd.amount,
          },
        ]);
      });
  };

  const filterIngrediants = useCallback((ingredientList) => {
    setIngredientsList(ingredientList);
  }, []);

  const deleteIngredient = (ingrdId) => {
    console.log(ingrdId);
    setIngredientsList((prevIngrds) =>
      prevIngrds.filter((ingredient) => ingredient.id !== ingrdId)
    );
  };
  return (
    <div className="App">
      <IngredientForm addIngredients={handleAddIngredients} />

      <section>
        <Search onLoadIngrediants={filterIngrediants} />
        <IngredientList
          ingredients={ingredientsList}
          onRemoveItem={(id) => deleteIngredient(id)}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
