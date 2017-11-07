import jQuery from 'jquery';
import { inject } from 'lib/Injector';

jQuery.entwine('ss', $ => {
  $('.ss-gridfield .meatball-menu__container').entwine({
    onmatch() {

    }
  })
});
