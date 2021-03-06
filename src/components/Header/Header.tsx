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
    <header className="h-[15vh] bg-slate-300 px-4 relative bottom-0 text-lg flex justify-between items-center">
      <h1>UPC Tracker</h1>
      {user && (
        <button className="create-new" onClick={() => setCreateOpen(true)}>
          Create New Group
        </button>
      )}
      {user ? (
        <button className="logout" onClick={logOut}>
          Log Out
        </button>
      ) : null}
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </header>
  );
};

export default Header;
