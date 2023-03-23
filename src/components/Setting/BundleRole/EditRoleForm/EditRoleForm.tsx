import styles from "./styles.module.css"

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditRoleForm({setEditMode}: Props) {
  return <form onSubmit={(event) => _bundleRoleToUser(event, setEditMode)} className={styles.root}>
    <div className="form-group">
      <select name="roleId" className="form-select btn-outline-primary mt-2">
        <option value="0">Выберите роль</option>
        <option value="0">Выберите group</option>
        {/* {_makeOption()} */}
      </select>

      <input type="submit" value="Установить роль" className="btn btn-outline-primary mt-2" />
    </div>
  </form>
}

function _bundleRoleToUser(
  event: React.FormEvent<HTMLFormElement>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  ){
    event.preventDefault();
    setEditMode(false)
}