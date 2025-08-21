'use client'
import Heading from '@/components/ui/heading/Heading'
import { statisticsService } from '@/services/statistics.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import styles from "./MainStatistics.module.scss"
import StatisticItem from './StatisticItem'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import StatisticItemLoading from './StatisticItemLoading'

const MainStatistics = () => {

    const {data,isLoading} = useQuery({
        queryKey:['get main statistics'],
        queryFn:() => statisticsService.getMain()
    })

  return (
    <div>
        <Heading>Statistics</Heading>
        <div className={styles.main_statistics}>
            {isLoading ? (
              Array.from({length:4}).map((_,index) => (
                          <StatisticItemLoading key={index}/>
              ))
            ) : data ? (
                data.map(item => <StatisticItem key={item.id} item={item}/>)
            ) : (
                <div>Not found data for statistics</div>
            )}
        </div>
    </div>
  )
}

export default MainStatistics