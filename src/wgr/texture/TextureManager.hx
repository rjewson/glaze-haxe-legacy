
package wgr.texture;

import haxe.ds.StringMap;
import haxe.xml.Fast;
import js.html.Image;
import js.html.webgl.RenderingContext;
import wgr.geom.Rectangle;
import wgr.texture.BaseTexture;
import utils.EventTarget;
import wgr.texture.Texture;

class TextureManager
{

    public var baseTextures:StringMap<BaseTexture>;
    public var textures:StringMap<Texture>;
    public var total:Int;
    public var gl:RenderingContext;

    public function new(gl:RenderingContext) {
        this.gl = gl;
        baseTextures = new StringMap<BaseTexture>();
        textures = new StringMap<Texture>();
    }

    public function AddTexture(id:String,image:Image):BaseTexture {
        var baseTexture = new BaseTexture(image);
        baseTexture.RegisterTexture(gl);
        baseTextures.set(id,baseTexture);
        return baseTexture;
    }

    public function AddTexturesFromConfig(textureConfig:Dynamic,assets:StringMap<Dynamic>) {   
        if (!Std.is(textureConfig, String)) 
            return;
        var source = new Fast(Xml.parse(textureConfig));
        source = source.node.textureconfig;
        for (btnode in source.nodes.basetexture) {
            var id = btnode.att.id;
            var asset = btnode.att.asset;
            var baseTextureImage = assets.get(asset);
            var baseTexture = AddTexture(id,baseTextureImage);
            for (tnode in btnode.nodes.texture) {
                var top = Std.parseInt(tnode.att.top);
                var left = Std.parseInt(tnode.att.left);
                var width = Std.parseInt(tnode.att.width);
                var height = Std.parseInt(tnode.att.height);

                textures.set(tnode.att.id,new Texture(baseTexture,new Rectangle(top,left,width,height)));
            }
        }
    }

}