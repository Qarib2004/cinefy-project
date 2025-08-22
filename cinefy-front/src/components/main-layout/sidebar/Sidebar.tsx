import { FC, useState } from 'react'

import styles from './Sidebar.module.scss'
import Logo from './logo/Logo'
import MenuContainer from './navigation/MenuContainer'
import Subscribe from './subscribe/Subscribe'

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false) 

  const toggleSidebar = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
       <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded"
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
        {isOpen && <div   className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={toggleSidebar} />}
      </div>
    </>
  )
}

export default Sidebar
