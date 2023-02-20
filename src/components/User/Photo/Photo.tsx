import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "../image/person.svg"
import styles from "./styles.module.css"

type Props = {
    user: IUser,
    editMode: boolean
  }

export default function Photo({user, editMode}: Props) {
    // if (editMode === true) {
    //     const imgElement = document.getElementById("imgPhoto")
    //     imgElement?.setAttribute("click", "createInput()")
    //     console.log(imgElement)
    // } else if (editMode === false) {
    //     const imgElement = document.getElementById("imgPhoto")
    //     imgElement?.removeAttribute("click")
    // }
    
    
    return (
        <form className={styles.root} id="formElem">
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} loading="lazy" id="imgPhoto" onClick={editMode ? createInput : undefined}/> : <img src={person} loading="lazy" id="imgPhoto" onClick={editMode ? createInput : undefined}/>}
            {/* <div>
                <input type="file" accept="image/*"/>
                <input type="submit" />
            </div> */}
        </form>
            
    )
}


function createInput() {
    const inputElement = document.createElement("input")
    inputElement.type = "file"
    inputElement.accept="image/*"
    inputElement.name="photo"
    inputElement.click()
    inputElement.onchange=(event) => {
        event.preventDefault;
        console.log(inputElement.value)
        const fd = new FormData
        fd.append("photo", inputElement.value)
        fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
                        method: 'PATCH',
                        headers: {
                          'Authorization': `Bearer ${tokenManager.getAccess()}`
                        },
                        body: fd
                         })





        // if (formElem !== null) {
        //     formElem.onsubmit = async () => {
        //         console.log(1)
        //         await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
        //             method: 'PATCH',
        //             headers: {
        //               'Authorization': `Bearer ${tokenManager.getAccess()}`
        //             },
        //             body: new FormData
            
        //              })
        //     }
        // }
        
    }
    
    
    
    
    
    
    
    
    
    // fetchPhoto(new FormData(inputElement))
    }

// function fetchPhoto(fd: FormData) {
//     await fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
//             method: 'PATCH',
//             headers: {
//               'Authorization': `Bearer ${tokenManager.getAccess()}`
//             },
//             body: fd
    
//              })
// }