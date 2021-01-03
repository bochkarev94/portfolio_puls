import tabsContent from './modules/tabs';
import slider from './modules/slider';
import modals from './modules/modals';
import masc from './modules/masc';
import forms from './modules/forms';


window.addEventListener('DOMContentLoaded', () => {

    tabsContent('.catalog_tabs', '.catalog_tab', '.catalog_content', 'catalog_tab_active', '.catalog-wrapper_link');
    slider('.slider_item', '.slider_prev', '.slider_next');
    modals("[data-modal='consultation']", ".overlay", "#consultation", ".modal_close");
    modals(".button_cart", ".overlay", "#order", ".modal_close");
    masc('input[name="phone"]');
    forms();
});