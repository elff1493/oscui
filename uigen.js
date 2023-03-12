function gen_item(t, path, name) {
    return `
    ${name}  
    <label class="switch">
      <input type="checkbox" onclick="sendosc('${path}', this.checked)" checked>
      <span class="slider round"></span>
    </label>
    <br>
    `;
}
function gen_folder(name, content) {
    
    return `<div id=${name}> </div>`
}
hook = "kZtPjo1YYs88"
url = ''
urlh = url + hook 
key = ""
function sendosc(path, value) {
    var f = {
        mode: 'no-cors',
      //  headers: {
      //      "Authorization": "Bearer " + key
       //   },
        body:JSON.stringify({
             "action": "debug",
              "text": "foo bar"})
    }
    fetch(urlh + "?" + new URLSearchParams({
        "action": "osc_set",
         "path": path,
        "val": value 
        })
        )

    console.log(value);
}
function load() {
    setui();
}

function gen_content(data) {
    for(var key in data){
        
    }
}
function setui() {
    var doc = document.getElementById("dy-content");

    jsondata = jsondata2;
    doc.innerHTML = `
        <p>name:${jsondata["name"]}</p>

        <p>id:${jsondata["id"]}</p>
    `;

    
    for(var index of jsondata["parameters"]){
        console.log(index)
        doc.innerHTML += gen_item(0, index["input"]["address"], index["input"]["address"]);
    }

    
    for(let i=0; i<10; i++){
        doc.innerHTML += gen_item(0, "path", i);
    }
}

