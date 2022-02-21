// import fs from "fs-extra";
const fs = require('fs-extra')
// copy
fs.copy('./info.text', './my-new-info.text')
.then(()=>{
  console.log('success');
})
// 