import React from 'react'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Select from 'react-select' 

import serviceHost from "../../../../libs/service.host"
import tokenManager from "../../../../libs/token.manager"

type PropsRoles = {
    directings: [],
    id: string,
    title: string
}

type Props = {
    uid: string,
    email: string,
    photo: string,
    name: string
    roles: Array<PropsRoles>,
}

export default function InputUser() {
    // список всех пользователей
    const [userList, setUserList] = useState(Array<string>)
    const [currentUserList, setCurrentUserList] = useState(Array<string>)
    const fechDataUser = async () => {
        const response = await fetch(`${serviceHost("informator")}/api/informator/user/all`, {
            headers: {
              'Authorization': `Bearer ${tokenManager.getAccess()}`
            }
          })
        if (!response.ok) {
            throw new Error(`Что то пошло не так ${response.status}`)
        } else {
            return response.json()
        }
    }

    useEffect(() => {
        fechDataUser()
        .then((res) => {
            const tempListOfUser = [] as Array<string>
            res.map((value: Props, index: number) => tempListOfUser.push(`${value.name} / ${value.roles[0].title}`))
            setUserList(tempListOfUser)

        })
        .catch((e) => {
            console.log(e.message)
        })
    }, [])
    console.log(userList)
    

    return ( 
        <div className={styles.searshForm}>
            <input type="text" 
                placeholder='Список подписантов'/>
            <ul className={styles.autoComplite}>
            {userList?.map((value, index) => 
                    <li value={value} key={index} className={styles.autoCompliteItem}>{value}</li>)}
            </ul>
        </div>
        // <div className={styles.root}>
        //     {currentUserList.length !== 0 ? currentUserList.map((value, index) => <p key={index}>{value}</p>) : <></>}

        //     {/* <label htmlFor="inputDropBox">Список подписантов</label>
        //     <select id="dropBox"
        //             onInput={(e) => console.log(e)}
        //             // onChange={(e) =>clickDataList(e, currentUserList, setCurrentUserList, userList, setUserList)} 
        //             >
        //         <option value=""></option>
        //         {userList?.map((value, index) => 
        //             <option value={value} key={index} >{value}</option>)}
        //     </select> */}
            
        // </div>
    )
}


function clickDataList(
    event: React.ChangeEvent<HTMLSelectElement>,
    currentUserList: string[],
    setCurrentUserList: React.Dispatch<React.SetStateAction<string[]>>,
    userList: string[],
    setUserList: React.Dispatch<React.SetStateAction<string[]>>
    ) {
    event.preventDefault;    
    if (event.target.value !== "") {
        if (!currentUserList.includes(event.target.value)) {
            setCurrentUserList([event.target.value, ...currentUserList])
            // const item = userList.indexOf(event.target.value)
            // console.log(item)
            // setUserList([userList])
        }
    }
    console.log(event.target.value)
}