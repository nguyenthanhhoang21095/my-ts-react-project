
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

interface UserModalProps {
  isHoverDialog?: boolean;
  userInfo: IUser;
  handleHoverIn?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleHoverOut?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const UserModal: React.FC<UserModalProps> = ({ userInfo = null, handleHoverIn = () => {}, handleHoverOut = () => {} }):JSX.Element => {
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
                            outLine="none"
                        >
                            Info
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
                            handleClick={() => Router.push('/auth/login')}
                            outLine="none"
                        >   
                            Sign out
                        </Button>
                    </>
                    : 
                    <>
                        <Button
                            handleClick={() => Router.push('/auth/login')}
                            outLine="none"
                        >
                            Login
                        </Button>
                        <StyledDivider />
                        <Button 
                            handleClick={() => Router.push('/auth/register')}
                            outLine="none"
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