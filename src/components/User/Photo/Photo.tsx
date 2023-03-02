import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import styles from "./styles.module.css"
import { useRef, useState } from "react"
import Images from "../Images/Images"
import { json } from "stream/consumers"

type Props = {
    user: IUser,
  }

export default function Photo({user}: Props) {
    // ссылка на input type=file
    const inputFile = useRef<HTMLInputElement>(null)
    // ссылка на input type=submit
    const inputSubmit = useRef<HTMLInputElement>(null)

    const [stateImage, setStateImage] = useState("")    

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
                .then((respon) => {
                    if (respon.ok) {
                        return respon.json()
                    }
                })
                .then((data) => {
                    setStateImage(data.photo)
                })  
    }   
    
    return (
        <form className={styles.root} id="form_elem" onSubmit={submitForm}>
            <Images user={user} inputFile={inputFile} stateImage={stateImage}/>
            <div>
                <input type="file" accept="image/*" ref={inputFile} className={styles.inputForm} name="photo" onChange={clickSubmit}/>
                <input type="submit" id="inputSubmit" ref={inputSubmit} className={styles.inputForm}/>
            </div>
        </form>
            
    )
}