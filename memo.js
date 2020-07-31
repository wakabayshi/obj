window.onload = Main;
let memo;
const baseURL = "http://localhost:3000/memos";

function Main() {
    memo = new Vue({
        el: "#app",
        data: {
            inputData: [],
            searchById: "",
            searchByName: "",
            name: "",
            text: "",
            loading: false
        },
        methods: {
            searchTextByName: function (event) {
                let url = "?name_like=" + this.searchByName;
                url = baseURL + encodeURI(url);
                updateData(url);
            },
            searchTextById: function (event) {
                let url = "?id_like=" + this.searchById;
                url = baseURL + encodeURI(url);
                updateData(url);
            },
            submitText: function () {
                submit(this.name, this.text);
            },
            deleteText(): function (memo.id) {
                let id=memo.id
                deleteMemo(baseURL, id);
            }
        },
        computed: {
            textData() {
                return this.inputData.slice().reverse();
            }
        },
        created: function (event) {
            this.loading = true;
            sort(baseURL);
        },
        mounted: function (event) {
            updateData(baseURL);
        }
    });
}

function updateData(url) {
    fetch(url, { method: 'GET' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (Array.isArray(response)) {
                memo.inputData = response;
                console.log(memo.inputData);
                memo.loading = false;
            } else {
                memo.inputData = [response];
                console.log(memo.inputData);
                memo.loading = false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function sort(URL) {
    console.log(memo);
    let url = URL;
    fetch(url, { method: 'GET' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (Array.isArray(response)) {
                memo.inputData = response;
                console.log(memo.inputData);
                memo.loading = false;
            } else {
                memo.inputData = [response];
                console.log(memo.inputData);
                memo.loading = false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function submit(name, text) {
    let url = baseURL;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "text": text
        })
    }).then(function (res) {
        console.log(res);
        sort(baseURL);
    })
        .catch(function (error) {
            console.log(error);
        });

}
function deleteMemo(baseURL, id) {
    let url = baseURL
    fetch(url / id, {
        method: 'DELETE'
    })
    .then(console.log);
}