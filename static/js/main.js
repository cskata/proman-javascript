import {templates} from "./templates.js";
import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dataHandler.getBoards();

    const addNewBoard = document.querySelector('#new-board-button');
    addNewBoard.addEventListener('click', function(){
        dataHandler.createNewBoard();
        dataHandler.saveNewBoard();
    });


}

init();
