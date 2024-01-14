<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            
        }
    },
    methods: {
        goNew() {
            this.$router.push({
                name: 'create'
            })
        },
        goRecords() {
            this.$router.push({
                name: 'notes'
            })
        },
        goStatistics() {
            this.$router.push({
                name: 'statistics'
            })
        },
    }
}
</script>
<template>
    <div class="left-navbar">
        <div class="top">
            <div class="btns">
                <div class="btns2">
                    <div class="buts">
                        <div class="row">
                            <div class="col-2">
                                <img src="../assets/icons8-добавить-закладку.svg" alt="">
                            </div>
                            <div class="col-10">
                                <button class="navbar-but" @click="goNew">Создать запись</button>
                            </div>
                        </div>
                    </div>
                    <div class="buts">
                        <div class="row">
                            <div class="col-2">
                                <img src="../assets/1491254488-chartflexibledatestatstatistics_82950.svg" alt="">
                            </div>
                            <div class="col-10">
                                <button @click="goStatistics" class="navbar-but">Статистика</button>
                            </div>
                        </div>
                    </div>
                    <div class="buts">
                        <div class="row">
                            <div class="col-2">
                                <img src="../assets/interface_clipboard_file_paper_document_office_writing_icon_132983.svg"
                                    alt="">
                            </div>
                            <div class="col-10">
                                <button type="button" @click="goRecords" class="navbar-but" >Записи</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="bottom">
            <p>
                Автор - Демиданов Арсений
                <br>
                © 2020–2023
            </p>
        </div>
    </div>
</template>

<style>
.left-navbar {
    display: flex;
    padding: 10px;
    top: 0px;
    width: 295px;
    height: 660px;
    padding-top: 30px;
    position: relative;

}


.top {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 280px;
    right: 80px;

}

.buts {
    padding: 40px;
    gap: 40px;
    display: flex;
    width: 250px;
    text-align: center;
}

.buts img {
    width: 40px;
}

.btns {
    display: flex;
    justify-content: center;
    width: 100%;
}

.navbar-but {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: white;
    padding: 8px;
    border: 1px solid black;
    margin: 0 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
}

.bottom {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-family: ProximaNova;
    margin-left: 15px;
    margin-top: 700px;
    font-size: 20px;
    font-weight: bold;
}

.navbar-but:hover {
    background-color: rgba(8, 131, 253, 0.667);
}
</style>