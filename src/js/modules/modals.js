const modals = (triggerSelector, modalSelector, modalSelectorId, closeSelector) => {
    const btn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelectorId),
        modals = document.querySelector(modalSelector),
        scroll = calcScroll(),
        close = document.querySelectorAll(closeSelector);


        function showModal() {
            modal.classList.add('animated', 'fadeIn' );
            modal.style.display = 'block';
            modals.style.display = 'block';
            document.body.style.overflow ='hidden';
            document.body.style.marginRight = `${scroll}px`;
        }

        function hiddenModal() {
            modals.style.display = 'none';
            modal.style.display = 'none';
            document.body.style.overflow ='';
            document.body.style.marginRight = `0px`;
        }
        function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height ='50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth
    }
    btn.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                if(e.targer) {
                    e.preventDefault();
                }
                    if (item.classList.contains('button_cart')) {
                            modal.querySelector('.modal_descr').textContent = e.target.dataset.title
                    showModal(i);
                } else {
                    showModal();
                }
            });
        });

        close.forEach(item => {
            item.addEventListener('click', () => {
                hiddenModal()
        })
    });
    

    modals.addEventListener('click', (e) => {
        if (e.target === modals) {
            hiddenModal();
            }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            hiddenModal();
        }
    })
    
    
}

export default modals;

