<style scoped>

    .Title_container {
        background-color: #333333;
        width: 100%;
        height: 60px;
        display: flex;
        position: relative;

        z-index: 100;

        border-bottom: 1px solid black;

        /* For centralized */
        justify-content: center;

    }

    .Title {
        background-image: linear-gradient(to top, rgb(149, 100, 255), #3c11b2);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;

        font-size: 25px;


        /* For centralized */
        margin: 0 auto;
        width: 200px;

        /* For down block */
        position: absolute;
        bottom: 0;

    }


    .MenuBackGround_container {
        display: flex;
        align-content: center;
        justify-content: flex-end;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }

    .container {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: left;
        align-items: center;
        position: absolute;
        right: 20%;
    }


    .MenuBackGround {
        display: flex;
    }


    .UpPanel {
        z-index: 10;
    }


    #PathTitle {
        font-size: 20px;
    }


</style>

<template>
    <div className="UpPanel">
        <div className="MenuBackGround_container">
            <div className="MenuBackGround">
                
            </div>
        </div>


        <div className="Title_container">
            <div id="PathTitle">sss</div>
            <div className="Title">Valer Note v 0.0.2</div>
        </div>
    </div>

</template>


<script setup>


import { inject } from 'vue'

inject('Up_panel_height').value = 60;

</script>


