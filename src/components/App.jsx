import React, { Component } from "react";
import Snake from "../components/Snake";
import Food from "../components/Food";
import ScoreBoard from "./ScoreBoard";

const getRandomCoordinates = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

	return [x, y];
};

class App extends Component {
	state = {
		food: getRandomCoordinates(),
		speed: 120,
		direction: "RIGHT",
		snakeDots: [
			[0, 0],
			[2, 0],
		],
		score: 0,
		dead: false,
		name: "player",
		nameInput: true,
		players: [],
	};

	componentDidMount() {
		setInterval(this.moveSkake, this.state.speed);
		document.onkeydown = this.onKeyDown;
	}

	componentDidUpdate() {
		this.checkIfOutOfBorders();
		this.checkIfCollapse();
		this.checkIfEat();
	}

	playersNameList() {
		return this.state.players.map((ele, i) => {
			let num = i + 1;
			return (
				<tr key={Math.random() * 300}>
					<td>{ele.name + " " + num}</td>
					<td>{ele.score}</td>
				</tr>
			);
		});
	}

	onKeyDown = e => {
		e = e || window.event;
		switch (e.keyCode) {
			case 38:
				this.setState({ direction: "UP" });
				break;
			case 40:
				this.setState({ direction: "DOWN" });
				break;
			case 37:
				this.setState({ direction: "LEFT" });
				break;
			case 39:
				this.setState({ direction: "RIGHT" });
				break;
			default:
		}
	};

	moveSkake = () => {
		let dots = [...this.state.snakeDots];
		let head = dots[dots.length - 1];

		switch (this.state.direction) {
			case "RIGHT":
				head = [head[0] + 2, head[1]];
				break;
			case "LEFT":
				head = [head[0] - 2, head[1]];
				break;
			case "DOWN":
				head = [head[0], head[1] + 2];
				break;
			case "UP":
				head = [head[0], head[1] - 2];
				break;
			default:
		}
		dots.push(head);
		dots.shift();
		this.setState({
			snakeDots: dots,
		});
	};

	checkIfOutOfBorders() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
			this.setState({ dead: true });
			this.onGameOver();
		}
	}

	checkIfCollapse() {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];
		snake.pop();
		snake.forEach(dot => {
			if (head[0] === dot[0] && head[1] === dot[1]) {
				this.setState({ dead: true });
				this.onGameOver();
			}
		});
	}
	increaseScore() {
		this.setState({
			score: this.state.score + 100,
		});
	}

	checkIfEat() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		let food = this.state.food;

		if (head[0] === food[0] && head[1] === food[1]) {
			this.setState({
				food: getRandomCoordinates(),
			});
			this.enlargeSnake();
			this.increaseSpeed();
			this.increaseScore();
		}
	}

	enlargeSnake() {
		let newSnake = [...this.state.snakeDots];
		newSnake.unshift([]);
		this.setState({
			snakeDots: newSnake,
		});
	}

	increaseSpeed() {
		if (this.state.speed > 0) {
			this.setState({
				speed: this.state.speed - 2,
			});
		}
	}

	onGameOver() {
		this.setState({
			players: [...this.state.players, { name: this.state.name, score: this.state.score }],
		});

		this.setState({
			food: getRandomCoordinates(),
			speed: 120,
			direction: "RIGHT",
			snakeDots: [
				[0, 0],
				[2, 0],
			],

			score: 0,
			dead: false,
			nameInput: true,
		});
	}

	render() {
		return (
			<>
				<ScoreBoard score={this.state.score} />
				<div className='game-area'>
					<Snake snakeDots={this.state.snakeDots} />
					<Food dot={this.state.food} />
				</div>
				<table className='lists'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Scores</th>
						</tr>
					</thead>
					<tbody>{this.playersNameList()}</tbody>
				</table>
			</>
		);
	}
}

export default App;
