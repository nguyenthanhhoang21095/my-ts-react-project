import { IProduct, CProduct } from './product'

export interface ICart {
  id: number
  name: string
  quantity: number
  final_price: number
  addToCart: (prodInfo: IProduct) => number
  decreaseQty: (prodInfo: IProduct) => void
  increaseQty: (prodInfo: IProduct) => void
  resetCart: () => void
  checkCart: () => Record<string, (number | boolean)>
}

export class CCart implements ICart {
  id: number
  name: string
  quantity: number
  final_price: number

  checkCart = (): Record<string, (number | boolean)> => {
    if (this.quantity === 0) {
      console.log('Giỏ hàng hiện tại đang trống')
      return {
        quantity: this.quantity,
        status: false
      }
    }
    console.log(
      `Giỏ hàng hiện tại đang có: ${this.name} x${this.quantity} với giá ${this.final_price} VND`
    )
    return {
      quantity: this.quantity,
      status: true
    }
  }

  addToCart = (prodInfo:Partial<IProduct>): number => {
    const { final_price = 0, id = 0, name = '' } = prodInfo
    console.log('prodInfo', prodInfo);
    const handleProduct = new CProduct(id, name, final_price);
    
    if (!handleProduct.checkInStock(id, name)) {
      return this.quantity;
    };
    if (!this.checkCart().status) {
      handleProduct.showMessage(name, 'đã được thêm vào giỏ hàng')
      this.quantity += 1
      this.id = id
      this.name = name
      this.final_price = this.quantity * final_price
      console.log('quantityYYYYYYYYYYYYY', this.quantity);
      return this.quantity;
    }
  }

  decreaseQty = (prodInfo: IProduct): void => {
    const { final_price = 0, id = 0, name = '' } = prodInfo
    if (this.id === id) {
      this.quantity -= 1
      this.final_price = this.quantity * final_price
      if (this.quantity > 0) {
        prodInfo.showMessage(name, `hiện tại đang có số lượng là: ${this.quantity} trong giỏ hàng`)
      } else {
        this.quantity = 0
        this.id = 0
        this.name = ''
        this.final_price = this.quantity * final_price
        prodInfo.showMessage(name, `đã được xóa khỏi giỏ hàng`)
      }
    }
  }

  increaseQty = (prodInfo: IProduct): void => {
    const { final_price = 0, id = 0, name = '' } = prodInfo

    if (this.id === id) {
      prodInfo.showMessage(name, `hiện tại đang có số lượng là: ${this.quantity} trong giỏ hàng`)
      this.quantity += 1
      this.final_price = this.quantity * final_price
    }
    prodInfo.showMessage(name, 'hiện tại chưa có. Bạn có muốn thêm vào giỏ hàng ?')
    this.addToCart(prodInfo)
  }

  resetCart = (): void => {
    this.id = 0
    this.final_price = 0
    this.quantity = 0
    this.name = ''
    console.log('Giỏ hàng đang trống. Bạn có muốn tiếp tục mua sắm ?')
  }

  constructor() {
    this.quantity = 0
    this.final_price = 0
  }
}