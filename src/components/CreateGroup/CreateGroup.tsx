import React, { FC, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
// utils
import api from "../../api";
// styles
import "./CreateGroup.scss";

interface Iprops {
  close: () => void;
}
interface IformState {
  title: string;
  upcs: string;
}

const CreateGroup: FC<Iprops> = ({ close }) => {
  const portal = document.getElementById("portal");

  const initialState: IformState = { title: "", upcs: "" };

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
    
    // converts the string from the upcs textarea to an array of numbers to send to the api
    const upcsToNumberArray: number[] = [];

    upcs
      .trim()
      .split("\n")
      .forEach((upc) => upcsToNumberArray.push(parseInt(upc)));

    try {
      const response = await api.createGroup({
        title,
        upcs: upcsToNumberArray,
      });
      console.log(response);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

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
                value={title}
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
                value={upcs}
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

export default CreateGroup;
