
package engine.components;

import physics.dynamics.Body;
import physics.geometry.GeometricShape;
import physics.geometry.Vector2D;

class Physics 
{

    public var body:Body;

    public function new(x:Float,y:Float,velocityX:Float,velocityY:Float,shapes:Array<GeometricShape>) {
        body = new Body();
        body.SetStaticPosition(new Vector2D(x,y));
        body.SetVelocity(new Vector2D(velocityX,velocityY));
        for (shape in shapes)
            body.AddFeature(shape,new physics.dynamics.Material());
    }

}