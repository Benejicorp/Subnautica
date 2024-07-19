const data = {
    "tabs" : [
        {
            "name": "Tab 1",
            "content": [
                {
                    "name": "Partie 1",
                    "content": [
                        { "text": "Texte 1", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 2", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 3", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 4", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 2",
                    "content": [
                        { "text": "Texte 5", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 6", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 7", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 8", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 3",
                    "content": [
                        { "text": "Texte 9", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 10", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 11", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 12", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 4",
                    "content": [
                        { "text": "Texte 25", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 26", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 27", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 28", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 5",
                    "content": [
                        { "text": "Texte 29", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 30", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 31", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 32", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 6",
                    "content": [
                        { "text": "Texte 33", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 34", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 35", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 36", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 7",
                    "content": [
                        { "text": "Texte 37", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 38", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 39", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 40", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 8",
                    "content": [
                        { "text": "Texte 41", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 42", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 43", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 44", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 9",
                    "content": [
                        { "text": "Texte 45", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 46", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 47", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 48", "tags": ["tag2", "tag4"] }
                    ]
                }
            ]
        },
        {
            "name": "Tab 2",
            "content": [
                {
                    "name": "Partie 1",
                    "content": [
                        { "text": "Texte 13", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 14", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 15", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 16", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 2",
                    "content": [
                        { "text": "Texte 17", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 18", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 19", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 20", "tags": ["tag2", "tag4"] }
                    ]
                },
                {
                    "name": "Partie 3",
                    "content": [
                        { "text": "Texte 21", "tags": ["tag1", "tag2"] },
                        { "text": "Texte 22", "tags": ["tag3", "tag4"] },
                        { "text": "Texte 23", "tags": ["tag5", "tag6"] },
                        { "text": "Texte 24", "tags": ["tag2", "tag4"] }
                    ]
                }
            ]
        }
    ]
}

// SECTION: Utility Functions
function sanitizeId(str) {
    return str.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
}

function generateCheckboxId(tab, part, text) {
    const data = {
        tab: tab.name,
        part: part.name,
        text: text.text
    };
    return btoa(JSON.stringify(data));
}

function decodeCheckboxId(id) {
    return JSON.parse(atob(id));
}

function getTagsFromItem(item) {
    return Array.isArray(item.tags) ? item.tags : [];
}
// !SECTION

// SECTION: DOM Creation Functions
function createCheckbox(tab, part, text) {
    const id = generateCheckboxId(tab, part, text);
    const isChecked = localStorage.getItem(id) === 'true';
    const tags = getTagsFromItem(text);
    return `
        <li class="${tags.join(' ')}">
            <div class="checkbox-wrapper" data-tab="${sanitizeId(tab.name)}" data-part="${sanitizeId(part.name)}">
                <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''}>
                <label for="${id}">${text.text}</label>
            </div>
        </li>
    `;
}

function createPart(tab, part, checkedCount, totalCount) {
    const texts = part.content.map(text => createCheckbox(tab, part, text)).join('');
    const partId = `${sanitizeId(tab.name)}-${sanitizeId(part.name)}`;
    return `
        <div id="${partId}" class="part">
            <h3>${part.name} <span class="checked-count ${checkedCount === totalCount ? 'all-checked' : ''}">${checkedCount === totalCount ? 'DONE' : `[ ${checkedCount}/${totalCount} ]`}</span></h3>
            <ul>${texts}</ul>
        </div>
    `;
}

function createTab(tab) {
    const allTags = new Set();
    tab.content.forEach(part => {
        part.content.forEach(item => {
            getTagsFromItem(item).forEach(tag => allTags.add(tag));
        });
    });

    const tagButtons = Array.from(allTags).map(tag => 
        `<button class="tag-filter active" data-tag="${tag}">${tag}</button>`
    ).join('');

    const parts = tab.content.map(part => {
        const checkedCount = part.content.filter(text => 
            localStorage.getItem(generateCheckboxId(tab, part, text)) === 'true'
        ).length;
        const totalCount = part.content.length;
        return createPart(tab, part, checkedCount, totalCount);
    }).join('');

    const tableOfContents = createTableOfContents(tab, tagButtons);

    return `
        <div id="${sanitizeId(tab.name)}" class="tab">
            ${tableOfContents}
            <div class="tab-content">
                ${parts}
            </div>
        </div>
    `;
}

function createTableOfContents(tab, tagButtons) {
    return `
        <div class="table-of-contents">
            <h2>${tab.name}</h2>
            <div class="tag-filters">
                <button class="tag-filter" data-tag="select-all">Select All</button>
                ${tagButtons}
            </div>
            <ul>
                ${createTocItems(tab)}
            </ul>
        </div>
    `;
}

function createTocItems(tab) {
    return tab.content.map(part => {
        const checkedCount = part.content.filter(text => 
            localStorage.getItem(generateCheckboxId(tab, part, text)) === 'true'
        ).length;
        const totalCount = part.content.length;
        const tocId = `toc-${sanitizeId(tab.name)}-${sanitizeId(part.name)}`;
        return `<li>
            <a href="#${sanitizeId(tab.name)}-${sanitizeId(part.name)}">
                ${part.name}
                <span id="${tocId}" class="toc-count ${checkedCount === totalCount ? 'all-checked' : ''}">
                    ${checkedCount === totalCount ? 'DONE' : `${checkedCount}/${totalCount}`}
                </span>
            </a>
        </li>`;
    }).join('');
}
// !SECTION

// SECTION: State Management
let activeTags = new Set();

function initializeTags() {
    const tagButtons = document.querySelectorAll('.tag-filter:not([data-tag="select-all"])');
    tagButtons.forEach(button => {
        activeTags.add(button.getAttribute('data-tag'));
    });
}
// !SECTION

// SECTION: Event Listeners
document.addEventListener('DOMContentLoaded', initializeTags);

document.addEventListener('change', function(e) {
    if (e.target && e.target.type === 'checkbox') {
        const wrapper = e.target.closest('.checkbox-wrapper');
        if (wrapper) {
            const tabId = wrapper.getAttribute('data-tab');
            const partId = wrapper.getAttribute('data-part');
            saveCheckboxState(tabId, partId, e.target.id, e.target.checked);
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('tag-filter')) {
        handleTagFilter(e.target);
    }
});
// !SECTION

// SECTION: Event Handlers
function handleTagFilter(button) {
    const tag = button.getAttribute('data-tag');
    
    if (tag === 'select-all') {
        selectAllTags();
    } else {
        toggleTag(tag, button);
    }
    
    filterByTags(activeTags);
}

function selectAllTags() {
    document.querySelectorAll('.tag-filter').forEach(btn => {
        if (btn.getAttribute('data-tag') !== 'select-all') {
            btn.classList.add('active');
            activeTags.add(btn.getAttribute('data-tag'));
        }
    });
}

function toggleTag(tag, button) {
    if (activeTags.has(tag)) {
        activeTags.delete(tag);
        button.classList.remove('active');
    } else {
        activeTags.add(tag);
        button.classList.add('active');
    }
}
// !SECTION

// SECTION: Filtering and Updating
function filterByTags(tags) {
    const items = document.querySelectorAll('.part li');
    const allTagButtons = document.querySelectorAll('.tag-filter:not([data-tag="select-all"])');
    
    if (tags.size === allTagButtons.length) {
        items.forEach(item => item.style.display = '');
    } else {
        items.forEach(item => {
            item.style.display = Array.from(tags).some(tag => item.classList.contains(tag)) ? '' : 'none';
        });
    }
}

function updateCheckedCount(tabId, partId) {
    const part = document.getElementById(`${tabId}-${partId}`);
    const checkedCount = part.querySelectorAll('input[type="checkbox"]:checked').length;
    const totalCount = part.querySelectorAll('input[type="checkbox"]').length;
    
    updateCountDisplay(part.querySelector('.checked-count'), checkedCount, totalCount);
    updateCountDisplay(document.getElementById(`toc-${tabId}-${partId}`), checkedCount, totalCount);
}

function updateCountDisplay(element, checkedCount, totalCount) {
    if (element) {
        element.textContent = checkedCount === totalCount ? 'DONE' : `[ ${checkedCount}/${totalCount} ]`;
        element.classList.toggle('all-checked', checkedCount === totalCount);
    }
}
// !SECTION

// SECTION: Tab Management
function saveActiveTab(tabId) {
    localStorage.setItem('activeTab', tabId);
}

function getActiveTab() {
    return localStorage.getItem('activeTab');
}

function openTab(tabId) {
    const tabs = document.getElementsByClassName('tab');
    Array.from(tabs).forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    saveActiveTab(tabId);
}
// !SECTION

// SECTION: Storage
function saveCheckboxState(tabId, partId, checkboxId, isChecked) {
    localStorage.setItem(checkboxId, isChecked);
    updateCheckedCount(tabId, partId);
}
// !SECTION

// ANCHOR: Initialization
function main() {
    const topbar = document.getElementById('topbar');
    const main = document.getElementById('main');

    topbar.innerHTML = `
        <div class="tab-buttons">
            ${data.tabs.map(tab => `<button onclick="openTab('${sanitizeId(tab.name)}')">${tab.name}</button>`).join('')}
        </div>
    `;

    main.innerHTML = data.tabs.map(createTab).join('');

    openTab(sanitizeId(data.tabs[0].name));
}

main();