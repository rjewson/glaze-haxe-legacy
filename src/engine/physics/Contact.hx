
package engine.physics;

class Contact 
{

    public var normal:geom.Vector2D;
    public var distance:Float;
    public var point:geom.Vector2D;

    public function new() {
        normal = new geom.Vector2D();
        distance = .0;
        point = new geom.Vector2D();
    }

}