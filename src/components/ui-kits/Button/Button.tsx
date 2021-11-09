import React, { useState } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
interface ButtonProps {
  children: any,
  style?: any,
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void,
  transitionWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  handleClick = () => { },
  style = {},
  transitionWidth = false
}: ButtonProps): JSX.Element => {
  const [isHoverBtn, setIsHoverBtn] = useState(false);
  const isTransition = isHoverBtn && transitionWidth;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => {
        if (transitionWidth) setIsHoverBtn(true)
      }}
      onMouseLeave={() => {
        if (transitionWidth) setIsHoverBtn(false)
      }}
      style={{
        ...style,
        backgroundColor: transitionWidth ? "transparent" : "",
        color: transitionWidth ? (isTransition ? "#fff" : "#000") : ""
      }}
      className={classNames(styles["button"])}
    >
      {transitionWidth && <div
        style={{
          width: isHoverBtn ? "100%" : ""
        }}
        className={styles["overlay-button"]}></div>
      }
      <div className={styles["button__text"]}>
        {children}
      </div>
    </button>
  )
}

export default Button
