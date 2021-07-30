import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

// This is to inform Next.js's static generation about all the possible
// data IDs that will get used. You wouldn't hard code this but generate
// it from an async request to a backend/api. This is only required on
// dynamic pages like this one.
export async function getStaticPaths() {
    // fetch data from an API
    const client = MongoClient.connect('mongodb+srv://seb:qdCUrCYY6feHSaj@cluster0.2nqla.mongodb.net/react-meetups?retryWrites=true&w=majority');
    const db = (await client).db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    (await client).close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupId = context.params.meetupId;

    // fetch data from an API
    const client = MongoClient.connect('mongodb+srv://seb:qdCUrCYY6feHSaj@cluster0.2nqla.mongodb.net/react-meetups?retryWrites=true&w=majority');
    const db = (await client).db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    (await client).close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;