window.onload = Main;
let cakesApp;
const baseURL = "http://localhost:3000/cakes";
function Main() {
    cakesApp = new Vue({
        el: "#cakesApp",
        data: {
            input1: "",
            input2: "",
            cakes: []
        },
        methods: {
            searchCakeByName: function (event) {
                let url = "?name_like=" + this.input1;
                url = baseURL + encodeURI(url);
                updateData(url);
            }
            // subimit: function (event) {
                
            // }
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
                cakesApp.cakes = res;
                console.log(cakesApp.cakes);
            }
            else {
                cakesApp.cakes = [res];
            }
        });
}
// fuction submit()