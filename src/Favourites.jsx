import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faArrowRotateLeft,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Favourites() {
  const [favRecipe, setFaveRecipe] = useState([]);
  const [isSaved, setIsSaved] = useState(false); //
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const getFavRecipe = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFaveRecipe(getFavRecipe);
  }, []);

  function handleDeleteRecipe(title) {
    const updatedRecipes = favRecipe.filter((recipe) => recipe.title != title);
    setFaveRecipe(updatedRecipes);
    localStorage.setItem("favourites", JSON.stringify(updatedRecipes));
    setRemoved(true);
  }

  return (
    <>
      {favRecipe.map((recipe) => {
        return (
          <div className="parent-div parent-div-fav recipe-animate">
            <div className="recipe-title">
              <h4>{recipe.title}</h4>
              <p className="recipe-time">
                Prep Time: <span>{recipe.prepTime} Minutes</span>
              </p>

              {/* items ignored */}
              {recipe.ignored ? (
                <div className="ignored-items">
                  <p>Items Ignored: {recipe.ignored}</p>
                </div>
              ) : null}
            </div>

            {/* ingredients and instructions */}
            <div className="ingredients-container">
              <div className="ingredients-list">
                <h4>Ingredients</h4>

                <div className="ul-list">
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
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
                    {recipe.steps.map((step) => (
                      <li>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            {/* Instructions End */}

            {/* fav btn and regen recipe */}
            <div className="save-regen-container">
              <button
                disabled={recipe.noRecipe}
                className="save-btn save-btn-fav-page"
                onClick={() => handleDeleteRecipe(recipe.title)}
              >
                <FontAwesomeIcon
                  className={isSaved ? "" : "red-heart"}
                  icon={isSaved ? faThumbsUp : faHeart}
                />
                Delete Recipe
              </button>
            </div>

            <div className="fun-fact">
              <p>Fun-fact about the recipe</p>
              <p>{recipe.funFact}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
