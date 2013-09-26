package wgr.tilemap;

import js.html.Float32Array;
import js.html.Image;
import js.html.webgl.RenderingContext;
import js.html.webgl.Texture;
import wgr.geom.Point;

class TileLayer
{

    public var scrollScale:Point;
    public var tileTexture:Texture;
    public var inverseTextureSize:Float32Array;

    public function new()
    {
        scrollScale = new Point(1,1);
        inverseTextureSize = new Float32Array(2);
    }

    public function setTexture(gl:RenderingContext,image:Image,repeat:Bool) {
        if (tileTexture==null)
            tileTexture = gl.createTexture();
        gl.bindTexture(RenderingContext.TEXTURE_2D,tileTexture);
        gl.texImage2D(RenderingContext.TEXTURE_2D,0,RenderingContext.RGBA,RenderingContext.RGBA,RenderingContext.UNSIGNED_BYTE,image);
        gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_MAG_FILTER,RenderingContext.NEAREST);
        gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_MIN_FILTER,RenderingContext.NEAREST);
        if (repeat) {
            gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_WRAP_S,RenderingContext.REPEAT);
            gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_WRAP_T,RenderingContext.REPEAT);
        } else {
            gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_WRAP_S,RenderingContext.CLAMP_TO_EDGE);
            gl.texParameteri(RenderingContext.TEXTURE_2D,RenderingContext.TEXTURE_WRAP_T,RenderingContext.CLAMP_TO_EDGE);            
        }

        inverseTextureSize[0] = 1/image.width;
        inverseTextureSize[1] = 1/image.height;

    }

}