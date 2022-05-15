import React, { useState, FC } from "react";
// utils
import { useAppSelector } from "../../store/hooks";
// components
import CreateGroup from "../CreateGroup/CreateGroup";

interface Iprops {
  logOut: () => void;
}

const Header: FC<Iprops> = ({ logOut }) => {
  // get user from redux store
  const { user } = useAppSelector((state) => state.auth);

  // state for showing modal
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <header className="h-[25vh] bg-slate-300 flex flex-col items-center justify-around">
      <h1 className="text-3xl w-fit">UPC Tracker</h1>
      <div className="container w-full flex flex-row justify-around">
        {user && (
          <button onClick={() => setCreateOpen(true)}>Create New Group</button>
        )}
        {user ? (
          <button onClick={logOut}>Log Out</button>
        ) : (
          <a href="mailto: jonathan.d.potter@outlook.com?subject=UPC TRACKER API KEY REQUEST">
            <button>request api key</button>
          </a>
        )}
      </div>
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </header>
  );
};

export default Header;
