// It uses data_handler.js to visualize elements
import {templates} from "./templates.js";

export let dom = {
    loadBoards: function () {
        // retrieves boards and makes showBoards called
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        for (let board of boards){
            templates.createBoardElement(board.title,board.statuses, board.id);
            dom.showCards(board);
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (board) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cards = board.cards;
        console.log(cards);
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            let column = dom.addCard(board, cards[i]);
            let cardElement = templates.createCardElement(cards[i].title);
            column.appendChild(cardElement);
        }
    },
    appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    addCard: function(board, card) {
        let column;
        if (card.status_id === 1) {
            column = document.querySelector(`.board[data-board-id='${board.id}] .cards > :first-child`);
        }
        if (card.status_id === 2) {
            column = document.querySelector(`.board[data-board-id='${board.id}] .cards > :nth-child(${2})`);
        }
        if (card.status_id === 3) {
            column = document.querySelector(`.board[data-board-id='${board.id}] .cards > :nth-child(${3})`);
        }
        if (card.status_id === 4) {
            column = document.querySelector(`.board[data-board-id='${board.id}] .cards > :last-child`);
        }
        return column
    }
};
