
package physics.geometry;

import physics.dynamics.Feature;
import physics.geometry.Ray;
import physics.geometry.Vector2D;
import physics.geometry.Shapes;

class AABBShape extends GeometricShape {

    public var centre : Vector2D;
    public var transformedCentre : Vector2D;
    public var halfWidths : Vector2D;
    
    public function new(halfWidths:Vector2D, offsetX:Float=0,offsetY:Float=0) 
    {
        super(Shapes.AXIS_ALIGNED_BOX_SHAPE,offsetX,offsetY);
        this.halfWidths = halfWidths;
        InitShape();
    }
    
    function InitShape():Void {
        centre = offset.clone();
        transformedCentre = centre.clone();
        area = (halfWidths.x*halfWidths.y)*4;
    }
    
    public override function Update(rotation : Vector2D) : Void {
        transformedCentre.x = (centre.x * rotation.x - centre.y * rotation.y);
        //tC.x = p.x + (c.x * rot.x - c.y * rot.y);
        transformedCentre.y = (centre.x * rotation.y + centre.y * rotation.x);
        //tC.y = p.y + (c.x * rot.y + c.y * rot.x);
        aabb.l = transformedCentre.x - halfWidths.x;
        aabb.r = transformedCentre.x + halfWidths.x;
        aabb.t = transformedCentre.y - halfWidths.y;
        aabb.b = transformedCentre.y + halfWidths.y;
    }
    
    public override function ContainsPoint(point : Vector2D, shapePosition:Vector2D) : Bool {
        var x = transformedCentre.x + shapePosition.x - point.x;
        var y = transformedCentre.y + shapePosition.y - point.y;
        //TODO
        return false;
    }
    
    public override function IntersectRay(ray : Ray, feature:Feature) : Bool {
        return false;
    }
    
    public override function IntersectSegment(a:Vector2D, b:Vector2D, feature:Feature) {

    }

}