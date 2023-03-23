import { useState } from "react"

import EditRoleForm from "../EditRoleForm/EditRoleForm"
import styles from "./styles.module.css"

type Props = {
  rank: string,
}

export default function RolePane({ rank }: Props) {
  const [editMode, setEditMode] = useState(false)

  return <div className={styles.root}
    onMouseEnter={_showOptionalButton}
    onMouseLeave={_showOptionalButton}
  >
    {editMode ?
      <EditRoleForm setEditMode={setEditMode} /> :

        <p className="mt-2">Роль: {rank || "не назначена"}
          <span className="text-muted" hidden={true}
            onClick={() => setEditMode(true)}>назначить роль</span>
        </p>
    }
  </div>
}

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}