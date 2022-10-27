import React from "react";
import he from "he";
import Option from "./Option";

export default function Question(props) {
  const optionElements = props.options.map((option, index) => {
    return (
      <Option
        key={index}
        value={option.choice}
        choice_id={option.id}
        question_id={props.id}
        handleClick={props.handleClick}
        select={option.isSelected}
        correct={option.isCorrect}
        end={props.end}
      />
    );
  });
  return (
    <div>
      <h3>{he.decode(props.question)}</h3>
      <div className="choices">{optionElements}</div>
    </div>
  );
}
