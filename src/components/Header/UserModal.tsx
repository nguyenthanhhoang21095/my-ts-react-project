
import React from 'react'
import {
    StyledUserDialogContainer,
    StyledUserDialog,
    StyledUserDialogContent,
    StyledDivider,
} from "./UserModal.styled";
import IUser from 'src/interfaces/user';
import { Button } from 'src/components/ui-kits/Button'
import Router from 'next/router';
import { clearLocalStorage } from 'src/utils/common'

interface UserModalProps {
  isHoverDialog?: boolean;
  userInfo: IUser;
  handleHoverIn?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleHoverOut?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const UserModal: React.FC<UserModalProps> = ({ userInfo = null, handleHoverIn = () => {}, handleHoverOut = () => {} }):JSX.Element => {

    const handleClearUser = () => {
        clearLocalStorage()
        Router.push('/auth/login');
    }

    return (
      <StyledUserDialogContainer
        onMouseEnter={(e) => handleHoverIn(e)} 
        onMouseLeave={(e) => handleHoverOut(e)}
      >
        <StyledUserDialog 
        >
            <StyledUserDialogContent hasUserInfo={false}>
                { userInfo ? 
                    <>  
                        <Button
                            handleClick={() => Router.push(`/account/${userInfo.id}`)}
                        >
                            My Info
                        </Button>
                        <StyledDivider />
                        {/* <Button 
                            handleClick={() => Router.push('/favourites')}
                            outLine="none"
                        >
                            Favourites
                        </Button> */}
                        <StyledDivider />
                        <Button 
                            handleClick={() => handleClearUser()}
                        >   
                            Sign out
                        </Button>
                    </>
                    : 
                    <>
                        <Button
                            handleClick={() => Router.push('/auth/login')}
                        >
                            Login
                        </Button>
                        <StyledDivider />
                        <Button 
                            handleClick={() => Router.push('/auth/register')}
                        >
                            Register
                        </Button>
                    </>
                }
            </StyledUserDialogContent>
            </StyledUserDialog>
            
      </StyledUserDialogContainer>
    )
  }

  export default UserModal;