import React, { useMemo, useState } from 'react'
import IProduct from 'src/interfaces/product'
import styles from './ProductInfo.module.scss'
import classNames from 'classnames'
import { Select, InputNumber, Rate } from 'antd'
import { Button } from 'src/components/ui-kits/Button'
import { connect } from 'react-redux'
import storageActions from 'controllers/redux/actions/storageActions'
import IUser from 'src/interfaces/user'
import { useRouter } from 'next/router'
import endpoint from "src/utils/endpoints";

type CustomProps = {
    reviewsNumber: number;
    productCode: string;
}
type ParamsProps = Partial<IProduct> & CustomProps;
interface ProductInfoProps extends ParamsProps  {
    userInfo: IUser;
    data: IProduct;
    addToCart: (data: any, id:number) => void;
    showToast: (mess:string, type:string) => void;
}
const { Option } = Select;

const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    brand,
    productCode,
    availability,
    price,
    sizes,
    colors,
    reviewsNumber,
    rateStar,
    data,
    userInfo,
    addToCart = () => {},
    showToast = () => {},
}): JSX.Element => {

    const [colorPrice, setColorPrice] = useState(0);
    const [sizePrice, setSizePrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const totalPrice = useMemo(() => {
        return (price + colorPrice + sizePrice) * quantity;
    }, [colorPrice, sizePrice, quantity]);

    const handleSelectSize = (value) => {
        setSizePrice(value)
    }

    const handleSelectColor = (value) => {
        setColorPrice(value)
    }

    const handleChangeQty = (value) => {
        typeof value === "number" && setQuantity(value)
    }

    const handleAddToCart = (): void => {
        if (!userInfo?.id && !userInfo) {
            router.push(`/${endpoint["login"]}`);
        } else {
            showToast(`You have added ${data.name} to your shopping cart!`, "success");
            addToCart(data, userInfo?.id);
        }
    }

    return (
        <div className={styles['content']}>
            <h2 className={classNames("font-h2", styles['content__name'])}>
                {name}
            </h2>

            <p className={styles['content__short-info']}>
                Brand: {brand}
            </p>
            <p className={styles['content__short-info']}>
                Product Code: {productCode}
            </p>
            <p className={styles['content__short-info']}>
                Availability: {availability ? "In Stock" : "Out of Stock"}
            </p>
            <p className={styles['content__price']}>
                ${price.toFixed(2)}
            </p>
            <hr className={styles['content__divider']} />
            <h3 className={classNames("font-h3", styles['content__options'])}>
                available options
            </h3>
            <div className={styles['content__select']}>
                <p className={styles['content__select--title']}>
                    Size
                </p>
                <Select
                    size="large"
                    defaultValue={0}
                    dropdownStyle={{
                        backgroundColor: "#f6f6f6",
                    }}
                    style={{
                        width: "100%",
                        color: "#000"
                    }}
                    onChange={handleSelectSize}>
                    <Option value={0}>-- Please Select --</Option>
                    {sizes.length && sizes.map((size, idx) => (
                        <Option key={`${size.name}_${idx}`} value={size.sub_price}>
                            {`${size.name} +($${size.sub_price})`}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={styles['content__select']}>
                <p className={styles['content__select--title']}>
                    Color
                </p>
                <Select
                    className={styles['content__select--selector']}
                    size="large"
                    dropdownStyle={{
                        backgroundColor: "#f6f6f6",
                    }}
                    defaultValue={0}
                    style={{
                        width: "100%",
                        color: "#000",
                    }}
                    onChange={handleSelectColor}>
                    <Option value={0}>-- Please Select --</Option>
                    {colors.length && colors.map((color, idx) => (
                        <Option key={`${color.name}_${idx}`} value={color.sub_price}>
                            {`${color.name} +($${color.sub_price})`}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={styles['content__qty']}>
                <InputNumber
                    size="large"
                    keyboard={false}
                    min={1}
                    max={1000}
                    defaultValue={quantity}
                    onChange={handleChangeQty}
                    className={styles['content__qty--input']}
                />
                <Button
                    handleClick={handleAddToCart}
                    style={{
                        padding: "18px 39px",
                        fontSize: "12px",
                        width: "fit-content",
                        height: "50px",
                        fontWeight: 700,
                        boxSizing: "border-box",
                        textTransform: "uppercase",
                        marginLeft: "10px",
                    }}
                >
                    Add To Cart
                </Button>
            </div>
            <div className={styles['content__rate']}>
                <Rate disabled defaultValue={rateStar} />
            </div>
            <div className={styles['content__review']}>
                <p>{reviewsNumber} reviews</p>
            </div>
            <hr className={styles['content__divider']} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.storage.userInfo,
    }
}

const mapDispatchToProps = {
    addToCart: storageActions.addToCart,
    showToast: storageActions.showToast
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
