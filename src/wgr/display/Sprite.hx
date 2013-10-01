
package wgr.display;

import wgr.display.DisplayObjectContainer;
import wgr.geom.Point;
import wgr.texture.Texture;

class Sprite extends DisplayObjectContainer
{

    public var anchor:Point;
    public var texture:Texture;
    public var blendMode:Int;
    private var width:Float;
    private var height:Float;

    public var prev:Sprite;
    public var next:Sprite;

    public function new() {
        super();
        anchor = new Point();
    }

}