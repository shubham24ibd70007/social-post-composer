export const PERMISSIONS = {
  Admin: [
    "dashboard",
    "create",
    "drafts",
    "scheduled",
    "analytics",
    "settings",
  ],

  Editor: [
    "dashboard",
    "create",
    "drafts",
    "scheduled",
  ],

  Viewer: [
    "dashboard",
  ],
};

export function hasPermission(role, permission) {
  return PERMISSIONS[role]?.includes(permission);
}