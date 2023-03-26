import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import Content from "./Content/Content";
import EditButton from "./EditButton/EditButton";
import EditForm from "./EditForm/EditForm";
import me from "../../libs/token.manager"

import session from "../../libs/token.manager"

export default function About() {
  const [about, setAbout] = useState(useLoaderData() as IAbout | undefined)
  const [editMode, setEditMode] = useState(false)

  const [update, setUpdate] = useState(false);
  session.subscribe('about', setUpdate);

  return <>
    <Navigate />

    {editMode ?
      <EditForm about={about} setAbout={setAbout} editMode={editMode} setEditMode={setEditMode} />
      : <>
        {/* эта кнопка должна быть доступна только админу */}
        {me.getMe()?.rank === 'admin' ? <EditButton editMode={editMode} setEditMode={setEditMode} /> : <></> }
         
        <Content about={about} />
      </>}
  </>
}