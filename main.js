const fs = require('fs');

fs.readFile('Network.har', (err, data) => {
    let fileJson = data.toString();
    let filterdJSON = convert(JSON.parse(fileJson));

    fs.writeFile('NetworkFinalJSON.txt', JSON.stringify(filterdJSON, null, 4), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

function convert(data) {
    let finalJson = [];
    data.log.entries.forEach(r => {
        let aaa = r.response.headers.find(a => a.name === 'x-check-cacheable');
        let obj = {
            Name: r.request.url,
            Status: r.response.status,
            Type: r._resourceType,
            Initiator: r._initiator.url,
            Size: r.response.content.size,
            "x-check-cacheable": aaa ? aaa.value : ''
        }
        finalJson.push(obj);
    });
    return finalJson
}