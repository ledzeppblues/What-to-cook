import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowRotateLeft,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LoaderComp from "./Loader.jsx";

export default function Recipe({ ingredients, setIsLoading, isLoading }) {
  const [aiRecipe, setAiRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // for changing hear to thumb

  // at first component load,it logs the recipe in console log
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites")) || [];
    console.log("fav recipes", saved);
  });

  // Save to local Storage
  function handleSaveRecipe() {
    if (!aiRecipe) return;

    // check existing favourites so there is no repeat,parse and then return array of not
    const existing = JSON.parse(localStorage.getItem("favourites")) || [];

    // now preventing duplicates by using title by looping
    const alreadySaved = existing.some(
      (recipe) => recipe.title === aiRecipe.title,
    );

    // if already saved return true then we stop this function as a whole and also flip isSaved
    if (alreadySaved) {
      setIsSaved(true);
      return;
    }

    // now we add recipe after doing all those checks
    const updatedFavourites = [...existing, aiRecipe];
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setIsSaved(true);
  }

  // API Call
  async function generateRecipe() {
    setIsSaved(false);
    if (isLoading) return; //ignore extra clicks
    setIsLoading(true); // loading spinner

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients,
        }),
      });

      const recipe = await res.json();
      setAiRecipe(recipe);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  // API Call

  return (
    <>
      {/* Generate recipe button */}
      <div className="generate-recipe">
        <button onClick={generateRecipe} disabled={ingredients.length <= 2}>
          Generate Recipe
        </button>
      </div>

      {isLoading ? (
        <div className="loading">
          <LoaderComp />
        </div>
      ) : null}

      {/* title and prep time */}
      {!isLoading && aiRecipe ? (
        <div className="parent-div recipe-animate">
          <div className="recipe-title">
            <h4>{aiRecipe.title}</h4>
            <p className="recipe-time">
              Prep Time: <span>{aiRecipe.prepTime} Minutes</span>
            </p>
          </div>

          {/* ingredients and instructions */}
          <div className="ingredients-container">
            <div className="ingredients-list">
              <h4>Ingredients</h4>

              <div className="ul-list">
                <ul>
                  {aiRecipe.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ingredients list end */}
            <div className="instructions-list">
              <h4>Intructions</h4>

              <div className="ol-list">
                <ol>
                  {aiRecipe.steps.map((step) => (
                    <li>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          {/* Instructions End */}

          {/* fav btn and regen recipe */}
          <div className="save-regen-container">
            <button className="save-btn" onClick={handleSaveRecipe}>
              <FontAwesomeIcon
                className={isSaved ? "" : "red-heart"}
                icon={isSaved ? faThumbsUp : faHeart}
              />
              {isSaved ? "Saved to Favorites" : "Save to Favorites"}
            </button>

            <button onClick={generateRecipe} className="regen-btn">
              <FontAwesomeIcon icon={faArrowRotateLeft} />
              Regenerate Recipe
            </button>
          </div>

          <div className="fun-fact">
            <p>Fun-fact about the recipe</p>
            <p>{aiRecipe.funFact}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
