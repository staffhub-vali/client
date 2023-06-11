import { FC } from 'react'
import Button from './Button'
import ReactModal from 'react-modal'
import { Check, X } from 'lucide-react'
import Heading from './Heading'

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
			className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'>
			<div className='mx-auto h-56 w-[42rem] rounded-md bg-white p-6 text-center shadow-lg dark:bg-slate-700'>
				<Heading
					size={'xs'}
					className='mt-8 font-normal'>
					{text}
				</Heading>
				<div className='mt-6 flex h-full justify-center space-x-2'>
					<Button
						size='default'
						variant='danger'
						onClick={submit}
						loading={loading}>
						Yes <Check className='ml-2 h-5 w-5' />
					</Button>
					<Button
						size='default'
						variant='outline'
						onClick={cancel}>
						No <X className='ml-2 h-5 w-5' />
					</Button>
				</div>
			</div>
		</ReactModal>
	)
}

export default Modal
