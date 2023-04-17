import classNames from "classnames";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

type Props = {
  editMode: boolean
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditButton({ editMode, setEditMode }: Props) {
  return <ThemeContext.Consumer>
    {({ theme }) => (
      <input
        type="submit"
        className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
        onClick={() => setEditMode ? setEditMode(!editMode) : undefined}
        value={editMode ? "Сохранить изменения" : "Редактировать страницу"}
      />
    )}
  </ThemeContext.Consumer>
}