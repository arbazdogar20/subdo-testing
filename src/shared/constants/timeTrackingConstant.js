module.exports.status = {
  checkin: {
    value: 'checkin',
  },
  break: {
    value: 'break',
  },
  returnFromBreak: {
    value: 'returnFromBreak',
  },
  checkout: {
    value: 'checkout',
  },
};

module.exports.entriesStatus = {
  checkin: {
    label: 'Working',
    value: 'checkin',
  },
  break: {
    label: 'Break',
    value: 'break',
  },
};

module.exports.trackingModes = {
  strict: {
    label: 'Strict',
    value: 'strict',
    description: 'Employees can only clock in/out from designated browser',
  },
  flexible: {
    label: 'Flexible',
    value: 'flexible',
    description: 'Allow employees to clock in from any browser',
  },
};

module.exports.reportTypes = {
  detail: {
    label: 'Detail',
    value: 'detail',
  },
  summary: {
    label: 'Summary',
    value: 'summary',
  },
};
