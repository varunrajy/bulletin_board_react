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
	}
	edit() {
		this.setState({ editing: true });
	}

	delete() {
		this.props.onRemove(this.props.id);
	}

	save(e) {
		e.preventDefault();
		this.props.update(this._newText.value, this.props.id);
		this.setState({ editing: false });
	}

	renderForm() {
		return (
			<div className="note">
				<form onSubmit={this.save}>
					<textarea
						ref={input => {
							this._newText = input;
						}}
					/>
					<button className="save">
						<Icon icon={save} />
					</button>
				</form>
			</div>
		);
	}

	renderDisplay() {
		return (
			<div className="note">
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
