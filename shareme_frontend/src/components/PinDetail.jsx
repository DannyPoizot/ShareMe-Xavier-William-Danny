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
	const [comment, setComment] = useState("null");
	const [addingComming, setAddingComment] = useState(false);
	// ID of current post we're on
	// Fetch dynamic parameters (see Route path)
	const {pinId} = useParams();

	if (!pinDetail) return <Spinner message="Loading pin..." />;

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

	return <div>PinDetail</div>;
};

export default PinDetail;
