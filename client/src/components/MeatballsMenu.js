import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { provideInjector } from 'lib/Injector';
import Meatballs from 'components/Meatballs';

const InjectedMeatballs = provideInjector(Meatballs);

jQuery.entwine('ss', $ => {
  $('.js-injector-boot .ss-gridfield .meatball-menu__container').entwine({
    onmatch() {
      this.drawMeatballs();
    },
    getItemId() {
      return this.closest('.ss-gridfield-item').data('id');
    },
    drawMeatballs() {
      ReactDOM.render(
        <InjectedMeatballs id={`meatball-menu_${this.getItemId()}`}>
          <a className="btn btn-secondary">A thing</a>
          <div className="dropdown-divider" />
          <a className="btn btn-secondary">A thing</a>
          <a className="btn btn-secondary">A thing</a>
        </InjectedMeatballs>,
        this.get(0),
      );
    },
  });
});
