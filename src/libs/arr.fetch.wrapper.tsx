import tokenManager from "../classes/TokenManager"

interface IArrFetchWrapper {
  (): Promise<Response>
}

export default async function arrFetchWrapper(arrFetch: IArrFetchWrapper[]) {
  try {

    return await Promise.all(arrFetch.map(f => _thenable(f)))

  } catch (error: unknown) {

    if (error instanceof Error && error.message === "401") {
      try {
        if (await tokenManager.refreshTokens()) {
          
          return await Promise.all(arrFetch.map(f => _thenable(f)))
        }
      }
      catch (e) { /**/ }
    }
  }
  return Promise.reject('error: arr.fetch.wrapper')
}

function _thenable(func: IArrFetchWrapper) {
  return func()
    .then(response => {
      if (response.status === 401) {
        throw new Error("401")
      }
      return response
    })
}