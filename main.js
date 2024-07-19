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

function createCheckbox(tab, part, text) {
    const id = generateCheckboxId(tab, part, text);
    const isChecked = localStorage.getItem(id) === 'true';
    return `
        <li class="${text.tags.join(' ')}">
            <div class="checkbox-wrapper" data-tab="${sanitizeId(tab.name)}" data-part="${sanitizeId(part.name)}" data-text="${sanitizeId(text.text)}">
                <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''}>
                <label for="${id}">${text.text}</label>
            </div>
        </li>
    `;
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('.checkbox-wrapper')) {
        const wrapper = e.target.closest('.checkbox-wrapper');
        const checkbox = wrapper.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        const tabId = wrapper.getAttribute('data-tab');
        const partId = wrapper.getAttribute('data-part');
        const textId = wrapper.getAttribute('data-text');
        
        saveCheckboxState(tabId, partId, textId, checkbox.checked);
    }
});

function createPart(tab, part) {
    const texts = part.content.map(text => createCheckbox(tab, part, text)).join('');
    const checkedCount = part.content.filter(text => 
        localStorage.getItem(generateCheckboxId(tab, part, text)) === 'true'
    ).length;
    const totalCount = part.content.length;

    return `
        <div id="${sanitizeId(tab.name)}-${sanitizeId(part.name)}" class="part">
            <h3>${part.name} (<span class="checked-count">${checkedCount}/${totalCount}</span> checked)</h3>
            <ul>${texts}</ul>
        </div>
    `;
}

function createTab(tab) {
    const parts = tab.content.map(part => createPart(tab, part)).join('');
    const tableOfContents = tab.content.map(part => {
        const partId = `${sanitizeId(tab.name)}-${sanitizeId(part.name)}`;
        return `<li><a href="#${partId}">${part.name}</a></li>`;
    }).join('');

    const tabId = sanitizeId(tab.name);
    return `
        <div id="${tabId}" class="tab">
            <ul class="table-of-contents">${tableOfContents}</ul>
            ${parts}
        </div>
    `;
}

function saveActiveTab(tabId) {
    localStorage.setItem('activeTab', tabId);
}

function getActiveTab() {
    return localStorage.getItem('activeTab');
}

function main() {
    const topbar = document.getElementById('topbar');
    const main = document.getElementById('main');

    topbar.innerHTML = data.tabs.map(tab => {
        const tabId = sanitizeId(tab.name);
        return `<button onclick="openTab('${tabId}')">${tab.name}</button>`;
    }).join('');

    main.innerHTML = data.tabs.map(createTab).join('');

    const activeTab = getActiveTab();
    if (activeTab && document.getElementById(activeTab)) {
        openTab(activeTab);
    } else {
        openTab(sanitizeId(data.tabs[0].name));
    }
}

function openTab(tabId) {
    const tabs = document.getElementsByClassName('tab');
    Array.from(tabs).forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    saveActiveTab(tabId);
}

function saveCheckboxState(tabId, partId, textId, isChecked) {
    const id = `${tabId}-${partId}-${textId}`;
    localStorage.setItem(id, isChecked);
    updateCheckedCount(tabId, partId);
}

function updateCheckedCount(tabId, partId) {
    const part = document.getElementById(`${tabId}-${partId}`);
    const checkedCount = part.querySelectorAll('input[type="checkbox"]:checked').length;
    const totalCount = part.querySelectorAll('input[type="checkbox"]').length;
    part.querySelector('.checked-count').textContent = `${checkedCount}/${totalCount}`;
}

main();