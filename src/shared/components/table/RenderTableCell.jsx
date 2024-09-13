import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import Switch from '@/components/switch';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const commonChipStyle = {
  minWidth: '75px',
  border: '0px',
};

const getChipStyleForStatus = ({status}) => {
  if (status.toLowerCase() === 'verified') {
    return {
      ...commonChipStyle,
      backgroundColor: '#E6FFFA',
      color: '#13DEB9',
    };
  } else {
    return {
      ...commonChipStyle,
      backgroundColor: '#FDEDE8',
      color: '#FA896B',
    };
  }
};

const getAccessibilityStatus = (content) => {
  const isDisabled = content;
  return isDisabled ? 'Disabled' : 'Enabled';
};

const getChipStyleForAccessibility = ({status}) => {
  if (status) {
    return {
      ...commonChipStyle,
      backgroundColor: '#FDEDE8',
      color: '#FA896B',
    };
  } else {
    return {
      ...commonChipStyle,
      backgroundColor: '#E6FFFA',
      color: '#13DEB9',
    };
  }
};

export default function TableCellContent({
  content,
  type,
  handleSwitchValue,
  data,
  disableSwitch,
}) {
  switch (type) {
    case 'string':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Typography noWrap sx={{maxWidth: '300px', fontSize: '15px'}}>
            {content}
          </Typography>
        </StyledTableCell>
      );
    case 'status':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Chip
            sx={getChipStyleForStatus({status: content})}
            label={content}
            variant="outlined"
          />
        </StyledTableCell>
      );
    case 'accessibility':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Typography
            noWrap
            sx={{
              maxWidth: '250px',
              fontSize: '15px',
            }}
          >
            <Chip
              sx={getChipStyleForAccessibility({status: content})}
              label={getAccessibilityStatus(content)}
              variant="outlined"
            />
          </Typography>
        </StyledTableCell>
      );
    case 'switch':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Switch
            handleChange={handleSwitchValue(data)}
            value={!content}
            disable={disableSwitch}
          />
        </StyledTableCell>
      );
  }
}

TableCellContent.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  handleSwitchValue: PropTypes.func,
  data: PropTypes.object,
  disableSwitch: PropTypes.bool,
};
