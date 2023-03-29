interface IDoc {
    id: string
    title: string
    description: string
    directing: IRow
    task: IRow
}

interface IErrorDocMessage {
    message: string
    field: string
  }