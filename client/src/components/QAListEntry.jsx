import React from 'react';
import Answer from './Answer.jsx';
//main component that will have many things

//contains
  //questionEntry (might want to be it's own component)
  //AnswerEntry (might want to be it's own component)

  //text which displays what username submitted answer

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: [],
      answer: []
    }
  }




render() {
  var answers = [];
  for (let answer in this.props.question.answers) {
    answers.push(this.props.question.answers[answer]);
  }
  return (
    <>
    <div id="question">
    {this.props.question.question_body} - {this.props.question.asker_name}
    </div>
    <div id="answer">
    {answers.map((answer, index) => {
      return <Answer answer={answer} key={index}/>
    })}
    </div>
    </>
  );
}
}

export default QAListEntry;