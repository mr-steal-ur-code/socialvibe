import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const posts = [
	{
		id: 1,
		title: "Post 1",
	},
	{
		id: 2,
		title: "Post 2",
	},
];

const Posts: React.FC = () => {
	const queryClient = useQueryClient();
	const postsQuery = useQuery({
		queryKey: ["posts"],
		queryFn: () => wait(1000).then(() => [...posts]),
	});

	const newPost = useMutation({
		mutationFn: (title: string) => {
			return wait(1000).then(() => posts.push({ id: posts.length + 1, title }));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
		},
	});

	if (postsQuery.isLoading) return <h1>Loading...</h1>;
	if (postsQuery.error) {
		return <pre>{JSON.stringify(postsQuery.error)}</pre>;
	}

	return (
		<Box>
			{postsQuery.data?.map((post: { id: number; title: string }) => (
				<div key={post?.id}>{post?.title}</div>
			))}
			<button
				disabled={newPost.isPending}
				onClick={() => newPost.mutate("Post 3")}
			>
				Add New
			</button>
		</Box>
	);
};

function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Posts;
