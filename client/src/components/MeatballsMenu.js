import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap-ss';
import { provideInjector } from 'lib/Injector';
import Meatballs from 'components/Meatballs';

const InjectedMeatballs = provideInjector(Meatballs);

jQuery.entwine('ss', $ => {
  $('.ss-gridfield .meatball-menu__container').entwine({
    onmatch() {
      const itemId = this.closest('.ss-gridfield-item').data('id');
      ReactDOM.render(
        <InjectedMeatballs id={`meatball-menu_${itemId}`}>
          <MenuItem>Hard coded values for now</MenuItem>
          <MenuItem divider />
          <MenuItem href={'no'}>No.</MenuItem>
        </InjectedMeatballs>,
        this.get(0),
      );
    },
    something() {
      const itemId = this.closest('.ss-gridfield-item').data('id');
      ReactDOM.render(
        <DropdownButton
          id={`meatball-menu_${itemId}`}
          title=""
          className="font-icon-dot-3"
          noCaret
          pullRight
          bsStyle={'secondary'}
          bsSize={'sm'}
          rootCloseEvent={'mousedown'}
        >
          <MenuItem>Hard coded values for now</MenuItem>
          <MenuItem divider />
          <MenuItem href={'no'}>No.</MenuItem>
        </DropdownButton>,
        this.get(0),
      );
    },
  });
});
