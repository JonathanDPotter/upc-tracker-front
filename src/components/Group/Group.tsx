import React, { FC, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// styles
import "./Group.scss";

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
  // get portal for modal
  const portal = document.getElementById("portal");

  // get auth token from redux store
  const { token } = useAppSelector((state) => state.auth);

  // local state for form data
  const initialState: IformState = {
    title: savedTitle,
    upcs: "",
  };

  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  // variable to hold the name of the submit button used
  const [submitter, setSubmitter] = useState<string | null>(null);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;
    if (id === "upcs") {
      const numbers = /[\d\s]*/;
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

    let newArray: number[] = [...savedUpcs];

    if (submitter === "add") {
      upcsToNumberArray.forEach((upc) => newArray.push(upc));
    } else if (submitter === "delete") {
      upcsToNumberArray.forEach((upc) => {
        newArray = newArray.filter((savedUpc) => savedUpc !== upc);
      });
    }
    // removes duplicate upcs
    const noDupes = [...new Set(newArray)];

    // send to api
    try {
      if (token) {
        const response = await api.updateGroup(id, token, {
          title,
          upcs: noDupes,
        });
        console.log(response);
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteGroup = async () => {
    if (token && window.confirm("Are you sure?")) {
      await api.deleteGroup(id, token);
      window.location.reload();
    }
  };

  const copyToClipboard = async () => {
    let savedToString: string[] = [];
    savedUpcs.forEach((upc) => {
      savedToString.push(upc.toString());
    });

    await navigator.clipboard.writeText(savedToString.join(" \n"));
  };

  if (portal) {
    return createPortal(
      <div className="modal">
        <div className="edit card">
          <p className="group-title">{title}</p>
          <div className="side-by-side">
            <div className="saved">
              <p className="saved-label">Saved UPCs</p>
              <div className="upcs">
                {savedUpcs.map((upc, i) => {
                  return <p key={`title${i}`}>{upc}</p>;
                })}
              </div>
            </div>
            <form className="edit-form" action="submit" onSubmit={handleSubmit}>
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
              <input
                type="submit"
                value="add all"
                className="btn"
                onClick={() => setSubmitter("add")}
              />
              <input
                type="submit"
                value="remove all"
                className="btn"
                onClick={() => setSubmitter("delete")}
              />
            </form>
          </div>
          <div className="buttons">
            <button onClick={copyToClipboard}>Copy Saved</button>
            <button onClick={close}>cancel</button>
            <button className="delete" onClick={deleteGroup}>Delete</button>
          </div>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default Group;
