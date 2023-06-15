const allRoles = {
  user: [],
  promotor: ['getUsers', 'manageEvents', 'manageOrders'],
  admin: ['getUsers', 'manageUsers', 'manageEvents', 'manageOrders'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
