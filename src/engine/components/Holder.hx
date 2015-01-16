
package engine.components;

import eco.core.Component;
import engine.components.Physics;
import physics.dynamics.Arbiter;
import physics.dynamics.Body;
import physics.dynamics.Feature;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;

class Holder extends Component
{

    private var body:Body;
    private var holderSensor:Polygon;
    private var holderFeature:Feature;
    public  var hold:Bool = false;

    public var heldBody:Body;

    public function new(width:Float,height:Float,offsetX:Float,offsetY:Float) {
        holderSensor = new Polygon(Polygon.CreateRectangle(width,height),new Vector2D(offsetX,offsetY));
    }

   override public function onStarted() {
        body = owner.get(Physics).body;
        holderFeature = body.AddFeature(holderSensor,null);
        holderFeature.isSensor = true;
        holderFeature.contactCallback = onHolderContact;
        holderFeature.categoryBits = game.exile.entities.Filters.OBJECT_HOLDER_CATEGORY;
        holderFeature.maskBits = game.exile.entities.Filters.OBJECT_CATEGORY;
    }    

    private function onHolderContact(arbiter:Arbiter):Void {
        if (hold) {
            holdBody(arbiter.OpposingBody(body));
        }
    }

    public function holdBody(targetBody:Body) {
        if (heldBody!=null)
            return;
        heldBody = targetBody;
        for (feature in heldBody.features) {
            feature.isCollidable = false;
        }
        
    }

    public function releaseBody() {
        if (heldBody==null)
            return;
        for (feature in heldBody.features) {
            feature.isCollidable = true;
        }
        this.heldBody = null;
    }

    override public function update(time:Float) {
        if (heldBody!=null) {
            heldBody.SetStaticPosition(body.position);
        }
    }
    // public var hold(never, set):Bool;
    // private inline function set_terminated():Bool
    // {
    //     this.hold
    // }
}