import React from 'react';

const SearchBar = () => {
  return (
    <div style={styles.searchBar}>
      <input
        type="text"
        placeholder="Cari konser disini..."
        style={styles.input}
      />
      <button style={styles.button}>Cari</button>
    </div>
  );
};

const styles = {
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    gap: '10px',
  },
  input: {
    width: '60%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: 'bold',
  },
};

export default SearchBar;
