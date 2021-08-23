/* eslint-disable */

import React,{useEffect,useState} from 'react'; 
import './App.css';
import Recipe from './Recipe';

const App=()=>{
  const APP_ID="78018ef5";
  const APP_KEY="5f147eaa4978c4acb5d069d5e0b4f98d	";
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken');
 
  useEffect(()=>{
    getRecipes();
  },[query]);
  const getRecipes=async()=>{
    const Response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await Response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  }
  const updateSearch=e=>{setSearch(e.target.value);

  console.log(search);}
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button  className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {
        recipes.map(recipe=>(
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>
        ))
      };
      </div>
     

    </div>
  );
}

export default App;
