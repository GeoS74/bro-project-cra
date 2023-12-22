import { useState } from "react"
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator";
import classNames from "classnames";
import styles from "./styles.module.css"


export default function ContactSearchFormSimple() {
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme
  const navigate = useNavigate();

  return <form id="searchForm" className={styles.root}
    onSubmit={(event) => {
      event.preventDefault();
      navigate(`/contacts/?search=${event.currentTarget.search.value}`)
    }}>
    
    <fieldset>
      <input type="search" name="search" className="form-control" placeholder="Поиск контактов..."/>

      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />
    </fieldset>
  </form>
}
