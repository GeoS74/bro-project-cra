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
        <form className={styles.root}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} loading="lazy" id="imgPhoto" onClick={editMode ? createInput : undefined}/> : <img src={person} loading="lazy" id="imgPhoto" onClick={editMode ? createInput : undefined}/>}
            <div>
                {/* <input type="file" accept="image/*"/> */}
                <input type="submit" />
            </div>
        </form>
            
    )
}


function createInput() {
    const inputElement = document.createElement("input")
    inputElement.type = "file"
    inputElement.accept="image/*"
    inputElement.click()
    inputElement.onchange=() => console.log(inputElement.value)
    }
function fetchPhoto() {
    fetch(`${serviceHost("informator")}/api/informator/user/photo`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${tokenManager.getAccess()}`
            },
            body: fd
    
             })
}

    // fetch(`${serviceHost("informator")}/api/informator/about/${alias || ""}`, {
    //     method: alias ? 'PATCH' : 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${tokenManager.getAccess()}`
    //     },
    //     body: fd

       //   })