
package wgr.renderers.webgl;

import js.html.Float32Array;
import js.html.Uint16Array;
import js.html.webgl.Buffer;
import js.html.webgl.Program;
import js.html.webgl.RenderingContext;
import js.html.webgl.Texture;
import wgr.display.DisplayObject;
import wgr.display.Sprite;
import wgr.renderers.webgl.ShaderWrapper;

class WebGLBatch 
{
    public var gl:RenderingContext;

    public var size:Int;
    public var dynamicSize:Int;

    public var vertexBuffer:Buffer;
    public var indexBuffer:Buffer;
    public var uvBuffer:Buffer;
    public var colorBuffer:Buffer;

    public var dataBuffer:Buffer;

    public var blendMode:Int;

    public var verticies:Float32Array;
    public var indices:Uint16Array;
    public var uvs:Float32Array;
    public var colors:Float32Array;

    public var data:Float32Array;

    public var spriteHead:Sprite;

    public function new(gl:RenderingContext) {
        this.gl = gl;
        this.size = 1;
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer =  gl.createBuffer();
        this.uvBuffer =  gl.createBuffer();
        this.colorBuffer =  gl.createBuffer();
        this.dataBuffer =  gl.createBuffer();

        this.blendMode = 0;
        this.dynamicSize = 1;
    }

    public function Clean() {
    }

    public function GrowBatch(size:Int) {
        this.size = size;
        this.dynamicSize = size;
        
        verticies = new Float32Array(dynamicSize*8);
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,vertexBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,verticies,RenderingContext.DYNAMIC_DRAW);

