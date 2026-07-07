import React from "react";

const DashboardPostForm = () => {
  return (
    <form className="w-full min-h-screen flex flex-col items-start gap-8 p-10 justify-center">
      {/* Title Field */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-semibold">
          Post Title
        </label>
        <input
          name="title"
          type="text"
          className="w-3/4 p-3 text-lg border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
          placeholder="Enter your title here..."
        />
      </div>

      {/* Content Field */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="content" className="text-lg font-semibold">
          Post Content
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
        <button
          type="submit"
          className="px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition"
        >
          Add Post
        </button>
        <button
          type="button"
          className="px-8 py-3 bg-gray-200 text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-300 transition"
        >
          Save Draft
        </button>
      </div>
    </form>
  );
};

export default DashboardPostForm;
