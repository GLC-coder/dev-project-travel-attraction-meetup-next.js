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
  const DB = process.env.DATABASE.replace("<password", process.env.PASSWORD);
  const client = await MongoClient.connect(DB);

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
    revalidate: 3600,
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
