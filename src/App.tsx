import React, { useState } from "react";
import { useGetAllGroupsQuery } from "./store/slices/groupSlice";
// components
import CreateGroup from "./components/CreateGroup/CreateGroup";
import Group from "./components/Group/Group";
// interfaces
import { Igroup } from "./interfaces/group";
// styles
import "./App.scss";

const App = () => {
  const { data, error, isLoading } = useGetAllGroupsQuery("");
  error && console.log(error);

  const [createOpen, setCreateOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState<Igroup | null>(null);

  return (
    <div className="app">
      <header>
        <h1>UPC Tracker</h1>
        <button onClick={() => setCreateOpen(true)}>Create New Group</button>
      </header>
      <div className="main">
        <h2>Saved Groups</h2>
        <section className="groups">
          {isLoading && <h1>Loading...</h1>}
          {data &&
            data.map((datum: any) => (
              <button onClick={() => setGroupOpen(datum)} key={datum._id}>
                {datum.title}
              </button>
            ))}
        </section>
      </div>
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
      {groupOpen && (
        <Group
          id={groupOpen._id}
          savedTitle={groupOpen.title}
          savedUpcs={groupOpen.upcs}
          close={() => setGroupOpen(null)}
        />
      )}
    </div>
  );
};

export default App;
