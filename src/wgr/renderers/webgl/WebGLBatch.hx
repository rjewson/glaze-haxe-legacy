
package wgr.renderers.webgl;

import js.html.Float32Array;
import js.html.Uint16Array;
import js.html.webgl.Buffer;
import js.html.webgl.Program;
import js.html.webgl.RenderingContext;
import wgr.display.DisplayObject;
import wgr.display.Sprite;

class WebGLBatch 
{
    public var gl:RenderingContext;

    public var size:Int;
    public var dynamicSize:Int;

    public var vertexBuffer:Buffer;
    public var indexBuffer:Buffer;
    public var uvBuffer:Buffer;
    public var colorBuffer:Buffer;

    public var blendMode:Int;

    public var verticies:Float32Array;
    public var indices:Uint16Array;
    public var uvs:Float32Array;
    public var colors:Float32Array;

    public var sprite:Sprite;

    //public var spriteShader:Program;

    public function new(gl:RenderingContext) {
        this.gl = gl;
        this.size = 1;
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer =  gl.createBuffer();
        this.uvBuffer =  gl.createBuffer();
        this.colorBuffer =  gl.createBuffer();
        this.blendMode = 0;
        this.dynamicSize = 1;

        //InitSpriteShader();
        //ActivateSpriteShader();
    }

    public function Clean() {
    }

    public function GrowBatch() {
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
        var length = Std.int(indices.length/6);

        for (i in 0...length) {
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
        colors[colorIndex] = colors[colorIndex + 1] = colors[colorIndex + 2] = colors[colorIndex + 3] = 1;//TODO sprite.worldAlpha;

        indexRun ++;       

    }

    public function Update() {

        var indexRun = 0;

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

    }

    public function Render(start:Int,end:Int,program:Program) {
        Refresh();
        Update();

        gl.useProgram(program);

        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,vertexBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,verticies);
        gl.vertexAttribPointer(untyped program.vertexPositionAttribute,2,RenderingContext.FLOAT,false,0,0);

        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,uvBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,uvs);
        gl.vertexAttribPointer(untyped program.textureCoordAttribute,2,RenderingContext.FLOAT,false,0,0);
        
        gl.activeTexture(RenderingContext.TEXTURE0);
        gl.bindTexture(RenderingContext.TEXTURE_2D,sprite.texture.baseTexture.texture);
        
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,colorBuffer);
        gl.bufferSubData(RenderingContext.ARRAY_BUFFER,0,colors);
        gl.vertexAttribPointer(untyped program.colorAttribute,1,RenderingContext.FLOAT,false, 0, 0);

        gl.bindBuffer(RenderingContext.ELEMENT_ARRAY_BUFFER,indexBuffer);
        
        var len = end-start;
        gl.drawElements(RenderingContext.TRIANGLES,len*6,RenderingContext.UNSIGNED_SHORT,start*2*6);
    }

    // private function InitSpriteShader() {
    //     spriteShader = WebGLShaders.CompileProgram(gl,WebGLShaders.SPRITE_VERTEX_SHADER,WebGLShaders.SPRITE_FRAGMENT_SHADER);
    //     gl.useProgram(spriteShader);

    //     untyped spriteShader.vertexPositionAttribute = gl.getAttribLocation(spriteShader, "aVertexPosition"); 
    //     untyped spriteShader.projectionVector = gl.getUniformLocation(spriteShader, "projectionVector");
    //     untyped spriteShader.textureCoordAttribute = gl.getAttribLocation(spriteShader, "aTextureCoord");
    //     untyped spriteShader.colorAttribute = gl.getAttribLocation(spriteShader, "aColor");
    //     untyped spriteShader.samplerUniform = gl.getUniformLocation(spriteShader, "uSampler");        
    //    // shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    // }

    // private function ActivateSpriteShader() {
    //     gl.useProgram(spriteShader);
    //     untyped gl.enableVertexAttribArray(spriteShader.vertexPositionAttribute);
    //     untyped gl.enableVertexAttribArray(spriteShader.textureCoordAttribute);
    //     untyped gl.enableVertexAttribArray(spriteShader.colorAttribute);
    // }



}