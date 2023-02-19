import serviceHost from "../../../libs/service.host"
import person from "../image/person.svg"
import styles from "./styles.module.css"

type Props = {
    user: IUser
  }

export default function Photo({user}: Props) {
    return (
        <form className={styles.root}>
            {user.photo ? <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} loading="lazy" onClick={createInput}/> : <img src={person} loading="lazy" onClick={createInput}/>}
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

    // fetch(`${serviceHost("informator")}/api/informator/about/${alias || ""}`, {
    //     method: alias ? 'PATCH' : 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${tokenManager.getAccess()}`
    //     },
    //     body: fd
    //   })