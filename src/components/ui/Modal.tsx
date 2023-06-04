import { FC } from 'react'
import Button from './Button'
import ReactModal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

interface ModalProps {
	text: string
	cancel: any
	submit: any
	showModal: boolean
	isLoading: boolean
}

const Modal: FC<ModalProps> = ({ showModal, isLoading, submit, cancel, text }) => {
	return (
		<ReactModal
			isOpen={showModal}
			style={customStyles}>
			{text}
			<div className='mt-2 flex justify-center space-x-2'>
				<Button
					className='my-2'
					variant={'danger'}
					onClick={submit}
					isLoading={isLoading}>
					Yes
				</Button>
				<Button
					variant='cancel'
					className='my-2'
					onClick={cancel}>
					No
				</Button>
			</div>
		</ReactModal>
	)
}

export default Modal
