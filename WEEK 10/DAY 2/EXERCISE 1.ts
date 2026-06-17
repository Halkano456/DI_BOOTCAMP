// src/model/Recipe.ts
export interface IRecipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}
// src/model/RecipeCollection.ts
import { RecipeItem } from './RecipeItem';
import { IRecipe } from './Recipe';

export class RecipeCollection {
  private recipes: RecipeItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  get allRecipes(): RecipeItem[] {
    return this.recipes;
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveToStorage();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.saveToStorage();
    }
  }

  clearCollection(): void {
    this.recipes = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      try {
        const parsed: IRecipe[] = JSON.parse(stored);
        this.recipes = parsed.map(
          item => new RecipeItem(item.id, item.title, item.ingredients, item.instructions, item.isFavorite)
        );
      } catch (e) {
        console.error("Failed to parse recipes from localStorage", e);
        this.recipes = [];
      }
    }
  }
}
// src/templates/RecipeTemplate.ts
import { RecipeCollection } from '../model/RecipeCollection';

export class RecipeTemplate {
  private container: HTMLDivElement;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container with id ${containerId} not found.`);
    }
    this.container = element as HTMLDivElement;
  }

  render(collection: RecipeCollection): void {
    this.container.innerHTML = '';

    if (collection.allRecipes.length === 0) {
      this.container.innerHTML = '<p class="empty-message">No recipes added yet!</p>';
      return;
    }

    collection.allRecipes.forEach(recipe => {
      // Create card wrapper
      const card = document.createElement('div');
      card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;

      // Card Header
      const header = document.createElement('div');
      header.className = 'recipe-header';
      header.innerHTML = `<h3>${recipe.title}</h3>`;
      
      // Favorite Button
      const favBtn = document.createElement('button');
      favBtn.className = 'fav-btn';
      favBtn.textContent = recipe.isFavorite ? '★ Unfavorite' : '☆ Favorite';
      favBtn.addEventListener('click', () => {
        collection.toggleFavorite(recipe.id);
        this.render(collection);
      });
      header.appendChild(favBtn);
      card.appendChild(header);

      // Collapsible Content Wrapper
      const details = document.createElement('div');
      details.className = 'recipe-details';

      // Ingredients List
      const ingredientsTitle = document.createElement('h4');
      ingredientsTitle.textContent = 'Ingredients:';
      const ingredientsList = document.createElement('ul');
      recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ingredientsList.appendChild(li);
      });
      details.appendChild(ingredientsTitle);
      details.appendChild(ingredientsList);

      // Instructions
      const instructionsTitle = document.createElement('h4');
      instructionsTitle.textContent = 'Instructions:';
      const instructionsBody = document.createElement('p');
      instructionsBody.textContent = recipe.instructions;
      details.appendChild(instructionsTitle);
      details.appendChild(instructionsBody);

      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete Recipe';
      deleteBtn.addEventListener('click', () => {
        collection.removeRecipe(recipe.id);
        this.render(collection);
      });
      details.appendChild(deleteBtn);

      card.appendChild(details);
      this.container.appendChild(card);
    });
  }
}
// src/main.ts
import { v4 as uuidv4 } from 'uuid';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeItem } from './model/RecipeItem';
import { RecipeTemplate } from './templates/RecipeTemplate';

document.addEventListener('DOMContentLoaded', () => {
  const collection = new RecipeCollection();
  const template = new RecipeTemplate('recipeContainer');

  // Initial render
  template.render(collection);

  // DOM Elements
  const form = document.getElementById('recipeEntryForm') as HTMLFormElement;
  const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
  const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
  const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;
  const clearBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;

  // Form Submission
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    // Split ingredients by newline and filter out empty lines
    const ingredients = ingredientsInput.value
      .split('\n')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);
    const instructions = instructionsInput.value.trim();

    if (!title || ingredients.length === 0 || !instructions) return;

    // Create and add new recipe
    const newRecipe = new RecipeItem(
      uuidv4(),
      title,
      ingredients,
      instructions,
      false
    );

    collection.addRecipe(newRecipe);
    template.render(collection);

    // Reset Form
    form.reset();
  });

  // Clear All Event
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all recipes?')) {
      collection.clearCollection();
      template.render(collection);
    }
  });
});