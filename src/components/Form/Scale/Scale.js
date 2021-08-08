import React, { useState } from 'react'

const Scale = ({ min, max, onChange = () => {} }) => {
	const [value, setValue] = useState(max)


	const handleChange = (ko) => {
		setValue(ko)
		onChange(ko)
	}

	return (<div>

			<h3>{value}</h3>
			
			<input type="range"
				min={min} max={max}
				step="0.1"
				onChange={(event) => handleChange(event.target.value)} />
		</div>)

}


export default Scale