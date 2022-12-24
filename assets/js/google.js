var avsc = Array.from(document.getElementsByTagName("script")).map(x=>x.src)
var need= [
    {src: "https://apis.google.com/js/api.js", onLoad: ()=>{

    }},
    {src: "https://accounts.google.com/gsi/client", onLoad: ()=>{
        readProduct()
    }}
]
need.forEach(s=>{
    if (!avsc.includes(s.src)) {
        var src=document.createElement("script")
        src.src=s.src
        src.onload=s.onLoad
        src.defer=true
        src.async=true
        document.body.appendChild(src)
    }
})

var docs = {
    doc: {
        id: "1opQsMabvYY9XBNyoX4jLiIz2VFDaVJ-6zYPruKAKNF4",
        type: "spreadsheets",
        baseurl: "https://docs.google.com",
        url: "https://docs.google.com/spreadsheets/d/1opQsMabvYY9XBNyoX4jLiIz2VFDaVJ-6zYPruKAKNF4"
    },
    data: {
        key: "AIzaSyCqdr8_RYbGV1pkfrZ81blCKD8eNWWO9GA",
        CLIENT_ID: '110546839858020135233',
        API_KEY: '755fdd29af566db9ecdf3b4988509f2733a048a4',
        SCOPES: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    }
}

let tokenClient;
let gapiInited = false;
let gisInited = false;
gapi.load("client",readProduct)
async function readProduct() {
    if (!gapi.client) {
        await gapi.client.init({
            apiKey: docs.data.API_KEY,
            discoveryDocs: docs.data.SCOPES
        })
    }
    try {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: docs.doc.id,
            range: "Prodotti",
        }).then((response) => {
            const result = response.result;
            const numRows = result.values ? result.values.length : 0;
            console.log(`${numRows} rows retrieved.`);
            if (callback) callback(response);
        });
    } catch (error) {
        console.log(error)
        return;
    }
}