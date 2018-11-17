const ping = require('ping');
const fs = require('fs');

const hostName = process.argv[2];
let time = process.argv[3];

const pingHost = async (host) => {
    const fileName = "log-" + new Date().toISOString() + ".json"
    var stream = fs.createWriteStream(fileName, { flags: 'a' });
    setInterval(async () => {
        if (time == 0) {
            process.exit();
            stream.end();
        }
        const res = await ping.promise.probe(host, { min_reply: 1000 });
        if (!res.alive) {
            const log = {
                time: new Date(),
                output: res
            }
            stream.write(JSON.stringify(log) + "," + "\n");
        }
        console.log(time);
        time--;
    }, 1000);
}

pingHost(hostName);
