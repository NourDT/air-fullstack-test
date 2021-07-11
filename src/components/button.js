import React from "react";
import "../styles/components/button.scss";
function MyButton({
  children,
  parentClass = "btn-parent",
  className = "button",
  ...props
}) {
  return (
    <div className={parentClass}>
      <button className={className} {...props}>
        {children}
      </button>
    </div>
  );
}

export default MyButton;
