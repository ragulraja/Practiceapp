// App
import React from 'react';
// import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import {Route, Switch} from 'react-router-dom';

// for apollo client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
// import Text from './text';
// import AppRouter from './router';
import Header from './header';
import PostList from "./PostList";
import NewPost from "./NewPost";
import SecuredRoute from "./SecuredRoute";
import Profile from "./Profile"

const client = new ApolloClient({
	uri: 'http://35.193.184.199:8080/v1/graphql',
	request: (operation) => {
		operation.setContext({
			headers: {
				'Content-Type': 'application/json',
				'x-hasura-admin-secret': 'Meta2020Limits',
			},
		});
	},
});

// App
const App = () => (
	<ApolloProvider client={client}>
		<Header />
		<Switch>
        <Route exact path="/" component={PostList} />
		<SecuredRoute path="/new-post" component={NewPost} />
        <SecuredRoute path={"/user/:id"} component={Profile} /> 
      </Switch>
	</ApolloProvider>
);

export default App;
