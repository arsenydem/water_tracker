<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {

            isReady: false,
            top: 60,
            now: 'week',
            list: []
        }
    },
    mounted() {
        this.loadStatistics();
    },
    methods: {
        clickWeek() {
            this.now = 'week';
            this.loadStatistics();
        },
        clickMonth() {
            this.now = 'month';
            this.loadStatistics();
        },
        async loadStatistics() {
            this.isReady = false;
            if ((this.now == 'week')) {
                let iso = dayjs().toISOString();
                let week = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
                let response = await axios.post('/statistics-week', {
                    iso: iso,
                    week: week
                });
                this.list = response.data;
            } else if ((this.now == 'month')) {
                let iso = dayjs().toISOString();
                let month = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
                let response = await axios.post('/statistics-month', {
                    iso: iso,
                    month: month
                });
                this.list = response.data;
            }
            this.isReady = true;
        },
        getRelativeDate(date) {
            let day = dayjs(date);
            return day.format('DD.MM.YYYY');
        },
        getFilter() {
            let k = 0;
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].waterType == 'Фильтрованная вода') {
                    k++;
                }
            }
            return ((k / this.list.length) * 100).toFixed(1)
        },
        getButil() {
            let k = 0;
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].waterType == 'Бутилированная вода') {
                    k++;
                }
            }
            
            return ((k / this.list.length) * 100).toFixed(1)
        },
        getKran() {
            let k = 0;
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].waterType == 'Вода из-под крана') {
                    k++;
                }
            }
            return ((k / this.list.length) * 100).toFixed(1)
        },
        getWater() {
            let k = 0;
            for (let i = 0; i < this.list.length; i++) {
                k += this.list[i].volume;
            }
            
            if (((k / (this.list.length * 2)) * 100) > 100) {
                return 100
                
            } else {
                return Math.round((k / (this.list.length * 2)) * 100)
            }
        },
        getIst() {
            let k = 0;
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].waterType == 'Источниковая вода') {
                    k++;
                }
            }
            return ((k / this.list.length) * 100).toFixed(1)
        },
    }
}

</script>

<template>
    <div class="statistics-page">

        <div class="user-post card m-3 p-3">

            <div class="navbar-top">

                <div class="row">
                    <div class="col navbar-div">
                        <button @click="clickWeek" class="navbar-but-top">За неделю</button>
                    </div>
                    <div class="col navbar-div">
                        <button @click="clickMonth" class="navbar-but-top">За месяц</button>
                    </div>
                </div>
            </div>
            <div class="card-text">
                <div class="mt-3" v-if="!isReady">
                    Данные загружаются...
                </div>
                <div  class="row">
                    <div v-if="isReady" class="col-12">
                        <div class="row">
                            <div class="col-2 pe-0">
                                <span class="jss101">Количество выпитой воды (от нормы)</span>
                            </div>
                            <div class="col-10 ps-0">
                                <div class="jss99">
                                    <div class="jss100" :style="{ 'width': getWater() + '%' }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-statistics pb-4">
                            <span class="jss1012">Фильтрованная вода</span>
                            <div class="">
                                <div class="pie animate" :style="{ '--p': getFilter(), '--c': 'lightgreen' }">
                                    {{ getFilter() }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-statistics pb-4">
                            <span class="jss1012">Бутилированная вода</span>
                            <div class="me-3">
                                <div class="pie animate" :style="{ '--p': getButil(), '--c': 'lightgreen' }">
                                    {{ getButil() }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-statistics pb-4">
                            <span class="jss1012">Вода из-под крана</span>
                            <div class="">
                                <div class="pie animate" :style="{ '--p': getKran(), '--c': 'lightgreen' }">
                                    {{ getKran() }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-statistics pb-4">
                            <span class="jss1012">Источниковая вода</span>
                            <div class="me-3">
                                <div class="pie animate" :style="{ '--p': getIst(), '--c': 'lightgreen' }">
                                    {{ getIst() }}%</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<style>
.statistics-page .card-body {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    font-family: Arial;
    flex-wrap: wrap;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

@property --p {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
}

.pie {
    --p: 20;
    --b: 22px;
    --c: darkred;
    --w: 150px;

    width: var(--w);
    aspect-ratio: 1;
    position: relative;
    display: inline-grid;
    margin: 5px;
    place-content: center;
    font-size: 25px;
    font-weight: bold;
    font-family: sans-serif;
}

.pie:before,
.pie:after {
    content: "";
    position: absolute;
    border-radius: 50%;
}

.pie:before {
    inset: 0;
    background:
        radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b) no-repeat,
        conic-gradient(var(--c) calc(var(--p)*1%), #0000 0);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
    mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
}

.pie:after {
    inset: calc(50% - var(--b)/2);
    background: var(--c);
    transform: rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
}

.animate {
    animation: p 1s .5s both;
}

.no-round:before {
    background-size: 0 0, auto;
}

.no-round:after {
    content: none;
}

@keyframes p {
    from {
        --p: 0
    }
}

.navbar-but-top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    background-color: rgb(104, 202, 255);
    padding: 12px;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
}

.jss99 {
    border: 4px solid #C4C4C4;
    height: 54px;
    display: flex;
    position: relative;
    background: #fff;
    box-sizing: content-box;
    align-items: center;
    padding-left: 24px;
    margin: 30px;
}

.col-11,
.col-1 {
    margin-top: 10px;
}

.jss100 {
    background: rgb(4, 58, 139);
    top: 0;
    left: 0;
    height: 100%;
    position: absolute;
    border-radius: 0px 20px 20px 0px;
    transition: 1s;
}

.jss101 {
    color: #1B1B1B;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: #212529;
    text-align: center;
    background-color: rgb(174, 232, 253);
    border: 1px solid #ffffff;
    border-radius: 10px 0px 0px 10px;
    font-weight: bold;
    position: relative;
    font-size: 13px;
    font-family: ProximaNova;
    margin-top: 30px;
    margin-left: 30px;
}

.jss1012 {
    color: #1B1B1B;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: #212529;
    text-align: center;
    background-color: rgb(174, 232, 253);
    border: 1px solid #ffffff;
    border-radius: 10px;
    font-weight: bold;
    position: relative;
    font-size: 28px;
    font-family: ProximaNova;
    margin-top: 30px;
    margin-left: 10px;
}

.navbar-div {
    width: 257px;
    padding-left: 100px;
}

.ps-5 {
    display: flex;
    justify-content: center;
}

.img-left {
    width: 90px;
}

.img-left1 {
    width: 70px;
}


.coment {
    display: flex;
    justify-content: center;
    font-size: 20px;
    padding-left: 10px;
    margin-left: 10px;
    overflow-x: hidden;
    border: 2px solid rgb(201, 217, 226);
    border-radius: 5px;
}

.card-statistics {
    width: 600px;
    display: flex;
    justify-content: start;
}

li {
    list-style-type: none;
}

.card-txt {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    font-size: 17px;
    font-weight: 500;

    left: 100px;
}

.calendar-page {
    position: relative;
}

.user-post-time {
    right: 10px;
    top: 10px;
    align-items: end;
    position: absolute;
    font-size: 20px;
}
</style>