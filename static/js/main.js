import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";

function init() {
    dataHandler.getBoards();

    const addNewBoard = document.querySelector('#new-board-button');
    addNewBoard.addEventListener('click', function(){
        dataHandler.saveNewBoard();
    });
    dom.createNewUser();
    dom.setModalTitle();


}

window.onload = init;
