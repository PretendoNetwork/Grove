/* dev code */
window.onerror = function(error, url, line) {
    alert(error + " AT LINE: " + line); 
};

/* setup Grove */
var Grove = {
    Client: {},
    Debugging: {},
    Utils: {}
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