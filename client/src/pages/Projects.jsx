import { useQuery, gql } from "@apollo/client";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

export const GET_PROJECTS = gql`
	query getProjects {
		projects {
			_id
			name
			description
		}
	}
`;

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="bg-zinc-900 max-w-4xl rounded-lg shadow-lg p-4">
			<h1>Projects</h1>
			<ProjectForm />
			{data.projects.map((project) => (
				<ProjectCard key={project._id} project={project} />
			))}
		</div>
	);
};

export default Projects;
