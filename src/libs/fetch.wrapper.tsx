/**
 * fetchWrapper - функция-обёртка над fetch запросом к БД
 * используется в случае, когда требуется контроль доступа с сервисам бэка
 * и бэк может вернуть статус 401 (не авторизован)
 * 
 * Логика:
 * 1) выполнить запрос
 * 2) если статус 401 выбросить исключение иначе вернуть результат
 * 3) проверить что выброшена ошибка с текстом "401"
 * 4) обновить токены
 * 5) если токены обновились, попытаться снова выполнить запрос
 * 6) если статус 401 выбросить исключение иначе вернуть результат
 * 7) если не одно условие не сработало вернуть отклоненный промис
 */

import tokenManager from "../classes/TokenManager"
import { check401 } from "../middleware/check.status.fetch.wrapper"

interface IFetchWrapper {
  (): Promise<Response>
} 

export default async function fetchWrapper(func: IFetchWrapper | IFetchWrapper[]) {
  try {

    if (Array.isArray(func)) {
      return await Promise.all(func.map(f => _thenable(f)))
    }
    return await _thenable(func)

  } catch (error: unknown) {

    if (error instanceof Error && error.message === "401") {
      try {
        if (await tokenManager.refreshTokens()) {

          if (Array.isArray(func)) {
            return await Promise.all(func.map(f => _thenable(f)))
          }
          return await _thenable(func)
        }
      }
      catch (e) { /**/ }
    }
  }
  return Promise.reject('error: fetch.wrapper')
}

function _thenable(func: IFetchWrapper) {
  return func()
    .then(check401)
}