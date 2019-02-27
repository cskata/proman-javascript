import {dom} from "./dom.js";

export let dataHandler = {
    keyInLocalStorage: 'proman-data',
    _data: {},
    reloadContent: function(){
        let fullContent = document.querySelector("#full-content");
        fullContent.innerHTML = "";
        dataHandler.getBoards();
    },
    getBoards: function () {
        fetch('/boards')
        .then((response) => response.json())
        .then((response) => dom.showBoards(response) )
    },
    saveNewBoard: function() {
        let url = '/boards';
        let data = {title: "New Board", statuses: "New, In Progress, Testing, Done"};
        this.ajaxWrapperWithReload(url, data, 'POST');
    },
    saveNewCard: function(boardId, orderNumber) {
        let url = '/cards';
        let data = {title: "New Card", board_id: boardId, status_id: 1, order_num: orderNumber};
        this.ajaxWrapperWithoutReload(url, data, 'POST');
    },
    deleteCard: function(clickedCardId){
        let url = '/cards';
        let data = {card_id: clickedCardId};
        this.ajaxWrapperWithReload(url, data, 'DELETE');
    },
    deleteBoard: function(board_id){
        let url = '/boards';
        let data = {board_id: board_id};
        this.ajaxWrapperWithReload(url, data, 'DELETE');
    },
    updateBoard: function(board_id, new_title){
        let url = '/boards';
        let data = {id: board_id, new_title: new_title};
        this.ajaxWrapperWithoutReload(url, data, 'PUT');
    },
    updateCard: function(card_id, new_title){
        let url = '/cards';
        let data = {id: card_id, new_title: new_title};
        this.ajaxWrapperWithoutReload(url, data, 'PUT');
    },
    updateStatuses: function(statuses, id) {
        let url = '/statuses';
        let data = {statuses: statuses, id: id};
        this.ajaxWrapperWithoutReload(url, data, 'PUT');
    },
    updateCardOrder: function(data) {
        let url = '/card-order-update';
        this.ajaxWrapperWithoutReload(url, data, 'PUT');
    },
    handleRegistration: function(data) {
        let url = '/registration';
        this.ajaxWrapperWithReload(url, data, 'POST')
    },
    handleLogin: function(data) {

        let url = '/login';
        this.ajaxWrapperWithoutReload(url, data, 'POST')
    },


    ajaxWrapperWithReload: function (url, data, method) {
        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', JSON.stringify(response));
                dataHandler.reloadContent();
            });
    },
    ajaxWrapperWithoutReload: function (url, data, method) {
        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', JSON.stringify(response));
            });
    }
};
