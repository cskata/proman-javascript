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

        let boardBody = templates.createBoardBody(boardStatuses, boardId);

        let classNames = boardBody.getElementsByTagName('td');
        let dragSelector = Array.from(classNames);
        dragula(dragSelector);

        board.appendChild(boardHeader);
        boardHeader.addEventListener('click', dom.toggleBoard);
        board.appendChild(boardBody);

        fullContent.appendChild(board);
    },
    createBoardHeader: function (boardTitle) {
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
                // this where the SQL magic comes
            }
            if (event.which === escKey) {
                title.setAttribute('contentEditable', 'false');
                title.innerHTML = title.dataset.boardTitle;
            }
        });
        return boardHeader
    },
    createNewCardButton: function () {
        let newCardButton = document.createElement('button');
        newCardButton.classList.add('new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        return newCardButton
    },
    handleNewCardButtonClick: function (event) {
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
        cardElement.innerHTML = `${cardTitle}`;

        cardElement.dataset.cardTitle = cardElement.innerHTML;

        cardElement.addEventListener('click', function () {
            let card = event.target;
            card.contentEditable = true;
        });

        cardElement.addEventListener('keydown', function (event) {
            const enterKey = 13;
            const escKey = 27;
            let card = event.target;
            if (event.which === enterKey) {
                card.contentEditable = false;
                cardElement.dataset.cardTitle = cardElement.innerHTML;
                // here comes the SQL magic
            }
            if (event.which === escKey) {
                card.contentEditable = false;
                cardElement.innerHTML = cardElement.dataset.cardTitle;
            }
        });
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
    createBoardBody: function (boardStatuses, boardId) {
        let boardBody = document.createElement("div");
        boardBody.classList.add('board-body');

        let table = document.createElement('table');
        table.classList.add('board-data');
        let tableHeader = templates.createTableHeader(boardStatuses);
        let tableBody = templates.createTableBody(boardStatuses, boardId);
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
            cell.dataset.cellTitle = cell.innerHTML;
            cell.addEventListener('click', function(){
               cell.setAttribute('contentEditable', 'true');
            });
            cell.addEventListener('keydown', function(){
                const enterKey = 13;
                const escKey = 27;
                if (event.which === enterKey){
                    cell.setAttribute('contentEditable', 'false');
                    cell.dataset.cellTitle = cell.innerHTML;
                    // here comes the SQL magic
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
    createTableBody: function (boardStatuses, boardId) {
        let tableBody = document.createElement('tr');
        tableBody.classList.add('cards');
        let classId = 'board' + boardId;
        for (let i = 0; i < boardStatuses.length; i++) {
            let cell = document.createElement('td');
            cell.setAttribute("class", classId);
            tableBody.appendChild(cell);
        }

        return tableBody
    }
};


function drag(classId){
    let containers = document.getElementsByClassName(classId);
    let containersArray = Array.from(containers);
    dragula(containersArray);
}

