import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

export let templates = {
    createBoardElement: function(boardTitle, boardStatuses, boardId) {

        let fullContent = document.querySelector('#full-content');

        let board = document.createElement('div');
        board.classList.add('board');
        board.dataset.boardId = boardId;

        let boardHeader = templates.createBoardHeader(boardTitle, boardId);
        let newCardButton = templates.createNewCardButton();
        boardHeader.appendChild(newCardButton);
        newCardButton.addEventListener('click', function(event) {
            templates.handleNewCardButtonClick(event);
        });
        let deleteBoardButton = templates.createDeleteBoardButton();
        boardHeader.appendChild(deleteBoardButton);
        deleteBoardButton.addEventListener("click", function(event) {
            templates.handleDeleteButtonClick(event);
        });

        let boardBody = templates.createBoardBody(boardStatuses, boardId);

        board.appendChild(boardHeader);
        boardHeader.addEventListener('click', dom.toggleBoard);
        board.appendChild(boardBody);

        fullContent.appendChild(board);
    },
    createBoardHeader: function (boardTitle, boardId) {
        let boardHeader = document.createElement("div");
        boardHeader.classList.add('board-header');
        boardHeader.innerHTML = `
            <div class="board-title">${boardTitle}</div>
            <i class="fas fa-caret-up"></i>
            `;

        boardHeader.dataset.tableIsOpen = 'true';
        boardHeader.dataset.heightChecked = 'false';
        boardHeader.dataset.initHeight = '0';

        let title = boardHeader.querySelector('.board-title');
        title.dataset.boardTitle = title.innerHTML;

        title.addEventListener('click', function () {
            title.setAttribute('contentEditable', 'true');
        });
        title.addEventListener('keydown', function () {
            let enterKey = 13;
            let escKey = 27;
            if (event.which === enterKey) {
                title.setAttribute('contentEditable', 'false');
                title.dataset.boardTitle = title.innerHTML;
                dataHandler.updateBoard(boardId, title.dataset.boardTitle);
            }
            if (event.which === escKey) {
                title.setAttribute('contentEditable', 'false');
                title.innerHTML = title.dataset.boardTitle;
            }
        });
        return boardHeader
    },
    createNewCardButton: function() {
        let newCardButton = document.createElement('button');
        newCardButton.classList.add('new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        return newCardButton
    },
    createDeleteBoardButton: function() {
        let deleteBoardButton = document.createElement('button');
        deleteBoardButton.classList.add('delete-board-button');
        deleteBoardButton.innerHTML = 'Delete Board';
        return deleteBoardButton
    },
    handleNewCardButtonClick: function(event) {
        let boardButton = event.currentTarget;
        let board = boardButton.parentNode.parentNode;
        let boardId = board.dataset.boardId;
        let firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .cards > :first-child`);
        const orderNumber = (firstColumn.children.length) + 1;
        dataHandler.saveNewCard(boardId, orderNumber);

        let fullContent = document.querySelector("#full-content");
        fullContent.innerHTML = "";
        dataHandler.getBoards();
    },
    handleDeleteButtonClick: function(event){
        let deleteButton = event.currentTarget;
        let board = deleteButton.parentNode.parentNode;
        let boardId = board.dataset.boardId;
        dataHandler.deleteBoard(boardId);
    },
    createCardElement: function(cardTitle, cardId) {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `<p>${cardTitle}</p>
                                 <p><i class="fas fa-trash-alt"></i></p>`;

        let firstPara = cardElement.querySelector("p:first-child");
        cardElement.dataset.cardTitle = firstPara.innerHTML;
        firstPara.addEventListener('click', function(event) {
            let card = event.target;
            card.contentEditable = true;
        });

        cardElement.addEventListener('keydown', function(event) {
            const enterKey = 13;
            const escKey = 27;
            let card = event.target;
            if (event.which === enterKey) {
                card.contentEditable = false;
                cardElement.dataset.cardTitle = firstPara.innerHTML;
                dataHandler.updateCard(cardId, cardElement.dataset.cardTitle);
            }
            if (event.which === escKey) {
                card.contentEditable = false;
                cardElement.innerHTML = cardElement.dataset.cardTitle;
            }
        });
        cardElement.dataset.cardId = cardId;

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
    createBoardBody: function (boardStatuses, boardId) {
        let boardBody = document.createElement("div");
        boardBody.classList.add('board-body');

        let table = document.createElement('table');
        table.classList.add('board-data');
        let tableHeader = templates.createTableHeader(boardStatuses, boardId);
        let tableBody = templates.createTableBody(boardStatuses);
        table.appendChild(tableHeader);
        table.appendChild(tableBody);

        boardBody.appendChild(table);
        return boardBody
    },
    createTableHeader: function (boardStatuses, boardId) {
        let tableHeader = document.createElement('tr');
        tableHeader.classList.add('statuses');
        for (const status of boardStatuses) {
            let cell = document.createElement('th');
            cell.innerHTML = `${status}`;
            cell.dataset.cellTitle = cell.innerHTML;
            cell.addEventListener('click', function(){
               cell.setAttribute('contentEditable', 'true');
            });
            cell.addEventListener('keydown', function(){
                const enterKey = 13;
                const escKey = 27;
                if (event.which === enterKey){
                    let cellId = boardStatuses.indexOf(cell.dataset.cellTitle);
                    cell.setAttribute('contentEditable', 'false');
                    cell.dataset.cellTitle = cell.innerHTML;
                    boardStatuses[cellId] = cell.dataset.cellTitle;
                    let newStatuses = boardStatuses.toString();
                    dataHandler.updateStatuses(newStatuses, boardId);
                }
                if (event.which === escKey){
                    cell.setAttribute('contentEditable', 'false');
                    cell.innerHTML = cell.dataset.cellTitle;
                }
            });
            tableHeader.appendChild(cell);
        }
        return tableHeader
    },
    createTableBody: function(boardStatuses) {
        let tableBody = document.createElement('tr');
        tableBody.classList.add('cards');
        for (let i = 0; i < boardStatuses.length; i++) {
            let cell = document.createElement('td');
            tableBody.appendChild(cell);
        }
        return tableBody
    }
};