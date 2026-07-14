import { useState } from "react";
import { useCategoryHook } from "../../hooks/useCategoryHook";

const UserDashboardCatForm = () => {
  const {
    state: { category, isLoading, error },
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryHook();
  const TITLE_MIN = 5;
  const DESC_MIN = 10;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setFieldErrors({});
  };

  const validate = () => {
    const errs = {};
    if (title.trim().length < TITLE_MIN)
      errs.title = `Title must be at least ${TITLE_MIN} characters`;
    if (description.trim().length < DESC_MIN)
      errs.description = `Description must be at least ${DESC_MIN} characters`;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      if (editingId) {
        await updateCategory(editingId, {
          title: title.trim(),
          description: description.trim(),
        });
      } else {
        await createCategory({
          title: title.trim(),
          description: description.trim(),
        });
      }
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (c) => {
    setEditingId(c._id);
    setTitle(c.title);
    setDescription(c.description);
    setFieldErrors({});
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="heading-card mb-6">Manage Categories</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-8 max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-body-text"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
            placeholder="Category title..."
          />
          {fieldErrors.title && (
            <span className="text-state-error text-sm hover:text-state-error-hover">
              {fieldErrors.title}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-body-text"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
            placeholder="Category description..."
          ></textarea>
          {fieldErrors.description && (
            <span className="text-state-error text-sm hover:text-state-error-hover">
              {fieldErrors.description}
            </span>
          )}
        </div>

        {error && <span className="text-state-error text-sm">{error}</span>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary btn-sm disabled:bg-gray-300"
          >
            {editingId ? "Update Category" : "Create Category"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="btn-secondary btn-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary">
              <th className="p-3 text-sm font-semibold text-muted-text">
                Title
              </th>
              <th className="p-3 text-sm font-semibold text-muted-text">
                Description
              </th>
              <th className="p-3 text-sm font-semibold text-muted-text text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr key={c._id} className="bg-primary">
                <td className="p-3 border-t border-border text-body-text">
                  {c.title}
                </td>
                <td className="p-3 border-t border-border text-body-text">
                  {c.description}
                </td>
                <td className="p-3 border-t border-border">
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(c)}
                      className="btn-secondary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboardCatForm;
