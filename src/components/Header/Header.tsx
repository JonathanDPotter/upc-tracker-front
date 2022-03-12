import React, { useState, FC } from "react";
// utils
import { useAppSelector } from "../../store/hooks";
// components
import CreateGroup from "../CreateGroup/CreateGroup";
// styles
import "./Header.scss";

interface Iprops {
  logOut: () => void;
}

const Header: FC<Iprops> = ({ logOut }) => {
  // get user from redux store
  const { user } = useAppSelector((state) => state.auth);

  // state for showing modal
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <header>
      <h1>UPC Tracker</h1>
      {user && (
        <button className="create-new" onClick={() => setCreateOpen(true)}>Create New Group</button>
      )}
      {user ? (
        <button className="logout" onClick={logOut}>
          Log Out
        </button>
      ) : (
        <a
          href="mailto: jonathan.d.potter@outlook.com?
        subject=UPC TRACKER API KEY REQUEST"
        >
          <button className="api-request">request api key</button>
        </a>
      )}
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </header>
  );
};

export default Header;