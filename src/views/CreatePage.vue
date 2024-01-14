<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isClick: false,
            inputlist: {
                dateWater: '',
                volume: '',
                waterType: '',
                waterTemperature: '',
                anythingOtherWater: null,
                commment: '',
                timeoutId: null
            },
            warning: false,
            isOk: false,
            textBadge: 'Пожалуйста, заполни все поля!'
        }
    },
    methods: {
        async send(evt) {
            evt.preventDefault();
            if (this.inputlist.dateWater == '' || this.inputlist.volume == '' || this.inputlist.waterType == '' || this.inputlist.waterTemperature == '' || this.inputlist.anythingOtherWater == null || this.inputlist.commment == '') {
                this.isOk = false;
                this.textBadge = 'Пожалуйста, заполни все поля!'
                this.warning = true;
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.warning = false;
                }, 5000)
                
            } else {
                let response = await axios.post('/new', {
                    inputlist: this.inputlist
                });
                this.inputlist = {
                    dateWater: '',
                    volume: '',
                    waterType: '',
                    waterTemperature: '',
                    anythingOtherWater: null,
                    commment: ''
                }
                this.isOk = true;
                this.textBadge = 'Запись успешно создана!';
                this.warning = true;
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.warning = false;
                }, 5000)
            }
        },
        noDigits(loc) {
            if ("-+qwertyuiop[]{}|/asdfghjkl;zxcvbnm?йцукенгшщзхъфывапролдячсмитьбюжэё@!#%^&*()".indexOf(loc) != -1) {
                this.inputlist.volume = '';
            }
        }
    }
}
</script>

<template>
    <div class="create-page">
        <form @submit="send">
            <div class="input-gr">
                <div class="row">
                    <div class="col-3 pe-0">
                        <span class="text-input">Дата записи</span>
                    </div>
                    <div class="col-9 ps-0">
                        <input v-model="inputlist.dateWater" type="date" class="inpt">
                    </div>
                </div>
            </div>
            <div class="input-gr">
                <div class="row">
                    <div class="col-3 pe-0">
                        <span class="text-input">Количество выпитой воды</span>
                    </div>
                    <div class="col-9 ps-0">
                        <input v-model="inputlist.volume" @input="noDigits(inputlist.volume)" placeholder="В литрах" min="0" type="text"
                            class="inpt">
                    </div>
                </div>
            </div>
            <div class="input-gr">
                <div class="row">
                    <div class="col-3 pe-0">
                        <span class="text-input">Тип воды</span>
                    </div>
                    <div class="col-9 ps-0">
                        <select v-model="inputlist.waterType" class="inpt">
                            <option value="Фильтрованная вода">Фильтрованная вода</option>
                            <option value="Бутилированная вода">Бутилированная вода</option>
                            <option value="Вода из-под крана">Вода из-под крана</option>
                            <option value="Источниковая вода">Источниковая вода</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="input-gr">
                <div class="row">
                    <div class="col-3 pe-0">
                        <span class="text-input">Температура воды (°C)</span>
                    </div>
                    <div class="col-9 ps-0">
                        <input placeholder="Температура" @input="noDigits(inputlist.volume)" v-model="inputlist.waterTemperature" type="number" class="inpt">
                    </div>
                </div>
            </div>
            <div class="input-gr">
                <div class="row">
                    <div class="col-3 pe-0">
                        <span class="text-input">Пили ли вы что-то ещё, кроме воды?</span>
                    </div>
                    <div class="col-9">
                        <input v-model="inputlist.anythingOtherWater" type="checkbox" class="inpt-ch">
                    </div>
                </div>
            </div>
            <div class="input-gr pt-4">
                <div class="row">
                    <div class="col-9 pe-0">
                        <div class="row">
                            <div class="col-2 pe-0">
                                <span class="text-input">Расскажите свои впечатления!</span>
                            </div>
                            <div class="col-10 ps-0">
                                <textarea v-model="inputlist.commment" class="inpt" placeholder="Комментарий"
                                    id="note"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <button class="bottom-btn" type="submit">Сохранить</button>
                    </div>
                </div>
            </div>
            <div class="bad">
                <span v-if="warning" :class="{
                    'text-bg-danger': isOk == false,
                    'text-bg-success': isOk
                }" class="badge rounded-pill">{{ textBadge }}</span>
            </div>
        </form>
    </div>
</template>


<style>
.create-page h3 {
    text-align: center;
}

.text-input {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 20px;
    color: #212529;
    text-align: center;
    background-color: rgb(174, 232, 253);
    border: 1px solid #005e6c;
    border-radius: 10px 0px 0px 10px;
    font-weight: bold;
}

.text-bg-danger,
.text-bg-success {
    display: flex;
    justify-content: center;
    width: 400px;
    padding-top: 30px;
    margin-left: 40px;
    font-size: 20px;
}

.inpt:focus {
    box-shadow: 0 0 20px #4e94fc;
}

.inpt:focus::placeholder {
    font-size: 14px;
    padding-top: 0px;
    padding-left: 1px;
    width: 200px;
    transition: 0.5s;
}

.inpt::placeholder {
    padding-top: 10px;
    padding-left: 100px;
    font-size: 24px;
    transition: 0.5s;
}

.bottom-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: white;
    padding: 28px;
    border: 1px solid black;
    margin-left: 5px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #f6ff00;
    font-size: 25px;
}

.inpt {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: #212529;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0px 10px 10px 0px;
}

input,
select,
textarea {
    outline: none;
}

.bad {
    display: flex;
    justify-content: center;
    width: 1100px;
    height: 80px;
}

.input-gr {
    margin-bottom: 20px;

}

.inpt-ch:checked {
    box-shadow: 0 0 20px #0d6efd;
}



.inpt-ch {
    width: 2em;
    height: 2em;
    display: flex;
    left: 200px;
    top: 18.8px;
    justify-content: center;
    align-items: center;
    border: 1px solid #ced4da;
    position: absolute;
    border-radius: 10px;
}

form {
    max-width: 1150px;
    margin: 15px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.col-9 {
    position: relative;
}
</style>