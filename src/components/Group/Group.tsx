import React, { FC, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
// utils
import api from "../../api";

interface Iprops {
  id: string;
  savedTitle: string;
  savedUpcs: number[];
  close: () => void;
}

interface IformState {
  title: string;
  upcs: string;
}

const Group: FC<Iprops> = ({ id, savedTitle, savedUpcs, close }) => {
  const portal = document.getElementById("portal");

  let upcsToString = "";

  const initialState: IformState = {
    title: savedTitle,
    upcs: "",
  };

  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;
    if (id === "upcs") {
      const numbers = /[\d\s]/;
      const total = value.split("");
      const newChar = total[total.length - 1];
      if (!numbers.test(newChar)) return;
    }
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const upcsToNumberArray: number[] = [];
    upcs
      .trim()
      .split("\n")
      .forEach((upc) => upcsToNumberArray.push(parseInt(upc)));
    try {
      console.log(upcsToNumberArray);
      const response = await api.updateGroup(id, {
        title,
        upcs: upcsToNumberArray,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    savedUpcs &&
      savedUpcs.forEach((upc) => {
        upcsToString = upcsToString + upc.toString() + "\n";
        setFormState({ ...formState, upcs: upcsToString });
      });
  }, []);

  if (portal) {
    return createPortal(
      <div className="modal">
        <div className="card">
          <h2>Create Group</h2>
          <form action="submit" onSubmit={handleSubmit}>
            <div className="label-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title ? title : ""}
                onChange={handleChange}
              />
            </div>
            <div className="label-input">
              <label htmlFor="upcs">UPCs</label>
              <textarea
                name="upcs"
                id="upcs"
                cols={13}
                rows={10}
                value={upcs ? upcs : ""}
                onChange={handleChange}
              ></textarea>
            </div>
            <input type="submit" value="save" className="btn" />
          </form>
          <button onClick={close}>cancel</button>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default Group;
