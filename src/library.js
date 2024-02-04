import React from "react";

export const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "rgb(247 58 58)" : "white",
    color: props.isHeld ? "white" : "black",
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
};
