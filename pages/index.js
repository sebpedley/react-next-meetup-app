import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// This will always run on the server after deployment (not client's computer)
// export async function getServerSideProps(context) {
//     // Good to work with authentication here
//     const req = context.req;
//     const res = context.res;

//     // fetch data asynchronously here
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

// This code is only ever executed during a build (never on server or client's computers).
// This function is called first by Next.js rather than the default export, and it allows
// Next.js to wait for dynamic content before it pre-renders this page component.
export async function getStaticProps() {
    // fetch data from an API
    const client = MongoClient.connect('mongodb+srv://seb:qdCUrCYY6feHSaj@cluster0.2nqla.mongodb.net/react-meetups?retryWrites=true&w=majority');
    const db = (await client).db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    (await client).close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.title
            }))
        },
        revalidate: 1 // Number of seconds Next.js waits to regenerate this page on the server
    };
}

export default HomePage;