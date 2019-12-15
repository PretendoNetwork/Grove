
window.onerror = function(error, url, line) {
	alert(error + ' AT LINE: ' + line); 
};

var Grove = {
	_settings: {
		is_wiiu: typeof wiiuSystemSetting !== 'undefined',
		home_button_enabled: true
	},

	/**
	 * Test if the client is a WiiU
	 */
	isWiiU: function() {
		return !!Grove._settings.is_wiiu;
	},

	/**
	 * Get home button status
	 */
	homeButtonEnabled: function() {
		return !!Grove._settings.home_button_enabled;
	},

	/**
	 * Ends the eShop start up screen and enters the eShop
	 */
	endStartUp: function() {
		if (Grove.isWiiU() && wiiuBrowser.endStartUp) {
			wiiuBrowser.endStartUp(true);
		}
	},

	/**
	 * Enable the home button if disabled
	 */
	enableHomeButton: function() {
		if (Grove.isWiiU() && !Grove.homeButtonEnabled()) {
			wiiuBrowser.lockHomeButtonMenu(false);
			Grove._settings.home_button_enabled = true;
		}
	},

	/**
	 * Disable the home button if enabled
	 */
	disableHomeButton: function() {
		if (Grove.isWiiU() && Grove.homeButtonEnabled()) {
			wiiuBrowser.lockHomeButtonMenu(true);
			Grove._settings.home_button_enabled = false;
		}
	},

	/**
	 * Requests the given ticket for the console
	 * Tickets are console-specific and are denoted by a ticket ID, sometimes called a TIV
	 * This is different than a title ID
	 * @param {String} ticketID 
	 */
	requestTicket: function(ticketID) {
		wiiuEC.ticketDownloadSync(ticketID);
	},

	/**
	 * Starts the title installation process
	 * @param {String} titleID 
	 * @param {String} version 
	 */
	installTitle: function(titleID, version) {
		wiiuEC.registerTitleDownloadTask(titleID, version);
	},

	/**
	 * Starts the DLC installation process
	 * @param {String} titleID 
	 * @param {String} version 
	 */
	installAddonContent: function(titleID, version) {
		// No idea what these are for but they were needed for MK8 DLC
		var jsonString = JSON.stringify({
			indexes: [
				16,
				17,
				18,
				19,
				20,
				21,
			]
		});

		wiiuEC.registerAocDownloadTask(titleID, version, jsonString);
	},

	/**
	 * Alias for Grove.installAddonContent
	 * @param {String} titleID 
	 * @param {String} version 
	 */
	installDLC: function(titleID, version) {
		this.installAddonContent(titleID, version);
	},

	/**
	 * Starts the update installation process
	 * @param {String} titleID
	 */
	installPatch: function(titleID) {
		wiiuEC.registerPatchTitleDownloadTask(titleID);
	},

	/**
	 * Alias for Grove.installPatch
	 * @param {String} titleID
	 */
	installUpdate: function(titleID) {
		this.installPatch(titleID);
	}
};

/* Grove init */
Grove.init = function () {
	Grove.endStartUp();
};
