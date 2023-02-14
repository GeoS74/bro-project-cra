/*
* интерфейс объекта, возвращаемого бэкендом при успешной авторизации
*/
interface IAuthResponse {
  access: string
  refresh: string
}
/*
* интерфейс объекта ошибки формы авторизации/регистрации
*/
interface IErrorAuthMessage {
  message: string
  field: string
}
/*
* тип, устанавливающий возможные значения режима формы авторизации/регистрации
*/
type formMode = "signin" | "signup" | "forgot"
/*
* тип, устанавливающий возможные значения режима информационного сообщения (подтверждение email, сброс пароля)
*/
type infoCardMode = "confirm" | "recovery"