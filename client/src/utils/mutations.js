import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        token
        user{
            _id
            username
            email
            roadtrips {
                _id
                name
                destination
            }
            expenses {
                _id
                cost
                category
                comment
            }
        }
    }
}
`;

export const CREATE_USER = gql`
mutation createUser ($username: String!, $email: String!, $password: String!) {
    createUser ( username: $username, email: $email, password: $password) {
        token
        user {
          _id
          email
          username
        }
    }
}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $_id: ID!) {
		addUser(username: $username, _id: $_id) {
			_id
			username
			email
			roadtrips {
				_id
				name
				destination
			}
			expenses {
				_id
				cost
				category
				comment
			}
		}
	}
`;

export const REMOVE_USER = gql`
	mutation removeUser($userId: String!, $_id: ID!) {
		removeUser(userId: $userId, _id: $_id) {
			_id
			name
			destination
			playlist
			images {
				_id
				username
				url
				alt
			}
			expenses {
				_id
				category
				cost
				comment
				username
			}
			stops {
				_id
				lat
				lon
			}
			users {
				_id
				username
			}
		}
	}
`;

export const ADD_TRIP = gql`
	mutation addRoadtrip($name: String!) {
		addRoadtrip(name: $name) {
			_id
			name
			destination
			playlist
			images {
				_id
				username
				url
				alt
			}
			expenses {
				_id
				category
				cost
				comment
				username
			}
			stops {
				_id
				lat
				lon
			}
			users {
				_id
				username
			}
		}
	}
`;

export const DELETE_TRIP = gql`
	mutation deleteRoadtrip($id: ID!) {
		deleteRoadtrip(_id: $id) {
			_id
			name
			destination
			playlist
			images {
				_id
				username
				url
				alt
			}
			expenses {
				_id
				category
				cost
				comment
				username
			}
			stops {
				_id
				lat
				lon
			}
			users {
				_id
				username
			}
		}
	}
`;

export const ADD_EXPENSE = gql`
	mutation addExpense(
		$category: String!
		$cost: Int!
		$comment: String
		$username: String!
	) {
		addExpense(
			category: $category
			cost: $cost
			comment: $comment
			username: $username
		) {
			_id
			category
			cost
			comment
			username
		}
	}
`;

export const DELETE_EXPENSE = gql`
	mutation deleteExpense($id: ID!) {
		deleteExpense(id: $id) {
			_id
			category
			cost
			comment
			username
		}
	}
`;

export const ADD_IMAGE = gql`
	mutation addImage($username: String!, $url: String!, $alt: String!) {
		addImage(username: $username, url: $url, alt: $alt) {
			_id
			username
			url
			alt
		}
	}
`;

export const DELETE_IMAGE = gql`
	mutation deleteImage($id: ID!) {
		deleteImage(id: $id) {
			_id
			username
			url
			alt
		}
	}
`;

export const ADD_STOP = gql`
	mutation addStop($lat: String!, $lon: String) {
		addStop(lat: $lat, lon: $lon) {
			_id
			lat
			lon
		}
	}
`;

export const DELETE_STOP = gql`
	mutation deleteStop($id: ID!) {
		deleteStop(id: $id) {
			_id
			lat
			lon
		}
	}
`;
