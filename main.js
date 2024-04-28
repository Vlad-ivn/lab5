const yellowBlock = document.querySelector(".block__yellow");

document.querySelector(".block__link-languages").addEventListener("click", event => {
    event.preventDefault();
    fetchData("languages.txt", "Мови програмування:", "languages");
});

document.querySelector(".block__link-students").addEventListener("click", event => {
    event.preventDefault();
    fetchData("name.txt", "Прізвища студентів:", "students");
});


function fetchData(url, title, property) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            yellowBlock.innerHTML = `<h2>${title}</h2>`;
            const list = document.createElement("ul");
            data[property].forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                list.appendChild(listItem);
            });
            yellowBlock.appendChild(list);
        })
        .catch(error => console.error(`Error loading ${title.toLowerCase()}:`, error));
}

