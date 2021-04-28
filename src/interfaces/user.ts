import { ICart } from './cart';

export interface IUser {
  userId: number
  fullName: string
  account: string
  password: string
  phoneNumber: string
  address: string
  email?: string
  order?: {
    status: string
    data: ICart
  }
  initUser: (
    acc: string,
    pass: string,
    fullName: string,
    phoneNumber: string,
    address: string,
    email: string
  ) => string
  submitCheckout: (data: ICart) => string
  checkValidUser: (acc: string, pass: string, cartData: ICart) => string
}

export class CUser implements IUser {
  userId: number
  fullName: string
  account: string
  password: string
  phoneNumber: string
  address: string
  email?: string
  order?: {
    status: string
    data: ICart
  }

  initUser = (acc, pass, fullName, phoneNumber, address, email = '') => {
    this.userId = this.userId >= 0 ? +this.userId + 1 : 1
    this.fullName = fullName
    this.account = acc
    this.password = pass
    this.phoneNumber = phoneNumber
    this.address = address
    this.email = email
    if (fullName.length && acc.length && pass.length && phoneNumber.length && address.length) {
      console.log('Đăng ký thành công')
      return 'success'
    } else {
      console.log('Chưa nhập đủ thông tin yêu cầu')
      this.userId = 0
      return 'fail'
    }
  }

  checkValidUser = (acc = '', pass = '', cartData = null): string => {
    if (!this.userId) {
      console.log('Chưa có tài khoản. Vui lòng tạo tài khoản mới')
      return 'not exist user'
    }
    if (acc.length && pass.length && pass === this.password && acc === this.account) {
      console.log('Đăng nhập thành công')
      return 'login success'
    } else {
      console.log('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu')
      return 'login fail'
    }
  }

  submitCheckout = (data: ICart): string => {
    if (data.checkCart()) {
      this.order = {
        status: 'SUCCESS',
        data,
      }
      console.log(`Đơn hàng đã tạo thành công`)
      data.resetCart()
    } else {
      this.order = {
        status: 'FAIL',
        data,
      }
      console.log('Vui lòng kiểm tra lại giỏ hàng')
    }
    return this.order.status
  }

  constructor() {
    this.userId = 0
    this.account = ''
    this.password = ''
    this.fullName = ''
    this.phoneNumber = ''
    this.address = ''
    this.email = ''
    this.order = {
      status: '',
      data: null,
    }
  }
}
