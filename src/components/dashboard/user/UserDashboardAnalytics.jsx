import { usePostHook } from "../../../hooks/usePostHook";
import { useAuth } from "../../../hooks/useAuth";
import { useMemo } from "react";
const UserDashboardAnalytics = () => {
  const {
    state: { posts },
  } = usePostHook();
  const { state: authState } = useAuth();
  const { user, isLoading } = authState;
  const normalUser = user.role === "user";
  const superAdmin = user.role === "super_admin";
  const admin = user.role === "admin";
  const userPosts = useMemo(() => {
    if (!user?.id || !posts) return [];
    return posts.filter((post) => post.userId === user.id);
  }, [posts, user]);
  const stats = [{ label: "Posts", value: userPosts?.length ?? 0 }];
  return (
    <div className="w-full p-6">
      <div>
        <h2 className="heading-card">
          {superAdmin && "Welcome to Dashboard Super Admin"}
          {admin && "Welcome to Dashboard Admin"}
          {normalUser && "Welcome to Dashboard User "}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center bg-secondary rounded-lg p-4 flex-1"
          >
            <span className="text-2xl font-bold text-body-text">{s.value}</span>
            <span className="text-sm text-body-text/70">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardAnalytics;
