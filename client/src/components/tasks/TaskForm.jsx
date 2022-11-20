import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CREATE_TASK } from "../../graphql/tasks";

const TaskForm = () => {
	const params = useParams();
	const [createTask] = useMutation(CREATE_TASK, {
		refetchQueries: ["getProject"],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await createTask({
			variables: {
				title: e.target.title.value,
				projectId: params.id,
			},
		});
		console.log(result);
		e.target.reset();
		e.target.title.focus();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="title"
				placeholder="Write a task"
				className="bg-zinc-900 text-white w-full p-2 rounded-lg mb-2"
			/>
			<button className="bg-sky-900 text-white w-full p-2 rounded-lg mb-2">
				Add
			</button>
		</form>
	);
};

export default TaskForm;
