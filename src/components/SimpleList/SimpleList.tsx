import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import classNames from "classnames";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { simpleListConfig as dataList } from "./simplelist.config"
import SearchForm from "../SimpleList/SearchForm/SearchForm"
import Row from "./Row/Row"
import styles from "./styles.module.css"

export default function SimpleList({ typeList }: { typeList: keyof ISimpleListConf }) {
  const [idActiveRow, setIdActiveRow] = useState(-1)

  let preloadData = useLoaderData();
  if (!Array.isArray(preloadData)) {
    preloadData = [];
  }
  const [rows, setRows] = useState(preloadData as ISimpleRow[])

  return <div className={styles.root}>
    <h3>{dataList[typeList].title}</h3>

    <SearchForm
      serviceName={dataList[typeList].serviceName}
      api={dataList[typeList].api}
      setIdActiveRow={setIdActiveRow}
      setRows={setRows}
      placeholderSearch={dataList[typeList].placeholderSearch} />

    <ThemeContext.Consumer>
      {({ theme }) => (
        <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
          onClick={() => setIdActiveRow(0)}>Новая запись</button>
      )}
    </ThemeContext.Consumer>

    <ul className="mt-4">
      {idActiveRow === 0 ? <Row
        id={idActiveRow}
        idActiveRow={idActiveRow}
        setIdActiveRow={setIdActiveRow}
        listConf={dataList[typeList]}
        addRow={(newRow: ISimpleRow) => setRows([newRow, ...rows])}
      /> : <></>}

      {_makeList(rows, idActiveRow, setIdActiveRow, dataList[typeList])}

      {idActiveRow !== 0 && !rows.length ? "пока нет ни одной записи" : <></>}
    </ul>
  </div>
}

function _makeList(
  rows: ISimpleRow[],
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