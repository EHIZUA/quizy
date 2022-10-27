import he from "he";

export default function Option(props) {
  //   console.log(props.selected);
  function colorController(selected, correct, ended) {
    if (ended) {
      if (selected && !correct) {
        return "choix wrong";
      } else if (correct) {
        return "choix correct";
      } else {
        return "choix other-choices";
      }
    } else {
      if (selected) {
        return "choix selecetd";
      } else {
        return "choix";
      }
    }

    // if (ended) {
    //   if (selected && !correct) {
    //     return "choice-wrong";
    //   } else if (selected && correct) {
    //     return "choice-right";
    //   } else {
    //     return "no-choice";
    //   }
    // } else {
    //   if (selected) {
    //     return "choice-selected";
    //   } else {
    //     return "no-choice";
    //   }
    // }
  }

  return (
    <div>
      <p
        onClick={() => props.handleClick(props.question_id, props.choice_id)}
        className={colorController(props.select, props.correct, props.end)}
      >
        {he.decode(props.value)}
      </p>
    </div>
  );
}
