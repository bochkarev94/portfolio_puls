const forms = () => {
    const form =  document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        modal = document.querySelector('.modal_mini'),
        scroll = calcScroll(),
        phoneInputs = document.querySelectorAll('input[name="phone"]');

        const message = {
            loading: 'Загрузка...',
            subtitle: 'Спасибо за вашу заявку!',
            descr: 'Наш менеджер свяжется с вами в ближайшее время!',
            error: 'Что-то пошло не так...'
        };

        const postData = async (url , data) => {
            modal.querySelector('.modal_descr').textContent = message.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            });
            return await res.text();
        };

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

        const clearInputs = () => {
            inputs.forEach(input => {
                input.value = '';
            });
        }; 

          function hiddenForms () {
            document.querySelector('#consultation').style.display = 'none';
            document.querySelector('#order').style.display = 'none';
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

        form.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                 hiddenForms(); 

                modal.classList.add('animated', 'fadeIn' );
                document.querySelector('.overlay').style.display = 'block';
                modal.style.display = 'block';
                document.body.style.overflow ='hidden';
                document.body.style.marginRight = `${scroll}px`; 

                const formData = new FormData(form);
                postData('server.php', formData)
                    .then((res) => {
                        console.log(res);
                        modal.querySelector('.modal_subtitle').textContent = message.subtitle;
                        modal.querySelector('.modal_descr').textContent = message.descr;
                    })
                    .catch(() => modal.querySelector('.modal_descr').textContent = message.error)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            document.querySelector('.overlay').style.display = 'none';
                            modal.style.display = 'none';
                            document.body.style.overflow ='';
                            document.body.style.marginRight = `0px`;
                        }, 2000);
                    })
            });
        })
};

export default forms
