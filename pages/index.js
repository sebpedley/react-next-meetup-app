import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Siegestor_M%C3%BCnchen_abends.jpg/1280px-Siegestor_M%C3%BCnchen_abends.jpg',
        address: '12 Kind Road, London AA1 1AA',
        description: 'This is a second meetup'
    }
];

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />
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
    // fetch data asynchronously here
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 10 // Number of seconds Next.js waits to regenerate this page on the server
    };
}

export default HomePage;