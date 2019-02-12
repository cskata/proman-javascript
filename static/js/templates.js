import {dom} from "./dom.js";

export let templates = {
    createBoardElement: function (boardTitle, boardStatuses, boardId) {

        let fullContent = document.querySelector('#full-content');

        let board = document.createElement('div');
        board.classList.add('board');
        board.dataset.boardId = boardId;

        let boardHeader = templates.createBoardHeader(boardTitle);
        let newCardButton = templates.createNewCardButton();
        boardHeader.appendChild(newCardButton);
        newCardButton.addEventListener('click', function (event) {
            templates.handleNewCardButtonClick(event);
        });

        let boardBody = templates.createBoardBody(boardStatuses);

        board.appendChild(boardHeader);
        board.appendChild(boardBody);

        fullContent.appendChild(board);
    },
    createBoardHeader: function (boardTitle) {
        let boardHeader = document.createElement("div");
        boardHeader.classList.add('board-header');
        boardHeader.innerHTML = `
            <span class="board-title">${boardTitle}</span>
            <i class="fas fa-caret-up"></i>
            `;

        boardHeader.dataset.open = 'true';
        boardHeader.dataset.heightChecked = 'false';
        boardHeader.dataset.initHeight = '0';
        boardHeader.addEventListener('click', dom.toggleBoard);
        return boardHeader
    },
    createNewCardButton: function () {
        let newCardButton = document.createElement('button');
        newCardButton.classList.add('new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        return newCardButton
    },
    handleNewCardButtonClick: function () {
        let newCard = templates.createCardElement('Test Card');
        let board = document.querySelector(".board");
        let boardId = board.dataset.boardId;
        let firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .cards > :first-child`);
        firstColumn.appendChild(newCard);
    },
    createCardElement: function (cardTitle) {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `${cardTitle}`;
        return cardElement;
    },
    createBoardBody: function (boardStatuses) {
        let boardBody = document.createElement("div");
        boardBody.classList.add('board-body');

        let table = document.createElement('table');
        table.classList.add('board-data');
        let tableHeader = templates.createTableHeader(boardStatuses);
        let tableBody = templates.createTableBody(boardStatuses);
        table.appendChild(tableHeader);
        table.appendChild(tableBody);

        boardBody.appendChild(table);
        return boardBody
    },
    createTableHeader: function (boardStatuses) {
        let tableHeader = document.createElement('tr');
        tableHeader.classList.add('statuses');
        for (const status of boardStatuses) {
            let cell = document.createElement('th');
            cell.innerHTML = `${status}`;
            tableHeader.appendChild(cell);
        }
        return tableHeader
    },
    createTableBody: function (boardStatuses) {
        let tableBody = document.createElement('tr');
        tableBody.classList.add('cards');
        for (let i = 0; i < boardStatuses.length; i++) {
            let cell = document.createElement('td');
            cell.dataset.statusId = `${i + 1}`;
            tableBody.appendChild(cell);
        }
        return tableBody
    }
};