import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useCategoryHook } from "../../../hooks/useCategoryHook";
import { usePostHook } from "../../../hooks/usePostHook";

const UserDashboardPostForm = () => {
  //set min length of title and content field in input form
  const TITLE_MIN = 80;
  const CONTENT_MIN = 150;
  //fetch backend categories
  const {
    state: { category },
  } = useCategoryHook();
  //from post hook fetch create post fn
  const { state, createPost } = usePostHook();
  const { isLoading, error } = state;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  //define errors for fields
  const validate = () => {
    const errs = {};
    if (title.trim().length < TITLE_MIN)
      errs.title = `Title must be at least ${TITLE_MIN} characters`;
    if (content.trim().length < CONTENT_MIN)
      errs.content = `Content must be at least ${CONTENT_MIN} characters`;
    if (!categoryId) errs.categoryId = "Please select a category";
    return errs;
  };
  //reset from on post success
  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategoryId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const response = await createPost({
      title: title.trim(),
      categoryId,
      content: content.trim(),
    });
    setFieldErrors({});
    resetForm();
  };
  //save the post as draft with draft as true
  const handleSaveDraft = async () => {
    if (!title || !content) return;
    await createPost({
      title: title.trim(),
      categoryId: categoryId || null,
      content: content.trim(),
      draft: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen flex flex-col items-start gap-8 p-10 justify-center"
    >
      {/* Input a Title */}
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
          required
        />
        {fieldErrors.title && (
          <span className="text-state-error text-sm hover:text-state-error-hover">
            {fieldErrors.title}
          </span>
        )}
      </div>

      {/*Select a Category*/}
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
          {category.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        {fieldErrors.categoryId && (
          <span className="text-state-error text-sm hover:text-state-error-hover">
            {fieldErrors.categoryId}
          </span>
        )}
      </div>

      {/* Input Field Content */}
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
          className="w-full p-3 text-lg border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
          placeholder="Start writing your post..."
          required
        ></textarea>
        {fieldErrors.content && (
          <span className="text-state-error text-sm hover:text-state-error-hover">
            {fieldErrors.content}
          </span>
        )}
      </div>

      {/* Draft and Submit Button */}
      <div className="flex gap-4 mt-4 items-center">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isLoading}
          className="btn-secondary btn-md"
        >
          Save Draft
        </button>
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
            "Publish Post"
          )}
        </button>
      </div>

      {error && (
        <div className="w-full flex justify-center items-center">
          <span className="text-state-error text-sm hover:text-state-error-hover">
            {error}
          </span>
        </div>
      )}
    </form>
  );
};

export default UserDashboardPostForm;
