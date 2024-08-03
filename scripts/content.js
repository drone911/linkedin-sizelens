console.log("[Debug] SizeLens: Running")


function jobListChangeHandler(mutationList, observer) {
    mutationList.forEach((record) => {
        record.addedNodes.forEach(async (node) => {
            if (node.href && node.classList.contains("job-card-list__title--link")) {
                const jobURL = node.href;
                const companyLink = await getCompanyLink(jobURL);
            };
        });
    })
}

function filterBySize(jobURL, companySize) {
    // TBD
}


function main() {

    const rootObserver = new MutationObserver(async (mutationList, rootObserver) => {
        const jobListContainer = document.querySelector("ul.scaffold-layout__list-container");
        if (jobListContainer) {
            rootObserver.disconnect();
            const mutationObserver = new MutationObserver(jobListChangeHandler);
            mutationObserver.observe(jobListContainer, { attributes: false, childList: true, subtree: true });
        }
    });
    rootObserver.observe(document, {
        attributes: false,
        childList: true,
        subtree: true
    })
};
main();