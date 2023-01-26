import SignupForm from './SignupForm.js'

import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { Button } from '../styled-components/Button'
import { hideLoginModal } from '../features/loginModal/loginModalSlice'
// import ReactModal from 'react-modal'

Modal.setAppElement('#root');

const modalStyle = {
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
    backgroundColor: 'white',
    border: '2px solid rgb(240, 240, 240)',
    borderRadius: '12px',
    position: 'absolute',
    width: '250px',
    top: '70px',
    height: 'fit-content',
    left: 'calc(50% - 125px)'
  }
}

export default function LoginModal () {
  const dispatch = useDispatch()
  const showLoginModal = useSelector(state => state.loginModal.show)
  const onClose = () => {
    dispatch(hideLoginModal())
  }

  return (
    <Modal isOpen={showLoginModal} style={modalStyle}>
      <Button
        onClick={onClose}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        X
      </Button>
      <SignupForm />
    </Modal>
  )
}
