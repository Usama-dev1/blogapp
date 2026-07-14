import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/interceptors";

const UserDashboardAnalytics = () => {
  const { state: authState } = useAuth();
  const { user } = authState;

  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalUser = user.role === "user";
  const superAdmin = user.role === "super_admin";
  const admin = user.role === "admin";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/post/stats");
        setStats(res.data.data);
      } catch (err) {
        console.error("[fetchStats] Error:", err);
        setError("Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.id) fetchStats();
  }, [user?.id]);

  if (isLoading)
    return <div className="p-6 text-muted-text">Loading stats...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const userStatRows = [
    { label: "Published Posts", value: stats?.publishedPosts ?? 0 },
    { label: "Draft Posts", value: stats?.draftPosts ?? 0 },
    { label: "Comments", value: stats?.totalComments ?? 0 },
    { label: "Likes", value: stats?.totalLikes ?? 0 },
  ];

  const statRows = stats
    ? [
        { label: "Published Posts", value: stats.platform.totalPublishedPosts },
        { label: "Draft Posts", value: stats.platform.totalDraftPosts },
        { label: "Deleted Posts", value: stats.platform.totalDeletedPosts },
        {
          label: "All Posts",
          value: stats.platform.totalPostsIncludingDeleted,
        },
        { label: "Total Comments", value: stats.platform.totalComments },
        { label: "Total Likes", value: stats.platform.totalLikes },
      ]
    : [];

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-body-text">
          {superAdmin && "Welcome to Dashboard Super Admin"}
          {admin && "Welcome to Dashboard Admin"}
          {normalUser && "Welcome to Dashboard User"}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {userStatRows.map((s) => (
          <div
            key={s.label}
            className="bg-secondary rounded-lg p-4 text-center border border-border"
          >
            <div className="text-2xl font-bold text-body-text">{s.value}</div>
            <div className="text-sm text-muted-text">{s.label}</div>
          </div>
        ))}
      </div>

      {statRows.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-text mb-3">
            Site Overview
          </h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-3 text-sm font-semibold text-muted-text">
                    Stats
                  </th>
                  <th className="p-3 text-sm font-semibold text-muted-text text-right">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {statRows.map((s, i) => (
                  <tr
                    key={s.label}
                    className={i % 2 === 0 ? "bg-primary" : "bg-secondary/40"}
                  >
                    <td className="p-3 border-t border-border text-body-text">
                      {s.label}
                    </td>
                    <td className="p-3 border-t border-border text-right font-semibold text-body-text">
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardAnalytics;
