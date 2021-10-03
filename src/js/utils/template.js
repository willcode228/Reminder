export const mainTemplate = () => {
    return (`

        <button class="aside-open"></button>

        <aside class="app__aside aside">
            ${asideSearch()}
            ${asideRoll()}
            ${asideAdd()}
        </aside>

        <main class="app__main main">
            ${notSelectedTabs()}
        </main>

    `);
}

export const asideSearch = () => {
    return (`
        <div class="aside__search search input__wrapper">
            <svg class="aside__search-icon" viewBox="0 0 30 30"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
            <input type="text" class="aside__search-input input" placeholder="Поиск" tabindex="1" autofocus>
            <div class="outline"></div>
        </div>
    `);
}

export const asideRoll = () => {
    return (`
        <div class="aside__list">
            <h2 class="aside__list-title">Мои списки</h2>
            <ul class="aside__list-list lists"></ul>
        </div>
    `);
}

export const asideAdd = () => {
    return (`
        <button class="aside__add">
            <div class="aside__icon">+</div>
            <h3 class="aside__new">Новый список</h3>
        </button>
    `);
}

export const main = (data) => {
    return !data ? `${notSelectedTabs()}`
        : (`<div class="main__header"></div> ${mainRoll()}`)
}

export const mainHeader = (title, completeVisible = true, uncompleted, completed) => {
    let hideBtnText = completeVisible ? 'Скрыть' : 'Показать';
    return (`

        <p class="main__header-add-wrapper">
            <button class="main__header-add">
                <svg viewBox="0 0 512 512"><path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/></svg>
            </button>
        </p>

        <div class="main__header-box">
            <h1 class="main__header-title" title="${title}">${title}</h1>
            <h2 class="main__header-uncompleted">${uncompleted}</h2>
        </div>

        <div class="main__header-box">
            <h3 class="main__header-complete">${completed} выполнены</h3>
            <button class="main__header-hide">${hideBtnText}</button>
        </div>

    `);
}

export const mainRoll = () => {
    return (`
        <ul class="main__list lists"></ul>
    `);
}

export const mainRollTemplate = () => {
    return (`
        <h1 class="main__noTasks">Напоминаний нет</h1>
        <ul class="main__list-uncompleted"></ul>
        <ul class="main__list-completed"></ul>
    `);
}

export const notSelectedTabs = () => {
    return (`
        <h1 class="main__notSelected">Нет выбранного списка</h1>
    `);
}

export const tab = (index, text, uncompleted, accent, animated = false, opened = false) => {
    let tabindex = +index + 2,
        animatedStatus = animated ? 'show' : 'static',
        openedStatus = opened ? 'opened' : 'closed';
    return (`
        <li data-counter="${index}" 
            tabindex="${tabindex}" 
            class="aside__list-item tab ${animatedStatus} ${openedStatus}">

            <div class="aside__list-circle" style="background: var(--${accent})">
                <svg viewBox="0 0 512 512"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
            </div>
            
            <div class="aside__list-form input__wrapper">

                <input class="aside__list-input input" 
                        value="${text}" 
                        title="${text}" 
                        tabindex="-1"
                        onfocus="this.select()">

                <div class="outline"></div>
                
            </div>

            <button class="tab-delete">
                <svg viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
            </button>

            <p class="aside__list-task">${uncompleted}</p>   
        </li>
    `);
}

export const task = (index, text, animated = false, completed = false) => {
    let animatedStatus = animated ? 'show' : 'static',
        completedStatus = completed ? 'completed' : 'uncompleted',
        checkedStatus = completed ? 'checked' : '';

    const checkPrefix = (str) => {
        const link = /^((ftp|http|https):\/\/)|(www\.)/;
        return link.test(str) ? taskLink(text) : text;
    }

    return (`
        <li data-${completedStatus}="${index}"
            class="main__list-task task ${animatedStatus} ${completedStatus}"
            tabindex="-1">

            <label class="main__list-label" 
                    for="${completedStatus}-checkbox${index}">

                <div class="circle-outside">
                    <div class="circle-inside"></div>
                </div>
                
            </label>

            <input class="task__checkbox" 
                    type="checkbox" 
                    id="${completedStatus}-checkbox${index}" 
                    ${checkedStatus}>
            
            <p class="task-text" contenteditable="false" title="${text}">${checkPrefix(text)}</p>
            <button class="task-delete">
                <svg viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
            </button>
            <div class="task__focus"></div>
        </li>
    `)
}

export const taskLink = (str) => {
    return (`
        <a href="${str}" class="task-link" target="_blank">${str}</a>
    `);
}


export const dellTabPrompt = (title) => {
    return (`
        <div class="prompt__wrapper modal__wrapper">
            <div class="prompt modal">
                <img src="reminderIcon.0d2044de.png" alt="reminder icon">
                <h2 class="prompt-title" title="${title}">Вы действительно хотите удалить<br>"${title}"?</h2>
                <p class="prompt-info">Данное действие приведет к удалению всех<br> напоминаний в этом списке</p>
                <div class="prompt__btngroup">
                    <button class="prompt__quit button">Отменить</button>
                    <button class="prompt__delete button accent">Удалить</button>
                </div>
            </div>
        </div>
    `);
}

export const tabPropertyTemplate = (title, accentColor) => {
    const colorsData = ['light-grey', 'orange', 'yellow', 'green', 'light-blue', 'blue', 'purple', 'pink', 'light-purple', 'brown', 'grey', 'light-brown'];
    const inputElements = colorInputTemplate(colorsData, accentColor);

    return (`
        <div class="property__wrapper modal__wrapper active">
            <div class="tab__property property modal">

                <div class="property__content">

                    <div class="property__img">

                        <div class="property__circle">
                            <svg fill="${accentColor}" viewBox="0 0 512 512"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
                        
                            <div class="arrow__overlay">
                                <span class="arrow">▾</span>
                            </div>
                        </div>
                        

                        <form class="property__checkboxes">
                            <div class="property__checkboxes-triangle"></div>
                            ${inputElements.join(' ')}
                        </form>
                    </div>

                    <div class="property__text">
                        <h2 class="property__title">Свойства списка "${title}"</h2>

                        <div class="property__form">
                            <p class="property__input-name">Имя:</p>
                            <div class="input__wrapper">
                                <input class="property__input input" type="text" value="${title}" onfocus="this.select()" autofocus>
                                <div class="outline"></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="property__btngroup">
                    <button class="property__quit button">Отменить</button>
                    <button class="property__resolve button accent">ОК</button>
                </div>

            </div>
        </div>
    `);
}

const colorInputTemplate = (arr, accent) => {
    return arr.map(color => {
        let checked = color == accent ? 'checked' : '';
        return (`
            <input type="radio" class="color-input" name="accent" id="${color}" value="${color}" ${checked}/>
            <label style="background: var(--${color})" class="color-label ${color}" for="${color}"></label>
        `)
    });
}

export const infoModalTemplate = (text) => {
    return (`
        <div class="infoModal active">
            <h3>${text}</h3>
        </div>
    `);
}