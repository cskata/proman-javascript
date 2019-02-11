export let templates = {
    createBoardElement: function (boardTitle, boardStatuses, boardid) {

        let fullContent = document.querySelector('#full-content');

        let board = document.createElement('div');
        board.setAttribute('class', 'board');
        board.dataset.boardId = boardid;

        const boardHeader = document.createElement("div");
        boardHeader.setAttribute('class', 'board-header');
        boardHeader.innerHTML = `
            <span class="board-title">${boardTitle}</span>`;

        let newCardButton = document.createElement('button');
        newCardButton.setAttribute('class', 'new-card-button');
        newCardButton.innerHTML = 'Add New Card';
        newCardButton.addEventListener('click', function(event){
            const newCard = templates.createCardElement('Test Card');
            boardHeader.appendChild(newCard);
            const boardId = event.target.parentNode.parentNode.dataset.boardId;
            const firstColumn = document.querySelector(`.board[data-board-id="${boardId}"] .cards`).childNodes[0];
            firstColumn.appendChild(newCard);
        });

        boardHeader.appendChild(newCardButton);

        const boardBody = document.createElement("div");
        boardBody.setAttribute('class', 'board-body');

        let table = document.createElement('table');
        table.setAttribute('class', 'board-data');

        const tableHeader = document.createElement('tr');
        tableHeader.setAttribute('class', 'statuses');
        for(const status of boardStatuses){
            let cell = document.createElement('th');
            cell.innerHTML = `${status}`;
            tableHeader.appendChild(cell);
        }

        let tableBody = document.createElement('tr');
        tableBody.setAttribute('class', 'cards');
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
    createCardElement: function(cardTitle){

        let cardElement = document.createElement('div');
        cardElement.setAttribute('class', 'card');
        cardElement.innerHTML = `${cardTitle}`;

        return cardElement;
    }
};