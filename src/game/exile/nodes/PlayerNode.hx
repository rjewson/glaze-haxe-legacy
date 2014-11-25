
package game.exile.nodes;

import ash.core.Node;

import engine.components.Physics;
import engine.components.Position;
import game.exile.components.Player;

class PlayerNode extends Node<PlayerNode>
{
    public var player:Player;
    public var position:Position;
    public var physics:Physics;

}