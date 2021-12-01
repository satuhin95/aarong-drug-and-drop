var assets_url = "images/";
 var block = {};
 var dragPosition = 48;
 var myDraggable;
 block.drag = document.getElementById('drag');
 block.adArea = document.getElementById('adArea');

 // eskimi def
 var _dsptr = function (e) {
 var track = new Image();
 // track.src = __eventUrl + e;
 }

 function ctaFunction() {
 window.open(__clickUrl);
 }

 // var eskimiCTA = __clickUrl;
 // var creative_id = __creativeId;
 // var site_id = __siteId;
 // var campaign_id = __campaignId;

 function startEvent(event_name) {
 _dsptr(event_name);
 }

 var isStarted = true;
 function startedFunction() {
 if (isStarted) {
 isStarted = false;
 startEvent("started");
 }
 }

 var isFinished = true;
 function finishedFunction() {
 if (isFinished) {
 isFinished = false;
 startEvent("finished");
 }
 }