import { Box, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPost from "../components/AddPost";

const Home: React.FC = () => {
	const queryClient = useQueryClient();

	const postsQuery = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			// Replace with API call
			return [];
		},
	});

	const addPostMutation = useMutation({
		mutationFn: async (newPost: { id: string; body: string }) => {
			// Replace with API request
			return fetch("/api/posts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newPost),
			}).then((res) => res.json());
		},
		onSuccess: (newPost) => {
			queryClient.setQueryData(["posts"], (oldPosts: any) => [
				...(oldPosts || []),
				newPost,
			]);
		},
	});

	if (postsQuery.isLoading) return <h1>Loading...</h1>;
	if (postsQuery.error) {
		return <pre>{JSON.stringify(postsQuery.error)}</pre>;
	}

	return (
		<>
			<AddPost onAddPost={addPostMutation.mutate} />
			<Box sx={{ margin: "1rem 0", border: "2px solid gray" }}>
				{postsQuery.data?.length ? (
					postsQuery?.data?.map((post: { id: string; body: string }) => (
						<div key={post?.id}>{post?.body}</div>
					))
				) : (
					<Typography component={"h3"} textAlign={"center"} padding={"2rem"}>
						No posts yet. Start by adding one or connecting with others!
					</Typography>
				)}
			</Box>
		</>
	);
};

export default Home;
