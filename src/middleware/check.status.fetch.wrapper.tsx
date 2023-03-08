export function check401(response: Response){
  if (response.status === 401) {
    throw new Error("401")
  }
  return response
}