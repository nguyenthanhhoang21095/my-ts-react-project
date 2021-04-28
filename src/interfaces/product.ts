export interface IProduct {
  id: number
  name: string
  final_price: number
  display_name?: string
  img_cover?: string
  inStock?: boolean
  checkInStock: (id: number, name: string) => boolean
  showMessage: (prod_name: string, text: string) => void
}

export class CProduct implements IProduct {
  id: number
  name: string
  display_name: string
  img_cover: string
  final_price: number
  inStock: boolean

  showMessage = (prod_name: string, text: string): void => {
    console.log(`Sản phẩm ${prod_name} ${text}`)
  }

  checkInStock = (product_id: number, product_name: string): boolean => {
    if (product_id === this.id && this.inStock) {
      return true
    }
    this.showMessage(product_name, 'hiện tại không còn hàng')
    return false
  }

  constructor(
    id: number,
    name: string,
    final_price: number,
    display_name = '',
    img_cover = '',
    inStock = true
  ) {
    this.id = id
    this.name = name
    this.final_price = final_price
    this.display_name = display_name
    this.img_cover = img_cover
    this.inStock = inStock
  }
}
