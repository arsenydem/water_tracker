<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isClick: false,
            list: [],
            isReady: false
        }
    },
    mounted() {
        this.loadRecords();
    },
    methods: {
        async loadRecords() {
            this.isReady = false;
            let response = await axios.post('/records');
            this.list = response.data;
            this.isReady = true;
        },
        getRelativeDate(date) {
            let day = dayjs(date);
            return day.format('DD.MM.YYYY');
        },
        getLitres(item) {
            if (item.volume >= 2) {
                return 'В этот день вы выпили суточную норму воды.'
            } else {
                return 'В этот день вы не выпили суточную норму воды.'
            }
        },
        getTemperature(item) {
            if (item.waterTemperature >= 32 && item.waterTemperature <= 40) {
                return 'Температура воды была в норме.'
            } else {
                return 'Температура воды не была в норме.'
            }
        },
        getType(item) {
            if (item.waterType == 'Фильтрованная вода') {
                return 'Вы пили фильтрованную воду.'
            } else if (item.waterType == 'Бутилированная вода') {
                return 'Вы пили бутилированную воду.'
            } else if (item.waterType == 'Вода из-под крана') {
                return 'Вы пили воду из под крана.'
            } else if (item.waterType == 'Источниковая вода') {
                return 'Вы пили воду из источника.'
            }
        },
        getOtherWater(item) {
            if (item.anythingOtherWater) {
                return 'Вы пили что-то, кроме воды.'
            } else {
                return 'Вы не пили ничего, кроме воды.'
            }
        },
    }
}

</script>

<template>
    <div class="calendar-page">
        <div v-if="!isReady">
            Данные загружаются...
        </div>
        <div v-if="isReady" v-for="(item, index) in list" class="user-post card m-3 p-3">
            <div class="card-text">
                <div class="row">
                    <div class="col-6">
                        <div class="card-img pb-4 pt-2">
                            <img src="../assets/drink_119593.svg" class="img-left1" alt="">
                            <div class="card-txt">
                                {{ getLitres(item) }}
                            </div>
                        </div>
                        <div class="card-img pb-4">
                            <img src="../assets/loon-icon.svg" class="img-left" alt="">
                            <div class="card-txt">
                                {{ getTemperature(item) }}
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-img pb-4">
                            <img src="../assets/loon-icon (1).svg" class="img-left" alt="">
                            <div class="card-txt">
                                {{ getType(item) }}
                            </div>
                        </div>
                        <div class="card-img pb-4">
                            <img src="../assets/loon-icon (2).svg" class="img-left" alt="">
                            <div class="card-txt">
                                {{ getOtherWater(item) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bt">
                <div class="ps-5 pb-2">
                    <h3>Ваш комментарий:</h3>
                </div>
                <div class="coment">
                    <div class="col">
                        <p>
                            {{item.commment}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="user-post-time">
                {{getRelativeDate(item.dateWater)}}
            </div>
        </div>
    </div>
</template>


<style>
.calendar-page .card-body {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    font-family: Arial;
    flex-wrap: wrap;
}

.card-body {
    width: 900px;
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
.user-post{
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}
.card-img {
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