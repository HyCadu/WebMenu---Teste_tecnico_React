import React, { useState } from 'react'; //import para usar o react e o useState
import categorias from './menu.json';
import './index.css';

const Menu = ({ categorias }) => {
  // Estados para controlar a categoria e subcategoria ativas
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSubSubcategory, setActiveSubSubcategory] = useState(null);

  // Função para ativar a categoria ao passar o mouse
  const handleCategoryMouseEnter = (category) => {
    setActiveCategory(category.nome);
    setActiveSubcategory(null); 
  };

  // Função para desativar categoria e subcategoria ao sair do mouse
  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveSubSubcategory(null);
  };

  // Função para ativar a subcategoria ao passar o mouse
  const handleSubcategoryMouseEnter = (subcategory) => {
    setActiveSubcategory(subcategory.nome);
    setActiveSubSubcategory(null);
  };

  // Função para ativar a subsubcategoria ao passar o mouse
  const handleSubSubcategoryMouseEnter = (subSubcategory) => {
    setActiveSubSubcategory(subSubcategory.nome);
  };

  // Função para renderizar subcategorias
  const renderSubcategories = (subcategories, level = 1) => {
    return (
      <ul className={`ml-${level * 4} mt-2`}>
        {subcategories.map((subcategory) => (
          <li
            key={subcategory.nome}
            onMouseEnter={() => level === 1 ? handleSubcategoryMouseEnter(subcategory) : handleSubSubcategoryMouseEnter(subcategory)}
            onMouseLeave={() => setActiveSubSubcategory(null)}
            onClick={() => console.log(subcategory.nome)}
            className={`relative cursor-pointer p-2 transition-colors duration-200 ${activeSubcategory === subcategory.nome || activeSubSubcategory === subcategory.nome ? 'bg-red-500 text-white' : 'hover:bg-red-300 text-black'}`}
          >
            {subcategory.nome}
            {/* Verifica se a subcategoria tem subcategorias e renderiza se tiver alguma coisa*/}
            {subcategory.subcategorias && (activeSubcategory === subcategory.nome || activeSubSubcategory === subcategory.nome) && (
              <div className="absolute top-0 left-full w-48 bg-gray-100 rounded-lg shadow-lg">
                {renderSubcategories(subcategory.subcategorias, level + 1)} {/* recursividade foi a unica forma que eu achei de conseguir selecionar as subcategorias*/}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="bg-black p-4 rounded-lg shadow-lg flex justify-between items-center" onMouseLeave={handleMouseLeave}>
      <ul className="flex space-x-4">
        {categorias.map((category) => (
          <li
            key={category.nome}
            onMouseEnter={() => handleCategoryMouseEnter(category)} // Ativa categoria
            className={`relative cursor-pointer p-4 transition-colors duration-200 ${activeCategory === category.nome ? 'bg-red-500 text-white' : 'hover:bg-red-300 text-white'}`}
          >
            {category.nome}
            {/* Renderiza subcategorias se a categoria tiver */}
            {category.subcategorias.length > 0 && activeCategory === category.nome && (
              <div className="absolute top-full left-0 w-48 bg-gray-100 rounded-lg shadow-lg">
                {renderSubcategories(category.subcategorias)} 
                
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Título da marca */}
      <div className="text-2xl text-white font-bold">
        ALFA PRODUTOS
      </div>
      {/* Campo de busca */}
      <div className="relative">
        <input
          type="text"
          className="w-96 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-500"
          placeholder="Pesquisa..."
        />
      </div>
    </nav>
  );
};

// Componente principal do aplicativo
const App = () => {
  return (
    <div className="App p-6">
      <Menu categorias={categorias} /> {/* Renderiza o componente Menu com as categorias */}
    </div>
  );
};

export default App;
