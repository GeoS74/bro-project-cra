interface IRole extends IRow {
  directings: IDirecting[]
}

interface IDirecting extends IRow {
  tasks: ITask[]
}

interface ITask extends IRow {
  actions: IRow[]
}
