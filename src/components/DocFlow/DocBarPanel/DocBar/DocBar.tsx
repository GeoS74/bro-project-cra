import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import tokenManager from "../../../../libs/token.manager";
import serviceHost from "../../../../libs/service.host";
import fetchWrapper from "../../../../libs/fetch.wrapper";
import { responseNotIsArray } from "../../../../middleware/response.validator"
import session from "../../../../libs/token.manager"
import styles from "./styles.module.css";

type Props = {
  path: string
  title: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>
  mode: DocBarMode
};

export default function DocBar({ path, title, Icon, mode }: Props) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  if (session.getMe() && !count) {
    const queryString = makeQueryString(mode, session.getMe()?.uid || "")
    getCountDocs(queryString, setCount)
  }

  // <Link to={path} className={styles.root} >
  //   <h5>{title}</h5>
  //   <Icon />
  //   <p>{count}</p>
  // </Link>

  return <div className={styles.root}
    onClick={() => navigate(path)}
  >
    <h5>{title}</h5>
    <Icon />
    <p>{count}</p>
  </div>
}

function getCountDocs(
  queryString: string,
  setCount: React.Dispatch<React.SetStateAction<number>>
) {
  fetchWrapper(() => fetch(`${serviceHost("informator")}/api/informator/docflow/search/doc/count/${queryString}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json()
        setCount(res.count);
      }

      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
}


function makeQueryString(mode: DocBarMode, uid: string) {
  switch (mode) {
    case "meAcceptor":
      return `?user=${uid}&acceptor=1`
    case "meRecipient":
      return `?user=${uid}&recipient=1`
    case "meAuthor":
      return `?user=${uid}&author=1`
  }
}