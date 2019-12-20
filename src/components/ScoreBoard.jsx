import React from "react";

const ScoreBoard = ({ score }) => {
	return (
		<div className='score__container'>
			<h1>{score}</h1>
		</div>
	);
};

export default ScoreBoard;
