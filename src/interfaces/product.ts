export default interface IProduct {
  id: number
  name: string
  finalPrice: number
  display_name?: string
  quantity?: number
  percentStar?: number;
  image?: string
  inStock?: boolean
}