
package wgr.renderers.webgl;

import js.html.CanvasElement;
import js.html.Event;
import js.html.webgl.ContextAttributes;
import js.html.webgl.Program;
import js.html.webgl.RenderingContext;
import wgr.display.Stage;
import wgr.geom.Point;
import wgr.renderers.webgl.IRenderer;
import wgr.renderers.webgl.ShaderWrapper;
import wgr.renderers.webgl.SpriteRenderer;
import wgr.renderers.webgl.WebGLBatch;
import wgr.renderers.webgl.WebGLShaders;

class WebGLRenderer 
{

    public var stage:Stage;
    public var view:CanvasElement;
    public var width:Int;
    public var height:Int;

    public var gl:RenderingContext;
    public var contextAttributes:ContextAttributes;

//    public var projection:Point;
    private var contextLost:Bool;

    public var renderers:Array<IRenderer>;

    public var spriteRender:SpriteRenderer;

    //public var spriteShader:ShaderWrapper;
    
    //public var spriteBatch:WebGLBatch;

    public function new(stage:Stage,view:CanvasElement,width:Int = 800,height:Int=600,transparent:Bool=false,antialias:Bool=true) {
        this.stage = stage;
        this.view = view;
        this.contextLost = false;

        contextAttributes = {};
        contextAttributes.alpha = transparent;
        contextAttributes.antialias = antialias;
        contextAttributes.premultipliedAlpha = false;
        contextAttributes.stencil = false;

        renderers = new Array<IRenderer>();

        InitalizeWebGlContext();
        //InitSpriteShader();
        //ActivateSpriteShader();
        spriteRender = new SpriteRenderer();
        spriteRender.Init(gl);
        spriteRender.Resize(width,height);
        Resize(width,height);
    }

    public function InitalizeWebGlContext() {
        view.addEventListener('webglcontextlost',onContextLost,false);
        view.addEventListener('webglcontextrestored',onContextRestored,false); 
        gl = view.getContextWebGL( contextAttributes );

        gl.disable(RenderingContext.DEPTH_TEST);
        gl.disable(RenderingContext.CULL_FACE);
        gl.enable(RenderingContext.BLEND);
        gl.colorMask(true,true,true,contextAttributes.alpha);
        gl.clearColor(0,0,0,1);
//        projection = new Point();
    }

    public function Resize(width:Int,height:Int) {
        this.width = width;
        this.height = height;
        view.width = width;
        view.height = height;
        gl.viewport(0,0,width,height);
  //      projection.x = width/2;
   //     projection.y = height/2;
    }

    public function AddRenderer(renderer:IRenderer) {
        renderer.Init(gl);
        renderer.Resize(width,height);
        renderers.push(renderer);
    }

    public function Render() {
        if (contextLost) return;

        stage.updateTransform();
        gl.viewport(0,0,width,height);
        gl.colorMask(true,true,true,contextAttributes.alpha);
        gl.bindFramebuffer(RenderingContext.FRAMEBUFFER,null);
        gl.clear(RenderingContext.COLOR_BUFFER_BIT);
        //gl.uniform2f(untyped spriteShader.uniform.projectionVector,projection.x,projection.y);            
        gl.blendFunc(RenderingContext.ONE,RenderingContext.ONE_MINUS_SRC_ALPHA);
        spriteRender.Render(0,0);
        //spriteBatch.Render(0,1,spriteShader);
    }

    private function onContextLost(event:Event) {
        contextLost = true;
        trace("webGL Context Lost");
    }

    private function onContextRestored(event:Event) {
        contextLost = false;
        trace("webGL Context Restored");
    }

    private function InitSpriteShader() {
       // spriteShader = new ShaderWrapper(gl, WebGLShaders.CompileProgram(gl,WebGLShaders.SPRITE_VERTEX_SHADER,WebGLShaders.SPRITE_FRAGMENT_SHADER));
       
       //  gl.useProgram(spriteShader);

       //  untyped spriteShader.aVertexPosition = gl.getAttribLocation(spriteShader, "aVertexPosition"); 
       //  untyped spriteShader.projectionVector = gl.getUniformLocation(spriteShader, "projectionVector");
       //  untyped spriteShader.aTextureCoord = gl.getAttribLocation(spriteShader, "aTextureCoord");
       //  untyped spriteShader.aColor = gl.getAttribLocation(spriteShader, "aColor");
       //  untyped spriteShader.uSampler = gl.getUniformLocation(spriteShader, "uSampler");        
       // // shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }

    private function ActivateSpriteShader() {
        // gl.useProgram(spriteShader.program);
        // gl.enableVertexAttribArray(untyped spriteShader.attribute.aVertexPosition);
        // gl.enableVertexAttribArray(untyped spriteShader.attribute.aTextureCoord);
        // gl.enableVertexAttribArray(untyped spriteShader.attribute.aColor);
    }

}