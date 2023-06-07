import { FC } from 'react'
import Button from './Button'
import ReactModal from 'react-modal'
import { Check, X } from 'lucide-react'

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
	loading: boolean
}

const Modal: FC<ModalProps> = ({ showModal, loading, submit, cancel, text }) => {
	return (
		<ReactModal
			isOpen={showModal}
			style={customStyles}>
			{text}
			<div className='mt-2 flex justify-center space-x-2'>
				<Button
					size={'sm'}
					className='my-2'
					variant={'danger'}
					onClick={submit}
					loading={loading}>
					Yes {<Check className='ml-2 h-4 w-4' />}
				</Button>
				<Button
					size={'sm'}
					variant='cancel'
					className='my-2'
					onClick={cancel}>
					No {<X className='ml-2 h-4 w-4' />}
				</Button>
			</div>
		</ReactModal>
	)
}

export default Modal
