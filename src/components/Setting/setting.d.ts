interface IRole extends IRow {
  tasks: ITask[]
}

interface ITask extends IRow {
  actions: IRow[]
}
