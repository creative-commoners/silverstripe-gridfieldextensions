import { inject } from 'lib/Injector';
import React, { PropTypes } from 'react';

const Meatballs = ({ PopoverField, id, children }) => ({
  render() {
    return (
      <PopoverField
        id={id}
        buttonSize="sm"
        data={{ placement: 'bottom' }}
      >
        {children}
      </PopoverField>
    );
  }
});

Meatballs.propTypes = {
  id: PropTypes.string.isRequired,
  PopoverField: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Meatballs.defaultProps = {
  id: '',
  actions: [],
  PopoverField: null,
};

export default inject(
  ['PopoverField'],
  (PopoverField) => ({ PopoverField }),
  () => 'Meatballs'
)(Meatballs);
