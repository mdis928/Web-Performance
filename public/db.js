const indexedDB =
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.shimIndexedDB;

let db;
const request = indexedDB.open("budget, 1");

request.onupgradeneeded = ({ target}) => {
    let db = target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.onsuccess = ({ target }) => {
    db = target.result;


if (navigator.onLine) {
    checkDatabase();
   }
};

request.onerror = function (event) {
    console.log("oh no!" + event.target.errorCode)
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.onjectStore('pending');

    store.add(record);
};

