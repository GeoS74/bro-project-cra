interface IDoc {
  id: string
  title: string
  description: string
  directing: IRow
  task: IRow
  author: IRow
  files: IDocFile[]
}

interface IDocFile {
  originalName: string
  fileName: string
}

interface IErrorDocMessage {
  message: string
  field: string
}