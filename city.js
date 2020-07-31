window.onload = Main;
let cityApp;
const baseURL = "http://localhost:3000/memos";
function Main() {
    memoApp = new Vue({
        el: "#memoApp",
        data: {
            input1: "",
            input2: "",
            memos: []
        },
        methods: {
            searchCakeByName: function (event) {
                let url = "?name_like=" + this.input1;
                url = baseURL + encodeURI(url);
                updateData(url);
            },
            submitMemo:function(event){
                submit(baseURL);
            }
          
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
        .then(function (res) {
            if (Array.isArray(res)) {
                memoApp.memos = res;
                console.log(memoApp.memos);
            }
            else {
                memoApp.memos = [res];
            }
        });

}
function submit(url) {
    let memoName = document.getElementById("textId").value;
    let memoData = document.getElementById("memoId").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': memoName,
            'text': memoData
        })
    }).then(function (res) {
        fetch(url, { method: 'GET' })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}