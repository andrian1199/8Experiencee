import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ image, category, title, link }) => {
    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    {/* Menggunakan badge dengan warna custom */}
                    <span className="badge custom-badge mb-2">{category}</span>
                    <h5 className="card-title">{title}</h5>
                    {/* Tombol Read More dengan warna custom */}
                    <a href={link} className="read-more">Read More</a>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default Card;
