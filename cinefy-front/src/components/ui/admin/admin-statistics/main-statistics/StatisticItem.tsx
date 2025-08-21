import React, { FC } from 'react'
import { IStatisticItem } from './statistics-item.interface'
import { getIcon } from './statistics.util'
import styles from "./MainStatistics.module.scss"
import CountUp from 'react-countup'

const StatisticItem:FC<{item:IStatisticItem}> = ({item}) => {

    const Icon = getIcon(item.id)

  return (
    <div className={styles.item}>
        <div className={styles.header}>
            <p className={styles.name}>{item.name}</p>
            <Icon className={styles.icon}/>
        </div>
        <div className={styles.value}>
           
           <h2 className={styles.value}><CountUp end={item.value}/></h2>
        </div>
    </div>
  )
}

export default StatisticItem