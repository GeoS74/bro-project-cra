import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import Content from "./Content/Content";
import EditButton from "./EditButton/EditButton";
import EditForm from "./EditForm/EditForm";

export default function About() {
  console.log(useLoaderData())

  const loaderData = useLoaderData() as [IAbout | undefined, IUser]

  const [about, setAbout] = useState(loaderData[0])
  const [editMode, setEditMode] = useState(false)

  return <>
    <Navigate />

    {editMode ?
      <EditForm about={about} setAbout={setAbout} editMode={editMode} setEditMode={setEditMode} />
      : <>
        {/* эта кнопка должна быть доступна только админу */}
        {loaderData[1].rank === 'admin' ? <EditButton editMode={editMode} setEditMode={setEditMode} /> : <></> }
         

        <Content about={about} />
      </>}
  </>
}