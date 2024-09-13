import {useMemo} from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import {IoMdAdd} from 'react-icons/io';
import {useFieldArray} from 'react-hook-form';
import TimePicker from '@/shared/components/dashboard/timePicker';
import ControlledSearchAbleSelectField from '@/shared/components/selects/controlledSearchAbleSelectField';
import ControlledSelectField from '@/shared/components/selects/controlledSelect';
import Button from '@/shared/components/button';
import {getDepartments} from '@/shared/redux/slices/department';
import {entriesStatus} from '@/shared/constants/timeTrackingConstant';
import {getCurrentOrganization} from '@/shared/redux/slices/organization';
import {useSelector} from 'react-redux';

export default function EntriesComponent({control, errors, setValue, watch}) {
  const departmentsList = useSelector(getDepartments);
  const currentOrg = useSelector(getCurrentOrganization);

  const departmentOpts = useMemo(() => {
    return departmentsList
      .filter((department) => department.organizationId === currentOrg?.id)
      .map((dep) => ({
        label: dep?.name,
        value: dep?.id,
      }));
  }, [departmentsList]);

  const statusOpts = useMemo(() => {
    return Object.values(entriesStatus).map((status) => ({
      label: status.label,
      value: status.value,
    }));
  }, [entriesStatus]);

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'logs',
  });

  const handleTimeChange = (selectedTime, fieldName) => {
    const totalMinutes = selectedTime?.c?.hour * 60 + selectedTime?.c?.minute;
    setValue(fieldName, totalMinutes, {shouldValidate: true});
  };

  const handleAppendRow = () => {
    const isDepartmentSelected = watch(
      `logs.${fields.length - 1}.departmentId`
    );
    const isStatusSelected = watch(`logs.${fields.length - 1}.status`);
    const isStartTimeSelected = watch(`logs.${fields.length - 1}.startTime`);
    const isEndTimeSelected = watch(`logs.${fields.length - 1}.endTime`);

    if (
      !isEndTimeSelected ||
      !isStartTimeSelected ||
      !isDepartmentSelected ||
      !isStatusSelected
    ) {
      return;
    }

    append({startTime: '', endTime: '', departmentId: '', status: ''});
  };

  return (
    <Box display={'flex'} gap={2} flexWrap={'wrap'}>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          display="flex"
          flexDirection="column"
          gap={2}
          borderRadius="5px"
          boxShadow="0px 0px 10px 0px #0000001A"
          padding="25px 20px"
          maxWidth="250px"
        >
          <TimePicker
            handleTimeChange={(e) =>
              handleTimeChange(e, `logs.${index}.startTime`)
            }
            name={`logs.${index}.startTime`}
            customErrorMessage={errors?.logs?.[index]?.startTime?.message}
            label="Start Time"
          />
          <TimePicker
            handleTimeChange={(e) =>
              handleTimeChange(e, `logs.${index}.endTime`)
            }
            name={`logs.${index}.endTime`}
            customErrorMessage={errors?.logs?.[index]?.endTime?.message}
            label="End Time"
          />
          <ControlledSearchAbleSelectField
            control={control}
            name={`logs.${index}.departmentId`}
            label="Department"
            options={departmentOpts}
            getOptionLabel={(option) => option.label}
            customErrorsMessage={errors?.logs?.[index]?.departmentId?.message}
          />
          <ControlledSelectField
            control={control}
            name={`logs.${index}.status`}
            label="Status"
            options={statusOpts}
            customErrorsMessage={errors?.logs?.[index]?.status?.message}
          />
          {fields.length > 1 && (
            <Button
              type="button"
              onClick={() => remove(index)}
              btnText="Remove"
              variant="outlined"
              sx={{
                py: 1.8,
                mb: 0,
                textTransform: 'none',
                backgroundColor: '#fef4f1ff',
                color: 'var(--secondary)',
                border: '1px solid var(--secondary)',
                '&:hover': {
                  backgroundColor: '#fef4f1ff',
                },
              }}
            />
          )}
        </Box>
      ))}
      <Box
        sx={{
          backgroundColor: '#fef4f1ff',
          padding: '0px',
          display: 'flex',
          borderRadius: '5px',
          width: '250px',
          minHeight: '300px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <IconButton onClick={handleAppendRow} sx={{mt: 1}}>
          <IoMdAdd />
        </IconButton>
        <Typography sx={{mt: 1, ml: 1}}>Add Entry</Typography>
      </Box>
    </Box>
  );
}

EntriesComponent.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};
