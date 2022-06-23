import React from "react";

type Props = {};

const Iframe = (props: Props) => {
  return (
    <div>
      <iframe
        width={700}
        height={400}
        src="http://localhost:3000/"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Iframe;
