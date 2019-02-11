export let templates = {
    createBoardElement: function (boardTitle, boardStatuses) {

        let fullContent = document.querySelector('#full-content');

        let board = document.createElement('div');
        board.setAttribute('class', 'board');

        const boardHeader = document.createElement("div");
        boardHeader.setAttribute('class', 'board-header');
        boardHeader.innerHTML = `
            <span class="board-title">${boardTitle}</span>
            <button class="new-card">Add New Card</button>`;

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

        table.appendChild(tableHeader);

        boardBody.appendChild(table);

        board.appendChild(boardHeader);
        board.appendChild(boardBody);

        fullContent.appendChild(board);

    }
};