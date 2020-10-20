import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const REF_SOURCE = gql`
    query($testId: Int!){
        test (where:{testId :{_eq: $testId}}){
            id
            name
        }
    }
`;

const REF_NAME_STATUS_UPDATE = gql`
	mutation update_test($id: Int!,  $name:String!) {
		update_test(where: {id:{_eq: $id}}, _set: {name: $name}) {
			returning{
				id
				name
			}
		}
	}
`;

 const REMOVE_TODO = gql`
    mutation removeTodo ($id: Int!) {
      delete_test(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
`;

// Main Component
const NameView = (props) => {
	const { testId } = props;

	const { loading, error, data } = useQuery(REF_SOURCE, {
		variables: { name: testId },
    });

    const [update_test] = useMutation(REF_NAME_STATUS_UPDATE);
    const [removeTodoMutation] = useMutation(REMOVE_TODO);
    const [names, setName] = useState('');


    // useEffect(() => {
	// 	const nameData = data && data.test[0];
	// 	if (nameData) {
	// 		setChecked(nameData.name);
	// 	}
    // }, [data]);

    const handleChange=(e) => {
        setName(e.target.value);
    }

    const handleUpdate = () => {
		update_test({ variables: { id: testId, name: names } });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        removeTodoMutation({
        variables: {id: testId},
        optimisticResponse: true,
        update: (cache) => {

        const existingTodos = cache.readQuery({ query: REF_NAME_STATUS_UPDATE });
        const newTodos = existingTodos.todos.filter(t => (t.id !== testId));
            cache.writeQuery({
            query: REF_NAME_STATUS_UPDATE,
            data: {todos: newTodos}
        });
    }
    });
};

    return (
        <div>
            {testId}
            <input type="text" onChange={handleChange}></input>
            <button type="submit" onClick={handleUpdate}>Update Data</button>
            <button type="submit" onClick={handleDelete}>Delete data</button>   
        </div>
    );
};

NameView.propTypes = {
	testId: PropTypes.string,
};

NameView.defaultProps = {
	testId: '',
};

export default React.memo(NameView, isEqual);
