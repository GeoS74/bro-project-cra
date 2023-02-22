import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "../image/person.svg"
import styles from "./styles.module.css"
import { useRef, useEffect, useState} from "react"

type Props = {
    user: IUser,
    editMode: boolean
  }

export default function Photo({user, editMode}: Props) {
    const [state, setState] = useState<string | undefined>("")
    const inputFile = useRef<HTMLInputElement>(null)
    const inputSubmit = useRef<HTMLInputElement>(null)

    const createInput = () => {
        inputFile?.current?.click();
        inputFile?.current?.onchange
        console.log({inputFile})
        setState(inputFile?.current?.value)
        // inputFile?.current?.onchange
        // setState(inputFile?.current?.value)
    }
    useEffect(() => {
        inputSubmit?.current?.click();        
    }, [state])
    
    return (
        <form className={styles.root} id="form_elem" onSubmit={(event) => {
            event.preventDefault();
            const fd = new FormData(event.target as HTMLFormElement)
            fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenManager.getAccess()}`
                },
                body: fd
                    })
        }}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
            loading="lazy" id={styles.imgPhoto} onClick={createInput}/> : <img src={person} loading="lazy" id={styles.imgPhoto} onClick={createInput}/>}
            <div>
                <input type="file" accept="image/*" ref={inputFile} className={styles.inputFile} name="photo"/>
                <input type="submit" id="inputSubmit" ref={inputSubmit}/>
            </div>
        </form>
            
    )
}


// async function onSubmitFoto(
//     event: React.FormEvent<HTMLFormElement>,
// ) {
//     event.preventDefault;
//     console.log(312312312312)
// }


    // inputFile.addEventListener('change', foo)
// }  

    // const inputElement = document.createElement("input")
    // inputElement.type = "file"
    // inputElement.accept="image/*"
    // inputElement.name="photo"
    // inputElement.click()
    // inputElement.onchange=(event) => {
    //     event.preventDefault;
    //     const formElem = document.getElementById("formElem")
    //     const fd = new FormData(formElem)
    //     fd.append("photo", inputElement.value)
    //     fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
    //                     method: 'PATCH',
    //                     headers: {
    //                       'Authorization': `Bearer ${tokenManager.getAccess()}`
    //                     },
    //                     body: fd
    //                      })





    //     if (formElem !== null) {
    //         formElem.onsubmit = async () => {
    //             console.log(1)
    //             await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
    //                 method: 'PATCH',
    //                 headers: {
    //                   'Authorization': `Bearer ${tokenManager.getAccess()}`
    //                 },
    //                 body: new FormData
            
    //                  })
    //         }
    //     }
        
    // }
    
    
    
    
    
    
    
    
    
    // fetchPhoto(new FormData(inputElement))
    // }

// function fetchPhoto(fd: FormData) {
//     await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
//             method: 'PATCH',
//             headers: {
//               'Authorization': `Bearer ${tokenManager.getAccess()}`
//             },
//             body: fd
    
//              })
// }