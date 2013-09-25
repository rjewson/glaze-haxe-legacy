
package utils;

import haxe.ds.StringMap;

class EventTarget 
{

    public var listeners:StringMap<Array<Dynamic->Void>>;

    public function new() {
        listeners = new StringMap<Array<Dynamic->Void>>();
    }

    public function addEventListener(type:String,listener:Dynamic->Void) {
        if (!listeners.exists(type)) {
            listeners.set(type,new Array<Dynamic->Void>());
        }
        var listenerTypes = listeners.get(type);
        if (Lambda.indexOf(listenerTypes,listener)<0) {
            listenerTypes.push(listener);
        }
    }

    public function dispatchEvent(event:Dynamic) {
        var listenerTypes = listeners.get(event.type);
        if (listenerTypes==null) return;
        for (listener in listenerTypes) {
            listener(event);
        }
    }

    public function removeEventListener(type:String,listener:Dynamic->Void) {

    }

}