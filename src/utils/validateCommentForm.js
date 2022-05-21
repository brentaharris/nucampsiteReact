export const validateCommentForm = (values) => {
    const errors = {};

    if (!values.rating) {
        errors.rating = 'Required';
    } 
    if (values.author.length < 2) {
        errors.author = 'Must be at least 2 characters';
    } else if (values.author.length > 15) {
        errors.author = 'Must be 15 characters or less.'
    }
    return errors;
}

//modal close - click outside or esc
//would like to save comment text progress if modal is closed (unsubmitted). useRef/state dependency array see if we can save the comment text state 