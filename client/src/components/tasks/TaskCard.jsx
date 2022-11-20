import ButtonIcon from "../ui/ButtonIcon";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/tasks";

const TaskCard = ({ task }) => {
	const [deleteTask] = useMutation(DELETE_TASK, {
		refetchQueries: ["getProject"],
	});

	return (
		<div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between">
			<h1>{task.title}</h1>
			<div className="flex gap-x-2">
				<ButtonIcon icon={<AiOutlineCheck />} />
				<ButtonIcon
					icon={
						<AiOutlineDelete
							onClick={() => {
								deleteTask({
									variables: {
										id: task._id,
									},
								});
							}}
						/>
					}
				/>
			</div>
		</div>
	);
};

export default TaskCard;
