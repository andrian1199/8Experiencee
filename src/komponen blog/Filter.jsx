import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="container text-start my-4">
        <div className="post-filter-container">
            {categories.map((category) => (
            <button
                key={category}
                className={`filter-item ${
                activeCategory === category ? 'active-filter' : ''
                }`}
                onClick={() => onCategoryChange(category)}
            >
                {category}
            </button>
            ))}
        </div>
        </div>
    );
};

Filter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeCategory: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
};

export default Filter;
