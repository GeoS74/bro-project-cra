type Props = {
  editMode: boolean
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditButton({ editMode, setEditMode }: Props) {
  return <input
    type="submit"
    className="btn btn-outline-light mt-4"
    onClick={() => setEditMode ? setEditMode(!editMode) : undefined}
    defaultValue={editMode ? "Сохранить изменения" : "Редактировать страницу"}
  />

}