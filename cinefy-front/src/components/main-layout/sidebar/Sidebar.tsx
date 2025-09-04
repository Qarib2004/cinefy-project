'use client'
import { FC, useState } from 'react'

import styles from './Sidebar.module.scss'
import Logo from './logo/Logo'
import MenuContainer from './navigation/MenuContainer'
import Subscribe from './subscribe/Subscribe'

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(prev => !prev)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-[1000] p-3 bg-blue-600 text-white rounded shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebar}>
          <Logo />
          <MenuContainer />
          <Subscribe />
        </div>
      </div>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[998] md:hidden"
          onClick={toggleSidebar}
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
