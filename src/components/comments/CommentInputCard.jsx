import { useState } from "react";
import { Link } from "react-router";
const CommentInputCard = ({ loggedUser, onPost }) => {
  const [draft, setDraft] = useState("");

  if (!loggedUser) {
    return (
      <Link to="/login">
        <p className="text-lg">
          <span className="text-blue-500 hover:text-link-hover me-2">
            Log in
          </span>
          to comment.
        </p>
      </Link>
    );
  }

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
        <button
          className="btn-primary btn-sm"
          disabled={!draft.trim()}
          onClick={() => {
            onPost?.(draft);
            setDraft("");
          }}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentInputCard;
