
const RETRIES = 4;
let RETRYWAIT = 1500 // in ms

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCompanySizeOld(companyURL) {
    let tries = 0;
    while (tries < RETRIES) {
        try {
            const response = await fetch(companyURL);
            const text = await response.text();
            const matches = text.match("www.linkedin.com/jobs/search?.*?employeeCountRange&quot;:{&quot;start&quot;:([0-9]*),&quot;end&quot;:([0-9]*)");
            return matches.slice(1);
        }
        catch (e) {
            console.error(`[Debug] Failed to get the size of company: ${companyURL}`)
        }
        tries += 1;
        await sleep(RETRYWAIT);
        RETRYWAIT += 1000;
    }
}


async function getCompanyLink(jobURL) {
    let tries = 0;
    while (tries < RETRIES) {
        try {
            const response = await fetch(jobURL);
            const text = await response.text();
            console.log(text);
            const matches = text.matchAll("");

            for (let match of matches) {
                if (match != "https://www.linkedin.com/company/setup") {
                    return match;
                }
            }
        }
        catch (e) {
            console.error(`[Debug] Failed to get the size of company: ${companyURL}`)
        }
        tries += 1;
        await sleep(RETRYWAIT);
        RETRYWAIT += 1000;
    }
}
