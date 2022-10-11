import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../pages/Projects";

const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			_id
			name
			description
		}
	}
`;

const ProjectForm = () => {
	const [project, setProject] = useState({
		name: "",
		description: "",
	});

	const [createProject, { loading, data, error }] = useMutation(
		CREATE_PROJECT,
		{
			refetchQueries: [
				{
					query: GET_PROJECTS,
				},
				"GetProjects",
			],
		}
	);

	const handleChange = (e) =>
		setProject({ ...project, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		createProject({
			variables: {
				name: project.name,
				description: project.description,
			},
		});
	};

	console.log(data);

	if (loading) return "Submitting...";
	if (error) return `Submission error! ${error.message}`;

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				placeholder="Write a title"
				className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
				onChange={handleChange}
				autoFocus
			/>
			<textarea
				name="description"
				rows="3"
				placeholder="Write a description"
				className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
				onChange={handleChange}
			></textarea>

			<div className="flex justify-end">
				<button className="bg-blue-500 px-4 rounded-md py-1 text-lg mb-3">
					Save
				</button>
			</div>
		</form>
	);
};

export default ProjectForm;
