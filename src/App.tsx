import React, { useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import { useGetAllGroupsQuery } from "./store/slices/groupSlice";

const App = () => {
  const { data, error, isLoading } = useGetAllGroupsQuery("");
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <h1>UPC Tracker</h1>
      <h2>Saved Groups</h2>
      <div className="groups">
        {data && data.map((datum: any) => <h3>{datum.title}</h3>)}
      </div>
    </div>
  );
};

export default App;
