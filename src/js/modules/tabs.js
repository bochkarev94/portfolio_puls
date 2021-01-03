const tabsContent = (tabsSelector, tabsContentSelector, contentSelector, activeClass) => {
    const tabs = document.querySelector(tabsSelector),
        tab = document.querySelectorAll(tabsContentSelector),
        content = document.querySelectorAll(contentSelector);

        function hideContent() {
        content.forEach(item => {
           item.style.display = 'none';
           
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showContent(i = 0) {
        content[i].style.display = 'flex';
        tab[i].classList.add(activeClass);
    }

    hideContent();
    showContent();

    tabs.addEventListener('click', (e) => {
        const target = e.target
        tab.forEach((item, i) => {
                 if (target == item || target.parentNode == item) {
                    hideContent();
                    showContent(i);
                 }
             });
    });


const btn = document.querySelectorAll('.catalog-wrapper_link'),
    prev = document.querySelectorAll('.catalog-wrapper_prev'),
        product = document.querySelectorAll('.catalog_product'),
        list = document.querySelectorAll('.catalog_list');

        product.forEach(item => {
            item.classList.add('animated');
        })
        list.forEach(item => {
            item.classList.add('animated');
        })

        btn.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                product[i].style.display = 'none';
                list[i].style.display = 'block';
                list[i].classList.add('fadeInDown')
            });
        });

        prev.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                product[i].style.display = 'block';
                list[i].style.display = 'none';
                product[i].classList.add('fadeIn')
            });
        });
}

export default tabsContent;
