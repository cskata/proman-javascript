import {templates} from "./templates.js";

export let dom = {
        showBoards: function (boards) {
            for (let board of boards) {
                templates.createBoardElement(board.title, board.statuses, board.id);
                dom.showCards(board);
            }
        },
        showCards: function (board) {
            let cards = board.cards;
            for (let i = 0; i < cards.length; i++) {
                let column = dom.addCard(board, cards[i]);
                let cardElement = templates.createCardElement(cards[i].title, cards[i].id, cards[i].order_num);
                column.appendChild(cardElement);
            }
        },
        addCard: function (board, card) {
            let column;
            if (card.status_id === 1) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :first-child`);
            }
            if (card.status_id === 2) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :nth-child(2)`);
            }
            if (card.status_id === 3) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :nth-child(3)`);
            }
            if (card.status_id === 4) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :last-child`);
            }
            return column
        },
        toggleBoard: function (event) {
            if (event.target.className !== 'new-card-button' && event.target.className !== 'board-title' &&
                event.target.className !== 'delete-board-button') {
                let boardHeader;
                if (event.target.className === 'fas fa-caret-up') {
                    boardHeader = event.target.parentElement;
                } else {
                    boardHeader = event.target;
                }
                const tableContainer = boardHeader.nextSibling;
                const table = tableContainer.querySelector('.board-data');
                const arrow = boardHeader.querySelector('.fas');
                const newCardButton = boardHeader.querySelector('.new-card-button');
                const deleteBoardButton = boardHeader.querySelector(".delete-board-button");

                //const tableHeightChecked = boardHeader.dataset.heightChecked;
                const isTableOpen = boardHeader.dataset.tableIsOpen;
                //const initHeight = boardHeader.dataset.initHeight;

                /*if (tableHeightChecked === 'false') {
                    tableContainer.style.height = `${tableContainer.offsetHeight}px`;
                    boardHeader.dataset.initHeight = `${tableContainer.offsetHeight}`;
                    boardHeader.dataset.heightChecked = 'true';
                }*/

                if (isTableOpen === 'true') {
                    boardHeader.dataset.tableIsOpen = 'false';
                    //tableContainer.style.height = '0px';
                    arrow.style.transform = 'translate(0, 25%) rotateX(180deg)';

                    setTimeout( function() {
                        table.style.display = 'none';
                        newCardButton.style.visibility = 'hidden';
                        deleteBoardButton.style.visibility = 'hidden';
                        boardHeader.style.borderBottomLeftRadius = "10px";
                        boardHeader.style.borderBottomRightRadius = "10px";
                    }, 600);
                } else {
                    boardHeader.dataset.tableIsOpen = 'true';
                    //tableContainer.style.height = `${initHeight}px`;
                    arrow.style.transform = 'rotateX(0deg)';

                    setTimeout(function() {
                        table.style.display = 'table';
                        newCardButton.style.visibility = 'visible';
                        deleteBoardButton.style.visibility = 'visible';
                        boardHeader.style.borderBottomLeftRadius = "0";
                        boardHeader.style.borderBottomRightRadius = "0";
                    }, 600);
                }
            }
        }
    };


