// MainLayout.tsx
import { FC, PropsWithChildren, useState } from "react";
import styles from './MainLayout.module.scss'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // По умолчанию закрыт на мобильных

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`${styles.layout} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <div className="flex-1">
                <Header  />
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main>{children}</main>
            </div>
        </div>
    )
}

export default MainLayout

// import { FC, PropsWithChildren } from "react";
// import styles from './MainLayout.module.scss'
// import Header from "./header/Header";
// import Sidebar from "./sidebar/Sidebar";




// const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
//     return (
//         <div className={styles.layout}>
//             <div className="flex-1">
//                 <Header/>
//                 <Sidebar/>
//                 <main>{children}</main>
//             </div>
//         </div>

//     )
// }
// export default MainLayout