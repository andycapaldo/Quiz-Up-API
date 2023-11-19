import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { deleteProfile } from '../lib/apiWrapper';
import UserType from '../types/auth';
import CategoryType from '../types/category';

type ProfileDeleteFormProps = {
    currentUser: Partial<UserType> | null;
    flashMessage: (message: string, category: CategoryType) => void;
    handleCloseForm: () => void;
};

export default function ProfileDeleteForm({ currentUser, flashMessage, handleCloseForm }: ProfileDeleteFormProps) {
    
    const [show, setShow] = useState(false);
    
    const handleDeleteClick = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleConfirmDelete = async () => {
        if (!currentUser) return;

        const token = localStorage.getItem('token') || '';
        const response = await deleteProfile(token);
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(response.data?.success!, 'primary');
            handleCloseForm();
        }
    };

    return (
        <>
            <Button variant='danger' onClick={handleDeleteClick}>
                Delete Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {currentUser?.first_name}'s Profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {currentUser?.first_name}'s Profile? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' className='mt-3 w-50' onClick={handleConfirmDelete}>
                        Delete Profile
                    </Button>
                    <Button variant='warning' className='mt-3 w-50' onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
