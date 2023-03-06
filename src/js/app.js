window.addEventListener('DOMContentLoaded', ()=>{
    nextStep()
    inputHoldText()
    enterCardNumber()
    enterDate()
    toggleArrow()
    defineCard()
    checkCost()

    let inputs = document.querySelectorAll('input[data-rule]')
    let btnCard = document.querySelector('.card_form .pay_btn')
    let btnQiwi = document.querySelector('.qiwi_umoney_form .pay_btn')
    let inputEmailQiwi = document.querySelector('.qiwi_umoney_form input[data-rule]')
    
    inputEmailQiwi.addEventListener('blur', function(){
        btnQiwi.addEventListener('click', (e) =>{
            let rule = this.dataset.rule
            let value = this.value
            let checkEmail
            let errorText = document.querySelector('.error')
            let main = document.querySelector('.main_wrapper') 
            let placeholderTextEmailQiwi = document.querySelector('.qiwi_umoney_form_content .input_card_email .text')
            let emptyInput = /^$/.test(value) 

            switch(rule){
                case 'email':
                    checkEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)

                    if(checkEmail){
                        console.log('Правильный майл');
                        main.classList.remove('error_main_email')
                        placeholderTextEmailQiwi.style.color = '#0066FF'
                        this.style.borderColor = '#0066FF'
                    } else {
                        errorText.textContent = 'Некорректная почта'
                        main.classList.add('error_main_email')
                        this.style.borderColor = '#FF7575'
                        placeholderTextEmailQiwi.style.color = '#FF7575'
                    }

                    if(emptyInput){
                        main.classList.add('error_main_email')
                    }
                break;
            }
            btnQiwi = document.querySelector('.qiwi_umoney_form .pay_btn')
                btnQiwi.addEventListener('click', function(){
                if(main.classList.contains('error_main_email')){
                    main.classList.remove('loading')
                } else {
                    main.classList.add('loading')
                }
            })
        })
    })

    for(let input of inputs){
        input.addEventListener('blur', function(){
            btnCard.addEventListener('click', (e)=>{
                let rule = this.dataset.rule
                let value = this.value
                let checkEmail
                let number 
                let sum = 0
                let months 
                let years
                let pass
                let main = document.querySelector('.main_wrapper') 
                let errorText = document.querySelector('.error')
                let btnCard
                let btnQiwi
                let placeholderTextCard = document.querySelector('.input_card_number .text')
                let placeholderTextDate = document.querySelector('.input_card_date .text')
                let placeholderTextCvv = document.querySelector('.input_card_cvv .text')
                let placeholderTextEmailCard = document.querySelector('.card_form_content .input_card_email .text')
                let placeholderTextEmailQiwi = document.querySelector('.qiwi_umoney_form_content .input_card_email .text')
                let emptyInput = /^$/.test(value) 

                switch (rule){
                    case 'number':
                        number = value.replace(/ /g,'')
                        for(let i = 0; i < number.length; i++){
                            let intNum = parseInt(number.substr(i, 1))
                            if(i % 2 == 0){
                                intNum *= 2
                                if(intNum > 9){
                                    intNum = 1 + (intNum % 10)
                                }
                            }
                            sum += intNum
                        }
                        if(sum % 10 == 0 && number.length > 15){
                            main.classList.remove('error_main_number')
                            this.style.borderColor = '#0066FF'
                            placeholderTextCard.style.color = '#0066FF'
                        } else {
                            errorText.textContent = 'Некорректный номер карты'
                            main.classList.add('error_main_number')
                            this.style.borderColor = '#FF7575'
                            placeholderTextCard.style.color = '#FF7575'
                        }

                        if(main.classList.contains('error_main_number')){
                            this.style.borderColor = '#FF7575'
                        }

                        if(emptyInput){
                            main.classList.add('error_main_number')
                        }
                    break;
                        
                    case 'date':
                        months = value.substring(0, 2)
                        years = value.slice(-2)
                        if(months < 13 && years > 22){
                            console.log('правильная дата')
                            main.classList.remove('error_main_date')
                            this.style.borderColor = '#0066FF'
                            placeholderTextDate.style.color = '#0066FF'
                        } else {
                            errorText.textContent = 'Некорректная дата'
                            main.classList.add('error_main_date')
                            this.style.borderColor = '#FF7575'
                            placeholderTextDate.style.color = '#FF7575'
                        }

                        if(emptyInput){
                            main.classList.add('error_main_date')
                        }
                    break;

                    case 'pass':
                        pass = value.length
                        if(pass > 2){
                            console.log('Правильный cvv')
                            main.classList.remove('error_main_cvv')
                            this.style.borderColor = '#0066FF'
                            placeholderTextCvv.style.color = '#0066FF'
                        } else {
                            errorText.textContent = 'Некорректный cvv'
                            main.classList.add('error_main_cvv')
                            this.style.borderColor = '#FF7575'
                            placeholderTextCvv.style.color = '#FF7575'
                        }

                        if(emptyInput){
                            main.classList.add('error_main_cvv')
                        }
                    break;
                        

                    case 'email':
                        checkEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)

                        if(checkEmail){
                            console.log('Правильный майл');
                            main.classList.remove('error_main_email')
                            placeholderTextEmailCard.style.color = '#0066FF'
                            this.style.borderColor = '#0066FF'
                        } else {
                            errorText.textContent = 'Некорректная почта'
                            main.classList.add('error_main_email')
                            this.style.borderColor = '#FF7575'
                            placeholderTextEmailCard.style.color = '#FF7575'
                        }

                        if(emptyInput){
                            main.classList.add('error_main_email')
                        }
                    break;
                }
                btnCard = document.querySelector('.pay_btn')
                btnCard.addEventListener('click', function(){
                    if(main.classList.contains('error_main_email') || main.classList.contains('error_main_cvv') 
                     || main.classList.contains('error_main_date') || main.classList.contains('error_main_number') || main.classList.contains('error_main_cost') || emptyInput){
                        main.classList.remove('loading')
                    } else {
                        main.classList.add('loading')
                    }
                })
                e.preventDefault() 
            })
        })
    }
})




                        
//Переход к следующему и предыдущему шагам
function nextStep(cardBtn, qiwiUmoneyBtns, main_wrapper, step1, backBtn){
    cardBtn = document.querySelector('.card')
    main_wrapper = document.querySelector('.main_wrapper')
    step1 = document.querySelector('.step1')
    let main = document.querySelector('.main_wrapper') 


    qiwiUmoneyBtns = document.querySelectorAll('.qiwi_umoney_btn').forEach(item =>{
        item.addEventListener('click', function(e){
            if(e.target){
                step1.classList.remove('step1')
                main_wrapper.classList.add('step2-qiwi_umoney')
            }
        })
    })

    cardBtn.addEventListener('click', function(e){
        step1.classList.remove('step1')
        main_wrapper.classList.add('step2-card')
        let input = document.querySelector('.area_card_number')
        input.focus()        
    })


    backBtn = document.querySelectorAll('.back_btn')
    backBtn.forEach(item =>{
        item.addEventListener('click', function(e){
            let errorText = document.querySelector('.error')

            if(main_wrapper.classList.contains('step2-card')){
                main_wrapper.classList.remove('step2-card')
                main_wrapper.classList.add('step1')
            }
            else{
                main_wrapper.classList.remove('step2-qiwi_umoney')
                main_wrapper.classList.add('step1')
            }
            
            if(main.classList.contains('error_main_email') || main.classList.contains('error_main_cvv') 
             || main.classList.contains('error_main_date') || main.classList.contains('error_main_number') || main.classList.contains('error_main_cost')){
                main.classList.remove('error_main_email', 'error_main_cvv', 'error_main_date', 'error_main_number', 'error_main_cost')
            }
        })
    })
}

                



