import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { ImSpinner9 } from "react-icons/im";
import { useRef } from "react";

const initialState = {
	name: "",
	description: "",
};

const ProjectForm = () => {
	const [project, setProject] = useState(initialState);
	const titleInput = useRef();

	const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
		refetchQueries: [
			{
				query: GET_PROJECTS,
			},
			"GetProjects",
		],
	});

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
		setProject(initialState);
		titleInput.current.focus();
	};

	return (
		<form onSubmit={handleSubmit} className="w-2/5">
			{error && <p className="bg-red-500 p-3 mb-2">{error.message}</p>}
			<input
				type="text"
				name="name"
				placeholder="Write a title"
				className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
				onChange={handleChange}
				value={project.name}
				ref={titleInput}
				autoFocus
			/>
			<textarea
				name="description"
				rows="3"
				placeholder="Write a description"
				className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
				onChange={handleChange}
				value={project.description}
			></textarea>

			<div className="flex justify-end">
				<button
					className="bg-blue-500 px-4 rounded-md py-1 text-lg mb-3 disabled:bg-zinc-400"
					disabled={!project.name || !project.description}
				>
					{loading ? <ImSpinner9 className="animate-spin" /> : "Save"}
				</button>
			</div>
		</form>
	);
};

export default ProjectForm;
