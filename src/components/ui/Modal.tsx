import { FC } from 'react'
import ReactModal from 'react-modal'
import Button from './Button'

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
			style={customStyles}
			contentLabel='Delete Modal'>
			{text}
			<div className='mt-2 flex justify-center space-x-2'>
				<Button
					className='my-2'
					variant={'danger'}
					isLoading={isLoading}
					onClick={submit}>
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
