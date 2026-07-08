import { useCategoryHook } from "../../../hooks/useCategoryHook";
const UserDashboardPostForm = () => {
  const {
    state: { category },
  } = useCategoryHook();

  return (
    <form className="w-full min-h-screen flex flex-col items-start gap-8 p-10 justify-center">
      {/* Title Field */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-semibold">
          Post Title:
        </label>
        <input
          name="title"
          type="text"
          className="w-3/4 p-3 text-lg border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
          placeholder="Enter your title here..."
        />
      </div>
      <div className="w-full flex flex-row items-center gap-4">
        <label htmlFor="cat" className="text-lg font-semibold">
          Post Category:
        </label>
        <select className="w-50 h-10 text-center border-2 border-brand rounded focus:outline-none ">
          {" "}
          <option value="">Select Category</option>
          {category.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Content Field */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="content" className="text-lg font-semibold">
          Post Content:
        </label>
        <textarea
          name="content"
          rows="8"
          className="w-full p-3 text-lg border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
          placeholder="Start writing your post..."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button type="submit" className="btn-primary btn-md  ">
          Add Post
        </button>
        <button type="button" className="btn-secondary btn-md">
          Save Draft
        </button>
      </div>
    </form>
  );
};

export default UserDashboardPostForm;
