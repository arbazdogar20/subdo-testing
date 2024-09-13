'use client';
import DepartmentFormDialog from '@/components/dashboard/dialogs/DepartmentFormDialog';
import Header from '@/components/dashboard/header';
import Table from '@/components/table';
import ConfirmDeleteDialog from '@/shared/components/dashboard/dialogs/confirmDeleteDialog';
import {
  departmentTableHeaderFields,
  departmentTableSearchKeys,
} from '@/shared/constants/table';
import {
  deleteDepartment,
  getDepartments,
} from '@/shared/redux/slices/department';
import {isFetchingInitialAppData} from '@/shared/redux/slices/app';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import {useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import {FaRegTrashCan} from 'react-icons/fa6';
import {useSelector} from 'react-redux';

export default function Departments() {
  const title = "Department's List";

  const departmentsList = useSelector(getDepartments);
  const isFetching = useSelector(isFetchingInitialAppData);

  const [search, setSearch] = useState('');
  const [itemsToShow] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const [handleFormDialog, setHandleFormDialog] = useState({
    open: false,
    type: '',
    data: {},
  });
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: departmentsList,
    headerFields: departmentTableHeaderFields,
  });
  const handleDeleteDepartment = ({user: department}) => {
    setDepartmentToDelete(department);
    setConfirmDeleteDialog(true);
  };

  const actions = [
    {
      id: 1,
      label: 'Edit',
      method: ({user}) =>
        setHandleFormDialog({open: true, type: 'edit', data: user}),
      icon: <BsPencilSquare />,
      keyToDisable: '',
    },
    {
      id: 2,
      label: 'Delete',
      method: handleDeleteDepartment,
      icon: <FaRegTrashCan color="red" />,
      keyToDisable: '',
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: departmentTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  return (
    <>
      <ConfirmDeleteDialog
        open={confirmDeleteDialog}
        setOpen={setConfirmDeleteDialog}
        data={departmentToDelete}
        title={'Delete Department'}
        keyToShow="name"
        reduxFunction={deleteDepartment}
      />
      <DepartmentFormDialog
        open={handleFormDialog?.open}
        type={handleFormDialog?.type}
        data={handleFormDialog?.data}
        setOpen={setHandleFormDialog}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        placeholder="Search Departments"
        btnText="Add Department"
        handleClick={() => setHandleFormDialog({open: true, type: 'add'})}
        hasButtonMenu={false}
        buttonMenuList={[]}
      />
      <Table
        headerList={departmentTableHeaderFields}
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