//Манипуляция со стрелкой
function toggleArrow(costMain, toolTipMain, costCard, toolTipCard, costQiwi, toolTipQiwi){

    costMain = document.querySelector('.main #cost')
    toolTipMain = document.querySelector('.main .tooltip')

    costCard = document.querySelector('.card_form #cost')
    toolTipCard = document.querySelector('.card_form .tooltip')

    costQiwi = document.querySelector('.qiwi_umoney_form #cost')
    toolTipQiwi = document.querySelector('.qiwi_umoney_form .tooltip')

    document.addEventListener('click', (e)=>{
        const click = e.composedPath().includes(costMain)
        if(!click){
            costMain.classList.add('closed')
            toolTipMain.classList.remove('show')
        }
        if(click){
            costMain.classList.toggle('closed')
            toolTipMain.classList.toggle('show')
        }
    })
        

    document.addEventListener('click', (e)=>{
        const click = e.composedPath().includes(costCard)
        if(!click){
            costCard.classList.add('closed')
            toolTipCard.classList.remove('show')
        }
        if(click){
            costCard.classList.toggle('closed')
            toolTipCard.classList.toggle('show')
        }
        
    })

    document.addEventListener('click', (e)=>{
        const click = e.composedPath().includes(costQiwi)
        if(!click){
            costQiwi.classList.add('closed')
            toolTipQiwi.classList.remove('show')
        }
        if(click){
            costQiwi.classList.toggle('closed')
            toolTipQiwi.classList.toggle('show')
        }
        
    })
}


