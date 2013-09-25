
package wgr.renderers.webgl;

import js.html.webgl.Program;
import js.html.webgl.RenderingContext;
import js.html.webgl.Shader;

class WebGLShaders 
{

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
        //"uniform mat4 uMVMatrix;",
        "uniform vec2 projectionVector;",
        "varying vec2 vTextureCoord;",
        "varying float vColor;",
        "void main(void) {",
            //"gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
            "gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
            "vTextureCoord = aTextureCoord;",
            "vColor = aColor;",
        "}"
    ];

    public static function CompileVertexShader(gl:RenderingContext,shaderSrc:Array<String>):Shader {
        return CompileShader(gl,shaderSrc,RenderingContext.VERTEX_SHADER);
    }

    public static function CompileFragmentShader(gl:RenderingContext,shaderSrc:Array<String>):Shader {
        return CompileShader(gl,shaderSrc,RenderingContext.FRAGMENT_SHADER);
    }

    public static function CompileShader(gl:RenderingContext,shaderSrc:Array<String>,shaderType:Int):Shader {
        var src = shaderSrc.join("\n");
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader,src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader,RenderingContext.COMPILE_STATUS)) {
            js.Lib.alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    public static function CompileProgram(gl:RenderingContext,vertexSrc:Array<String>,fragmentSrc:Array<String>):Program {
        var vertexShader = CompileVertexShader(gl,vertexSrc);
        var fragmentShader = CompileFragmentShader(gl,fragmentSrc);
        var shaderProgram = gl.createProgram();

        gl.attachShader(shaderProgram,vertexShader);
        gl.attachShader(shaderProgram,fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram,RenderingContext.LINK_STATUS)) {
            js.Lib.alert("Could not initialize shaders");
        }
        return shaderProgram;
    }

}