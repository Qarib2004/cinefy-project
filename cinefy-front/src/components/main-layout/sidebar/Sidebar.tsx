'use client'

import { FC } from 'react'
import styles from './Sidebar.module.scss'
import Logo from './logo/Logo'
import MenuContainer from './navigation/MenuContainer'
import Subscribe from './subscribe/Subscribe'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
	return (
		<>
			{/* Кнопка меню - только на мобильных */}
			<button
				className={`
					fixed top-4 left-4 z-[1000] p-3 
					bg-red-500 text-white rounded shadow-lg 
					transition-transform duration-200
					md:hidden
					hover:bg-red-600
					active:scale-95
				`}
				onClick={onClose}
			>
				{isOpen ? 'Close' : 'Menu'}
			</button>

			{/* Сайдбар */}
			<div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
				<div className={styles.sidebar}>
					<Logo />
					<MenuContainer />
					<Subscribe />
				</div>
			</div>

			{/* Overlay - только на мобильных когда сайдбар открыт */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black/30 z-[998] md:hidden'
					onClick={onClose}
				/>
			)}
		</>
	)
}

export default Sidebar

// 'use client'

// import { FC, useState } from 'react'

// import styles from './Sidebar.module.scss'
// import Logo from './logo/Logo'
// import MenuContainer from './navigation/MenuContainer'
// import Subscribe from './subscribe/Subscribe'



// const Sidebar: FC = () => {
// 	const [isOpen, setIsOpen] = useState(false)

// 	const toggleSidebar = () => setIsOpen(prev => !prev)

// 	return (
// 		<>
// 			<button
// 				className={`
//     fixed top-4 left-4 z-[1000] p-3 
//     bg-red-500 text-white rounded shadow-lg 
//     transition-transform duration-200
//     md:hidden
//     hover:bg-red-600
//     active:scale-95
//   `}
// 				onClick={toggleSidebar}
// 			>
// 				{isOpen ? 'Close' : 'Menu'}
// 			</button>

// 			<div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
// 				<div className={styles.sidebar}>
// 					<Logo />
// 					<MenuContainer />
// 					<Subscribe />
// 				</div>
// 			</div>

// 			{isOpen && (
// 				<div
// 					className='fixed inset-0 bg-black/30 z-[998] md:hidden'
// 					onClick={toggleSidebar}
// 				/>
// 			)}
// 		</>
// 	)
// }

// export default Sidebar
// 'use client'
// import { FC, useState } from 'react'

// import styles from './Sidebar.module.scss'
// import Logo from './logo/Logo'
// import MenuContainer from './navigation/MenuContainer'
// import Subscribe from './subscribe/Subscribe'

// const Sidebar: FC = () => {
//   const [isOpen, setIsOpen] = useState(false)

//   const toggleSidebar = () => setIsOpen(prev => !prev)

//   return (
//     <>
//       <button
//         className="md:hidden fixed top-4 left-4 z-[1000] p-3 bg-blue-600 text-white rounded shadow-lg"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? 'Close' : 'Menu'}
//       </button>

//       <div className={`${styles.wrapper} ${isOpen ? 'open' : ''}`}>
//         <div className={styles.sidebar}>
//           <Logo />
//           <MenuContainer />
//           <Subscribe />
//         </div>

//         {isOpen && (
//           <div
//             className="fixed inset-0 bg-black/30 z-[998] md:hidden"
//             onClick={toggleSidebar}
//           />
//         )}
//       </div>
//     </>
//   )
// }

// export default Sidebar
