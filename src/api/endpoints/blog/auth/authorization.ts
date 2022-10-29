import blogAPI from '../config';

type loginDataType = {
    email: string;
    password: string;
}

const authorization = Object.freeze({
	login({email, password}: loginDataType) {
		return blogAPI.post('/authorization-by-admin', {email, password});
	},
});

export default authorization;