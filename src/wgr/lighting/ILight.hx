
package wgr.lighting;

import ds.Array2D;
import js.html.Uint8Array;

interface ILight 
{

    function renderLight(map:Array2D,opacityLookup:Uint8Array,lightMap:Array2D):Void;

}