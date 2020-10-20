// Router
/* eslint-disable react/prop-types */
import React from 'react';
import { Router, Location } from '@reach/router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Text from './text';
import NameView from './name_view';

const PageTransitionGroup = styled(TransitionGroup)`
`;

const PageRouter = styled(Router)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	&.fade-enter > div {
		opacity: 0;
  		z-index: 1;
	}

	&.fade-enter-active > div {
		opacity: 1;
		transition: opacity 450ms ease-in;
	}
`;

const FadeTransitionRouter = (props) => (
	<Location>
		{({ location }) => (
			<PageTransitionGroup>
				<CSSTransition key={location.key} classNames="fade" timeout={500}>
					<PageRouter location={location}>
						{props.children}
					</PageRouter>
				</CSSTransition>
			</PageTransitionGroup>
		)}
	</Location>
);

const AppRouter = () => (
	<FadeTransitionRouter>
		<Text path="/names" component={Text} />
        <NameView path="/name-view/:testId" component={NameView}  />
	</FadeTransitionRouter>
);

export default AppRouter; 