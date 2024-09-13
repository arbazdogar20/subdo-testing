import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function PaginationComponent({
  totalItems,
  itemsToShow,
  handlePages,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(totalItems / itemsToShow)}
        color="primary"
        onChange={handlePages}
        sx={{
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'var(--primary)',
          },
          '& .MuiPaginationItem-root.Mui-selected:hover': {
            backgroundColor: 'var(--primary)',
          },
        }}
      />
    </Stack>
  );
}

PaginationComponent.propTypes = {
  totalItems: PropTypes.number,
  itemsToShow: PropTypes.number,
  handlePages: PropTypes.func,
};
