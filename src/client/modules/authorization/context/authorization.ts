import React from 'react';

const AuthContext = React.createContext({
	isAuthorized: false,
});

export default AuthContext;