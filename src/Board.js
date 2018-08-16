import React, { Component } from 'react';
import Note from './Note';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
		};
		this.renderNotes = this.renderNotes.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.add = this.add.bind(this);
	}

	updateNote(newText, index) {
		this.setState(prevState => {
			return {
				notes: prevState.notes.map(note => (note.id === index ? { ...note, note: newText } : note)),
			};
		});
	}

	onRemove(id) {
		this.setState(prevState => {
			return { notes: prevState.notes.filter(note => note.id !== id) };
		});
	}

	add(note) {
		this.setState(prevState => ({
			notes: [...prevState.notes, { id: prevState.notes.length, note: note }],
		}));
	}

	renderNotes() {
		return this.state.notes.map(({ id, note }) => {
			return (
				<Note id={id} key={id} update={this.updateNote} onRemove={this.onRemove}>
					{note}
				</Note>
			);
		});
	}

	render() {
		return (
			<div className="board">
				{this.renderNotes()}
				<button onClick={this.add.bind(null, 'New Note')} id="add">
					<Icon icon={plus} />
				</button>
			</div>
		);
	}
}

export default Board;
