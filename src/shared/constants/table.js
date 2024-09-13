export const ManagerTableHeaderFields = {
  firstName: {
    title: 'First Name',
    type: 'string',
  },
  lastName: {
    title: 'Last Name',
    type: 'string',
  },
  email: {
    title: 'Email',
    type: 'string',
  },
  organization: {
    title: 'Organization',
    type: 'string',
  },
  status: {
    title: 'Status',
    type: 'status',
  },
  isDisabled: {
    title: 'Activation',
    type: 'switch',
  },
};

export const managerTableSearchKeys = {
  name: 'firstName',
  email: 'email',
  organization: 'organization',
};

// -----------------------------Employees Detail

export const employeeTableHeaderFields = {
  employeeId: {
    title: 'Employee Id',
    type: 'string',
  },
  firstName: {
    title: 'First Name',
    type: 'string',
  },
  lastName: {
    title: 'Last Name',
    type: 'string',
  },
  email: {
    title: 'Email',
    type: 'string',
  },
  position: {
    title: 'Position',
    type: 'string',
  },
  rate: {
    title: 'Rate',
    type: 'string',
  },
  isDisabled: {
    title: 'Activation',
    type: 'accessibility',
  },
};

export const employeeTableSearchKeys = {
  employeeId: 'employeeId',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  position: 'position',
};

// -----------------------------Departments Detail

export const departmentTableHeaderFields = {
  name: {
    title: 'Name',
    type: 'string',
  },
};

export const departmentTableSearchKeys = {
  name: 'name',
};

//------------------------------Roles Detail

export const positionsTableHeaderFields = {
  name: {
    title: 'Name',
    type: 'string',
  },
};

export const positionsTableSearchKeys = ['name'];
