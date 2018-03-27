var Wood = {
    Model: {},
    Modules: {
        Client: {},
        Controller: {
            Base: {},
            Login: {}
        }
    },
    Controller: {},
    Collection: {},
    View: {
        Common: {},
        Nfc: {},
        Title: {},
        Ranking: {},
        Aoc: {
            Check: {},
            List: {}
        }
    },
    UrlPrefix: {},
    Debug: {},
    Test: {}
},
wood_client = {};
(function () {
    window.onerror = function(error, url, line) {
        alert(error)
        alert(line)
    };

    /* wiiu native objects docs:
    wiiuBrowser:
    .endStartUp(arg1) arg1 boolean : unknown use;
    wiiuSystemSetting:
    .getEShopInitialized();
    */

    /* setup Wood */
    var Wood = {
        Modules: {
            Client: {}
        }
    };

    /* constants */

    Wood.constants = {
        dev = true
    }

    /* wood core */

    Wood.log = function (content) {
        if (Wood.constants.dev) alert(content);
    };

    Wood.isWiiU = typeof wiiuSystemSetting !== "undefined";
    /* setup Wood client */

    Wood.Modules.Client.Boot = {
        endStartUp: function() {
            Wood.log("force stopped startup");
            this.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(false);
        },
        endStartUpWithBGM: function() {
            Wood.log("stopped startup");
            this.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(true);
        }
    };

    /* startup */
    Wood.init = function () {
        alert("test");
        Wood.Modules.Client.Boot.endStartUp();
    }    alert(error)
        alert(line)
    };

    /* wiiu native objects docs:
    wiiuBrowser:
    .endStartUp(arg1) arg1 boolean : unknown use;
    wiiuSystemSetting:
    .getEShopInitialized();
    */

    /* setup Wood */
    var Wood = {
        Modules: {
            Client: {}
        }
    };

    /* constants */

    Wood.constants = {
        dev = true
    }

    /* wood core */

    Wood.log = function (content) {
        if (Wood.constants.dev) alert(content);
    };

    Wood.isWiiU = typeof wiiuSystemSetting !== "undefined";
    /* setup Wood client */

    Wood.Modules.Client.Boot = {
        endStartUp: function() {
            Wood.log("force stopped startup");
            this.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(false);
        },
        endStartUpWithBGM: function() {
            Wood.log("stopped startup");
            this.isWiiU && wiiuBrowser.endStartUp && wiiuBrowser.endStartUp(true);
        }
    };

    /* startup */
    Wood.init = function () {
        alert("test");
        Wood.Modules.Client.Boot.endStartUp();
    }
})();