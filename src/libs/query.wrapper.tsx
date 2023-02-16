import tokenManager from "../classes/TokenManager"

export default async function queryWrapper<T>(func: T) {
  if(!(func instanceof Function)) {
    return
  }

  try {
    return await func()
  } catch (error: unknown) {

    if (error instanceof Error && error.message === "401") {
      try {
        if (await tokenManager.refreshTokens()) {
          return await func()
        }
      }
      catch (e) {/**/ }
    }
  }
}