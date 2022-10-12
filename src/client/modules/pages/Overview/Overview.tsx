import axios, { AxiosResponse } from 'axios';
import React from 'react';
import {useAppQuery} from '../../../libs/query';
import { queryRequestsCreator } from '../../../infrastructure/initDataCreators/createQueries';

const getTodos = async () => {
	const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
	return await res.data;
};
const key = ['todos'];

const Overview = () => {
	const todos = useAppQuery(key, getTodos);

	if(todos.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			Overview
			{JSON.stringify(todos.data)}
		</div>
	);
};

const queryData = [{
	key: key,
	fn: getTodos,
}];

export default {
	component: Overview,
	initialData: {
		getInitialQueryData: queryRequestsCreator(queryData),
	},
};