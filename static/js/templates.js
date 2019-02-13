import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

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
        boardHeader.addEventListener('click', dom.toggleBoard);
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

        boardHeader.dataset.tableIsOpen = 'true';
        boardHeader.dataset.heightChecked = 'false';
        boardHeader.dataset.initHeight = '0';
        return boardHeader
    },
    createNewCardButton: function () {
        let newCardButton = document.createElement('button');
        newCardButton.classList.add('new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        return newCardButton
    },
    handleNewCardButtonClick: function(event){
        let boardButton = event.currentTarget;
        let board = boardButton.parentNode.parentNode;
        let boardId = board.dataset.boardId;
        let firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .cards > :first-child`);
        const orderNumber = (firstColumn.children.length) + 1;
        dataHandler.saveNewCard(boardId, orderNumber);

        /*let newCard = templates.createCardElement('New Card');
        let boardBody = document.querySelector(`.board[data-board-id="${boardId}"] .board-body`);
        boardBody.style.height = 'auto';
        let boardHeader = document.querySelector(`.board[data-board-id="${boardId}"] .board-header`);

        boardHeader.dataset.heightChecked = 'false';
        firstColumn.appendChild(newCard);*/
        let fullContent = document.querySelector("#full-content");
        fullContent.innerHTML = "";
        dataHandler.getBoards();
    },
    createCardElement: function (cardTitle, cardId) {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardId = cardId;
        cardElement.innerHTML = `<p>${cardTitle}</p>
                                 <p><i class="fas fa-trash-alt"></i></p>`;
        let trash = cardElement.querySelector(".fa-trash-alt");
        trash.addEventListener("click", function(event) {
           let clickedTrash = event.target;
           if (clickedTrash.classList.contains("fa-trash-alt")){
               let clickedCardId = clickedTrash.parentNode.parentNode.dataset.cardId;
               dataHandler.deleteCard(clickedCardId);
           }
        });
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
            tableBody.appendChild(cell);
        }
        return tableBody
    }
};