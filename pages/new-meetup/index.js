import { useRouter } from 'next/router';
import NewMeeupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        // Send a request to our API route
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return <NewMeeupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;