import { FaWindowClose } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";

const ViewPostModal = ({ isOpen, onClose, loading, post, postId }) => {
  if (!isOpen) return null;

  const isStale = !post || post._id !== postId;

  if (loading || isStale)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <ImSpinner3 className="animate-spin text-7xl" />
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="w-full max-w-xl bg-primary rounded-lg shadow-lg p-6 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end mb-4">
          <button
            className="text-red-500 hover:text-red-500/60 text-2xl"
            disabled={loading}
            onClick={onClose}
          >
            <FaWindowClose />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPostModal;