//Удерживает изначальный placeholder вверху, если нету текста при клике он падает на своё место
function inputHoldText(input_element){
    const card_num = '0000 0000 0000 0000'
    const card_date = 'ММ/ГГ'
    const card_cvv = '000'
    const card_email = 'example@mail.ru'


    input_element = document.querySelectorAll("input").forEach(item=>{
        item.addEventListener('keyup', ()=>{
            item.setAttribute("value", item.value)
        })
        item.addEventListener('focus', function(e){
            if(item.classList.contains('area_card_number')){
                item.setAttribute("placeholder", card_num)
            }
            if(item.classList.contains('area_card_date')){
                item.setAttribute("placeholder", card_date)
            }
            if(item.classList.contains('area_card_cvv')){
                item.setAttribute("placeholder", card_cvv)
            }
            if(item.classList.contains('area_card_email')){
                item.setAttribute("placeholder", card_email)
            }
        })
    })
}
                    
                

//Ввод даты
function enterDate(inputDate){
    inputDate = document.querySelector('.area_card_date')
    inputDate.addEventListener('keydown', function(e){
        if(e.target !== 8) {
            let numChars = e.target.value.length;
            if(numChars === 2 || numChars === 6){
                let thisVal = e.target.value;
                thisVal += '/';
                e.target.value = thisVal;
            }
        }
    })
}
                

//Ввод номера карты
function enterCardNumber(inputCardNumber, value, backspace){
    inputCardNumber = document.querySelector('.area_card_number')

    inputCardNumber.addEventListener('keydown', function(e){
        value = this.value.replace(/\s+/g, '');
        backspace = e.key === 'Backspace'

        if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!backspace && value.length === 16)) {
            e.preventDefault();
            return false;
        }
        this.value = value.split('').reverse().join('').replace(/\B(?=(\d{4})+(?!\d))/g, " ").split('').reverse().join('').trim();
    })
}



//Определяет банковскую картку и подставляет соответствующую картинку
function defineCard(inputCard, checkVisa, checkMir, checkMaster){

    inputCard = document.querySelector('.area_card_number')
    inputCard.addEventListener('input', (e)=>{
        checkVisa = inputCard.value.substring(0, 1)
        checkMaster = inputCard.value.substring(0, 1)
        checkMir = inputCard.value.substring(0, 3)

        if(checkVisa == 4){
            document.querySelector('#visa').classList.add('active')
        }
        if(!checkVisa){
            document.querySelector('#visa').classList.remove('active')
        }

        if(checkMir == 220){
            document.querySelector('#mir').classList.add('active')
        }
        if(!checkMir){
            document.querySelector('#mir').classList.remove('active')
        }

        if(checkMaster == 5){
            document.querySelector('#master').classList.add('active')
        }
        if(!checkMaster){
            document.querySelector('#master').classList.remove('active')
        }
    })

}




//Валидность цены                
function checkCost (cost, btnCard, btnQiwi){
    cost = document.querySelectorAll('#cost')
    btnCard = document.querySelector('.card')
    btnQiwi =  document.querySelector('.qiwi_umoney_btn')

    btnCard.addEventListener('click', ()=>{
        cost.forEach(item =>{
            item = item.textContent.split(' ').join('').replace(/[^0-9]/g, '')
            item = Number(item)
            let errorText = document.querySelector('.error')
            let main = document.querySelector('.main_wrapper')
            console.log(item)

            if(item < 300){
                main.classList.add('error_main_cost')
                errorText.textContent = 'Минимальная сумма 300 ₽'
            }
            else{
                main.classList.remove('error_main_cost')
            }
        })
    })

    btnQiwi.addEventListener('click', ()=>{
        cost.forEach(item =>{
            item = item.textContent.split(' ').join('').replace(/[^0-9]/g, '')
            item = Number(item)
            let errorText = document.querySelector('.error')
            let main = document.querySelector('.main_wrapper')
            console.log(item)

            if(item < 300){
                main.classList.add('error_main_cost')
                errorText.textContent = 'Минимальная сумма 300 ₽'
            }
            else{
                main.classList.remove('error_main_cost')
            }
        })
    })
}

