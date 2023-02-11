import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import Content from "./Content/Content";
import EditButton from "./EditButton/EditButton";
import EditForm from "./EditForm/EditForm";


export default function About() {
  const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [editMode, setEditMode] = useState(false)

  return <>
    <Navigate />

    {editMode ?
      <EditForm about={about} setAbout={setAbout} editMode={editMode} setEditMode={setEditMode} />
      : <>
        {/* эта кнопка должна быть доступна только админу */}
        <EditButton editMode={editMode} setEditMode={setEditMode} />

        <Content about={about} />
      </>}

  </>

}