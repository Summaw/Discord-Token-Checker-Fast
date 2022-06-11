const { execSync } = require('child_process');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const lineReader = require('line-reader');
const gradient = require('gradient-string');
const clc = require('cli-color');

try {
    const lineReader = require('line-reader');
    const fs = require('fs');
    const gradient = require('gradient-string');
    const clc = require('cli-color');

} catch {
    console.log('[!] Installing the requirements ..');
    execSync('npm install line-reader');
    execSync('npm install fs');
    execSync('npm install xmlhttprequest');
    execSync('npm install gradient-string');
    execSync('npm install cli-color');
    console.log('[!] Done.');
    setTimeout(close);
}


var setTitle = require('console-title');
var success = 0;
var invalid = 0;
var locked = 0;
var currentThreadNumber = 2;


function logo(){
  console.log(gradient.passion(`
╔╦╗┬┌─┐┌─┐┌─┐┬─┐┌┬┐  ╔═╗┬ ┬┬┌─┬─┐
 ║║│└─┐│  │ │├┬┘ ││  ╠╣ │ │├┴┐├┬┘
═╩╝┴└─┘└─┘└─┘┴└──┴┘  ╚  └─┘┴ ┴┴└─
    The revival is coming back
        Made By ImNotSummer`))
}


function logo1(){
console.log(gradient.passion(`
╔╦╗┬┌─┐┌─┐┌─┐┬─┐┌┬┐  ╔═╗┬ ┬┬┌─┬─┐
 ║║│└─┐│  │ │├┬┘ ││  ╠╣ │ │├┴┐├┬┘
═╩╝┴└─┘└─┘└─┘┴└──┴┘  ╚  └─┘┴ ┴┴└─
    The revival is coming back
        Made By ImNotSummer

[+] Hits = ${success}
[+] Invalids = ${invalid}
[+] Locked = ${locked}
[+] Threads = ${currentThreadNumber}`))
}

function check_token(token) {
    setTitle(`Made by WntdArt | discord.gg/theolympus | last update 5/15/22`);
    console.clear();
    logo1();
    var req = new XMLHttpRequest();
    req.open("GET", "https://discord.com/api/v9/users/@me", false);
    req.setRequestHeader("Authorization", token);
    req.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36");
    req.responseType = 'json';
    req.send(null);
    var status_code = req.status;
    console.log(req.responseText)
    //console.log(req.responseType, req.responseText)
    //console.log(JSON.parse(req.responseText))

    if (status_code === 401) {
        invalid =+1
        console.log(clc.red("Bad token:", token))
    }
    else if (status_code == 200) {
        var response = req.responseText;
        var obj = JSON.parse(response)
        console.log(obj.verified)
	      console.log(obj.bio)
        console.log(clc.green("Good token:", token))
        success =+1
        const content = '[+] Discord Fukr [+]'+'\n'+'[+] Token: '+token +"\n"+"[+] Username: "+obj.username+'#'+obj.discriminator+"\n"+"[+] Email: "+ obj.email+'\n'+"[+] Is Verified: "+obj.verified +"\n\n";
        //const content = token+"\n\n";
	fs.appendFile('Good.txt', content, err => {
            if (err) {
              console.log(clc.red("[!] Error saving good token to file."))
              check_token();
              return
            }
          })
    }
    else if (status_code == 403) {
      console.log("Locked token:", token)
      locked =+1
  }
  else {
      console.log("Unknown error with token:", token)
      invalid =+1
  }

}
lineReader.eachLine('./tokens.txt',(line,last)=>{
  check_token(line)
})
