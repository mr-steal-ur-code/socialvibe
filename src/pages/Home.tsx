import { Box, Container, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPost from "../components/AddPost";
import QuickAddCarousel from "../components/QuickAddCarousel";
import PostComponent from "../components/PostComponent";
import { useEffect } from "react";

const Home: React.FC = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const apiCall = async () => {
			const apicall = await fetch("https://api-6ug644yr2a-uc.a.run.app");
			console.log("api call:", apicall);
		};
		apiCall();
	}, []);

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

	const addReactionMutation = useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			// Replace with API call
			return fetch(`/api/posts/${id}/reactions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}).then((res) => res.json());
		},
		onSuccess: (_, { id }) => {
			queryClient.setQueryData(["posts"], (oldPosts: any) =>
				oldPosts.map((post: any) =>
					post.id === id
						? { ...post, reactions: (post.reactions || 0) + 1 }
						: post
				)
			);
		},
	});

	const addCommentMutation = useMutation({
		mutationFn: async ({ id, comment }: { id: string; comment?: string }) => {
			// Replace with API call
			return fetch(`/api/posts/${id}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ comment }),
			}).then((res) => res.json());
		},
		onSuccess: (newComment, { id }) => {
			queryClient.setQueryData(["posts"], (oldPosts: any) =>
				oldPosts.map((post: any) =>
					post.id === id
						? { ...post, comments: [...(post.comments || []), newComment] }
						: post
				)
			);
		},
	});

	if (postsQuery.isLoading) return <h1>Loading...</h1>;
	if (postsQuery.error) {
		return <pre>{JSON.stringify(postsQuery.error)}</pre>;
	}

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				gap: "2rem",
			}}
		>
			<QuickAddCarousel onAddFriend={() => alert("Add Friend")} />
			<AddPost onAddPost={addPostMutation.mutate} />
			<PostComponent
				key={1}
				onReaction={() => alert("Reaction")}
				onComment={() => alert("Comment")}
				post={{
					userId: "0987",
					createdAt: new Date().toISOString(),
					id: "1",
					body: "This is a placeholder body",
					reactions: [
						{
							reacts: {
								"👍": 3,
							},
							userId: "user1",
							postId: "1",
							createdAt: new Date().toISOString(),
							id: "1232468",
						},
						{
							reacts: {
								"❤️": 5,
							},
							userId: "user2",
							postId: "1",
							createdAt: new Date().toISOString(),
							id: "54321",
						},
						{
							reacts: {
								"😂": 2,
							},
							userId: "user3",
							postId: "1",
							createdAt: new Date().toISOString(),
							id: "123456789",
						},
					],
					comments: [
						{
							id: "1",
							postId: "1",
							userId: "user1",
							body: "This is a test comment",
							createdAt: new Date().toISOString(),
						},
					],
				}}
			/>
			<PostComponent
				key={2}
				onReaction={() => alert("Reaction")}
				onComment={() => alert("Comment")}
				post={{
					userId: "9753",
					id: "1",
					body: "This is a placeholder body",
					reactions: [],
					comments: [],
					createdAt: new Date().toISOString(),
				}}
			/>
			<Box
				sx={{
					border: "2px solid gray",
					width: "100%",
					maxWidth: "800px",
					padding: "1rem",
					borderRadius: "8px",
				}}
			>
				{postsQuery.data?.length ? (
					postsQuery?.data?.map((post: Post) => (
						<PostComponent
							key={post?.id}
							post={post}
							onReaction={addReactionMutation.mutate}
							onComment={addCommentMutation.mutate}
						/>
					))
				) : (
					<Typography component={"h3"} textAlign={"center"} padding={"2rem"}>
						No posts yet. Start by adding one or connecting with others!
					</Typography>
				)}
			</Box>
		</Container>
	);
};

export default Home;
