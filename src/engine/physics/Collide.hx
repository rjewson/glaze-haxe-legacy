
package engine.physics;

import engine.components.Motion;
import engine.physics.Contact;
import geom.Vector2D;

class Collide 
{

    public static function AABBvsAABBInternal(delta:geom.Vector2D,aabbCenter:geom.Vector2D,aabbExtents:geom.Vector2D,point:geom.Vector2D,contact:Contact):Bool {

        if ( Math.abs(delta.x) > Math.abs(delta.y) ) {
            contact.normal.x = delta.x<0 ? 1 : -1;
            contact.normal.y = 0;
        } else {
            contact.normal.x = 0;
            contact.normal.y = delta.y<0 ? 1 : -1;
        }

        var resultX = contact.normal.x * aabbExtents.x;
        var resultY = contact.normal.y * aabbExtents.y;

        resultX += aabbCenter.x;
        resultY += aabbCenter.y;

        resultX = point.x - resultX;
        resultY = point.y - resultY;

        contact.point.x = point.x;
        contact.point.y = point.y;

        contact.distance = resultX * contact.normal.x + resultY * contact.normal.y;

        return true;
    }

    public static function AABBvsAABB(a:geom.AABB,aPos:Vector2D,b:geom.AABB,bPos:Vector2D,contact:Contact):Bool {
        var combinedExtents = a.extents.plus(b.extents);
        var delta = bPos.minus(aPos);
        AABBvsAABBInternal(delta, bPos, combinedExtents, aPos, contact);
        return true;
    }

    public static function CollisionResponse(contact:Contact,motion:Motion,time:Float) {
        var seperation:Float = Math.max(contact.distance,0);
        var penetration:Float = Math.min(contact.distance,0);

        var nv:Float = motion.velocity.dot(contact.normal) + seperation / time;

        motion.positionCorrection.minusEquals(contact.normal.mult(penetration/time));

        if (nv<0) {

            motion.velocity.minusEquals(contact.normal.mult(nv));
            
            if (contact.normal.y<0) {

               motion.onGround = true;

                if (true) {
                    var tangent = contact.normal.rightHandNormal();
                        
                    var tv:Float = motion.velocity.dot(tangent)*0.5;
                        
                    motion.velocity.minusEquals(tangent.mult(tv)); //.SubFrom( tangent.MulScalar( tv ) );
                }
            } 
        } 
    }

    public static function sign(v:Float) {
        return v<0 ? -1 : 1;
    }

    public static function IntersectAABBvsSegment(aabbExtends:geom.Vector2D,aabbPos:Vector2D,pos:Vector2D,delta:Vector2D,paddingX:Float,paddingY:Float):Bool {
        var scaleX = 1.0 / delta.x;
        var scaleY = 1.0 / delta.y;
        var signX = sign(scaleX);
        var signY = sign(scaleY);
        var nearTimeX = (aabbPos.x - signX * (aabbExtends.x + paddingX) - pos.x) * scaleX;
        var nearTimeY = (aabbPos.y - signY * (aabbExtends.y + paddingY) - pos.y) * scaleY;
        var farTimeX = (aabbPos.x + signX * (aabbExtends.x + paddingX) - pos.x) * scaleX;
        var farTimeY = (aabbPos.y + signY * (aabbExtends.y + paddingY) - pos.y) * scaleY;

        if (nearTimeX > farTimeY || nearTimeY > farTimeX)
            return false;

        var nearTime = (nearTimeX > nearTimeY) ? nearTimeX : nearTimeY;
        var farTime =  (farTimeX < farTimeY) ? farTimeX : farTimeY;
        
        if (nearTime >= 1 || farTime <= 0)
            return false;

        // var time = nearTime;
        // if (nearTime<0) time=0;
        // if (nearTime>1) time=1;

        // if (nearTimeX>nearTimeY) {
        //     contact.normal.setTo(-signX,0);
        // } else {
        //     contact.normal.setTo(0,-signY);
        // }
        return true;

    }


}