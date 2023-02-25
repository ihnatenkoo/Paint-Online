import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../../store/canvasState';

const StartModal = () => {
	const [show, setShow] = useState(true);
	const [name, setName] = useState('');

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.length > 2) {
			canvasState.userName = name;
			setShow(false);
		}
	};

	return (
		<>
			<Modal show={show} centered>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Your Name</Form.Label>
							<Form.Control autoFocus value={name} onChange={onNameChange} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={handleSubmit}
						disabled={name.length < 3}
					>
						Enter
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default StartModal;
