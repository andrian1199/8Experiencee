import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [btnHover, setBtnHover] = useState(false);

  const handleSearch = () => {
    // Kirimkan hasil pencarian ke komponen parent
    onSearch(query);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="input-group mx-auto" style={{ width: '50%' }}>
        <input 
          type="text" 
          className="form-control"  
          placeholder="Cari konser..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          style={{ borderRadius: '30px 30px', marginRight: '30px'}}  
        />
        <button
          className="btn"
          onClick={handleSearch}
          onMouseEnter={() => setBtnHover(true)}  
          onMouseLeave={() => setBtnHover(false)}  
          style={{
            borderRadius: '30px 30px',
            backgroundColor: btnHover ? '#FFCF00' : '#FFCF00',  
            color: btnHover ? 'black' : 'white',  
            transition: 'background-color 0.3s ease, color 0.3s ease',  
          }}
        >
          Cari
        </button>
      </div>
    </div>
  );
};

export default Search;
