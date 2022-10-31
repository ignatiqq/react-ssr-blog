import React from 'react';
import axios from 'axios';
import {useAppQuery} from '@client/libs/query';
import { queryRequestsCreator } from '@general-infrastructure/libs/query';

const getTodos = async () => {
	const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
	return await res.data;
};
const key = ['todos'];

const Overview = () => {
	const todos = useAppQuery(key, getTodos);

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