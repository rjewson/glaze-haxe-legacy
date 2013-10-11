
package utils;

import js.html.ArrayBuffer;
import js.html.Uint8Array;

class Base64 
{

    public static var keyStr:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    public static function Decode(input:String):ArrayBuffer {
        var len = (input.length/4)*3;

        var lkey1 = keyStr.indexOf(input.charAt(input.length-1));
        var lkey2 = keyStr.indexOf(input.charAt(input.length-2));

        if (lkey1 == 64) len--;
        if (lkey2 == 64) len--;

        var ab = new ArrayBuffer(len);
        var uarray = new Uint8Array(ab);

        var r = ~/[^A-Za-z0-9\+\/=]/g;

        input = r.replace(input,"");
        
        var i = 0, j = 0;
        while (i<len) {
            var enc1 = keyStr.indexOf(input.charAt(j++));
            var enc2 = keyStr.indexOf(input.charAt(j++));
            var enc3 = keyStr.indexOf(input.charAt(j++));
            var enc4 = keyStr.indexOf(input.charAt(j++));
            var chr1 = (enc1<<2)|(enc2>>4);
            var chr2 = ((enc2&15)<<4)|(enc3>>2);
            var chr3 = (enc3&3)<<6|enc4;
            uarray[i] = chr1;
            if (enc3!=64) uarray[i+1] = chr2;
            if (enc4!=64) uarray[i+2] = chr3;

            i+=3;
        }
        return ab;
    }

}