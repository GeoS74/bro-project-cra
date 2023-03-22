import styles from "./styles.module.css"

type Props = {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditRoleForm({setEditMode}: Props) {
  return <form onSubmit={(event) => _bundleRoleToUser(event, setEditMode)} className={styles.root}>
    <div className="form-group col-sm-5">
      <select name="roleId" className="form-select btn-outline-primary">
        <option value="0">Выберите роль</option>
        <option value="0">Выберите group</option>
        {/* {_makeOption()} */}
      </select>

      <input type="submit" value="Загрузить прайс" className="btn btn-outline-primary mt-4" />
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