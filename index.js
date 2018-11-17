const ping = require('ping');
const fs = require('fs');

const hostName = process.argv[2];
let time = parseInt(process.argv[3]);
const now = new Date().toISOString();

const pingHost = async (host) => {
    const fileName = `log-${now}.json`;
    var stream = fs.createWriteStream(fileName, { flags: 'a' });
    setInterval(async () => {
        if (time == 0) {
            process.exit();
            stream.end();
        }
        const res = await ping.promise.probe(host, { min_reply: 1000 });
        if (res.alive) {
            const log = buildLog(res);
            stream.write(`${log},\n`);
        }
        time--;
    }, 1000);
}

const buildLog = (res) => {
    const log = {
        time: new Date(),
        output: res.output
    };
    return JSON.stringify(log);
}

pingHost(hostName);
