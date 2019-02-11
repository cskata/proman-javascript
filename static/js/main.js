import {templates} from "./templates.js";

// This function is to initialize the application
function init() {
    // init data
    dataHandler.init();
    // loads the boards to the screen
    dom.loadBoards();

    const addNewBoard = document.querySelector('#new-board-button');
    addNewBoard.addEventListener('click', function(){
        templates.createBoardElement('Test Board', ['New', 'In Progress', 'Testing', 'Failed'], '1');
    });





}

init();
