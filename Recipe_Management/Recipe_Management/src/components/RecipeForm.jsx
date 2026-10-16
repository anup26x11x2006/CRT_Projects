import { useState } from 'react'

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Sides', 'Snacks', 'Drinks']

export default function RecipeForm({ recipe, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: recipe?.title ?? '',
    description: recipe?.description ?? '',
    category: recipe?.category ?? 'Dinner',
    time: recipe?.time ?? '',
    servings: recipe?.servings ?? '',
    image: recipe?.image ?? '',
    ingredients: recipe?.ingredients?.join('\n') ?? '',
    instructions: recipe?.instructions?.join('\n') ?? '',
  })

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      ...(recipe ? { id: recipe.id } : {}),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      time: Number(form.time),
      servings: Number(form.servings),
      image: form.image.trim() || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
      ingredients: form.ingredients.split('\n').map((line) => line.trim()).filter(Boolean),
      instructions: form.instructions.split('\n').map((line) => line.trim()).filter(Boolean),
    })
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field form-field-wide">
          <span>Recipe name <b>*</b></span>
          <input autoFocus name="title" onChange={updateField} placeholder="e.g. Sunday tomato pasta" required value={form.title} />
        </label>
        <label className="form-field form-field-wide">
          <span>A little about it</span>
          <input name="description" onChange={updateField} placeholder="What makes this one special?" value={form.description} />
        </label>
        <label className="form-field">
          <span>Category <b>*</b></span>
          <select name="category" onChange={updateField} value={form.category}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>Prep + cook time (min) <b>*</b></span>
          <input min="1" name="time" onChange={updateField} placeholder="30" required type="number" value={form.time} />
        </label>
        <label className="form-field">
          <span>Servings <b>*</b></span>
          <input min="1" name="servings" onChange={updateField} placeholder="2" required type="number" value={form.servings} />
        </label>
        <label className="form-field form-field-wide">
          <span>Photo URL <small>optional</small></span>
          <input name="image" onChange={updateField} placeholder="https://..." type="url" value={form.image} />
        </label>
        <label className="form-field form-field-wide">
          <span>Ingredients <b>*</b> <small>one ingredient per line</small></span>
          <textarea name="ingredients" onChange={updateField} placeholder={'2 cups flour\n1 cup milk\nA pinch of salt'} required rows="5" value={form.ingredients} />
        </label>
        <label className="form-field form-field-wide">
          <span>Method <small>one step per line</small></span>
          <textarea name="instructions" onChange={updateField} placeholder={'Preheat the oven...\nMix everything together...'} rows="6" value={form.instructions} />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-secondary" onClick={onCancel} type="button">Cancel</button>
        <button className="button button-primary" type="submit">{recipe ? 'Save changes' : 'Save my recipe'} <span aria-hidden="true">→</span></button>
      </div>
    </form>
  )
}