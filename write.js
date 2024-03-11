const fs = require('fs');

p = fs.readdirSync("assets/songs");

// const file_name = "song.json"

// WriteToFile("{\n")

// for (let i in p) {
//     key = `"${i}"`
//     value = `"${p[i]}"`

//     if (i != p.length-1) {
//         value = `${value},`
//     }

//     content = `${key}:${value}\n`
//     WriteToFile(content);
    
// }
// WriteToFile("}")

// function WriteToFile(content) {
//     fs.writeFileSync(file_name, content, { flag: 'a'});
// }


console.log(p)