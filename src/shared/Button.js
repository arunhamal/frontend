import React from "react";

const Button = (props) => {
  const { loading = false, title, ...rest } = props;
  return (
    <button
      type="button"
      class="btn btn-primary btn-block mb-4"
      {...rest}
    >
      {loading && (
        <span
          class="spinner-border"
          style={{
            fontSize: "12px",
            width: "20px",
            height: "20px",
            marginRight: "10px",
          }}
        ></span>
      )}
      {title}
    </button>
  );
};

export default Button;
