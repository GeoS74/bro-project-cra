export default function actionFinder(
  role?: IRole, 
  idDirecting?: number, 
  idTask?: number, 
  action?: ActionMode,
  ): boolean {
  return !!role
    ?.directings.find(e => e.id === idDirecting)
    ?.tasks.find(e => e.id === idTask)
    ?.actions.find(e => e.title === action);
}
