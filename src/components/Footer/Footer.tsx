import React, { useState } from "react";
import About from "../About/About";

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <footer className="h-[5vh] bg-slate-300 px-4 relative bottom-0 text-lg flex justify-between items-center">
      <a onClick={() => setAboutOpen(true)}>About</a>
      <p>Jonathan Potter 2022</p>
      {aboutOpen && <About close={() => setAboutOpen(false) } />}
    </footer>
  );
};

export default Footer;
