import React from 'react'
import { ContentHeader } from '../../Components/ContentHeader'

function Chart() {
	return (
		// eslint-disable-next-line no-unreachable
		<>
			<ContentHeader
				breadcrumbItems={[
					{
						name: 'Dashboard',
						path: `/dashboard`,
					},
					{
						name: 'Graphique',
					},
				]}
			/>
		</>
	)
}

export default Chart
