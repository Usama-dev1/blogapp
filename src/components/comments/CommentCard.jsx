import { useState } from "react";

const CommentCard = ({
  username,
  email,
  text,
  timestamp,
  onSave,
  onDelete,
}) => {
  const commentDummy = {
    name: "usama",
    email: "usama@gmail.com",
    text: "hell this is a test comment for checking",
    timestamp: "24/7/2026",
  };
  const loggedUser = true;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(commentDummy.text || "");

  text = commentDummy.text;
  timestamp = commentDummy.timestamp;
  email = commentDummy.email;
  username = commentDummy.name;

  if (isEditing) {
    return (
      <div className="flex flex-col comment-width bg-primary rounded-3xl p-4 pt-8 shadow-sm">
        <textarea
          rows="4"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a comment..."
          className="w-full bg-secondary rounded-xl px-4 py-3 text-body-text outline-none focus:ring-2 focus:ring-brand resize-none"
        />
        <div className="mt-4 w-full flex justify-end">
          <div className="flex gap-2">
            <button
              className="btn-base btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary btn-sm"
              onClick={() => {
                onSave?.(draft);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col comment-width bg-primary rounded-3xl p-6 shadow-sm">
      {loggedUser && (
        <div className="flex justify-end gap-3 py-2">
          <button
            className="btn-secondary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button className="btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}

      <div className="py-4">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">{username}</p>
          <p className="text-muted-text text-sm">{email}</p>
        </div>

        <p className="prose-text leading-relaxed mb-6">{text}</p>

        <div className="text-right text-muted-text text-xs">
          <p>{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
