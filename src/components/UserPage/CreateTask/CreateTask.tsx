import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import BackArrow from "../BackArrow/BackArrow"
import SearchForm from "../../DocFlow/SearchForm/SearchForm"
import session from "../../../libs/token.manager"
import DocSelectType from "../DocSelectType/DocSelectType";

const docsLimit = 25;

export default function CreateTask() {
    session.subscribe('task');
    const [docs, setDocs] = useState(useLoaderData() as IDoc[])
    const [showForm, setShowForm] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true)
    const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
    console.log(docs)

    return (
        <div>           
            <DocSelectType setShowForm={setShowForm} addDoc={(newDoc: IDoc) => setDocs([newDoc, ...docs])} />
            
        </div>
)}