'use client';
import InviteEmployeeViaCSVDialog from '@/components/dashboard/dialogs/inviteEmployeeCSVDialogue';
import Header from '@/components/dashboard/header';
import Table from '@/components/table';
import EmployeeFormDialog from '@/shared/components/dashboard/dialogs/EmployeeFormDialog';
import {
  employeeTableHeaderFields,
  employeeTableSearchKeys,
} from '@/shared/constants/table';
import {getUsersList} from '@/shared/redux/slices/user';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import {useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import {FaCloudUploadAlt} from 'react-icons/fa';
import {FaFileWaveform} from 'react-icons/fa6';
import {useSelector} from 'react-redux';
import {isFetchingInitialAppData} from '@/shared/redux/slices/app';

export default function ManagerDashboard() {
  const title = 'Employees List';

  const usersList = useSelector(getUsersList);
  const isFetching = useSelector(isFetchingInitialAppData);

  const [search, setSearch] = useState('');
  const [itemsToShow] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const [handleFormDialog, setHandleFormDialog] = useState({
    open: false,
    type: '',
    data: {},
  });
  const [openInviteCSVDialog, setOpenInviteCSVDialog] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: usersList,
    headerFields: employeeTableHeaderFields,
  });

  const actions = [
    {
      id: 1,
      label: 'Edit',
      method: ({user}) =>
        setHandleFormDialog({open: true, type: 'edit', data: user}),
      icon: <BsPencilSquare />,
      keyToDisable: '',
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: employeeTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  const buttonMenuList = [
    {
      id: 1,
      title: 'Manually Add Employee',
      icon: <FaFileWaveform size={25} color="var(--primary)" />,
      method: () => setHandleFormDialog({open: true, type: 'invite', data: {}}),
    },
    {
      id: 2,
      title: 'Import from CSV',
      icon: <FaCloudUploadAlt size={25} color="var(--primary)" />,
      method: () => setOpenInviteCSVDialog(true),
    },
  ];

  return (
    <>
      <EmployeeFormDialog
        open={handleFormDialog?.open}
        type={handleFormDialog?.type}
        data={handleFormDialog?.data}
        setOpen={setHandleFormDialog}
      />
      <InviteEmployeeViaCSVDialog
        open={openInviteCSVDialog}
        setOpen={setOpenInviteCSVDialog}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        placeholder="Search Employees"
        btnText="Add Employee"
        handleClick={() =>
          setHandleFormDialog({open: true, type: 'invite', data: {}})
        }
        hasButtonMenu={true}
        buttonMenuList={buttonMenuList}
      />
      <Table
        headerList={employeeTableHeaderFields}
        dataList={paginatedDataList}
        actions={actions}
        itemsToShow={itemsToShow}
        totalItems={filteredDataList?.length}
        handlePages={handlePages}
        loading={isFetching}
      />
    </>
  );
}
