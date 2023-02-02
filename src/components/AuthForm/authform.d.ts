/*
* интерфейс объекта ошибки форрмы авторизации/регистрации
*/
interface IErrorAuthMessage {
  message: string,
  field: string,
}
/*
* тип, устанавливающий возможные значения режима формы авторизации/регистрации
*/
type formMode = "signin" | "signup" | "forgot"