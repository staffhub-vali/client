import { FC, useState } from 'react'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const [mobile, setMobile] = useState(false)
	return (
		<div className='fixed m-0 min-h-screen w-full bg-slate-100 font-sans'>
			<div className='bg-white shadow'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between py-4'>
						<a className='cursor-pointer'>Logo</a>

						<div className='hidden space-x-2 sm:flex sm:items-center'>
							<a
								href='#'
								className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Employees
							</a>
							<a
								href='#'
								className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Schedules
							</a>
							<a
								href='#'
								className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Documentation
							</a>
						</div>

						<div className='hidden sm:flex sm:items-center'>
							<a
								href='#'
								className='mr-4 p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Sign in
							</a>
						</div>

						<div
							onClick={() => setMobile(!mobile)}
							className='cursor-pointer sm:hidden'>
							x
						</div>
					</div>
					{mobile && (
						<div className='block border-t-2 bg-white py-2 sm:hidden'>
							<div className='flex flex-col'>
								<a
									href='#'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Products
								</a>
								<a
									href='#'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Marketplace
								</a>
								<a
									href='#'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Partners
								</a>
								<a
									href='#'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Pricing
								</a>
								<div className='flex items-center justify-between border-t-2 pt-2'>
									<a
										href='#'
										className='mr-4 text-sm font-semibold text-gray-800 hover:text-black'>
										Sign in
									</a>
									<a
										href='#'
										className='rounded-lg border px-4 py-1 text-sm font-semibold text-gray-800 hover:border-black hover:text-black'>
										Sign up
									</a>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
