/* dev code */
window.onerror = function(error, url, line) {
    alert(error + " AT LINE: " + line); 
};

/* setup Grove */
var Grove = {
    Client: {},
    Debugging: {},
    Utils: {},
    Backend: {
        Titles: {}
    }
}

/* constants and variables*/
Grove.Constants = {
    dev: true,
    isWiiU: typeof wiiuSystemSetting !== "undefined"
}
Grove.Vars = {
    home_button_enabled: true,
    power_button_enabled: true
};

/* Utilities module */
/* contains utility functions to use multiple times */

Grove.Utils.isWiiU = function () {
    return Grove.Constants.isWiiU;
}

/* Debugging module */
/* handles all error and logging of Grove */

Grove.Debugging = {
    log: function (content, isAlert) {
        if (Grove.Constants.dev && isAlert) {
            alert(content);
        }
        console.log(content);
    },
    showError: function () {
        //empty
    }
}

/* Backend Downloading module */
/* Handles titles */

Grove.Backend.Titles = {
    registerTitleDownloadTask: function (titleId, titleVer) {
        wiiuEC.registerTitleDownloadTask(titleId, titleVer);
    },
    registerPatchTitleDownloadTask: function (titleId) {
        wiiuEC.registerPatchTitleDownloadTask(titleId);
    },
    registerAocDownloadTask: function (titleId, titleVer, jsonString) {
        return wiiuEC.registerAocDownloadTask(titleId,titleVer,jsonString /* ??? */);
        /* jsonString: 
        
        '{"indexes":[' + dl_obj[i].content_index + ']}'
        
        */
        /*
        res: {
            error: {
                code: Number
            }
        }
        */
    },
    getDownloadTaskList: function () {
        return wiiuEC.getDownloadTaskListState();
        /*
        res: {
            remainingTaskNum,
            ...
        }
        */
    },
    getTitleInfo: function (titleId, titleVer) {
        return wiiuEC.getTitleInstallInfo(titleId, titleVer);
        /*
        res: {
            storageSize,
            downloadMedia,
            installSize,
            ...
        }
        */
    },
    ticketDownload: function (ticket) {
        wiiuEC.ticketDownloadSync(ticket); /* ticketId returned from:
         ninjaBase + 'ws/' + country + '/title/' + title_id +'/aocs/!purchase?lang='+lang 
         */
    },
    needSystemUpdate: function () {
        return wiiuEC.needsSystemUpdate(); /* returns boolean */
    }
}

/* Client module */
/* Handles client interaction */

Grove.Client.UI = {
    endStartUp: function() {
        Grove.Debugging.log("Removed loading screen");
        if (Grove.Utils.isWiiU() && wiiuBrowser.endStartUp) wiiuBrowser.endStartUp(false);
    },
    endStartUpWithBGM: function() {
        Grove.Debugging.log("Removed loading screen with music");
        if (Grove.Utils.isWiiU() && wiiuBrowser.endStartUp) wiiuBrowser.endStartUp(true);
    },
    enableHomeButton: function () {
        if (Grove.Utils.isWiiU() && Grove.Vars.home_button_enabled === false) {
            wiiuBrowser.lockHomeButtonMenu(false);
            Grove.Vars.home_button_enabled = true;
        }
    },
    disableHomeButton: function () {
        if (Grove.Utils.isWiiU() && Grove.Vars.home_button_enabled === true) {
            wiiuBrowser.lockHomeButtonMenu(true);
            Grove.Vars.home_button_enabled = false;
        }
    },
    enablePowerButton: function () {
        if (Grove.Utils.isWiiU() && Grove.Vars.power_button_enabled === false) {
            wiiuBrowser.lockPowerButton(false);
            Grove.Vars.power_button_enabled = true;
        }
    },
    disablePowerButton: function () {
        if (Grove.Utils.isWiiU() && Grove.Vars.power_button_enabled === true) {
            wiiuBrowser.lockPowerButton(true);
            Grove.Vars.power_button_enabled = false;
        }
    }
}

/* Grove init */
Grove.init = function () {
    Grove.Client.UI.endStartUpWithBGM();
    Grove.Debugging.log('Pretendo Grove has been loaded.', true);
}