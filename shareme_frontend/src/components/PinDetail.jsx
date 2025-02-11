<<<<<<< HEAD
import React, { useEffect , useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner'; 

const PinDetail = ({ user }) => {
	const [pins, setPins] = useState(null);
	const [pinDetail, setPinDetails] = useState(null); 
	const [comment, setcomment] = useState(''); 
	const [addingComment, setAddingComment] = useState(false);
	const { pinId } = useParams(); 

	const fetchPinDetails = () => {
		const query = pinDetailQuery(pinId);

		if(query) {
			client.fetch(query)
			.then((data) => {
				setPinDetails(data[0]);

				if(data[0]) {
					query = pinDetailMorePinQuery(data[0]);

					client.fetch(query)
					.then((res) =>setPins(res));
				}
			})
		}
	}

	useEffect(() => {
		fetchPinDetails();
	}, [pinId])

	if(!pinDetail) return <Spinner message="Loading pin..."/>

	return (
		<div className="flex xl-flex-row flex-col m-auto bg-white" style={{maxWidth: '1500px', borderRadius: '32px'}}>
			<div className="flex justify-center items-center md:items-start flex-initial">
				<img 
					src={pinDetail?.image && urlFor(pinDetail.image).url()}
					className="rounded-t-3xl rounded-b-lg"
					alt="user-post"
				/>
			</div>
			<div className="w-full p-5 flex-1 xl:min-w-620">
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
					<a href={`${pinDetail?.image?.asset?.url}?dl=`}
                                download
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                > <MdDownloadForOffline />
					</a> 
					</div>
					<a href={PinDetail.destination} target="_blank" rel="noreferrer">
						{PinDetail.destination}
					</a>
				</div>
				<div>
					<h1 className="text-4xl font-bold break-wpirds mt-3">
						{pinDetail.title}
					</h1>
					<p className="mt-3">{pinDetail.about}</p>
				</div>
				<Link to={`user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
					<img 
					className='w-8 h-8 rounded-full object-cover'
					src={pinDetail.postedBy?.image}
					alt='user-profile'    
					/>
					<p className='font-semibold capitalize'>
						{pinDetail.postedBy?.userName}
					</p>
				</Link>
				<h2 className="mt-5 text-2xl">Comments</h2>
				<div className="max-h-370 overflow-y-auto">
					{pinDetail?.comments?.map((comment, i) => (
						<div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
							<img 
								src={comment.postedBy.image}
								alt="user-profile"
								className="w-10 h-10 rounded-full cursor-pointer"
							/>
							<div className="flex flex-col">
								
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
=======
import React, {useEffect, useState} from "react";
import {MdDownloadForOffline} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
// Most popular library to create unique IDs
import {v4 as uuidv4} from "uuid";

import {client, urlFor} from "../client";
import {pinDetailMorePinQuery, pinDetailQuery} from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const PinDetail = ({user}) => {
	const [pins, setPins] = useState(null);
	const [pinDetail, setPinDetail] = useState(null);
	const [comment, setComment] = useState("");
	const [addingComment, setAddingComment] = useState(false);
	// ID of current post we're on
	// Fetch dynamic parameters (see Route path)
	const {pinId} = useParams();

	const addComment = () => {
		if (comment) {
			setAddingComment(true);

			client
				.patch(pinId)
				.setIfMissing({comments: []})
				.insert("after", "comments[-1]", [
					{
						comment,
						_key: uuidv4(),
						postedBy: {
							_type: "postedBy",
							_ref: user._id,
						},
					},
				])
				.commit()
				.then(() => {
					fetchPinDetails();
					setComment("");
					setAddingComment(false);
				});
		}
	};

	const fetchPinDetails = () => {
		let query = pinDetailQuery(pinId);

		if (query) {
			client.fetch(query).then((data) => {
				// data, by default, returns an array of pins
				setPinDetail(data[0]);

				// if pin exists, get more detail about it
				if (data[0]) {
					query = pinDetailMorePinQuery(data[0]);

					client.fetch(query).then((res) => setPins(res));
				}
			});
		}
	};

	useEffect(() => {
		fetchPinDetails();
	}, [pinId]);

	if (!pinDetail) return <Spinner message="Loading pin..." />;

	return (
		<>
			<div
				className="flex xl-flex-row flex-col m-auto bg-white"
				style={{maxWidth: "1500px", borderRadius: "32px"}}
			>
				<div className="flex justify-center items-center md:items-start flex-initial">
					<img
						src={pinDetail?.image && urlFor(pinDetail.image).url()}
						className="rounded-t-3xl rounded-b-lg"
						alt="user-post"
					/>
				</div>
				<div className="w-full p-5 flex-1 xl:min-w-620">
					<div className="flex items-center justify-between">
						<div className="flex gap-2 items-center">
							<a
								href={`${pinDetail.image?.asset?.url}?dl=`}
								download
								onClick={(e) => e.stopPropagation()}
								className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
							>
								<MdDownloadForOffline />
							</a>
						</div>
						<a
							href={pinDetail.destination}
							target="_blank"
							rel="noreferrer"
						>
							{pinDetail.destination.length > 20
								? pinDetail.destination.slice(8, 20)
								: pinDetail.destination.slice(8)}
							{/* {pinDetail.destination} */}
						</a>
					</div>
					<div>
						<h1 className="text-4xl font-bold break-words mt-3">
							{pinDetail.title}
						</h1>
						<p className="mt-3">{pinDetail.about}</p>
					</div>
					<Link
						to={`user-profile/${pinDetail?.postedBy._id}`}
						className="flex gap-2 mt-5 items-center bg-white rounded-lg"
					>
						<img
							className="w-8 h-8 rounded-full object-cover"
							src={pinDetail.postedBy?.image}
							alt="user-profile"
						/>
						<p className="font-semibold capitalize">
							{pinDetail.postedBy?.userName}
						</p>
					</Link>
					<h2 className="mt-5 text-2xl">Comments</h2>
					<div className="max-h-370 overflow-y-auto">
						{pinDetail?.comments?.map((comment, i) => (
							<div
								className="flex gap-2 mt-5 items-center bg-white rounded-lg"
								key={i}
							>
								<img
									src={comment.postedBy.image}
									alt="user-profile"
									className="w-10 h-10rounded-full cursor-pointer"
								/>
								<div className="flex flex-col">
									<p className="font-bold">
										{comment.postedBy.userName}
									</p>
									<p>{comment.comment}</p>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-wrap mt-6 gap-3">
						<Link to={`user-profile/${user?._id}`}>
							<img
								className="w-10 h-10 rounded-full cursor-pointer"
								src={user.image}
								alt="user-profile"
							/>
						</Link>
						<input
							className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
							type="text"
							placeholder="Add a comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							type="button"
							className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
							onClick={addComment}
						>
							{addingComment ? "Posting comment..." : "Post"}
						</button>
					</div>
				</div>
			</div>
			{pins?.length > 0 ? (
				<>
					<h2 className="text-center font-bold text-2xl mt-8 mb-4">
						More like this
					</h2>
					<MasonryLayout pins={pins} />
				</>
			) : (
				<Spinner message="Loading more pins..." />
			)}
		</>
	);
>>>>>>> 14c2adbf66f1a8fd904281c2d9f69ce4df88ffa2
};

export default PinDetail;
