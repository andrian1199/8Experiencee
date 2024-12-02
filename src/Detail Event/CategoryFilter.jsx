import React from 'react';

const CategoryFilter = () => {
  const categories = ['All Categories', 'Pop', 'Rock', 'Jazz'];

  return (
    <div style={styles.container}>
      {categories.map((category, index) => (
        <button key={index} style={styles.button}>
          {category}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px 0',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CategoryFilter;
