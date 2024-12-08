type CommentComponentProps = {
	comment: PostComment;
};
const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
	return <div>{comment.body}</div>;
};

export default CommentComponent;
