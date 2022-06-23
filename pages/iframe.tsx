import React from "react";

type Props = {};

const Iframe = (props: Props) => {
  return (
    <div>
      <iframe
        width={700}
        height={400}
        src="https://vitual-tour.vercel.app/"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Iframe;
