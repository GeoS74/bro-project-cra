/*
* интерфейс объекта ответа, возвращаемого микросервисом "bridge"
*/
interface ISearchResult {
  limit: number
  offset: number
  positions: IProduct[]
}

/*
* интерфейс объекта продукта, возвращаемого микросервисом "bridge"
*/
interface IProduct {
  createdAt: string
  brandId: number
  brantTitle: string
  providerId: number
  providerTitle: string
  code: string
  article: string
  title: string
  price: number
  amount: number
  manufacturer: string
  weight: number
  width: number
  height: number
  length: number
  manufacturer: string
  // amountBovid: number
  // storage: unknown
  // uid: string
}