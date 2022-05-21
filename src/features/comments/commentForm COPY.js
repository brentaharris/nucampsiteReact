import { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateCommentForm } from '../../utils/validateCommentForm';

const CommentForm = ({ campsiteId }) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const formRef = useRef();

    //close modal window with ESC key
    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            setCommentText(formRef.current.values.commentText)
            setModalOpen(false)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])


    const handleSubmit = (values) => {
        const comment = {
            campsiteId: parseInt(campsiteId),
            rating: values.rating,
            author: values.author,
            text: values.commentText
        };
        setCommentText('');
        setModalOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
        console.log(formRef.current)
        setCommentText(formRef.current.values.commentText)
    }

    const closeModal = () => {
        setCommentText(formRef.current.values.commentText)
        setModalOpen(false)
    }


    return(
        <>
            <Button outline onClick={openModal}>
                <i className='fa fa-pencil fa-lg' /> Add Comment
            </Button>
            <Modal isOpen={modalOpen} backdrop={true} toggle={closeModal}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Add Comment
                </ModalHeader>
                <ModalBody>
                    <Formik 
                        initialValues={{rating: undefined, author: '', commentText: commentText }}
                        onSubmit={handleSubmit}
                        validate={validateCommentForm}
                        innerRef={formRef}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='rating'>Rating</Label>
                                <Field 
                                    name='rating'
                                    as='select'
                                    className='form-control' 
                                >
                                    <option value=''>Select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Field>
                                <ErrorMessage name='rating'>{(msg) => <p className='text-danger'>{msg}</p>}</ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='author'>Your Name</Label>
                                <Field
                                    name='author'
                                    placeholder='Your Name'
                                    className='form-control' 
                                />
                                <ErrorMessage name='author'>{(msg) => <p className='text-danger'>{msg}</p>}</ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='commentText'>Comment</Label>
                                <Field
                                    name='commentText'
                                    as='textarea'
                                    rows='12'
                                    className='form-control' 
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>Submit</Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CommentForm;
