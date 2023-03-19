import { useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

export default function BundleRole() {
  const [users, roles] = useLoaderData() as [IUser[], IRow[]];

  return <div className={styles.root}>
    <h3 className="mb-4">Привязка ролей пользователей</h3>

    {_makeList(users)}
  </div>
}

function _makeList(users: IUser[]) {
  return users.map(user => {
    return <div className="card mt-2" key={user.email}
      onMouseEnter={_showOptionalButton}
      onMouseLeave={_showOptionalButton}
    >

      <div>
        <p>
          Пользователь: {user.email}
        </p>

        <form onSubmit={(event) => false}>
          <div className="form-group col-sm-5">
            <select name="roleId" className="form-select" id="roleSelect">
              <option value="0">Выберите роль</option>
              {/* {_makeOption()} */}
            </select>

            <input type="submit" value="Загрузить прайс" className="btn btn-outline-light mt-4" />
          </div>
        </form>

        <span className="mt-2">Роль: Admin</span>
        <span className="text-muted" hidden={true}>назначить роль</span>

      </div>
    </div>
  })
}

// function _makeOption(roles: IRow[]){
//   const options = [];

//   options.push('<option></option>')
// }

function _showOptionalButton(event: React.MouseEvent<HTMLParagraphElement>) {
  const optionalButton = event.currentTarget.querySelectorAll('span')[1] as HTMLElement;
  optionalButton.hidden = !optionalButton.hidden ;
}