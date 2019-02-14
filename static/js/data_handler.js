import {dom} from "./dom.js";
import {templates} from "./templates.js";

export let dataHandler = {
    keyInLocalStorage: 'proman-data',
    _data: {},
    getBoards: function () {
        fetch('/boards')
        .then((response) => response.json())
        .then((response) => dom.showBoards(response) )
    },
    saveNewBoard: function() {
        let url = '/boards';
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
        let url = '/cards';
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
        let url = '/cards';
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
        let url = '/boards';
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
    },
    updateBoard: function(board_id, new_title){
        let url = '/boards';
        let data = {id: board_id, new_title: new_title};

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
        console.log('Success:', JSON.stringify(response));
        });
    },
    updateCard: function(card_id, new_title){
        let url = '/cards';
        let data = {id: card_id, new_title: new_title};

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response =>{
        console.log('Success:', JSON.stringify(response));
        });
    },
    updateStatuses: function(statuses, id) {
        let url = '/statuses';
        let data = {statuses: statuses, id: id};

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', JSON.stringify(response));
            });
    },
    updateCardOrder: function(data) {
        let url = '/card-order-update';

        fetch(url, {
            method: 'PUT',
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
