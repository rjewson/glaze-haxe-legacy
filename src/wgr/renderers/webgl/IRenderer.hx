
package wgr.renderers.webgl;

import js.html.webgl.RenderingContext;

interface IRenderer 
{
    function Init(gl:RenderingContext):Void;
    function Resize(width:Int,height:Int):Void;
    function Render(x:Float,y:Float):Void;
}