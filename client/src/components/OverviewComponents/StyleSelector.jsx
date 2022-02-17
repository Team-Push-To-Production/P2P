import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

import axios from 'axios'

function StyleSelector({ productId, getStyle }) {

  const [styles, setStyles] = useState([]);
  const [currData, setCurrData] = useState({});

  useEffect(() => {
    getStyles();
  }, [])

  const getStyles = async () => {
    try {
      const res = await axios.get(`/products/${productId}/styles`)
      setStyles(res.data.results);
      setCurrData(res.data.results[0]);
    } catch (err) {
      console.error(err);
    }
  }

  const renderStyleButtons = () => {
    if (styles.length) {
      return styles.map((style, index) => {
        return (
          <div className='selectedStyle'>
            <input
              key={style.style_id}
              type='image'
              value={style.style_id}
              onClick={handleClick}
              name={style.name}
              src={style.photos[0].thumbnail_url}
              className='styleButtons'
            ></input>
            {currData.style_id === style.style_id &&
              <div key={`${index} style selected`} className='circle'>
                <span className='selected'>&#10003;</span>
              </div>
            }
          </div>
        )
      })
    } else {
      return <h1>LOADING...</h1>
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    let data;
    styles.forEach(style => {
      if (style.style_id === Number(e.target.value)) {
        data = style
      }
    })
    getStyle(data);
    setCurrData(data);
  }

  return (
    <div className='styleContainer'>
      STYLE > {currData.name}
      <div className='grid-container'>
        {renderStyleButtons()}
      </div>
      <AddToCart currData={currData} />
    </div>
  );
}

export default StyleSelector;

// {currData.style_id === style.style_id ?? <span>&#10003;</span>}