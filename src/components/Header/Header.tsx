import React, { useState, FC } from "react";
import { useAppSelector } from "../../store/hooks";
import CreateGroup from "../CreateGroup/CreateGroup";

interface Iprops {
  logOut: () => void;
}

const Header: FC<Iprops> = ({ logOut }) => {
  // get user from redux store
  const { user } = useAppSelector((state) => state.auth);

  // state for showing modal
  const [createOpen, setCreateOpen] = useState(false);

  const apiKeyRequest = () => {
    // fill this out
  };

  return (
    <header>
      <h1>UPC Tracker</h1>
      {user && (
        <button onClick={() => setCreateOpen(true)}>Create New Group</button>
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
          <button className="logout">request api key</button>
        </a>
      )}
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </header>
  );
};

export default Header;
