import { css } from "@emotion/react";
import { PuffLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;

function MyLoader({ loading, color = "#339dff" }) {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <div className="sweet-loading">
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default MyLoader;
