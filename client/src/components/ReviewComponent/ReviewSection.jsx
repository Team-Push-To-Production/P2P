import React, { useState, useEffect, useContext } from 'react';
import Ratings from './Ratings/Ratings.jsx';
import Reviews from './Reviews/Reviews.jsx';
import { ColorContext } from '../colorContext.jsx';
import axios from 'axios';

const ReviewSection = (props) => {
  const [reviews, setReviews] = useState({});
  const [meta, setMeta] = useState({});
  const [sort, setSort] = useState(1);
  const colors = useContext(ColorContext);
  // console.log(colors);
  let id = 42366;

  function getReviews(arg = '1') {
    axios({
      method: 'get',
      url: `http://localhost:3000/productreviews/${id}/${arg}`,
    })
    .then(data => setReviews(data.data))
    .catch(err => console.log(err));
  }

  function getMetaData() {
    axios({
      method: 'get',
      url: `http://localhost:3000/productmeta/${id}`
    }).
    then(data => setMeta(data.data))
    .catch(err => console.log(err));
  }

  function sortedByOnChangeHandler (val) {
    setSort(val);
  }

  // componentDidUpdate for sort state:
  useEffect(() => {
    getReviews(sort);
  }, [sort])

  // on load:
  useEffect(() => {
    getReviews(sort);
    getMetaData();
  }, [])

  return (
    <section className="ratings-reviews-section">
      {/* {console.log(colors)} */}
      <Ratings meta={meta} />
      <Reviews
        meta={meta}
        sort={sort}
        sortedByOnChangeHandler={sortedByOnChangeHandler}
        getReviews={getReviews}
        reviews={reviews}
        productId={id}
      />
    </section>
  )
}

export default ReviewSection;
