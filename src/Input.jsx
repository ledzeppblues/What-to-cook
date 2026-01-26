export default function Input({ ingredients, setIngredients }) {
  // form handle
  function handleSubmit(formData) {
    const ingredientItem = formData.get("ingredient")?.trim();
    if (!ingredientItem) return;
    setIngredients((prev) => [...prev, ingredientItem]);
  }

  // delete ingredients
  function deleteIngredient(i) {
    setIngredients((prev) => prev.filter((_, index) => index !== i));
  }
  return (
    <>
      <section className="input-sec">
        <form action={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Add an ingredient..."
              name="ingredient"
            />
            <button className="input-btn">Add</button>
          </div>
        </form>
      </section>

      <section className="requirment">
        <p>Minimum 3 ingredients...</p>
      </section>

      {/* ingrediendts here */}
      <div
        className={
          ingredients.length > 0 ? "ing-list ing-list-border" : "ing-list"
        }
      >
        {/* mapping ingredients here */}
        {ingredients.map((item, index) => (
          <div key={index} className="each-ing">
            <span className="span">
              {item}{" "}
              <button
                onClick={() => deleteIngredient(index)}
                className="remove-btn"
              >
                x
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
