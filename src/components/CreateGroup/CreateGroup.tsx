import React, { FC, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";

interface Iprops {
  close: () => void;
}

interface IformState {
  title: string;
  upcs: string;
}

const CreateGroup: FC<Iprops> = ({ close }) => {
  // get portal for modal render
  const portal = document.getElementById("portal");

  // get auth from redux
  const { token } = useAppSelector((state) => state.auth);

  // local state for form
  const initialState: IformState = { title: "", upcs: "" };

  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  // handle change and submit for form
  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;
    // prevents non-digits from being entered into the upc input
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
    
    // eliminates duplicate UPCs 
    const noDupes = [...new Set(upcsToNumberArray)]
    
    // send to api
    try {
      if (token) {
        const response = await api.createGroup(token, {
          title,
          upcs: noDupes,
        });
        console.log(response);
      }
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  if (portal) {
    return createPortal(
      <div className="modal">
        <div className="card flex flex-col items-center">
          <h2 className="card-title">Create Group</h2>
          <form action="submit" onSubmit={handleSubmit}>
            <div className="label-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleChange}
                maxLength={25}
              />
            </div>
            <div className="label-input">
              <label htmlFor="upcs">UPCs</label>
              <textarea
                name="upcs"
                id="upcs"
                cols={13}
                value={upcs}
                onChange={handleChange}
              ></textarea>
            </div>
            <input type="submit" value="save" className="btn w-fit" />
          </form>
          <button className="w-[30vw]" onClick={close}>cancel</button>
        </div>
      </div>,
      portal
    );
  } else {
    return <></>;
  }
};

export default CreateGroup;
