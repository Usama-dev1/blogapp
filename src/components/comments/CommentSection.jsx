import CommentCard from "./CommentCard";
import CommentInputCard from "./CommentInputCard";

const CommentSection = () => {
  return (
    <div className="body-width border-t border-border flex items-center p-8">
      <div className="w-full py-8 flex flex-col justify-center gap-4 items-center">
        <CommentCard />
        <CommentInputCard />
      </div>
    </div>
  );
};

export default CommentSection;
