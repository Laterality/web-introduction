const ctx = {
    eventHandler: {
        onSubmit: (evt) => {
            const visitorName = ctx.viewWrapper.getVisitorNameInput();
            const comment = ctx.viewWrapper.getCommentInput();
            const text = comment;
            console.log(text);
            ctx.viewWrapper.addCommentItem({name: visitorName, text});
        }
    }, viewWrapper: {
        getVisitorNameInput: () => {
            return document.getElementById('visitor-name').value;
        },
        getSelectedMovieValue: () => {
            const arr = Array.from(document.querySelectorAll('input[type=radio][name=movie-preference]'));
            return arr.find(elm => elm.checked).value;
        }, 
        getCommentInput: () => {
            return document.getElementById('comment-content').value;
        },
        addCommentItem: (item) => {
            document.querySelector('.comments').append(ctx.template.createCommentItem(item));
        }
    }, template: {
        createCommentItem: (item) => {
            const elm = document.createElement('li');
            elm.innerHTML = `<strong>${item.name}</strong>: <input type="text" disabled class="comment-content" value="${item.text}"><button type="button" class="btn-edit">수정</button> <button type="button" class="btn-remove">삭제</button>`;
            const btnEdit = elm.querySelector('.btn-edit');
            const btnRemove = elm.querySelector('.btn-remove');
            const contentInput = elm.querySelector('.comment-content');
            btnEdit.addEventListener('click', () => {
                if (contentInput.attributes.getNamedItem('disabled')) {
                    contentInput.attributes.removeNamedItem('disabled');
                    btnEdit.innerHTML = '완료';
                } else {
                    contentInput.setAttribute('disabled', true);
                }
            });
            btnRemove.addEventListener('click', () => {
                elm.remove();
            });

            return elm;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const { eventHandler } = ctx;
    document.querySelector('.btn-submit').addEventListener('click', eventHandler.onSubmit);
});