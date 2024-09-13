export const prepareTableDataList = ({dataList, headerFields}) => {
  return dataList?.map((data) => {
    const preparedData = {};
    Object.entries(headerFields).forEach(([key]) => {
      if (key === 'status') {
        preparedData[key] = data['isVerified'] ? 'Verified' : 'Pending';
      } else if (key === 'organization') {
        preparedData[key] = data?.organization?.name || 'Not Registered';
      } else {
        preparedData[key] = data[key] || '';
      }
    });
    preparedData['position'] = data['position']?.name || '';
    preparedData['isVerified'] = data['isVerified'] || false;
    preparedData['id'] = data['id'] || '';
    preparedData['rate'] = `$${data['rate']}`;
    preparedData['isDisabled'] = data['isDisabled'] || false;
    return preparedData;
  });
};

export const filterTableData = ({data, search, searchKeys = {}}) => {
  const searchValue = search.toLowerCase();
  return data?.filter((item) => {
    return Object.keys(searchKeys).some((key) => {
      const value = item[searchKeys[key]]?.toString().toLowerCase();
      return value?.includes(searchValue);
    });
  });
};
