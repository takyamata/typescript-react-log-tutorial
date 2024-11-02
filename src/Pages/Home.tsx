import { Box } from '@mui/material'
import React from 'react'
import Calender from '../components/Calender'
import MonthlySummary from '../components/MonthlySummary'
import TransactionForm from '../components/TransactionForm'
import TransactionMenu from '../components/TransactionMenu'

const Home = () => {
	return (
		<Box sx={{display: 'flex'}}>
			{/* 左側 */}
			<Box sx={{flexGrow: '1'}}>
				<MonthlySummary/>
				<Calender/>
			</Box>
			{/* 右側 */}
			<Box>
				<TransactionMenu/>
				<TransactionForm/>
			</Box>

		</Box>
	)
}

export default Home