import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
	query getProjects {
		projects {
			_id
			name
			description
		}
	}
`;

export const GET_PROJECT = gql`
	query getProject($id: ID!) {
		project(_id: $id) {
			_id
			name
			description
			createdAt
			updatedAt
			tasks {
				_id
				title
			}
		}
	}
`;

export const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			_id
			name
			description
		}
	}
`;

export const DELETE_PROJECT = gql`
	mutation DeleteProject($id: ID!) {
		deleteProject(_id: $id) {
			_id
		}
	}
`;

