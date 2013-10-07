
package wgr.renderers.webgl;

import js.html.webgl.RenderingContext;
import wgr.geom.Point;
import wgr.geom.AABB;
import wgr.renderers.webgl.IRenderer;
import wgr.renderers.webgl.ShaderWrapper;

class SpriteRenderer implements IRenderer
{

    public var gl:RenderingContext;

    public var projection:Point;

    public var spriteShader:ShaderWrapper;
    
    public var spriteBatch:WebGLBatch;        

    public function new() {
    }

    public function Init(gl:RenderingContext) {
        this.gl = gl;
        projection = new Point();
        spriteShader = new ShaderWrapper(gl, WebGLShaders.CompileProgram(gl,SPRITE_VERTEX_SHADER,SPRITE_FRAGMENT_SHADER));
        spriteBatch = new WebGLBatch(gl);
        spriteBatch.GrowBatch(1000);
    }

    public function Resize(width:Int,height:Int) {
        projection.x = width/2;
        projection.y = height/2;
    }

    public function Render(clip:AABB) {
        gl.useProgram(spriteShader.program);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aVertexPosition);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aTextureCoord);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aColor);
        gl.uniform2f(untyped spriteShader.uniform.projectionVector,projection.x,projection.y);            
        spriteBatch.Render(spriteShader);
    }

    public static var SPRITE_FRAGMENT_SHADER:Array<String> = [
        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "varying float vColor;",
        "uniform sampler2D uSampler;",
        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
            "gl_FragColor = gl_FragColor * vColor;",
        "}"
    ];

    public static var SPRITE_VERTEX_SHADER:Array<String> = [
        "attribute vec2 aVertexPosition;",
        "attribute vec2 aTextureCoord;",
        "attribute float aColor;",
        "uniform vec2 projectionVector;",
        "varying vec2 vTextureCoord;",
        "varying float vColor;",
        "void main(void) {",
            "gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
            "vTextureCoord = aTextureCoord;",
            "vColor = aColor;",
        "}"
    ];

}