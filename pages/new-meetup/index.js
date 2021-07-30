import NewMeeupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    function addMeetupHandler(enteredMeetupData) {
        console.log(enteredMeetupData);
    }

    return <NewMeeupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;