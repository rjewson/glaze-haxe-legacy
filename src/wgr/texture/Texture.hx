
package wgr.texture;

import js.html.webgl.RenderingContext;
import js.html.webgl.Texture;
import wgr.geom.Point;
import wgr.geom.Rectangle;
import wgr.texture.BaseTexture;

class Texture 
{
    public var baseTexture:BaseTexture;
    public var frame:Rectangle;
    public var trim:Point;
    public var noFrame:Bool;

    public function new(baseTexture:BaseTexture,frame:Rectangle) {
        noFrame = false;
        this.baseTexture = baseTexture;

        if (frame==null) {
            noFrame = true;
            this.frame = new Rectangle(0,0,1,1);
        } else {
            this.frame = frame;
        }
        this.trim = new Point();
    }

}