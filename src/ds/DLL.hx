
package ds;

interface DLLNode<T>
{
    var prev:T;
    var next:T;
}

class DLL<T:(DLLNode<T>)>
{

    public var head:T;
    public var tail:T;

    public var length:Int;

    public function new() {
        length = 0;
    }

    //Linked List Functions
    public inline function insertAfter(node:T,newNode:T) {
        length++;
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next==null)
            tail = newNode;
        else
            node.next.prev = newNode;
        node.next = newNode;
    }

    public inline function insertBefore(node:T,newNode:T) {
        length++;
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev == null)
            head = newNode;
        else
            node.prev.next = newNode;
        node.prev = newNode;
    }

    public inline function insertBeginning(newNode:T) {
        if (head == null) {
            length++;
            head = newNode;
            tail = newNode;
            newNode.prev = null;
            newNode.next = null;
        } else  
            insertBefore(head, newNode);
     }

     public inline function insertEnd(newNode:T) {
        if (tail == null)
            insertBeginning(newNode);
        else
            insertAfter(tail, newNode);
     }

    public inline function remove(node:T):T {
        length--;
        var next = node.next;
        if (node.prev == null)
            head = node.next;
        else
            node.prev.next = node.next;
        if (node.next == null)
            tail = node.prev;
        else
            node.next.prev = node.prev;
        node.prev = node.next = null;
        return next;
    }

    //TODO Iterate,Sort

}