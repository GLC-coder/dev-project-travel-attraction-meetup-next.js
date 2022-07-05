import React from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetial";


const MeetupDetails = (props) => {

  return (
    <React.Fragment>
    <Head>
    <title>{props.meetupData.title}</title>
    <meta name='description' content={props.meetupData.description}/>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </React.Fragment>
  );
};

export const getStaticPaths = async () => {
 

  const client = await MongoClient.connect(
    "mongodb+srv://jason:Cao-xu870418-@cluster0.nezxxhh.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("jason");
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetupIds.map((meetupId) => ({
      params: { meetupId: meetupId._id.toString() },
    })),
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://jason:Cao-xu870418-@cluster0.nezxxhh.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("jason");
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

  client.close()


  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title : meetup.title,
        image : meetup.image,
        address: meetup.address,
        description: meetup.description
      }
    },
  };
};

export default MeetupDetails;
