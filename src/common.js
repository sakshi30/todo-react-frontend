const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "To Do":
      return "In Progress";
    case "In Progress":
      return "Done";
    case "Done":
    default:
      return "To Do";
  }
};

export { getNextStatus };
