import React, { useState } from "react";
// components
import Group from "../Group/Group";
// utils
import { useGetAllGroupsQuery } from "../../store/slices/groupSlice";
// interfaces
import { Igroup } from "../../interfaces/group";

const Home = () => {
  // get group data from redux store
  const { data, error, isLoading } = useGetAllGroupsQuery("");
  error && console.log(error);

  // state for showing modal
  const [groupOpen, setGroupOpen] = useState<Igroup | null>(null);

  return (
    <div className="page flex flex-col align-center">
      <h2 className="page-title">Saved Groups</h2>
      {isLoading && <h1>Loading...</h1>}
      {data &&
        data.map((datum: any) => (
          <button onClick={() => setGroupOpen(datum)} key={datum._id}>
            {datum.title}
          </button>
        ))}
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

export default Home;
