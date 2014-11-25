
package game.exile.systems;

import ash.core.Engine;
import ash.core.NodeList;
import ash.core.System;
import engine.components.Physics;
import engine.input.DigitalInput;
import game.exile.entities.EntityFactory;
import game.exile.nodes.PlayerNode;
import physics.geometry.Vector2D;

class PlayerSystem extends System
{

    private var nodes:NodeList<PlayerNode>;

    private var input:DigitalInput;
    private var entityFactory:EntityFactory;
    private var engine:Engine;

    public function new(input:DigitalInput,entityFactory:EntityFactory) {
        this.input = input;
        this.entityFactory = entityFactory;
        super();
    }

    override public function update(time:Float):Void {
        var player = nodes.head;

        if (input.JustPressed(200)) {
            trace("fire");
            var position = player.position.position;
            var projectile = entityFactory.create("projectile",position.x,position.y);
            var physics:Physics = projectile.components.get(Physics);
            physics.body.SetMass(0.1);
            physics.body.group = 1;
            var viewPos = input.mousePosition.plus(input.mouseOffset);
            physics.body.SetVelocity(viewPos.minusEquals(position).unitEquals().multEquals(10));
            engine.addEntity(projectile);

        }
    }   

    override public function addToEngine(engine:Engine):Void {
        nodes = engine.getNodeList(PlayerNode);
        this.engine = engine;
    }

}