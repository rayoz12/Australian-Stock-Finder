const ASXSearchID = "ASXSearchID" 
const MarketIndexSearchID = "MarketIndexSearchID"

/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
    console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
    console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
    id: ASXSearchID,
    title: browser.i18n.getMessage("searchASX"),
    contexts: ["selection"]
}, onCreated);

browser.menus.create({
    id: MarketIndexSearchID,
    title: browser.i18n.getMessage("searchMarketIndex"),
    contexts: ["selection"]
}, onCreated);


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case ASXSearchID:
            console.log(info.selectionText);
            browser.tabs.create({
                url: "https://www2.asx.com.au/content/asx/search.html#q=" + info.selectionText
            })
            break;
        case MarketIndexSearchID:
            console.log(info.selectionText);
            browser.tabs.create({
                url: "https://www.marketindex.com.au/asx/" + info.selectionText
            })
            //window.open("https://www.marketindex.com.au/asx/" + info.selectionText);
            break;
    }
});


