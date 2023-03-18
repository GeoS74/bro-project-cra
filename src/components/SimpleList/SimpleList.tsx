import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import SearchForm from "../SimpleList/SearchForm/SearchForm"
import Row from "./Row/Row"
import styles from "./styles.module.css"

type SimpleListConf = {
  brands: IListConf,
  providers: IListConf,
  roles: IListConf,
  directings: IListConf,
  tasks: IListConf,
  actions: IListConf
}

const dataList: SimpleListConf = {
  brands: {
    serviceName: 'bridge',
    title: "Список брендов",
    placeholderSearch: "поиск брендов",
    placeholder: "Бренд",
    api: "/api/bridge/brands",
  },
  providers: {
    serviceName: 'bridge',
    title: "Список поставщиков",
    placeholderSearch: "поиск поставщиков",
    placeholder: "Поставщик",
    api: "/api/bridge/providers",
  },
  roles: {
    serviceName: 'informator',
    title: "Список ролей",
    placeholderSearch: "поиск ролей",
    placeholder: "Роль",
    api: "/api/informator/role",
  },
  directings: {
    serviceName: 'informator',
    title: "Список направлений",
    placeholderSearch: "поиск направлений",
    placeholder: "Направление",
    api: "/api/informator/directing",
  },
  tasks: {
    serviceName: 'informator',
    title: "Список объектов",
    placeholderSearch: "поиск объектов",
    placeholder: "Объект",
    api: "/api/informator/task",
  },
  actions: {
    serviceName: 'informator',
    title: "Список действий",
    placeholderSearch: "поиск действий",
    placeholder: "Действие",
    api: "/api/informator/action",
  },
}

export default function SimpleList({ typeList }: { typeList: keyof SimpleListConf }) {
  const [idActiveRow, setIdActiveRow] = useState(-1)
  
  let preloadData = useLoaderData();
  if(!Array.isArray(preloadData)){
    preloadData = [];
  }
  const [rows, setRows] = useState(preloadData as IRow[])

  return <div className={styles.root}>
    <h3>{dataList[typeList].title}</h3>

    <SearchForm
      serviceName={dataList[typeList].serviceName}
      api={dataList[typeList].api}
      setIdActiveRow={setIdActiveRow}
      setRows={setRows}
      placeholderSearch={dataList[typeList].placeholderSearch} />


    <button type="button" className="btn btn-outline-light mt-4" onClick={() => setIdActiveRow(0)}>Новая запись</button>

    <ul className="mt-4">
      {idActiveRow === 0 ? <Row
        id={idActiveRow}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow}
        listConf={dataList[typeList]}
        addRow={(newRow: IRow) => setRows([newRow, ...rows])}
      /> : <></>}

      {_makeList(rows, idActiveRow, setIdActiveRow, dataList[typeList])}

      {idActiveRow !== 0 && !rows.length ? "пока нет ни одной записи" : <></>}
    </ul>
  </div>
}

function _makeList(
  rows: IRow[],
  idActiveRow: number,
  setIdActiveRow: React.Dispatch<React.SetStateAction<number>>,
  data: IListConf) {

  return rows
    /*
    * без сортировки порядок строк может быть неожиданным,
    * особенно после редактирования строк
    */
    .sort((a, b) => b.id - a.id)
    .map((value) => <Row
      key={value.id}
      id={value.id}
      title={value.title}
      idActiveRow={idActiveRow}
      setIdActiveRow={setIdActiveRow}
      listConf={data} />)
}
