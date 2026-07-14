import { FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useCategoryHook } from "../../hooks/useCategoryHook";
import { usePostHook } from "../../hooks/usePostHook";

const EditPostModal = ({ isOpen, onClose, loading, post }) => {
  //set content check length for validation
  const TITLE_MIN = 10;
  const CONTENT_MIN = 20;

  const {
    state: { category },
  } = useCategoryHook();

  const { state, updatePost } = usePostHook();
  const { isLoading, error } = state;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchPost = (post) => {
      setTitle(post.title ?? "");
      setContent(post.content ?? "");
      setCategoryId(post.categoryId?._id ?? "");
    };
    fetchPost(post);
  }, [post]);

  const validate = () => {
    const errs = {};
    if (title.trim().length < TITLE_MIN)
      errs.title = `Title must be at least ${TITLE_MIN} characters`;
    if (content.trim().length < CONTENT_MIN)
      errs.content = `Content must be at least ${CONTENT_MIN} characters`;
    if (!categoryId) errs.categoryId = "Please select a category";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    await updatePost(post._id, {
      title: title.trim(),
      categoryId,
      content: content.trim(),
    });
    setFieldErrors({});
    onClose();
  };

  if (!isOpen) return null;
  if (loading)
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
        className="w-full  max-w-lg md:max-w-3xl bg-primary rounded-lg shadow-lg p-6 max-h-90vh flex flex-col"
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

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-6 overflow-y-auto flex-1 p-2"
        >
          {/* post title */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-semibold">
              Post Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-3/4 p-3 text-lg border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
              placeholder="Enter your title here..."
            />
            {/* error message for title */}

            {fieldErrors.title && (
              <span className="text-state-error text-sm hover:text-state-error-hover">
                {fieldErrors.title}
              </span>
            )}
          </div>
          {/* post category*/}

          <div className="w-full flex flex-row items-center gap-4">
            <label htmlFor="cat" className="text-lg font-semibold">
              Post Category:
            </label>
            <select
              id="cat"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-50 h-10 text-center border-2 border-brand rounded focus:outline-none"
            >
              <option value="">Select Category</option>
              {(category ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
            {/* error message for category */}

            {fieldErrors.categoryId && (
              <span className="text-state-error text-sm hover:text-state-error-hover">
                {fieldErrors.categoryId}
              </span>
            )}
          </div>
          {/* post content */}

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="content" className="text-lg font-semibold">
              Post Content:
            </label>
            <textarea
              id="content"
              name="content"
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-lg border border-border rounded-lg focus:ring-1 focus:ring-brand focus:outline-none"
              placeholder="Start writing your post..."
            ></textarea>

            {/* error message for content */}
            {fieldErrors.content && (
              <span className="text-state-error text-sm hover:text-state-error-hover">
                {fieldErrors.content}
              </span>
            )}
          </div>
          {/* submit button */}

          <div className="flex gap-4 mt-4 items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn-md flex items-center gap-2"
            >
              {isLoading ? (
                <span>
                  <ImSpinner3 className="animate-spin" />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
          {/* error display message */}

          {error && (
            <div className="w-full flex justify-center items-center">
              <span className="text-state-error text-sm hover:text-state-error-hover">
                {error}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