        uvs = new Float32Array(dynamicSize*8);
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,uvBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,uvs,RenderingContext.DYNAMIC_DRAW);

        colors = new Float32Array(dynamicSize*4);
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,colorBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,colors,RenderingContext.DYNAMIC_DRAW);

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

    public function Refresh() {
        var indexRun = 0;
        var sprite = spriteHead;
        while (sprite!=null) {

            var index = indexRun * 8;
            var texture = sprite.texture.baseTexture.texture;
            
            var frame = sprite.texture.frame;
            var tw = sprite.texture.baseTexture.width;
            var th = sprite.texture.baseTexture.height;

            uvs[index + 0] = frame.x / tw;
            uvs[index +1] = frame.y / th;

            uvs[index +2] = (frame.x + frame.width) / tw;
            uvs[index +3] = frame.y / th;

            uvs[index +4] = (frame.x + frame.width) / tw;
            uvs[index +5] = (frame.y + frame.height) / th; 

            uvs[index +6] = frame.x / tw;
            uvs[index +7] = (frame.y + frame.height) / th;

            //sprite.updateFrame = false;

            var colorIndex = indexRun * 4;
            colors[colorIndex] = colors[colorIndex + 1] = colors[colorIndex + 2] = colors[colorIndex + 3] = sprite.worldAlpha;

            indexRun++;
            sprite = sprite.next;
        }

    }

    public function Update() {
        var indexRun = 0;
        var sprite = spriteHead;
        while (sprite!=null) {
            var width = sprite.texture.frame.width;
            var height = sprite.texture.frame.height;

            var aX = sprite.anchor.x;
            var aY = sprite.anchor.y;
            var w0 = width * (1-aX);
            var w1 = width * -aX;

            var h0 = height * (1-aY);
            var h1 = height * -aY;

            var index = indexRun * 8;

            var worldTransform = sprite.worldTransform;

            var a = worldTransform[0];
            var b = worldTransform[3];
            var c = worldTransform[1];
            var d = worldTransform[4];
            var tx = worldTransform[2];
            var ty = worldTransform[5];

            verticies[index + 0 ] = a * w1 + c * h1 + tx; 
            verticies[index + 1 ] = d * h1 + b * w1 + ty;

            verticies[index + 2 ] = a * w0 + c * h1 + tx; 
            verticies[index + 3 ] = d * h1 + b * w0 + ty; 

            verticies[index + 4 ] = a * w0 + c * h0 + tx; 
            verticies[index + 5 ] = d * h0 + b * w0 + ty; 

            verticies[index + 6] =  a * w1 + c * h0 + tx; 
            verticies[index + 7] =  d * h0 + b * w1 + ty;

            indexRun++;
            sprite = sprite.next;
        }
    }

    public function Flush(shader:ShaderWrapper,texture:Texture,size:Int) {
        //trace("Flush");
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,vertexBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,verticies);
        gl.vertexAttribPointer(untyped shader.attribute.aVertexPosition,2,RenderingContext.FLOAT,false,0,0);

        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,uvBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,uvs);
        gl.vertexAttribPointer(untyped shader.attribute.aTextureCoord,2,RenderingContext.FLOAT,false,0,0);
        
        gl.activeTexture(RenderingContext.TEXTURE0);
        gl.bindTexture(RenderingContext.TEXTURE_2D,texture);
        
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,colorBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,colors);
        gl.vertexAttribPointer(untyped shader.attribute.aColor,1,RenderingContext.FLOAT,false, 0, 0);
        
        gl.drawElements(RenderingContext.TRIANGLES,size*6,RenderingContext.UNSIGNED_SHORT,0);        
    }

    public inline function AddSpriteToBatch(sprite:Sprite,indexRun:Int) {
        //trace("Added "+sprite.id+" at "+indexRun);
        var index = indexRun * 8;
        var frame = sprite.texture.frame;
        var tw = sprite.texture.baseTexture.width;
        var th = sprite.texture.baseTexture.height;

        uvs[index + 0] = frame.x / tw;
        uvs[index +1] = frame.y / th;

        uvs[index +2] = (frame.x + frame.width) / tw;
        uvs[index +3] = frame.y / th;

        uvs[index +4] = (frame.x + frame.width) / tw;
        uvs[index +5] = (frame.y + frame.height) / th; 

        uvs[index +6] = frame.x / tw;
        uvs[index +7] = (frame.y + frame.height) / th;

        //sprite.updateFrame = false;

        var colorIndex = indexRun * 4;
        colors[colorIndex] = colors[colorIndex + 1] = colors[colorIndex + 2] = colors[colorIndex + 3] = sprite.worldAlpha;
        /*
        var width = sprite.texture.frame.width;
        var height = sprite.texture.frame.height;

        var aX = sprite.anchor.x;
        var aY = sprite.anchor.y;
        var w0 = width * (1-aX);
        var w1 = width * -aX;

        var h0 = height * (1-aY);
        var h1 = height * -aY;

        var worldTransform = sprite.worldTransform;

        var a = worldTransform[0];
        var b = worldTransform[3];
        var c = worldTransform[1];
        var d = worldTransform[4];
        var tx = worldTransform[2];
        var ty = worldTransform[5];

        verticies[index + 0 ] = a * w1 + c * h1 + tx; 
        verticies[index + 1 ] = d * h1 + b * w1 + ty;

        verticies[index + 2 ] = a * w0 + c * h1 + tx; 
        verticies[index + 3 ] = d * h1 + b * w0 + ty; 

        verticies[index + 4 ] = a * w0 + c * h0 + tx; 
        verticies[index + 5 ] = d * h0 + b * w0 + ty; 

        verticies[index + 6] =  a * w1 + c * h0 + tx; 
        verticies[index + 7] =  d * h0 + b * w1 + ty;
        */
        verticies[index + 0 ] = sprite.transformedVerts[0]; 
        verticies[index + 1 ] = sprite.transformedVerts[1];

        verticies[index + 2 ] = sprite.transformedVerts[2]; 
        verticies[index + 3 ] = sprite.transformedVerts[3]; 

        verticies[index + 4 ] = sprite.transformedVerts[4]; 
        verticies[index + 5 ] = sprite.transformedVerts[5]; 

        verticies[index + 6] =  sprite.transformedVerts[6]; 
        verticies[index + 7] =  sprite.transformedVerts[7];

    }

    public function Render(shader:ShaderWrapper) {
        
        if (spriteHead==null)
            return;
        gl.useProgram(shader.program);
        gl.bindBuffer(RenderingContext.ELEMENT_ARRAY_BUFFER,indexBuffer);

        var indexRun = 0;
        var sprite = spriteHead;
        var currentTexture = sprite.texture.baseTexture.texture;
        while (sprite!=null) {
            if (sprite.texture.baseTexture.texture!=currentTexture || indexRun==size) {
                Flush(shader,currentTexture,indexRun);
                indexRun=0;
                currentTexture = sprite.texture.baseTexture.texture;
            }
            AddSpriteToBatch(sprite,indexRun);
            indexRun++;
            sprite = sprite.next;
        }
        if (indexRun>0)
            Flush(shader,currentTexture,indexRun);
    }
/*
    public function Render2(shader:ShaderWrapper) {
        Refresh();
        Update();

        gl.useProgram(shader.program);

        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,vertexBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,verticies);
        gl.vertexAttribPointer(untyped shader.attribute.aVertexPosition,2,RenderingContext.FLOAT,false,0,0);

        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,uvBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,uvs);
        gl.vertexAttribPointer(untyped shader.attribute.aTextureCoord,2,RenderingContext.FLOAT,false,0,0);
        
        gl.activeTexture(RenderingContext.TEXTURE0);
        gl.bindTexture(RenderingContext.TEXTURE_2D,spriteHead.texture.baseTexture.texture);
        
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,colorBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,colors);
        gl.vertexAttribPointer(untyped shader.attribute.aColor,1,RenderingContext.FLOAT,false, 0, 0);

        gl.bindBuffer(RenderingContext.ELEMENT_ARRAY_BUFFER,indexBuffer);
        
        var len = end-start;
        gl.drawElements(RenderingContext.TRIANGLES,len*6,RenderingContext.UNSIGNED_SHORT,start*2*6);
    }
*/
}