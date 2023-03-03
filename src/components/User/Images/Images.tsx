import serviceHost from "../../../libs/service.host"
import tokenManager from "../../../classes/TokenManager"
import person from "./image/person.svg"
import styles from "./styles.module.css"

type imageProps = {
    stateImage: string,
    user: IUser,
    inputFile: React.RefObject<HTMLInputElement>
}

export default function Images({user, inputFile, stateImage}: imageProps) {
    console.log(stateImage)
    console.log(user.photo)

    const clickInput = () => {
        inputFile?.current?.click();
    }

    if (stateImage !== "") {
        return(
        <img src={`${serviceHost('informator')}/api/informator/user/photo/${stateImage}`} loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>)
    } else if (user.photo !== null) {
        return(
        <img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
        loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>  )
    } else {
        return (
            <img src={person} loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>
        )
    }
}



{/* {user.photo ? 
<img src={`${serviceHost('informator')}/api/informator/user/photo/${user.photo}`} 
loading="lazy" id={styles.imgPhoto} onClick={clickInput}/> : 
<img src={person} loading="lazy" id={styles.imgPhoto} onClick={clickInput}/>} */}