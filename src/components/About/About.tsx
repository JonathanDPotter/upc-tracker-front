import React, { FC } from "react";
import { createPortal } from "react-dom";

interface Iprops {
  close: () => void;
}

const About: FC<Iprops> = ({ close }) => {
  const portal = document.getElementById("portal");

  if (portal) {
    return createPortal(
      <div className="modal">
        <div className="card p-[2rem] max-w-[500px]">
          <h2 className="page-title">About</h2>
          <p>
            {`\tThis is an app that I made in order to keep lists of UPCs. The UPCs can be entered one at a time or pasted in from excel and can be copied and pasted back into excel.\n`}
          </p>
          <br />
          <p className="text-prewrap">
            {`\tThe back-end is written in typescript with express and this front-end is written in typescript with React. The repo for this app can be found on GitHub `}
            <a
              className="text-blue-600"
              target="_blank"
              href="https://github.com/JonathanDPotter/upc-tracker-front"
            >
              here.
            </a>
          </p>
          <button onClick={close}>Close</button>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default About;
