import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "../image/person.svg"
import styles from "./styles.module.css"
import classNames from "classnames"
import { useRef, useState } from "react"

type Props = {
    user: IUser,
    editMode: boolean,
    fornDataInfo: {position: string;}
  }

export default function Photo({user, editMode, fornDataInfo}: Props) {
    // ссылка на input type=file
    const inputFile = useRef<HTMLInputElement>(null)
    // ссылка на input type=submit
    const inputSubmit = useRef<HTMLInputElement>(null)
    
    const clickInput = () => {
        inputFile?.current?.click();
    }

    function clickSubmit() {
        inputSubmit?.current?.click();
    }

    async function submitForm (event: React.FormEvent<HTMLFormElement>)  {
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement)
        fd.append("key1", "value1")
        console.log(editMode)
        console.log(fd)
        if (editMode === false) {
            await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenManager.getAccess()}`
                },
                body: fd
                    })
        } else {
            await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenManager.getAccess()}`
                },
                body: fd
                    })
        }
            
    }   
    
    return (
        <form className={styles.root} id="form_elem" onSubmit={submitForm}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
            loading="lazy" id={styles.imgPhoto} onClick={clickInput}/> : <img src={person} loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>}
            <div>
                <input type="file" accept="image/*" ref={inputFile} className={styles.inputForm} name="photo" onChange={clickSubmit}/>
                <input type="submit" id="inputSubmit" ref={inputSubmit} className={classNames(editMode === true ? styles.disNon : styles.disBlok)}/>
            </div>
        </form>
            
    )
}