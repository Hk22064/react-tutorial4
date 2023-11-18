import React, { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('There was a problem fetching the data: ', error);
      });
  }, []);

  const applyFilters = () => {
    if (categoryFilter === 'All' && searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filteredByCategory = categoryFilter === 'All' ? products : products.filter(product => product.type.toLowerCase() === categoryFilter.toLowerCase());
      const filteredBySearchTerm = filteredByCategory.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredProducts(filteredBySearchTerm);
    }
  };

  const handleFilterClick = () => {
    applyFilters();
  };

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Meat">Meat</option>
                <option value="Soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g. beans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" onClick={handleFilterClick}>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {filteredProducts.map((product, index) => (
            <section className={product.type} key={index}>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <img src={`/images/${product.image}`} alt={product.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
