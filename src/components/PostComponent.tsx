import {
	Box,
	Button,
	Stack,
	TextField,
	Typography,
	IconButton,
	Avatar,
} from "@mui/material";
import { useState } from "react";
import CommentComponent from "./CommentComponent.";

interface PostProps {
	post: Post;
	onReaction: (post: Post) => void;
	onComment: (post: Post) => void;
}

const reactions: ("👍" | "❤️" | "😂" | "😮" | "😢" | "👏")[] = [
	"👍",
	"❤️",
	"😂",
	"😮",
	"😢",
	"👏",
];

const PostComponent: React.FC<PostProps> = ({
	post,
	onReaction,
	onComment,
}) => {
	const [showReactionInput, setShowReactionInput] = useState(false);
	const [showCommentInput, setShowCommentInput] = useState(false);
	const [commentBody, setCommentBody] = useState<string>("");

	const handleReactionSubmit = (react: string) => {
		if (!react) return;

		const reactions = post.reactions || [];

		const existingReactionIndex = reactions.findIndex(
			(reaction) => reaction.reacts[react as keyof typeof reaction.reacts]
		);

		let updatedReactions;

		if (existingReactionIndex && existingReactionIndex !== -1) {
			updatedReactions = [...reactions];
			updatedReactions[existingReactionIndex] = {
				...updatedReactions[existingReactionIndex],
				reacts: {
					...updatedReactions[existingReactionIndex].reacts,
					[react]:
						(updatedReactions[existingReactionIndex].reacts[
							react as ReactionKeys
						] || 0) + 1,
				},
				id: "123456",
				userId: "userIdPlaceholder",
				postId: post.id,
				createdAt: new Date().toISOString(),
			};
		} else {
			updatedReactions = [
				...(post.reactions || []),
				{
					reacts: {
						[react]: 1,
					},
					id: "123456789",
					userId: "userIdPlaceholder",
					postId: post.id,
					createdAt: new Date().toISOString(),
				},
			];
		}

		onReaction({
			...post,
			reactions: updatedReactions,
		});

		setShowReactionInput(false);
	};

	const handleCommentSubmit = () => {
		if (!commentBody.trim()) return;

		const newComment: PostComment = {
			id: Date.now().toString(),
			postId: post.id,
			userId: "userIdPlaceholder",
			body: commentBody,
			createdAt: new Date().toISOString(),
		};

		const updatedComments = [...(post.comments || []), newComment];

		onComment({
			...post,
			comments: updatedComments,
		});

		setShowCommentInput(false);
		setCommentBody("");
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				gap: 2,
				padding: 2,
				border: "1px solid #ddd",
				borderRadius: 2,
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Avatar />
			<Typography variant="body1" color="text.primary">
				{post.body}
			</Typography>

			{post?.comments?.length ? (
				<Box sx={{ marginTop: 2 }}>
					<Stack spacing={1}>
						{post.comments.map((comment) => (
							<CommentComponent key={comment?.id} comment={comment} />
						))}
					</Stack>
				</Box>
			) : null}

			<Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
				{post?.reactions?.map((reaction) => {
					const emojiCount = Object.entries(reaction?.reacts);

					return (
						<Typography
							key={reaction.userId}
							variant="body2"
							sx={{ fontSize: 16 }}
						>
							<span role="img" aria-label={emojiCount[0][0]}>
								{emojiCount[0][0]} {emojiCount[0][1]}
							</span>
						</Typography>
					);
				})}
			</Box>

			{showReactionInput && (
				<Stack direction="row" spacing={1} alignItems="center">
					{reactions.map((reaction) => (
						<IconButton
							key={reaction}
							onClick={() => {
								handleReactionSubmit(reaction);
							}}
							sx={{
								fontSize: 24,
								padding: 0.5,
								color: "text.secondary",
								"&:hover": {
									color: "primary.main",
									backgroundColor: "rgba(0, 0, 0, .1)",
								},
							}}
						>
							{reaction}
						</IconButton>
					))}
				</Stack>
			)}

			{showCommentInput && (
				<Stack direction="row" spacing={2} alignItems="center">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Write a comment..."
						value={commentBody}
						onChange={(e) => setCommentBody(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={handleCommentSubmit}
						disabled={!commentBody.trim()}
					>
						Submit
					</Button>
				</Stack>
			)}

			<Stack direction="row" spacing={2}>
				<Button
					variant="text"
					onClick={() => setShowReactionInput(!showReactionInput)}
					sx={{
						textTransform: "none",
						color: "primary.main",
						"&:hover": { textDecoration: "underline" },
					}}
				>
					React
				</Button>
				<Button
					variant="outlined"
					onClick={() => setShowCommentInput(!showCommentInput)}
					sx={{
						textTransform: "none",
						borderRadius: 4,
					}}
				>
					Comment
				</Button>
			</Stack>
		</Box>
	);
};

export default PostComponent;
