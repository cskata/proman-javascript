// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)

import {dom} from "./dom.js";
import {templates} from "./templates.js";

export let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function () {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
    },
    _saveData: function () {
        // it is not called from outside
        // saves the data from this._data to local storage
    },
    init: function () {
        this._loadData();
    },
    getBoards: function () {
        // the boards are retrieved and then the callback function is called with the boards
        fetch('/boards')
        .then((response) => response.json())
        .then((response) => dom.showBoards(response) )
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function () {
        fetch('/max-id')
        .then((response) => response.json())
        .then((response) =>
            templates.createBoardElement('New Board', ['New', 'In Progress', 'Testing', 'Done'], response.board_id + 1) );
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },
    saveNewBoard: function() {
        let url = '/save-board';
        let data = {title: "New Board", statuses: "New, In Progress, Testing, Done"};

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            console.log('Success:', JSON.stringify(response));
            let fullContent = document.querySelector("#full-content");
            fullContent.innerHTML = "";
            dataHandler.getBoards();
        })
    },
    saveNewCard: function(boardId, orderNumber) {
        let url = '/save-card';
        let data = {title: "New Card", board_id: boardId, status_id: 1, order_num: orderNumber};

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log('Success:', JSON.stringify(response)))
    },
    deleteCard: function(clickedCardId){
        let url = '/delete-card';
        let data = {card_id: clickedCardId};

        fetch(url, {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            console.log('Success:', JSON.stringify(response));
            let fullContent = document.querySelector("#full-content");
            fullContent.innerHTML = "";
            dataHandler.getBoards();
        });
    },
    deleteBoard: function(board_id){
        let url = '/delete-board';
        let data = {board_id: board_id};

        fetch(url, {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            console.log('Success:', JSON.stringify(response));
            let fullContent = document.querySelector("#full-content");
            fullContent.innerHTML = "";
            dataHandler.getBoards();
        });
    }
};
