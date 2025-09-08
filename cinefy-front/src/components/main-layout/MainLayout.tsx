import { FC, PropsWithChildren } from "react";
import styles from './MainLayout.module.scss'
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { LayoutContainer } from "./LayoutContainer";




const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
    return (
        <div className='flex h-full flex-col'>
			<div className='flex-1'>
			  <div className='fixed inset-y-0 z-50 h-[75px] w-full'>
                   <Header />
              </div>
			   <Sidebar/>
              <LayoutContainer>{children}</LayoutContainer>
			</div>
		</div>

    )
}
export default MainLayout