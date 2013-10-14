postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
    trace(oEvent.data);
};