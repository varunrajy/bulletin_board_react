import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { pencil, trash, save } from 'react-icons-kit/fa/';

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
		};
		this.edit = this.edit.bind(this);
		this.delete = this.delete.bind(this);
		this.save = this.save.bind(this);
		this.randonBetween = this.randonBetween.bind(this);
	}
	edit() {
		this.setState({ editing: true });
	}

	componentWillMount() {
		this.style = {
			right: this.randonBetween(0, window.innerWidth - 150, 'px'),
			top: this.randonBetween(0, window.innerHeight - 150, 'px'),
			transform: `rotate(${this.randonBetween(-25, 25, 'deg')})`,
		};
	}

	componentDidMount() {
		let textarea;
		if (this.state.editing) {
			textarea = this._newText;
			textarea.focus();
			textarea.select();
		}
	}
	delete() {
		this.props.onRemove(this.props.id);
	}

	save(e) {
		e.preventDefault();
		this.props.update(this._newText.value, this.props.id);
		this.setState({ editing: false });
	}

	randonBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y - x)) + s;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.children !== nextProps.children || this.state !== nextState;
	}

	renderForm() {
		return (
			<div className="note" style={this.style}>
				<form onSubmit={this.save}>
					<textarea
						ref={input => {
							this._newText = input;
						}}
						defaultValue={this.props.children}
					/>
					<button id="save">
						<Icon icon={save} />
					</button>
				</form>
			</div>
		);
	}

	renderDisplay() {
		return (
			<div className="note" style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button id="edit" onClick={this.edit}>
						<Icon icon={pencil} />
					</button>
					<button id="remove" onClick={this.delete}>
						<Icon icon={trash} />
					</button>
				</span>
			</div>
		);
	}

	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay();
	}
}

export default Note;
