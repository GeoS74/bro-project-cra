import React from 'react'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'

import serviceHost from "../../../../libs/service.host"
import tokenManager from "../../../../libs/token.manager"
import session from "../../../../libs/token.manager";

export default function InputUser(
    {currentUserList, setCurrentUserList}: 
    {currentUserList: string[], setCurrentUserList: React.Dispatch<React.SetStateAction<string[]>>}) {
    session.subscribe('DocFlow/InputUser');    

    // Проверка что в input что то ввели
    const [valueInput, setValueInput] = useState<string>('')
    // проверка открыт список всех пользователей или нет
    const [isOpen, setIsOpen] = useState(false)
    // список который будет отображаться при вводк
    const [displayList, setDisplayList] = useState(Array<Array<string>>)

    useEffect(() => {
        fechInput(valueInput)
        .then((res) => {
            const tempArray = [] as Array<Array<string>>
            res.map((value: PropsUserList) =>{
                const temp = []
                temp.push(value.uid)
                temp.push(value.name)
                tempArray.push(temp)
          })
          setDisplayList(tempArray)
        })
        .catch((e) => {console.log(e.message)})
    }, [valueInput])

    return (
        <div className={styles.searshForm}>
            <input type="text" 
                placeholder='Список подписантов'
                value={valueInput}
                onChange={(event) => {
                    onChangeInput(event, setValueInput, setIsOpen)}}
                onClick={() => inputClick(setIsOpen, isOpen)}/>
            <ul className={styles.autoComplite}>
            { isOpen 
                ? displayList?.map((value, index) => 
                    <li value={value} 
                        key={index} 
                        className={styles.autoCompliteItem}
                        onClick={(event) => itemClick(event, setValueInput, setIsOpen, currentUserList, setCurrentUserList)}
                        >{value[1]}</li>) 
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
    setCurrentUserList: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (event.currentTarget.textContent !== null) {        
        setCurrentUserList([event.currentTarget.textContent, ...currentUserList])
        setValueInput('')
        setIsOpen(false)
    }
        
}

function inputClick(
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
) {
    setIsOpen(!isOpen)
}

function onChangeInput(event: React.ChangeEvent<HTMLInputElement>, 
    setValueInput: React.Dispatch<React.SetStateAction<string>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
    setIsOpen(true)
    setValueInput(event.target.value)
}
// запрос на бэк по введеным значениям в input
const fechInput = async (value: string) => {
    const response = await fetch(`${serviceHost("informator")}/api/informator/user/search/?email=${value}`, {
        headers: {
          'Authorization': `Bearer ${tokenManager.getAccess()}`
            }
          })
        if (!response.ok) {
            throw new Error(`Что то пошло не так ${response.status}`)
        } else {
            return await response.json()
        }
    }