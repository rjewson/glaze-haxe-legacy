
package wgr.renderers.webgl;

import js.html.webgl.RenderingContext;
import wgr.geom.Point;
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
        spriteShader = new ShaderWrapper(gl, WebGLShaders.CompileProgram(gl,WebGLShaders.SPRITE_VERTEX_SHADER,WebGLShaders.SPRITE_FRAGMENT_SHADER));
        spriteBatch = new WebGLBatch(gl);
        spriteBatch.GrowBatch();
    }

    public function Resize(width:Int,height:Int) {
        projection.x = width/2;
        projection.y = height/2;
    }

    public function Render(x:Float,y:Float) {
        gl.useProgram(spriteShader.program);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aVertexPosition);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aTextureCoord);
        gl.enableVertexAttribArray(untyped spriteShader.attribute.aColor);
        gl.uniform2f(untyped spriteShader.uniform.projectionVector,projection.x,projection.y);            
        spriteBatch.Render(0,1,spriteShader);
    }

}