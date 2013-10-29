
package wgr.renderers.webgl;

import js.html.Float32Array;
import js.html.webgl.Buffer;
import js.html.webgl.RenderingContext;
import js.html.webgl.Texture;
import wgr.display.Stage;
import wgr.geom.Point;
import wgr.geom.AABB;
import wgr.renderers.webgl.ShaderWrapper;

class PointSpriteRenderer implements IRenderer
{

    public var gl:RenderingContext;

    public var projection:Point;

    public var pointSpriteShader:ShaderWrapper;
    
    public var dataBuffer:Buffer;
    public var data:Float32Array;

    public var stage:Stage;
    public var texture:Texture;

    public var tileSize:Float;
    public var texTilesWide:Float;
    public var texTilesHigh:Float;
    public var invTexTilesWide:Float;
    public var invTexTilesHigh:Float;

    public var indexRun:Int;

    public function new() {
    }

    public function Init(gl:RenderingContext) {
        this.gl = gl;
        projection = new Point();
        pointSpriteShader = new ShaderWrapper(gl, WebGLShaders.CompileProgram(gl,SPRITE_VERTEX_SHADER,SPRITE_FRAGMENT_SHADER));
        dataBuffer =  gl.createBuffer();
        // ResizeBatch(2);
        // AddSpriteToBatch(0,32,32,32);
        // AddSpriteToBatch(2,64,32,32);
        // trace(data);
    }

    public function ResizeBatch(size:Int) {
        data = new Float32Array(16*size);
        ResetBatch();
    }

    public function SetSpriteSheet(texture:Texture,spriteSize:Int,spritesWide:Int,spritesHigh:Int) {
        this.texture = texture;
        tileSize = spriteSize;
        texTilesWide = spritesWide;
        texTilesHigh = spritesHigh;
        invTexTilesWide = 1/texTilesWide;
        invTexTilesHigh = 1/texTilesHigh;
    }

    public function Resize(width:Int,height:Int) {
        projection.x = width/2;
        projection.y = height/2;
    }

    public function AddStage(stage:Stage) {
        this.stage = stage;
    }

    public function ResetBatch() {
        indexRun=0;
    }

    public function AddSpriteToBatch(spriteID:Int,x:Float,y:Float,size:Float) {
        var index = indexRun * 4;
        data[index+0] = x;
        data[index+1] = y;
        data[index+2] = size;
        data[index+3] = spriteID;        
        indexRun++;
    }

    public function Render(clip:AABB) {
        gl.enable(RenderingContext.BLEND);
        gl.blendFunc(RenderingContext.SRC_ALPHA, RenderingContext.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(pointSpriteShader.program);
        gl.bindBuffer(RenderingContext.ARRAY_BUFFER,dataBuffer);
        gl.bufferData(RenderingContext.ARRAY_BUFFER,data,RenderingContext.DYNAMIC_DRAW);    

        gl.enableVertexAttribArray(untyped pointSpriteShader.attribute.position);
        gl.enableVertexAttribArray(untyped pointSpriteShader.attribute.size);
        gl.enableVertexAttribArray(untyped pointSpriteShader.attribute.tileType);

        gl.vertexAttribPointer(untyped pointSpriteShader.attribute.position, 2, RenderingContext.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(untyped pointSpriteShader.attribute.size, 1, RenderingContext.FLOAT, false, 16, 8);
        gl.vertexAttribPointer(untyped pointSpriteShader.attribute.tileType, 1, RenderingContext.FLOAT, false, 16, 12);

        gl.uniform1f(untyped pointSpriteShader.uniform.texTilesWide, texTilesWide);
        gl.uniform1f(untyped pointSpriteShader.uniform.texTilesHigh, texTilesHigh);
        gl.uniform1f(untyped pointSpriteShader.uniform.invTexTilesWide, invTexTilesWide);
        gl.uniform1f(untyped pointSpriteShader.uniform.invTexTilesHigh, invTexTilesHigh);
        gl.uniform2f(untyped pointSpriteShader.uniform.projectionVector,projection.x,projection.y);            

        gl.activeTexture(RenderingContext.TEXTURE0);
        gl.bindTexture(RenderingContext.TEXTURE_2D,texture);
        gl.drawArrays(RenderingContext.POINTS,0,indexRun);
    }

    public static var SPRITE_VERTEX_SHADER:Array<String> = [
        "uniform float texTilesWide;",
        "uniform float texTilesHigh;",
        "uniform float invTexTilesWide;",
        "uniform float invTexTilesHigh;",
        "uniform vec2 projectionVector;",
        "attribute vec2 position;",
        "attribute float size;",
        "attribute float tileType;",
        "varying vec2 vTilePos;",
        "void main() {",
            "float t = floor(tileType/texTilesWide);",
            "vTilePos = vec2(tileType-(t*texTilesWide), t);",
            "gl_PointSize = size;",
            "gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);",            
        "}",
    ];

    public static var SPRITE_FRAGMENT_SHADER:Array<String> = [
        "precision mediump float;",
        "uniform sampler2D texture;",
        "uniform float invTexTilesWide;",
        "uniform float invTexTilesHigh;",
        "varying vec2 vTilePos;",
        "void main() {",
            "vec2 uv = vec2( gl_PointCoord.x*invTexTilesWide + invTexTilesWide*vTilePos.x, gl_PointCoord.y*invTexTilesHigh + invTexTilesHigh*vTilePos.y);",
            "gl_FragColor = texture2D( texture, uv );",
        "}"
    ];

}   