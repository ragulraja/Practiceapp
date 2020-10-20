// Text
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import isEqual from 'react-fast-compare';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const REF_SOURCE = gql`
    query{
        test {
			id
            name
            }
    }
`;

const REF_Test_INSERT = gql`
    mutation insert_test($name: String!) {
        insert_test(objects:
        {
            name: $name,
        }
        ) {
            returning {
                id
                name
            }
        }
    }
`;

// Main Component
const Text = (props) => {
	const { name } = props;
	const { loading, error, data, refetch } = useQuery(REF_SOURCE);

	const [insert_test] = useMutation(REF_Test_INSERT);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const refSource = (data && data.test) || [];

	const handleClick = (id) => {
		navigate(`/name-view/${id}`);

	}

	const onClickItem = async (value) => {
		const { data } = await insert_test({
			variables: {
				name: value,
			},
		});
	}

	console.log(refSource);

    return (
		<div className="text">
			{refSource.map((test, id) => (
					<div onClick={() => handleClick(test.id)}>
						{test.name} {`${test.id}`}
					</div>
				))}
				<button onClick={() => onClickItem(name)}>Link</button>
		  </div>
	);
};

Text.propTypes = {
	name: PropTypes.string,
};

Text.defaultProps = {
	name: 'Insert',
};

export default React.memo(Text, isEqual);
