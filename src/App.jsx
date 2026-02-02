import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Recipe from "./Recipe";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(ingredients);

  return (
    <>
      <header>
        <div className="fav-btn">
          <button className="btn-fav">
            <FontAwesomeIcon className="blk-heart" icon={faHeart} />
            Favortites
          </button>
        </div>

        {/* title */}
        <div className="title">
          <h1>What Can I Cook?</h1>
          <p>Enter ingredients, get recipes</p>
        </div>
      </header>

      {/* input section */}
      <Input ingredients={ingredients} setIngredients={setIngredients} />

      <Recipe
        ingredients={ingredients}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
