
package wgr.renderers.webgl;

import js.html.Float32Array;
import js.html.Uint16Array;
import js.html.webgl.Buffer;
import js.html.webgl.Program;
import js.html.webgl.RenderingContext;
import js.html.webgl.Texture;
import wgr.display.DisplayObject;
import wgr.display.Sprite;
import wgr.display.Stage;
import wgr.geom.AABB;
import wgr.renderers.webgl.ShaderWrapper;

class WebGLBatch 
{
    public var gl:RenderingContext;

    public var size:Int;
    public var dynamicSize:Int;

    public var indexBuffer:Buffer;
    public var indices:Uint16Array;

    public var dataBuffer:Buffer;
    public var data:Float32Array;

    public var blendMode:Int;

    public function new(gl:RenderingContext) {
        this.gl = gl;
        this.size = 1;
        this.indexBuffer =  gl.createBuffer();
        this.dataBuffer =  gl.createBuffer();
        this.blendMode = 0;
        this.dynamicSize = 1;
    }

    public function Clean() {
    }

    public function GrowBatch(size:Int) {
        this.size = size;
        this.dynamicSize = size;
        
        data = new Float32Array(dynamicSize*20);
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,dataBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,data,RenderingContext.DYNAMIC_DRAW);

        indices = new Uint16Array(dynamicSize*6);

        for (i in 0...dynamicSize) {
            var index2 = i*6;
            var index3 = i*4;
            indices[index2+0] = index3 + 0;
            indices[index2+1] = index3 + 1;
            indices[index2+2] = index3 + 2;
            indices[index2+3] = index3 + 0;
            indices[index2+4] = index3 + 2;
            indices[index2+5] = index3 + 3;
        }

        gl.bindBuffer(RenderingContext.ELEMENT_ARRAY_BUFFER,indexBuffer);
        gl.bufferData(RenderingContext.ELEMENT_ARRAY_BUFFER,indices,RenderingContext.STATIC_DRAW);
    }

    public function Flush(shader:ShaderWrapper,texture:Texture,size:Int) {
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,dataBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,data,RenderingContext.STATIC_DRAW);
        gl.vertexAttribPointer(untyped shader.attribute.aVertexPosition,2,RenderingContext.FLOAT,false,20,0);
        gl.vertexAttribPointer(untyped shader.attribute.aTextureCoord,2,RenderingContext.FLOAT,false,20,8);
        gl.vertexAttribPointer(untyped shader.attribute.aColor,1,RenderingContext.FLOAT,false,20,16);        
        gl.activeTexture(RenderingContext.TEXTURE0);
        gl.bindTexture(RenderingContext.TEXTURE_2D,texture);
        gl.drawElements(RenderingContext.TRIANGLES,size*6,RenderingContext.UNSIGNED_SHORT,0);        
    }

    public inline function AddSpriteToBatch(sprite:Sprite,indexRun:Int) {
        var index = indexRun * 20;
        var frame = sprite.texture.frame;
        var tw = sprite.texture.baseTexture.width;
        var th = sprite.texture.baseTexture.height;
        
        //0
        //Verts
        data[index + 0 ] = sprite.transformedVerts[0]; 
        data[index + 1 ] = sprite.transformedVerts[1];
        //UV
        data[index + 2 ] = frame.x / tw;
        data[index + 3 ] = frame.y / th;
        //Colour
        data[index + 4 ] = sprite.worldAlpha;

        //1
        //Verts
        data[index + 5 ] = sprite.transformedVerts[2]; 
        data[index + 6 ] = sprite.transformedVerts[3]; 
        //UV
        data[index + 7 ] = (frame.x + frame.width) / tw;
        data[index + 8 ] = frame.y / th;
        //Colour
        data[index + 9 ] = sprite.worldAlpha;

        //2
        //Verts
        data[index + 10 ] = sprite.transformedVerts[4]; 
        data[index + 11 ] = sprite.transformedVerts[5]; 
        //UV
        data[index + 12] = (frame.x + frame.width) / tw;
        data[index + 13] = (frame.y + frame.height) / th; 
        //Colour
        data[index + 14] = sprite.worldAlpha;

        //3
        //Verts
        data[index + 15] =  sprite.transformedVerts[6]; 
        data[index + 16] =  sprite.transformedVerts[7];
        //UV
        data[index + 17] = frame.x / tw;
        data[index + 18] = (frame.y + frame.height) / th;
        //Colour
        data[index + 19] = sprite.worldAlpha;
    }

    //TODO Render type Change
    public function Render(shader:ShaderWrapper,stage:Stage,clip:AABB) {

        gl.useProgram(shader.program);
        
        var indexRun = 0;
        var currentTexture = null;
        
        var renderDisplayObject = function(target:DisplayObject,p:Dynamic){
            if (!target.visible) {
                //trace(target.id+" not visible");
                return false;
            }
            var sprite:Sprite = cast target;
            if (sprite.texture==null) {
                //trace(target.id+" no texture");
                return true;
            }
            if (sprite.texture.baseTexture.texture!=currentTexture || indexRun==size) {
                Flush(shader,currentTexture,indexRun);
                indexRun=0;
                currentTexture = sprite.texture.baseTexture.texture;
            }
            if (clip==null || sprite.aabb.intersect(clip)) {
                AddSpriteToBatch(sprite,indexRun);
                indexRun++;               
            }
            return true;
        }

        stage.applySlot(renderDisplayObject);

        if (indexRun>0)
            Flush(shader,currentTexture,indexRun);

    }

    public function Render1(shader:ShaderWrapper,spriteHead:Sprite,clip:AABB) {
        
        if (spriteHead==null)
            return;

        gl.useProgram(shader.program);
        //gl.bindBuffer(RenderingContext.ELEMENT_ARRAY_BUFFER,indexBuffer);

        var indexRun = 0;
        var sprite = spriteHead;
        var currentTexture = sprite.texture.baseTexture.texture;
        while (sprite!=null) {
            if (sprite.texture.baseTexture.texture!=currentTexture || indexRun==size) {
                Flush(shader,currentTexture,indexRun);
                indexRun=0;
                currentTexture = sprite.texture.baseTexture.texture;
            }
            if (clip==null || sprite.aabb.intersect(clip)) {
                AddSpriteToBatch(sprite,indexRun);
                indexRun++;               
            }
            sprite = sprite.nextSprite;
        }
        if (indexRun>0)
            Flush(shader,currentTexture,indexRun);
    }

}