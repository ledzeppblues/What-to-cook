import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faL } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Recipe from "./Recipe";
import Favourites from "./Favourites";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadIsFavourite, setLoadIsFavourite] = useState(false);
  console.log(ingredients);

  function toggleFavPage() {
    setLoadIsFavourite((prev) => !prev);
  }

  return (
    <>
      <header>
        <div className="fav-btn">
          <button onClick={toggleFavPage} className="btn-fav">
            <FontAwesomeIcon className="blk-heart" icon={faHeart} />
            {loadIsFavourite ? "Home" : "Favortites"}
          </button>
        </div>

        {/* title */}
        <div className="title">
          <h1>What Can I Cook?</h1>
          <p>Enter ingredients, get recipes</p>
        </div>
      </header>

      {loadIsFavourite ? (
        <Favourites />
      ) : (
        <>
          <Input ingredients={ingredients} setIngredients={setIngredients} />
          <Recipe
            ingredients={ingredients}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}

export default App;
