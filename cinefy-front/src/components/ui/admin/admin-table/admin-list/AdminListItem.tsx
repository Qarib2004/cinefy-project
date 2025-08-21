import { FC } from 'react'

import styles from './AdminList.module.scss'
import { IAdminListItem } from './admin-list.interface'
import AdminActions from './admin-actions/AdminActions'

const AdminListItem: FC<IAdminListItem> = ({ listItem, removeHandler }) => {
	return <div className={styles.item}>
        {listItem.items.map((value,index) => (
            <div key={index}>{value}</div>
        ))}

        <AdminActions 
        viewUrl={listItem.viewUrl}
        editUrl={listItem.editUrl}
        removeHandler={removeHandler}
        />
    </div>
}

export default AdminListItem
