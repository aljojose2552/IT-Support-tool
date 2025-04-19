export const updateResValues = async (list) => {
    return list.map((item, ind) => {
      const newItem = {
        ...item,
        id: ind + 1,
        engName: item.assignedTo
          ? `${item.assignedTo.firstname} ${item.assignedTo.lastname}`
          : "Not Assigned",
        userName: `${item.createdBy.firstname} ${item.createdBy.lastname}`,
      };
      return newItem;
    });
  };