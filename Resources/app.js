// ***** View Requires *****
var Constants = require('./Constants');
var HomeMenuView = require('/views/HomeMenuView');
var DirectionView = require('/views/DirectionView');
var LoginView = require('/views/LoginView');
var TopBarView = require('/views/TopBarView');
var EnableLocationView = require('/views/EnableLocationServicesView');

// ***** Controller Requires *****
var SessionController = require('/controllers/SessionController');
var CrashDetectController = require('/controllers/CrashDetectController');
var WindowController = require('/controllers/WindowController');
var GPSLocationController = require('/controllers/GPSLocationController');

// ***** View Objects *****
var homeMenuView = new HomeMenuView();
var directionView = new DirectionView();
var loginView = new LoginView();
var topBar = new TopBarView();
var enableLocationView = new EnableLocationView();

// ***** Controller Objects *****
var sessionController = new SessionController();
var crashDetectController = new CrashDetectController();
var windowController = new WindowController();
var gpsLocationController = new GPSLocationController();

// Uncomment the next line to test Login Screen
var usedBefore = Ti.App.Properties.getBool('usedBefore');
if (Ti.Geolocation.locationServicesEnabled) {	
	gpsLocationController.initGPS();
	if (usedBefore){
		Ti.App.Properties.setBool('usedBefore', true);
		sessionController.Login();
	} else windowController.goToHomeWindow();
} else {
    windowController.goToEnableLocationWindow();
}