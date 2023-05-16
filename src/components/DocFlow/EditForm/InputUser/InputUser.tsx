import React from 'react'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'

import serviceHost from "../../../../libs/service.host"
import tokenManager from "../../../../libs/token.manager"
import session from "../../../../libs/token.manager";

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

export default function InputUser(
    {currentUserList, setCurrentUserList, userList, setUserList}: 
    {currentUserList: string[], setCurrentUserList: React.Dispatch<React.SetStateAction<string[]>>, userList: string[], setUserList: React.Dispatch<React.SetStateAction<string[]>>}) {
    session.subscribe('DocFlow/InputUser');
    // Проверка что в input что то ввели
    const [valueInput, setValueInput] = useState<string>('')
    // проверка открыт список всех пользователей или нет
    const [isOpen, setIsOpen] = useState(false)   

    const filterUser = userList.filter(user => {
        return user.toLowerCase().includes(valueInput.toLowerCase())
    })

    return (
        <div className={styles.searshForm}>
            <input type="text" 
                placeholder='Список подписантов'
                value={valueInput}
                onChange={(event) => {setValueInput(event.target.value); setIsOpen(true)}}
                onClick={() => inputClick(setIsOpen, isOpen)}/>
            <ul className={styles.autoComplite}>
            {  isOpen 
                ? filterUser?.map((value, index) => 
                    <li value={value} 
                        key={index} 
                        className={styles.autoCompliteItem}
                        onClick={(event) => itemClick(event, setValueInput, setIsOpen, currentUserList, setCurrentUserList, userList, setUserList,  index)}
                        >{value}</li>) 
                : null}
            </ul>
        </div>     
    )
}

function itemClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setValueInput: React.Dispatch<React.SetStateAction<string>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentUserList: string[],
    setCurrentUserList: React.Dispatch<React.SetStateAction<string[]>>,
    userList: string[],
    setUserList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
) {
    if (event.currentTarget.textContent !== null) {        
        setCurrentUserList([event.currentTarget.textContent, ...currentUserList])
        setValueInput('')
        setIsOpen(false)
        userList.splice(index, 1)
    }
        
}

function inputClick(
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
) {
    setIsOpen(!isOpen)
}