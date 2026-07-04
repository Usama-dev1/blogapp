const CommentCard = () => {
  const loggedUser = true;
  return (
    <div className="flex flex-col comment-width bg-primary rounded-3xl p-6 shadow-sm">
      {loggedUser && (
        <div className="flex justify-end gap-3 py-2">
          <button className="btn-secondary btn-sm">Edit</button>
          <button className="btn-danger btn-sm">Delete</button>
        </div>
      )}
      <div className="py-4">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">username</p>
          <p className="text-muted-text text-sm">usama@gmail.com</p>
        </div>

        <p className="prose-text leading-relaxed mb-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, quos.
        </p>

        <div className="text-right text-muted-text text-xs">
          <p>10 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
