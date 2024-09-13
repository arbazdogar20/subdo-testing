import PropTypes from 'prop-types';

import Button from '@/shared/components/button';

export default function CustomMsg({text, onClick, btnText}) {
  return (
    <div style={{textAlign: 'center'}}>
      <h2 id="link_expired">{text}</h2>
      {btnText && (
        <Button
          sx={{
            mt: 2.5,
            backgroundColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary)',
            },
          }}
          type={'button'}
          btnText={btnText}
          onClick={onClick}
        />
      )}
    </div>
  );
}

CustomMsg.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  btnText: PropTypes.string,
};
