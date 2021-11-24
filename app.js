import express from "express";
import fetch from "node-fetch";
import path from "path";
let app = express()
let port = 3000
let __dirname = '/home/nicky/Documents/Programming/Server/Website/duits/'

app.get('/duits', (req, res) => {
    console.log('brief opgehaald');
    let brief = path.join(__dirname, 'brief-nieuw.txt')
    res.sendFile(brief)
})

app.get('/duits/:translate', async (req, res) => {
  let translated = await TranslateText(req.params.translate)
  res.send(translated + '\n')
  console.log('\n translated: ' + translated)
  console.log('original: ' + req.params.translate)
  console.log('ip: ' + req.ip + '\n');
})

async function TranslateText(input) {
    let toTranslate = input.replace(/-/g, "%20")
    let returned = await GoogleRequest('de', toTranslate)
    let output = returned[0][0][0]
    return output
}

async function GoogleRequest(lang, content) {
    const uri = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${content}`
    let result = await (await fetch(uri)).json()
    return await result
}

app.listen(port, () => {
    console.log('server on port 3000');
})
