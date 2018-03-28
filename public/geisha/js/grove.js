/* wiiu native objects docs:
wiiuBrowser:
.endStartUp(arg1) arg1 boolean : unknown use;
wiiuSystemSetting:
.getEShopInitialized();
*/

/* setup Grove */
var Grove = {
    Modules: {
        Client: {}
    }
};

/* constants */

Grove.constants = {
    dev: true
}

/* wood core */

Grove.log = function (content) {
    if (Grove.constants.dev) alert(content);
};

Grove.isWiiU = typeof wiiuSystemSetting !== "undefined";
/* setup Wood client */

Grove.Modules.Client.Boot = {
    endStartUp: function() {
        Grove.log("force stopped startup");
        Grove.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(false);
    },
    endStartUpWithBGM: function() {
        Grove.log("stopped startup");
        Grove.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(true);
    }
};

/* startup */
Grove.init = function () {
    Grove.Modules.Client.Boot.endStartUpWithBGM();
    Grove.log('initialized grove');
}