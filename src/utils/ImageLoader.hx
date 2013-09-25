
package utils;

import js.html.Image;
import utils.EventTarget;

class ImageLoader extends EventTarget
{

    public var assets:Array<Image>;
    public var completeCount:Int;

    public function new() {
        super();
        assets = new Array<Image>();
    }

    public function SetImagesToLoad(urls:Array<String>) {
        completeCount = urls.length;
        for (url in urls) {
            var image = new Image();
            assets.push(image);
            image.onload = onLoad;
            image.src = url;
            if (image.complete==true) {
                onLoad(null);
            } 
        }
    }

    public function onLoad(event:Dynamic):Void {
        completeCount--;
        if (completeCount==0) {
            super.dispatchEvent({type:"loaded",count:completeCount});
            trace("+++");
        }
    }

}