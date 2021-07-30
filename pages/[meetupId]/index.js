
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
            title="First Meetup"
            address="12 King Road, London, AA1 1AA"
            description="This is a first meetup"
        />
    );
}

// This is to inform Next.js's static generation about all the possible
// data IDs that will get used. You wouldn't hard code this but generate
// it from an async request to a backend/api. This is only required on
// dynamic pages like this one.
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            }
        ]
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    console.log(meetupId);

    return {
        props: {
            meetupData: {
                id: meetupId,
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
                title: "First Meetup",
                address: "12 King Road, London, AA1 1AA",
                description: "This is a first meetup"
            }
        }
    }
}

export default MeetupDetails;