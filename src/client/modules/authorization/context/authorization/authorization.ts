import React from 'react';

const AuthContext = React.createContext({
	isAuthorized: false,
	isLoading: false,
});

export default AuthContext;