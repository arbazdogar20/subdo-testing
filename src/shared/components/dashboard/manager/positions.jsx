'use client';
import PositionFormDialog from '@/shared/components/dashboard/dialogs/PositionFormDialog';
import Header from '@/components/dashboard/header';
import Table from '@/components/table';
import ConfirmDeleteDialog from '@/shared/components/dashboard/dialogs/confirmDeleteDialog';
import {
  positionsTableHeaderFields,
  positionsTableSearchKeys,
} from '@/shared/constants/table';
import {
  deletePosition,
  getPositionsList,
} from '@/shared/redux/slices/positions';
import {isFetchingInitialAppData} from '@/shared/redux/slices/app';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import {useState} from 'react';
import {BsPencilSquare} from 'react-icons/bs';
import {FaRegTrashCan} from 'react-icons/fa6';
import {useSelector} from 'react-redux';

export default function PositionsComponent() {
  const title = `Position's List`;

  const positionsList = useSelector(getPositionsList);
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
  const [positionToDelete, setPositionToDelete] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: positionsList,
    headerFields: positionsTableHeaderFields,
  });

  const handleDeletePosition = ({user: position}) => {
    setPositionToDelete(position);
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
      method: handleDeletePosition,
      icon: <FaRegTrashCan color="red" />,
      keyToDisable: '',
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: positionsTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  return (
    <>
      <ConfirmDeleteDialog
        open={confirmDeleteDialog}
        setOpen={setConfirmDeleteDialog}
        data={positionToDelete}
        title={'Delete Position'}
        keyToShow="name"
        reduxFunction={deletePosition}
      />
      <PositionFormDialog
        open={handleFormDialog?.open}
        type={handleFormDialog?.type}
        data={handleFormDialog?.data}
        setOpen={setHandleFormDialog}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        placeholder="Search Position"
        btnText="Add Position"
        handleClick={() => setHandleFormDialog({open: true, type: 'add'})}
        hasButtonMenu={false}
        buttonMenuList={[]}
      />
      <Table
        headerList={positionsTableHeaderFields}
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
