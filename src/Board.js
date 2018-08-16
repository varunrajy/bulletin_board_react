import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [
				{
					id: 1,
					note: 'Learn React',
				},
				{
					id: 2,
					note: 'Learn Modern React',
				},
			],
		};
		this.renderNotes = this.renderNotes.bind(this);
		this.updateNote = this.updateNote.bind(this);
	}

	updateNote(newText, index) {
		console.log('Calling updateNote : ', newText, index);
		this.setState(prevState => {
			return {
				notes: prevState.notes.map(note => (note.id === index ? { ...note, note: newText } : note)),
			};
		});
	}

	renderNotes() {
		return this.state.notes.map(({ id, note }) => {
			return (
				<Note id={id} key={id} update={this.updateNote}>
					{note}
				</Note>
			);
		});
	}

	render() {
		console.log('Called ');
		return <div className="board">{this.renderNotes()}</div>;
	}
}

export default Board;
