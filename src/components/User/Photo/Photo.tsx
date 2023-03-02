import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "../image/person.svg"
import styles from "./styles.module.css"
import classNames from "classnames"
import { useRef, useState } from "react"

type Props = {
    user: IUser,
  }

export default function Photo({user}: Props) {
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
        await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${tokenManager.getAccess()}`
            },
            body: fd
                })
                // .then((respon) => {
                //     if (respon.ok) {

                //     }
                // })           
    }   
    
    return (
        <form className={styles.root} id="form_elem" onSubmit={submitForm}>
            {user.photo ? 
            <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
            loading="lazy" id={styles.imgPhoto} onClick={clickInput}/> : 
            <img src={person} loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>}
            <div>
                <input type="file" accept="image/*" ref={inputFile} className={styles.inputForm} name="photo" onChange={clickSubmit}/>
                <input type="submit" id="inputSubmit" ref={inputSubmit} className={styles.inputForm}/>
            </div>
        </form>
            
    )
}