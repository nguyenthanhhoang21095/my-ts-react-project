import React from 'react';
// import pageActions from "controllers/redux/actions/pageActions";
// import { connect } from 'react-redux';
import styles from "./Loading.module.scss";
interface LoadingProps {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const Loading:React.FC<LoadingProps> = ({ isLoading, setLoading }):JSX.Element => {
  return (
    <div className={styles["loading"]}>
      <div className={styles["dots"]}>
        <div className={styles["dot-1"]}></div>
        <div className={styles["dot-2"]}></div>
        <div className={styles["dot-3"]}></div>
      </div>
    </div>
  )
}

// const mapStateToProps = (state) => {
//     return {
//       isLoading: state.page.isLoading,
//     }
//   }
  
// const mapDispatchToProps = {
//   setLoading: pageActions.setLoading,
// }
export default Loading;