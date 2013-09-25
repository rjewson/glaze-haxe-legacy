
package wgr.texture;

import haxe.ds.StringMap;
import js.html.Image;
import js.html.webgl.RenderingContext;
import wgr.texture.BaseTexture;
import utils.EventTarget;

class TextureManager
{

    public var baseTextures:StringMap<BaseTexture>;
    public var total:Int;
    public var gl:RenderingContext;

    public function new(gl:RenderingContext) {
        this.gl = gl;
        baseTextures = new StringMap<BaseTexture>();
    }

    public function AddTexture(id:String,image:Image):BaseTexture {
        var baseTexture = new BaseTexture(image);
        baseTexture.RegisterTexture(gl);
        baseTextures.set(id,baseTexture);
        return baseTexture;
    }

}