export let templates = {
    createBoardElement: function (boardTitle, boardStatuses, boardId) {

        let fullContent = document.querySelector('#full-content');

        let board = document.createElement('div');
        board.classList.add('board');
        board.dataset.boardId = boardId;

        let boardHeader = templates.createBoardHeader(boardTitle);
        let newCardButton = templates.createNewCardButton();
        boardHeader.appendChild(newCardButton);
        newCardButton.addEventListener('click', function(event){
            templates.handleNewCardButtonClick(boardHeader);
        });

        const boardBody = document.createElement("div");
        boardBody.classList.add('board-body');

        let table = document.createElement('table');
        table.classList.add('board-data');

        const tableHeader = document.createElement('tr');
        tableHeader.classList.add('statuses');
        for(const status of boardStatuses){
            let cell = document.createElement('th');
            cell.innerHTML = `${status}`;
            tableHeader.appendChild(cell);
        }

        let tableBody = document.createElement('tr');
        tableBody.classList.add('cards');
        for(let i = 0; i < boardStatuses.length; i++){
            let cell = document.createElement('td');
            tableBody.appendChild(cell);
        }

        table.appendChild(tableHeader);
        table.appendChild(tableBody);

        boardBody.appendChild(table);

        board.appendChild(boardHeader);
        board.appendChild(boardBody);

        fullContent.appendChild(board);

    },
    createBoardHeader: function(boardTitle) {
        const boardHeader = document.createElement("div");
        boardHeader.classList.add('board-header');
        boardHeader.innerHTML = `
            <span class="board-title">${boardTitle}</span>`;
        return boardHeader
    },
    createNewCardButton: function(){
        let newCardButton = document.createElement('button');
        newCardButton.classList.add('new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        return newCardButton
    },
    handleNewCardButtonClick: function(event){
        const newCard = templates.createCardElement('Test Card');
        //boardHeader.appendChild(newCard);
        let board = document.querySelector(".board");
        let boardId = board.dataset.boardId;
        //const boardId = event.target.parentNode.parentNode.dataset.boardId;
        const firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .cards`).childNodes[0];
        firstColumn.appendChild(newCard);
    },
    createCardElement: function(cardTitle){
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `${cardTitle}`;
        return cardElement;
    }
};