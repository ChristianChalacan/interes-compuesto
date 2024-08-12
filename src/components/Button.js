import React from "react";

const Button = ({ children, ...props }) => {
  const styles = {
    button: {
      background: "palevioletred",
      color: "white",
      fontSize: "1em",
      padding: "0.25em 1em",
      border: "2px solid palevioletred",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };
  return (
    <button style={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
