const CommentInputCard = () => {
  const isEditing = true;
  return (
    <div className="flex flex-col comment-width bg-primary rounded-3xl p-4 pt-8 shadow-sm">
      <textarea
        rows="4"
        placeholder="Write a comment..."
        className="w-full bg-secondary rounded-xl px-4 py-3 text-body-text outline-none focus:ring-2 focus:ring-brand resize-none"
      />
      <div className="mt-4 w-full flex justify-end">
        {isEditing ? (
          <button className="btn-primary btn-sm">Post Comment</button>
        ) : (
          <div className="flex gap-2">
            <button className="btn-base btn-sm ">Cancel</button>
            <button className="btn-primary btn-sm">Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInputCard;
