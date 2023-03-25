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

function insert_in_folder(content, path){
    path = path.replace(/^\//, "").split("/").slice(0, -1);
    head = document.getElementById("folders");
    for (const i of path){

        n = head.getElementsByTagName("details");
        if (n){
        n = [...n]
        n = n.filter(f => {
            if (f && f?.querySelector?("summary"): null){
                //console.log(f?.querySelector("summary").textContent, i);
                return f?.querySelector("summary")?.textContent == i;
            }
        
        
        });
    }
        console.log(n);
        if (n?.length && i){
            console.log("head set", head, n[0]);
            head = n[0];
        }
        

    }
    head.innerHTML += content;
}

function gen_folder(path) {
    path = path.replace(/^\//, "").split("/").slice(0, -1);
    console.log(path);
    //path = path.map((s, i) => path.slice(0, i + 1).join('/'))
    head = document.getElementById("folders");
    console.log("head is", head)
    for (const i of path){

        //console.log( head.getElementsByTagName("details"));
        n = head.getElementsByTagName("details");
        if (n){
        n = [...n]
        //console.log(n.length)
        n = n.filter(f => {
            if (f && f?.querySelector?("summary"): null){
                //console.log(f?.querySelector("summary").textContent, i);
                return f?.querySelector("summary")?.textContent == i;
            }
        
        
        });
    }
        console.log(n);
        if (n?.length && i){
            console.log("head set", head, n[0]);
            head = n[0];
        }
        else{
            console.log("head unset", head, n);

            head.innerHTML += folder_template(i);
            head = head.querySelectorAll("details")[0]
        }

    }
}
function folder_template(sum){
    console.log(sum, "log")
    return `<details>
    <summary>${sum}</summary>
           
           </details>
`

}
const params =  new URLSearchParams(window.location.search);

hook = params.get('hook') ?? "defult";
url = "http://" + "controlellie.ddns.net:6969"; //"https://" + params.get('url')
console.log(url, hook); //todo add custom endpoint api
urlh = url + "/" + hook ;
key = "";
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
    console.log(urlh, "a")
    fetch(urlh + "?" + new URLSearchParams({
        "action": "osc_set",
         "path": path,
        "val": value 
        }), {mode: "no-cors"}


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
        if (index?.["input"])
            gen_folder(index["input"]["address"]);
    }
    for(var index of jsondata["parameters"]){
        console.log(index)
        if (index?.["input"])
        {
            if (index["input"]["type"] == "Bool")
                insert_in_folder(gen_item(0, index["input"]["address"], index["input"]["address"].split("/").pop()), index["input"]["address"]);
            else
                insert_in_folder(index["input"]["address"].split("/").pop() + "( disabled, only bool supported atm) <br>", index["input"]["address"]);

        }
    }
    
}
    
    



