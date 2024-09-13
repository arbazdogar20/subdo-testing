import {useState} from 'react';
import PropTypes from 'prop-types';
import '../inputs/style.css';
// react hook form
import {Controller} from 'react-hook-form';
// MUI
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function ControlledMultipleSelectors({
  name,
  control,
  label,
  options = [],
  disabled = false,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const handleChange = (event, field) => {
    const value = event.target.value;
    setSelectedIds(typeof value === 'string' ? value.split(',') : value);
    field.onChange(value);
  };
  const getNameById = (id) => {
    const option = options.find((item) => item.id === id);
    return option ? `${option.firstName} ${option.lastName}` : '';
  };
  return (
    <div>
      <Controller
        disabled={disabled}
        name={name}
        control={control}
        render={({field}) => (
          <FormControl fullWidth>
            <InputLabel id={`multiple-checkbox-${name}`}>{label}</InputLabel>
            <Select
              {...field}
              labelId={`multiple-checkbox-${name}`}
              id={`multiple-checkbox-${name}`}
              multiple
              value={selectedIds}
              onChange={(e) => handleChange(e, field)}
              input={<OutlinedInput label={label} />}
              renderValue={(selected) =>
                selected.map((id) => getNameById(id)).join(', ')
              }
              MenuProps={MenuProps}
            >
              {options.map((item) => {
                const name = `${item?.firstName} ${item?.lastName}`;
                return (
                  <MenuItem key={item?.id} value={item?.id}>
                    <Checkbox checked={selectedIds.indexOf(item?.id) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}
ControlledMultipleSelectors.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};
