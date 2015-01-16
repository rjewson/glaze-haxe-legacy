
package game.exile.components.items;

import eco.core.Component;
import engine.components.Display;
import engine.components.Physics;
import engine.components.Position;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;

class GenericBox extends Component
{
    
    public function new(startPosition:Vector2D,startVelocity:Vector2D,group:Int=0) {

    }

    override public function onAdded() {
        owner.name = "ProjectileA";
        
        var physics = new Physics(100,100,0,0,[new Polygon(Polygon.CreateRectangle(20,20),new Vector2D(0,0))]);
        physics.body.features[0].categoryBits = game.exile.entities.Filters.OBJECT_CATEGORY;
        physics.body.features[0].maskBits = game.exile.entities.Filters.OBJECT_HOLDER_CATEGORY;
        owner
            .add(new Position())
            .add(physics)
            .add(new Display("turret","turretA.png"));

    }


}