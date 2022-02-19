import React, {useState, useContext} from 'react';
import axios from 'axios';
import ProductContext from '../Context/ProductContext.jsx';



const AddAnswerForm = (props) => {
  const [state, setState] = useState({
    mAnswer: '',
    mNickname: '',
    mEmail: '',
    mPhotos: []
  });

  const productContext = useContext(ProductContext);
  const { product } = productContext;

  console.log(props.props.question.question_id);

  const handleFormChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  //create submit button handler
  //axios.post to answers
  //

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    axios.post(`/qa/questions/${props.props.question.question_id}/answers`, {
      body: state.mAnswer,
      name: state.mNickname,
      email: state.mEmail,
      photos: state.mPhotos
    })
    .then(response => {console.log('answer was successfully posted');})
    .catch(err => {console.error(err);})
  }

  return (

    <div className="add-answer-modal-container">
      <div className="add-answer-form-container">
        <form id="add-answer-form" onSubmit={handleAnswerSubmit}>
          <h3 id="add-answer-title">Submit your Answer</h3>
          <h4 id="add-answer-description"> {product.name} : {props.props.question.question_body}</h4>
          <div>
            <div>Your Answer*
            <textarea id="mAnswer" type="text" name="mAnswer" placeholder="Your answer here" value={state.mAnswer} onChange={handleFormChange}/>
            </div>
          </div>
          <div>
            <div> What is your nickname?*
            <textarea id="mNickname" type="text" name="mNickname" placeholder="Example: jack543!" value={state.mNickname} onChange={handleFormChange} />
            </div>
            <span>For privacy reasons, do not use your full name or email address</span>
          </div>
          <div>
            <div>Your e-mail
            <textarea id="mEmail" type="text" name="mEmail" placeholder="Example: jack@email.com" value={state.mEmail} onChange={handleFormChange}/>
            </div>
            <span>For authentication reasons, you will not be emailed</span>
          </div>
          <input placeholder="Upload your photos"/>
          <div>
          <button type="submit" id="add-answer-submit">Submit Answer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAnswerForm;