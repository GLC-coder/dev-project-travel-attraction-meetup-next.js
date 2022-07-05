import Head from "next/head";
import React from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Travel Attraction Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active Travel Attraction Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://jason:Cao-xu870418-@cluster0.nezxxhh.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("jason");
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  //fetch data logic
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        address: meetup.address,
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async (context) => {
//   const req =context.req;
//   const res = context.res
//   return {
//     props :{meetups :DUMMY_MEETUPS}
//   }
// }
export default HomePage;
