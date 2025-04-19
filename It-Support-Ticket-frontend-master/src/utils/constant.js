export const modalStyle = (width) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: width || 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
});

export const departmentOptions = [
  { label: "Support Engineer", value: "Support engineer" },
  { label: "Linux Engineer", value: "Linux engineer" },
  { label: "Windows Engineer", value: "Windows engineer" },
  { label: "VM Engineer", value: "VM engineer" },
  { label: "Cloud Engineer", value: "Cloud engineer" },
  { label: "DevOps Engineer", value: "DevOps engineer" },
];

export const statusOptions = [
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];
