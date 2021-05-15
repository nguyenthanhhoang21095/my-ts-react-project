import React from 'react'
import { connect } from 'react-redux'
import { StyledToastContainer, StyledToastContent } from './Toast.styled'
import storageActions from '../../../../controllers/redux/actions/storageActions'

interface ToastProps {
  showToastMess: string
  showToast: (mess: string) => void
}

const Toast: React.FC<ToastProps> = ({ showToastMess, showToast }): JSX.Element => {
  if (showToastMess.length) {
    setTimeout(() => showToast(''), 2000)
  }

  if (showToastMess.length) {
    return (
      <StyledToastContainer>
        <StyledToastContent>{showToastMess}</StyledToastContent>
      </StyledToastContainer>
    )
  } else {
    return <div></div>
  }
}

const mapStateToProps = (state) => ({
  showToastMess: state.storage.showToastMess,
})

const mapDispatchToProps = {
  showToast: storageActions.showToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
