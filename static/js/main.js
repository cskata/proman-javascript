import {dataHandler} from "./data_handler.js";

function init() {
    dataHandler.getBoards();

    const addNewBoard = document.querySelector('#new-board-button');
    addNewBoard.addEventListener('click', function(){
        dataHandler.saveNewBoard();
    });

}

window.onload = init;
