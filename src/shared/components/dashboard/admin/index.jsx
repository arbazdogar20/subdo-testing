'use client';
import InviteManagerDialog from '@/components/dashboard/dialogs/inviteManagerDialog';
import Table from '@/components/table';
import ReInviteManagerDialog from '@/shared/components/dashboard/dialogs/ReInviteDialog';
import {
  ManagerTableHeaderFields,
  managerTableSearchKeys,
} from '@/shared/constants/table';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {
  getUsersList,
  updateManagerAccessibility,
} from '@/shared/redux/slices/user';
import {filterTableData, prepareTableDataList} from '@/shared/utils/table';
import {useState} from 'react';
import {BsFillSendCheckFill} from 'react-icons/bs';
import {useSelector} from 'react-redux';
import Header from '@/components/dashboard/header';
import {isFetchingInitialAppData} from '@/redux/slices/app';

export default function AdminDashboard() {
  const title = "Manager's List";
  const usersList = useSelector(getUsersList);
  const isFetching = useSelector(isFetchingInitialAppData);

  const [search, setSearch] = useState('');
  const [itemsToShow] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [open, setOpen] = useState(false);
  const [userToReInvite, setUserToReInvite] = useState(null);

  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  const tableDataList = prepareTableDataList({
    dataList: usersList,
    headerFields: ManagerTableHeaderFields,
  });

  const handleDialogue = ({user}) => {
    setOpen(true);
    setUserToReInvite(user);
  };

  const actions = [
    {
      id: 1,
      label: 'Re invite',
      method: handleDialogue,
      icon: <BsFillSendCheckFill fontSize={30} />,
      keyToDisable: 'isVerified',
    },
  ];

  const filteredDataList = filterTableData({
    data: tableDataList,
    search,
    searchKeys: managerTableSearchKeys,
  });

  const startIndex = search ? 0 : (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = filteredDataList?.slice(startIndex, endIndex);

  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const [userBeingUpdate, setUserBeingUpdate] = useState(null);

  const handleSwitchValue = (user) => (e) => {
    setUserBeingUpdate(user);
    const checked = e.target.checked;
    const isDisabled = !checked;

    onSubmitFunction({
      reduxFunction: updateManagerAccessibility,
      data: {
        id: user?.id,
        isDisabled,
      },
    });
  };

  return (
    <>
      <InviteManagerDialog
        open={openInviteDialog}
        setOpen={setOpenInviteDialog}
      />
      <ReInviteManagerDialog
        open={open}
        setOpen={setOpen}
        userToReInvite={userToReInvite}
      />
      <Header
        title={title}
        handleSearch={handleSearch}
        btnText="Invite Manager"
        placeholder="Search Manager"
        handleClick={() => setOpenInviteDialog(true)}
      />
      <Table
        headerList={ManagerTableHeaderFields}
        dataList={paginatedDataList}
        actions={actions}
        itemsToShow={itemsToShow}
        totalItems={filteredDataList?.length}
        handlePages={handlePages}
        handleSwitchValue={handleSwitchValue}
        loading={isFetching}
        userBeingUpdate={isLoading ? userBeingUpdate : null}
      />
    </>
  );
}
