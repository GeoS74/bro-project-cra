import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "../image/person.svg"
import styles from "./styles.module.css"
import { useRef, useState } from "react"

type Props = {
    user: IUser,
    editMode: boolean
  }

export default function Photo({user, editMode}: Props) {
    const [state, setState] = useState(false)
    // ссылка на input type=file
    const inputFile = useRef<HTMLInputElement>(null)
    // ссылка на input type=submit
    const inputSubmit = useRef<HTMLInputElement>(null)
    
    const createInput = () => {
        inputFile?.current?.click();
    }

    function foo() {
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
                    }).finally(() => setState(!state))
            
    }   
    
    return (
        <form className={styles.root} id="form_elem" onSubmit={submitForm}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
            loading="lazy" id={styles.imgPhoto} onClick={createInput}/> : <img src={person} loading="lazy" id={styles.imgPhoto} onClick={createInput}/>}
            <div>
                <input type="file" accept="image/*" ref={inputFile} className={styles.inputForm} name="photo" onChange={foo} data-foo ={state}/>
                <input type="submit" id="inputSubmit" ref={inputSubmit}/>
            </div>
        </form>
            
    )
}