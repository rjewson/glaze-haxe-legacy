(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else if(sep == null) s.b += "null"; else s.b += "" + sep;
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,__class__: List
};
var Main = function() { };
Main.__name__ = ["Main"];
Main.main = function() {
	var exile = new game.exile.Exile();
	window.document.getElementById("stopbutton").addEventListener("click",function(event) {
		exile.gameLoop.stop();
	});
	window.document.getElementById("startbutton").addEventListener("click",function(event1) {
		exile.gameLoop.start();
	});
	window.document.getElementById("debugbutton").addEventListener("click",function(event2) {
	});
	window.document.getElementById("action1").addEventListener("click",function(event3) {
	});
	window.document.getElementById("action2").addEventListener("click",function(event4) {
	});
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n = this.x[k1];
				k1 += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k1;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
};
var ds = {};
ds.AABB = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.minX = x;
	this.minY = y;
	this.maxX = x + width;
	this.maxY = y + height;
};
ds.AABB.__name__ = ["ds","AABB"];
ds.AABB.prototype = {
	get_x: function() {
		return this.minX;
	}
	,set_x: function(value) {
		this.maxX += value - this.minX;
		return this.minX = value;
	}
	,get_y: function() {
		return this.minY;
	}
	,set_y: function(value) {
		this.maxY += value - this.minY;
		return this.minY = value;
	}
	,get_width: function() {
		return this.maxX - this.minX;
	}
	,set_width: function(value) {
		return this.maxX = this.minX + value;
	}
	,get_height: function() {
		return this.maxY - this.minY;
	}
	,set_height: function(value) {
		return this.maxY = this.minY + value;
	}
	,setTo: function(x,y,width,height) {
		if(height == null) height = 0;
		if(width == null) width = 0;
		this.minX = x;
		this.minY = y;
		this.maxX = x + width;
		this.maxY = y + height;
	}
	,inflate: function(deltaX,deltaY) {
		this.minX -= deltaX;
		this.minY -= deltaY;
		this.maxX += deltaX;
		this.maxY += deltaY;
		return this;
	}
	,getPerimeter: function() {
		return 2 * (this.maxX - this.minX + (this.maxY - this.minY));
	}
	,getArea: function() {
		return (this.maxX - this.minX) * (this.maxY - this.minY);
	}
	,getCenterX: function() {
		return this.minX + .5 * (this.maxX - this.minX);
	}
	,getCenterY: function() {
		return this.minY + .5 * (this.maxY - this.minY);
	}
	,union: function(aabb) {
		this.minX = Math.min(this.minX,aabb.minX);
		this.minY = Math.min(this.minY,aabb.minY);
		this.maxX = Math.max(this.maxX,aabb.maxX);
		this.maxY = Math.max(this.maxY,aabb.maxY);
		return this;
	}
	,asUnionOf: function(aabb1,aabb2) {
		this.minX = Math.min(aabb1.minX,aabb2.minX);
		this.minY = Math.min(aabb1.minY,aabb2.minY);
		this.maxX = Math.max(aabb1.maxX,aabb2.maxX);
		this.maxY = Math.max(aabb1.maxY,aabb2.maxY);
		return this;
	}
	,overlaps: function(aabb) {
		return !(this.minX > aabb.maxX || this.maxX < aabb.minX || this.minY > aabb.maxY || this.maxY < aabb.minY);
	}
	,contains: function(aabb) {
		return aabb.minX >= this.minX && aabb.maxX <= this.maxX && aabb.minY >= this.minY && aabb.maxY <= this.maxY;
	}
	,getIntersection: function(aabb) {
		var intersection = this.clone();
		intersection.minX = Math.max(this.minX,aabb.minX);
		intersection.maxX = Math.min(this.maxX,aabb.maxX);
		intersection.minY = Math.max(this.minY,aabb.minY);
		intersection.maxY = Math.min(this.maxY,aabb.maxY);
		if(intersection.minX > intersection.maxX || intersection.minY > intersection.maxY) return null; else return intersection;
	}
	,clone: function() {
		return new ds.AABB(this.minX,this.minY,this.maxX - this.minX,this.maxY - this.minY);
	}
	,fromAABB: function(aabb) {
		this.minX = aabb.minX;
		this.minY = aabb.minY;
		this.maxX = aabb.maxX;
		this.maxY = aabb.maxY;
		return this;
	}
	,toString: function() {
		return "[x:" + this.minX + " y:" + this.minY + " w:" + (this.maxX - this.minX) + " h:" + (this.maxY - this.minY) + "]";
	}
	,__class__: ds.AABB
};
ds.HitBehaviour = { __ename__ : true, __constructs__ : ["SKIP","INCLUDE","INCLUDE_AND_STOP","STOP"] };
ds.HitBehaviour.SKIP = ["SKIP",0];
ds.HitBehaviour.SKIP.toString = $estr;
ds.HitBehaviour.SKIP.__enum__ = ds.HitBehaviour;
ds.HitBehaviour.INCLUDE = ["INCLUDE",1];
ds.HitBehaviour.INCLUDE.toString = $estr;
ds.HitBehaviour.INCLUDE.__enum__ = ds.HitBehaviour;
ds.HitBehaviour.INCLUDE_AND_STOP = ["INCLUDE_AND_STOP",2];
ds.HitBehaviour.INCLUDE_AND_STOP.toString = $estr;
ds.HitBehaviour.INCLUDE_AND_STOP.__enum__ = ds.HitBehaviour;
ds.HitBehaviour.STOP = ["STOP",3];
ds.HitBehaviour.STOP.toString = $estr;
ds.HitBehaviour.STOP.__enum__ = ds.HitBehaviour;
ds.AABBTree = function(fattenDelta,insertStrategy,initialPoolCapacity,poolGrowthFactor) {
	if(poolGrowthFactor == null) poolGrowthFactor = 2;
	if(initialPoolCapacity == null) initialPoolCapacity = 64;
	if(fattenDelta == null) fattenDelta = 10;
	this.root = null;
	this.maxId = 0;
	this.numLeaves = 0;
	this.numNodes = 0;
	this.isValidationEnabled = false;
	this.fattenDelta = fattenDelta;
	if(insertStrategy != null) this.insertStrategy = insertStrategy; else this.insertStrategy = new ds.aabbtree.InsertStrategyPerimeter();
	this.pool = new ds.aabbtree.NodePool(initialPoolCapacity,poolGrowthFactor);
	this.unusedIds = [];
	this.nodes = [];
	this.leaves = new haxe.ds.IntMap();
};
ds.AABBTree.__name__ = ["ds","AABBTree"];
ds.AABBTree.segmentIntersect = function(p0x,p0y,p1x,p1y,q0x,q0y,q1x,q1y) {
	var intX;
	var intY;
	var a1;
	var a2;
	var b1;
	var b2;
	var c1;
	var c2;
	a1 = p1y - p0y;
	b1 = p0x - p1x;
	c1 = p1x * p0y - p0x * p1y;
	a2 = q1y - q0y;
	b2 = q0x - q1x;
	c2 = q1x * q0y - q0x * q1y;
	var denom = a1 * b2 - a2 * b1;
	if(denom == 0) return false;
	intX = (b1 * c2 - b2 * c1) / denom;
	intY = (a2 * c1 - a1 * c2) / denom;
	if(ds.AABBTree.sqr(intX - p1x) + ds.AABBTree.sqr(intY - p1y) > ds.AABBTree.sqr(p0x - p1x) + ds.AABBTree.sqr(p0y - p1y)) return false;
	if(ds.AABBTree.sqr(intX - p0x) + ds.AABBTree.sqr(intY - p0y) > ds.AABBTree.sqr(p0x - p1x) + ds.AABBTree.sqr(p0y - p1y)) return false;
	if(ds.AABBTree.sqr(intX - q1x) + ds.AABBTree.sqr(intY - q1y) > ds.AABBTree.sqr(q0x - q1x) + ds.AABBTree.sqr(q0y - q1y)) return false;
	if(ds.AABBTree.sqr(intX - q0x) + ds.AABBTree.sqr(intY - q0y) > ds.AABBTree.sqr(q0x - q1x) + ds.AABBTree.sqr(q0y - q1y)) return false;
	return true;
};
ds.AABBTree.distanceSquared = function(px,py,qx,qy) {
	return ds.AABBTree.sqr(px - qx) + ds.AABBTree.sqr(py - qy);
};
ds.AABBTree.sqr = function(x) {
	return x * x;
};
ds.AABBTree.assert = function(cond) {
	return;
};
ds.AABBTree.prototype = {
	get_numNodes: function() {
		return this.nodes.length;
	}
	,get_height: function() {
		if(this.root != null) return this.root.invHeight; else return -1;
	}
	,iterator: function() {
		return new ds.AABBTreeIterator(this);
	}
	,insertLeaf: function(data,x,y,width,height) {
		if(height == null) height = 0;
		if(width == null) width = 0;
		var leafNode = this.pool.get(x,y,width,height,data,null,this.getNextId());
		leafNode.aabb.inflate(this.fattenDelta,this.fattenDelta);
		leafNode.invHeight = 0;
		this.nodes[leafNode.id] = leafNode;
		var v = leafNode.id;
		this.leaves.set(leafNode.id,v);
		v;
		this.numLeaves++;
		if(this.root == null) {
			this.root = leafNode;
			return leafNode.id;
		}
		var leafAABB = leafNode.aabb;
		var combinedAABB = new ds.AABB();
		var left;
		var right;
		var node = this.root;
		try {
			while(!(node.left == null)) {
				var _g = this.insertStrategy.choose(leafAABB,node);
				switch(_g[1]) {
				case 0:
					throw "__break__";
					break;
				case 1:
					node = node.left;
					break;
				case 2:
					node = node.right;
					break;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		var sibling = node;
		var oldParent = sibling.parent;
		combinedAABB.asUnionOf(leafAABB,sibling.aabb);
		var newParent = this.pool.get(combinedAABB.minX,combinedAABB.minY,combinedAABB.maxX - combinedAABB.minX,combinedAABB.maxY - combinedAABB.minY,null,oldParent,this.getNextId());
		newParent.invHeight = sibling.invHeight + 1;
		this.nodes[newParent.id] = newParent;
		if(oldParent != null) {
			if(oldParent.left == sibling) oldParent.left = newParent; else oldParent.right = newParent;
		} else this.root = newParent;
		newParent.left = sibling;
		newParent.right = leafNode;
		sibling.parent = newParent;
		leafNode.parent = newParent;
		node = leafNode.parent;
		while(node != null) {
			node = this.nodes[this.balance(node.id)];
			left = node.left;
			right = node.right;
			node.invHeight = 1 + Std["int"](Math.max(left.invHeight,right.invHeight));
			node.aabb.asUnionOf(left.aabb,right.aabb);
			node = node.parent;
		}
		return leafNode.id;
	}
	,updateLeaf: function(leafId,x,y,width,height,dx,dy) {
		if(dy == null) dy = 0;
		if(dx == null) dx = 0;
		if(height == null) height = 0;
		if(width == null) width = 0;
		var leafNode = this.nodes[leafId];
		var newAABB = new ds.AABB(x,y,width,height);
		if(leafNode.aabb.contains(newAABB)) return false;
		var data = leafNode.data;
		this.removeLeaf(leafId);
		dx *= 2;
		dy *= 2;
		if(dx < 0) {
			x += dx;
			width -= dx;
		} else width += dx;
		if(dy < 0) {
			y += dy;
			height -= dy;
		} else height += dy;
		var newId = this.insertLeaf(data,x,y,width,height);
		return true;
	}
	,removeLeaf: function(leafId) {
		var leafNode = this.nodes[leafId];
		this.leaves.remove(leafId);
		if(leafNode == this.root) {
			this.disposeNode(leafId);
			this.root = null;
			return;
		}
		var parent = leafNode.parent;
		var grandParent = parent.parent;
		var sibling;
		if(parent.left == leafNode) sibling = parent.right; else sibling = parent.left;
		if(grandParent != null) {
			if(grandParent.left == parent) grandParent.left = sibling; else grandParent.right = sibling;
			sibling.parent = grandParent;
			var node = grandParent;
			while(node != null) {
				node = this.nodes[this.balance(node.id)];
				var left = node.left;
				var right = node.right;
				node.aabb.asUnionOf(left.aabb,right.aabb);
				node.invHeight = 1 + Std["int"](Math.max(left.invHeight,right.invHeight));
				node = node.parent;
			}
		} else {
			this.root = sibling;
			this.root.parent = null;
		}
		this.disposeNode(parent.id);
		this.disposeNode(leafId);
		null;
	}
	,clear: function(resetPool) {
		if(resetPool == null) resetPool = false;
		var count = this.get_numNodes();
		while(count > 0) {
			var node = this.nodes[count - 1];
			if(node != null) this.disposeNode(node.id);
			count--;
		}
		this.root = null;
		this.nodes = [];
		this.leaves = new haxe.ds.IntMap();
		this.unusedIds = [];
		this.maxId = 0;
		if(resetPool) this.pool.reset();
		ds.AABBTree.assert(this.get_numNodes() == 0);
	}
	,rebuild: function() {
		if(this.root == null) return;
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(node == null) continue;
			if(!(node.left == null)) this.disposeNode(node.id); else node.parent = null;
		}
		var leafIds;
		var _g2 = [];
		var $it0 = this.leaves.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			_g2.push(id);
		}
		leafIds = _g2;
		var aabb = new ds.AABB();
		var count = leafIds.length;
		while(count > 1) {
			var minCost = Math.POSITIVE_INFINITY;
			var iMin = -1;
			var jMin = -1;
			var _g11 = 0;
			while(_g11 < count) {
				var i = _g11++;
				var iAABB = this.nodes[leafIds[i]].aabb;
				var _g21 = i + 1;
				while(_g21 < count) {
					var j = _g21++;
					var jAABB = this.nodes[leafIds[j]].aabb;
					aabb.asUnionOf(iAABB,jAABB);
					var cost = aabb.getPerimeter();
					if(cost < minCost) {
						iMin = i;
						jMin = j;
						minCost = cost;
					}
				}
			}
			var left = this.nodes[leafIds[iMin]];
			var right = this.nodes[leafIds[jMin]];
			aabb.asUnionOf(left.aabb,right.aabb);
			var parent = this.pool.get(aabb.minX,aabb.minY,aabb.maxX - aabb.minX,aabb.maxY - aabb.minY,null,null,this.getNextId());
			parent.left = left;
			parent.right = right;
			parent.invHeight = Std["int"](1 + Math.max(left.invHeight,right.invHeight));
			this.nodes[parent.id] = parent;
			left.parent = parent;
			right.parent = parent;
			leafIds[iMin] = parent.id;
			leafIds[jMin] = leafIds[count - 1];
			count--;
		}
		this.root = this.nodes[leafIds[0]];
		null;
	}
	,getLeavesData: function(into) {
		var res;
		if(into != null) res = into; else res = [];
		var $it0 = this.leaves.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			res.push(this.nodes[id].data);
		}
		return res;
	}
	,getLeavesIds: function(into) {
		var res;
		if(into != null) res = into; else res = [];
		var $it0 = this.leaves.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			res.push(id);
		}
		return res;
	}
	,getData: function(leafId) {
		var leafNode = this.nodes[leafId];
		return leafNode.data;
	}
	,getFatAABB: function(leafId) {
		var leafNode = this.nodes[leafId];
		return leafNode.aabb.clone();
	}
	,query: function(x,y,width,height,strictMode,into,callback) {
		if(strictMode == null) strictMode = false;
		if(height == null) height = 0;
		if(width == null) width = 0;
		var res;
		if(into != null) res = into; else res = new Array();
		if(this.root == null) return res;
		var stack = [this.root];
		var queryAABB = new ds.AABB(x,y,width,height);
		var cnt = 0;
		while(stack.length > 0) {
			var node = stack.pop();
			cnt++;
			if(queryAABB.overlaps(node.aabb)) {
				if(node.left == null && (!strictMode || strictMode && queryAABB.contains(node.aabb))) {
					if(callback != null) {
						var hitBehaviour = callback(node.data,node.id);
						if(hitBehaviour == ds.HitBehaviour.INCLUDE || hitBehaviour == ds.HitBehaviour.INCLUDE_AND_STOP) res.push(node.data);
						if(hitBehaviour == ds.HitBehaviour.STOP || hitBehaviour == ds.HitBehaviour.INCLUDE_AND_STOP) break;
					} else res.push(node.data);
				} else {
					if(node.left != null) stack.push(node.left);
					if(node.right != null) stack.push(node.right);
				}
			}
		}
		return res;
	}
	,queryPoint: function(x,y,into,callback) {
		return this.query(x,y,0,0,false,into,callback);
	}
	,rayCast: function(fromX,fromY,toX,toY,into,callback) {
		var _g = this;
		var res;
		if(into != null) res = into; else res = new Array();
		if(this.root == null) return res;
		var queryAABBResultsIds = [];
		var rayAABBCallback = function(data,id) {
			var node = _g.nodes[id];
			var aabb = node.aabb;
			var fromPointAABB = new ds.AABB(fromX,fromY);
			var toPointAABB = new ds.AABB(toX,toY);
			var hit = false;
			var _g1 = 0;
			while(_g1 < 4) {
				var i = _g1++;
				switch(i) {
				case 0:
					hit = ds.AABBTree.segmentIntersect(fromX,fromY,toX,toY,aabb.minX,aabb.minY,aabb.maxX,aabb.minY);
					break;
				case 1:
					hit = ds.AABBTree.segmentIntersect(fromX,fromY,toX,toY,aabb.minX,aabb.minY,aabb.minX,aabb.maxY);
					break;
				case 2:
					hit = ds.AABBTree.segmentIntersect(fromX,fromY,toX,toY,aabb.minX,aabb.maxY,aabb.maxX,aabb.maxY);
					break;
				case 3:
					hit = ds.AABBTree.segmentIntersect(fromX,fromY,toX,toY,aabb.maxX,aabb.minY,aabb.maxX,aabb.maxY);
					break;
				default:
				}
				if(hit) break;
			}
			if(hit || !hit && aabb.contains(fromPointAABB)) queryAABBResultsIds.push(id);
			return ds.HitBehaviour.SKIP;
		};
		var tmp;
		var rayAABB = new ds.AABB(fromX,fromY,toX - fromX,toY - fromY);
		if(rayAABB.minX > rayAABB.maxX) {
			tmp = rayAABB.maxX;
			rayAABB.maxX = rayAABB.minX;
			rayAABB.minX = tmp;
		}
		if(rayAABB.minY > rayAABB.maxY) {
			tmp = rayAABB.maxY;
			rayAABB.maxY = rayAABB.minY;
			rayAABB.minY = tmp;
		}
		this.query(rayAABB.minX,rayAABB.minY,rayAABB.maxX - rayAABB.minX,rayAABB.maxY - rayAABB.minY,false,null,rayAABBCallback);
		var _g2 = 0;
		while(_g2 < queryAABBResultsIds.length) {
			var id1 = queryAABBResultsIds[_g2];
			++_g2;
			var node1 = this.nodes[id1];
			if(callback != null) {
				var hitBehaviour = callback(node1.data,node1.id);
				if(hitBehaviour == ds.HitBehaviour.INCLUDE || hitBehaviour == ds.HitBehaviour.INCLUDE_AND_STOP) res.push(node1.data);
				if(hitBehaviour == ds.HitBehaviour.STOP || hitBehaviour == ds.HitBehaviour.INCLUDE_AND_STOP) break;
			} else res.push(node1.data);
		}
		return res;
	}
	,getNextId: function() {
		var newId;
		if(this.unusedIds.length > 0 && this.unusedIds[this.unusedIds.length - 1] < this.maxId) newId = this.unusedIds.pop(); else newId = this.maxId++;
		return newId;
	}
	,disposeNode: function(id) {
		var node = this.nodes[id];
		if(node.left == null) this.numLeaves--;
		this.nodes[node.id] = null;
		this.unusedIds.push(node.id);
		this.pool.put(node);
	}
	,balance: function(nodeId) {
		var A = this.nodes[nodeId];
		if(A.left == null || A.invHeight < 2) return A.id;
		var B = A.left;
		var C = A.right;
		var balanceValue = C.invHeight - B.invHeight;
		if(balanceValue > 1) return this.rotateLeft(A,B,C);
		if(balanceValue < -1) return this.rotateRight(A,B,C);
		return A.id;
	}
	,getMaxBalance: function() {
		var maxBalance = 0;
		var _g1 = 0;
		var _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var node = this.nodes[i];
			if(node.invHeight <= 1 || node == null) continue;
			var left = node.left;
			var right = node.right;
			var balance = Math.abs(right.invHeight - left.invHeight);
			maxBalance = Std["int"](Math.max(maxBalance,balance));
		}
		return maxBalance;
	}
	,rotateLeft: function(parentNode,leftNode,rightNode) {
		var F = rightNode.left;
		var G = rightNode.right;
		rightNode.left = parentNode;
		rightNode.parent = parentNode.parent;
		parentNode.parent = rightNode;
		if(rightNode.parent != null) {
			if(rightNode.parent.left == parentNode) rightNode.parent.left = rightNode; else rightNode.parent.right = rightNode;
		} else this.root = rightNode;
		if(F.invHeight > G.invHeight) {
			rightNode.right = F;
			parentNode.right = G;
			G.parent = parentNode;
			parentNode.aabb.asUnionOf(leftNode.aabb,G.aabb);
			rightNode.aabb.asUnionOf(parentNode.aabb,F.aabb);
			parentNode.invHeight = 1 + Std["int"](Math.max(leftNode.invHeight,G.invHeight));
			rightNode.invHeight = 1 + Std["int"](Math.max(parentNode.invHeight,F.invHeight));
		} else {
			rightNode.right = G;
			parentNode.right = F;
			F.parent = parentNode;
			parentNode.aabb.asUnionOf(leftNode.aabb,F.aabb);
			rightNode.aabb.asUnionOf(parentNode.aabb,G.aabb);
			parentNode.invHeight = 1 + Std["int"](Math.max(leftNode.invHeight,F.invHeight));
			rightNode.invHeight = 1 + Std["int"](Math.max(parentNode.invHeight,G.invHeight));
		}
		return rightNode.id;
	}
	,rotateRight: function(parentNode,leftNode,rightNode) {
		var D = leftNode.left;
		var E = leftNode.right;
		leftNode.left = parentNode;
		leftNode.parent = parentNode.parent;
		parentNode.parent = leftNode;
		if(leftNode.parent != null) {
			if(leftNode.parent.left == parentNode) leftNode.parent.left = leftNode; else leftNode.parent.right = leftNode;
		} else this.root = leftNode;
		if(D.invHeight > E.invHeight) {
			leftNode.right = D;
			parentNode.left = E;
			E.parent = parentNode;
			parentNode.aabb.asUnionOf(rightNode.aabb,E.aabb);
			leftNode.aabb.asUnionOf(parentNode.aabb,D.aabb);
			parentNode.invHeight = 1 + Std["int"](Math.max(rightNode.invHeight,E.invHeight));
			leftNode.invHeight = 1 + Std["int"](Math.max(parentNode.invHeight,D.invHeight));
		} else {
			leftNode.right = E;
			parentNode.left = D;
			D.parent = parentNode;
			parentNode.aabb.asUnionOf(rightNode.aabb,D.aabb);
			leftNode.aabb.asUnionOf(parentNode.aabb,E.aabb);
			parentNode.invHeight = 1 + Std["int"](Math.max(rightNode.invHeight,D.invHeight));
			leftNode.invHeight = 1 + Std["int"](Math.max(parentNode.invHeight,E.invHeight));
		}
		return leftNode.id;
	}
	,getNode: function(id) {
		return this.nodes[id];
	}
	,validateNode: function(id) {
		var aabb = new ds.AABB();
		var root = this.nodes[id];
		var stack = [root];
		while(stack.length > 0) {
			var node = stack.pop();
			var left = node.left;
			var right = node.right;
			if(node.left == null) {
				node.invHeight = 0;
				ds.AABBTree.assert(this.leaves.get(node.id) >= 0);
				continue;
			}
			ds.AABBTree.assert(node.invHeight == 1 + Math.max(left.invHeight,right.invHeight));
			aabb.asUnionOf(left.aabb,right.aabb);
			ds.AABBTree.assert(Math.abs(node.aabb.minX - aabb.minX) < 0.000001);
			ds.AABBTree.assert(Math.abs(node.aabb.minY - aabb.minY) < 0.000001);
			ds.AABBTree.assert(Math.abs(node.aabb.maxX - aabb.maxX) < 0.000001);
			ds.AABBTree.assert(Math.abs(node.aabb.maxY - aabb.maxY) < 0.000001);
		}
	}
	,validate: function() {
		return;
	}
	,__class__: ds.AABBTree
};
ds.AABBTreeIterator = function(tree) {
	this.tree = tree;
	this.it = 0;
	this.length = tree.numLeaves;
	this.ids = tree.getLeavesIds();
};
ds.AABBTreeIterator.__name__ = ["ds","AABBTreeIterator"];
ds.AABBTreeIterator.prototype = {
	hasNext: function() {
		return this.it < this.length;
	}
	,next: function() {
		return this.tree.nodes[this.ids[this.it++]].data;
	}
	,__class__: ds.AABBTreeIterator
};
ds.Array2D = function(width,height,buffer) {
	this.w = width;
	this.h = height;
	if(buffer == null) this.buffer = new ArrayBuffer(this.w * this.h * 4); else this.buffer = buffer;
	this.data32 = new Uint32Array(this.buffer);
	this.data8 = new Uint8Array(this.buffer);
};
ds.Array2D.__name__ = ["ds","Array2D"];
ds.Array2D.prototype = {
	get: function(x,y) {
		return this.data32[y * this.w + x];
	}
	,set: function(x,y,v) {
		this.data32[y * this.w + x] = v;
	}
	,getIndex: function(x,y) {
		return y * this.w + x;
	}
	,castRay: function(p1Original,p2Original,tileSize) {
		if(tileSize == null) tileSize = 16;
		var p1 = new physics.geometry.Vector2D(p1Original.x / tileSize,p1Original.y / tileSize);
		var p2 = new physics.geometry.Vector2D(p2Original.x / tileSize,p2Original.y / tileSize);
		if((p1.x | 0) == (p2.x | 0) && (p1.y | 0) == (p2.y | 0)) return p2Original;
		var stepX;
		if(p2.x > p1.x) stepX = 1; else stepX = -1;
		var stepY;
		if(p2.y > p1.y) stepY = 1; else stepY = -1;
		var rayDirection = new physics.geometry.Vector2D(p2.x - p1.x,p2.y - p1.y);
		var ratioX = rayDirection.x / rayDirection.y;
		var ratioY = rayDirection.y / rayDirection.x;
		var deltaY = p2.x - p1.x;
		var deltaX = p2.y - p1.y;
		if(deltaX < 0) deltaX = -deltaX; else deltaX = deltaX;
		if(deltaY < 0) deltaY = -deltaY; else deltaY = deltaY;
		var testX = p1.x | 0;
		var testY = p1.y | 0;
		var maxX;
		maxX = deltaX * (stepX > 0?1.0 - p1.x % 1:p1.x % 1);
		var maxY;
		maxY = deltaY * (stepY > 0?1.0 - p1.y % 1:p1.y % 1);
		var endTileX = p2.x | 0;
		var endTileY = p2.y | 0;
		var hit;
		var collisionPoint = new physics.geometry.Vector2D();
		while(testX != endTileX || testY != endTileY) if(maxX < maxY) {
			maxX += deltaX;
			testX += stepX;
			var data = this.data32[testY * this.w + testX];
			if(data != 0) {
				collisionPoint.x = testX;
				if(stepX < 0) collisionPoint.x += 1.0;
				collisionPoint.y = p1.y + ratioY * (collisionPoint.x - p1.x);
				collisionPoint.x *= tileSize;
				collisionPoint.y *= tileSize;
				return collisionPoint;
			}
		} else {
			maxY += deltaY;
			testY += stepY;
			var data1 = this.data32[testY * this.w + testX];
			if(data1 != 0) {
				collisionPoint.y = testY;
				if(stepY < 0) collisionPoint.y += 1.0;
				collisionPoint.x = p1.x + ratioX * (collisionPoint.y - p1.y);
				collisionPoint.x *= tileSize;
				collisionPoint.y *= tileSize;
				return collisionPoint;
			}
		}
		return null;
	}
	,__class__: ds.Array2D
};
ds.DLLNode = function() { };
ds.DLLNode.__name__ = ["ds","DLLNode"];
ds.DLLNode.prototype = {
	__class__: ds.DLLNode
};
ds.DLL = function() {
	this.length = 0;
};
ds.DLL.__name__ = ["ds","DLL"];
ds.DLL.prototype = {
	insertAfter: function(node,newNode) {
		this.length++;
		newNode.prev = node;
		newNode.next = node.next;
		if(node.next == null) this.tail = newNode; else node.next.prev = newNode;
		node.next = newNode;
	}
	,insertBefore: function(node,newNode) {
		this.length++;
		newNode.prev = node.prev;
		newNode.next = node;
		if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
		node.prev = newNode;
	}
	,insertBeginning: function(newNode) {
		if(this.head == null) {
			this.length++;
			this.head = newNode;
			this.tail = newNode;
			newNode.prev = null;
			newNode.next = null;
		} else this.insertBefore(this.head,newNode);
	}
	,insertEnd: function(newNode) {
		if(this.tail == null) {
			if(this.head == null) {
				this.length++;
				this.head = newNode;
				this.tail = newNode;
				newNode.prev = null;
				newNode.next = null;
			} else this.insertBefore(this.head,newNode);
		} else this.insertAfter(this.tail,newNode);
	}
	,remove: function(node) {
		this.length--;
		var next = node.next;
		if(node.prev == null) this.head = node.next; else node.prev.next = node.next;
		if(node.next == null) this.tail = node.prev; else node.next.prev = node.prev;
		node.prev = node.next = null;
		return next;
	}
	,__class__: ds.DLL
};
ds.Grid2D = function(gridWidth,gridHeight,cellSize) {
	this.initalize(gridWidth,gridHeight,cellSize);
};
ds.Grid2D.__name__ = ["ds","Grid2D"];
ds.Grid2D.prototype = {
	initalize: function(gridWidth,gridHeight,cellSize) {
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
		this.cellSize = cellSize;
		this.invCellSize = 1 / cellSize;
		this.data = new Array();
	}
	,GetGrid: function(x,y) {
		return this.data[y * this.gridWidth + x];
	}
	,GetGridSafe: function(x,y) {
		if(x >= this.gridWidth || y >= this.gridHeight || x < 0 || y < 0) return null; else return this.data[y * this.gridWidth + x];
	}
	,SetGrid: function(x,y,value) {
		this.data[y * this.gridWidth + x] = value;
	}
	,Index: function(value) {
		return value * this.invCellSize | 0;
	}
	,Width: function() {
		return this.gridWidth * this.cellSize;
	}
	,Height: function() {
		return this.gridHeight * this.cellSize;
	}
	,__class__: ds.Grid2D
};
ds.Grid2DIterator = function() {
};
ds.Grid2DIterator.__name__ = ["ds","Grid2DIterator"];
ds.Grid2DIterator.prototype = {
	__class__: ds.Grid2DIterator
};
ds.IDManager = function() { };
ds.IDManager.__name__ = ["ds","IDManager"];
ds.IDManager.GetPersistentID = function() {
	return ds.IDManager.NEXT_PERSISTENT_ID++;
};
ds.IDManager.GetTransientID = function() {
	var id = ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER];
	ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER] = 0;
	ds.IDManager.TRANSIENT_POINTER++;
	return id;
};
ds.IDManager.ReleaseTransientID = function(id) {
	ds.IDManager.TRANSIENT_POINTER--;
	ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER] = id;
};
ds.aabbtree = {};
ds.aabbtree.IDebugRenderer = function() { };
ds.aabbtree.IDebugRenderer.__name__ = ["ds","aabbtree","IDebugRenderer"];
ds.aabbtree.IDebugRenderer.prototype = {
	__class__: ds.aabbtree.IDebugRenderer
};
ds.aabbtree.DebugRenderer = function() {
};
ds.aabbtree.DebugRenderer.__name__ = ["ds","aabbtree","DebugRenderer"];
ds.aabbtree.DebugRenderer.__interfaces__ = [ds.aabbtree.IDebugRenderer];
ds.aabbtree.DebugRenderer.prototype = {
	drawAABB: function(aabb,isLeaf,level) {
	}
	,drawNode: function(node,isLeaf,level) {
		this.drawAABB(node.aabb,node.left == null,level);
	}
	,drawTree: function(tree) {
		if(tree.root == null) return;
		var height;
		if(tree.root != null) height = tree.root.invHeight; else height = -1;
		var stack = [tree.root];
		while(stack.length > 0) {
			var node = stack.pop();
			if(!(node.left == null)) {
				stack.push(node.left);
				stack.push(node.right);
			}
			this.drawNode(node,node.left == null,height - node.invHeight);
		}
	}
	,__class__: ds.aabbtree.DebugRenderer
};
ds.aabbtree.InsertChoice = { __ename__ : true, __constructs__ : ["PARENT","DESCEND_LEFT","DESCEND_RIGHT"] };
ds.aabbtree.InsertChoice.PARENT = ["PARENT",0];
ds.aabbtree.InsertChoice.PARENT.toString = $estr;
ds.aabbtree.InsertChoice.PARENT.__enum__ = ds.aabbtree.InsertChoice;
ds.aabbtree.InsertChoice.DESCEND_LEFT = ["DESCEND_LEFT",1];
ds.aabbtree.InsertChoice.DESCEND_LEFT.toString = $estr;
ds.aabbtree.InsertChoice.DESCEND_LEFT.__enum__ = ds.aabbtree.InsertChoice;
ds.aabbtree.InsertChoice.DESCEND_RIGHT = ["DESCEND_RIGHT",2];
ds.aabbtree.InsertChoice.DESCEND_RIGHT.toString = $estr;
ds.aabbtree.InsertChoice.DESCEND_RIGHT.__enum__ = ds.aabbtree.InsertChoice;
ds.aabbtree.IInsertStrategy = function() { };
ds.aabbtree.IInsertStrategy.__name__ = ["ds","aabbtree","IInsertStrategy"];
ds.aabbtree.IInsertStrategy.prototype = {
	__class__: ds.aabbtree.IInsertStrategy
};
ds.aabbtree.InsertStrategyPerimeter = function() {
	this.combinedAABB = new ds.AABB();
};
ds.aabbtree.InsertStrategyPerimeter.__name__ = ["ds","aabbtree","InsertStrategyPerimeter"];
ds.aabbtree.InsertStrategyPerimeter.__interfaces__ = [ds.aabbtree.IInsertStrategy];
ds.aabbtree.InsertStrategyPerimeter.prototype = {
	choose: function(leafAABB,parent,extraData) {
		var left = parent.left;
		var right = parent.right;
		var perimeter = parent.aabb.getPerimeter();
		this.combinedAABB.asUnionOf(parent.aabb,leafAABB);
		var combinedPerimeter = this.combinedAABB.getPerimeter();
		var costParent = 2 * combinedPerimeter;
		var costDescend = 2 * (combinedPerimeter - perimeter);
		this.combinedAABB.asUnionOf(leafAABB,left.aabb);
		var costLeft = this.combinedAABB.getPerimeter() + costDescend;
		if(!(left.left == null)) costLeft -= left.aabb.getPerimeter();
		this.combinedAABB.asUnionOf(leafAABB,right.aabb);
		var costRight = this.combinedAABB.getPerimeter() + costDescend;
		if(!(right.left == null)) costRight -= right.aabb.getPerimeter();
		if(costParent < costLeft && costParent < costRight) return ds.aabbtree.InsertChoice.PARENT;
		if(costLeft < costRight) return ds.aabbtree.InsertChoice.DESCEND_LEFT; else return ds.aabbtree.InsertChoice.DESCEND_RIGHT;
	}
	,__class__: ds.aabbtree.InsertStrategyPerimeter
};
ds.aabbtree.Node = function(aabb,data,parent,id) {
	if(id == null) id = -1;
	this.id = -1;
	this.invHeight = -1;
	this.parent = null;
	this.right = null;
	this.left = null;
	this.aabb = aabb;
	this.data = data;
	this.parent = parent;
	this.id = id;
};
ds.aabbtree.Node.__name__ = ["ds","aabbtree","Node"];
ds.aabbtree.Node.prototype = {
	isLeaf: function() {
		return this.left == null;
	}
	,__class__: ds.aabbtree.Node
};
ds.aabbtree.NodePool = function(capacity,growthFactor) {
	if(growthFactor == null) growthFactor = 2;
	this.capacity = capacity;
	this.growthFactor = growthFactor;
	this.freeNodes = new Array();
	var _g = 0;
	while(_g < capacity) {
		var i = _g++;
		this.freeNodes.push(new ds.aabbtree.Node(new ds.AABB(),null));
	}
};
ds.aabbtree.NodePool.__name__ = ["ds","aabbtree","NodePool"];
ds.aabbtree.NodePool.prototype = {
	get: function(x,y,width,height,data,parent,id) {
		if(id == null) id = -1;
		if(height == null) height = 0;
		if(width == null) width = 0;
		var newNode;
		if(this.freeNodes.length > 0) {
			newNode = this.freeNodes.pop();
			newNode.aabb.setTo(x,y,width,height);
			newNode.data = data;
			newNode.parent = parent;
			newNode.id = id;
		} else {
			newNode = new ds.aabbtree.Node(new ds.AABB(x,y,width,height),data,parent,id);
			this.capacity = this.capacity * this.growthFactor | 0;
			this.grow(this.capacity);
		}
		return newNode;
	}
	,put: function(node) {
		this.freeNodes.push(node);
		node.parent = node.left = node.right = null;
		node.id = -1;
		node.invHeight = -1;
		node.data = null;
	}
	,reset: function() {
		if(this.freeNodes.length > this.capacity) this.freeNodes.splice(this.capacity,this.freeNodes.length - this.capacity);
	}
	,grow: function(n) {
		var len = this.freeNodes.length;
		if(n <= len) return;
		var _g = len;
		while(_g < n) {
			var i = _g++;
			this.freeNodes.push(new ds.aabbtree.Node(new ds.AABB(),null));
		}
	}
	,__class__: ds.aabbtree.NodePool
};
var eco = {};
eco.core = {};
eco.core.ClassMap = function() {
	this.map = new haxe.ds.StringMap();
};
eco.core.ClassMap.__name__ = ["eco","core","ClassMap"];
eco.core.ClassMap.prototype = {
	registerSystem: function(system) {
		var _g = 0;
		var _g1 = system.get_registeredComponents();
		while(_g < _g1.length) {
			var componentClass = _g1[_g];
			++_g;
			var className = Type.getClassName(componentClass);
			if(!this.map.exists(className)) {
				var value = new Array();
				this.map.set(className,value);
			}
			this.map.get(className).push(system);
		}
	}
	,componentAdded: function(e,c) {
		var className = Type.getClassName(c);
		var systems = this.map.get(className);
		if(systems != null) {
			var _g = 0;
			while(_g < systems.length) {
				var system = systems[_g];
				++_g;
				system.componentAdded(e,c);
			}
		}
	}
	,componentRemoved: function(e,c) {
		var className = Type.getClassName(c);
		var systems = this.map.get(className);
		if(systems != null) {
			var _g = 0;
			while(_g < systems.length) {
				var system = systems[_g];
				++_g;
				system.componentRemoved(e,c);
			}
		}
	}
	,__class__: eco.core.ClassMap
};
eco.core.Component = function() {
	this.started = false;
	this.owner = null;
};
eco.core.Component.__name__ = ["eco","core","Component"];
eco.core.Component.prototype = {
	onAdded: function() {
	}
	,onRemoved: function() {
	}
	,onStarted: function() {
	}
	,update: function(time) {
	}
	,get_name: function() {
		return null;
	}
	,__class__: eco.core.Component
};
eco.core.Engine = function() {
	this.entities = new Array();
	this.systems = new Array();
	this.systemMap = new haxe.ds.StringMap();
	this.componentSystemMap = new eco.core.ClassMap();
	this.componentAdded = new eco.signals.Signal2();
	this.componentRemoved = new eco.signals.Signal2();
	this.componentAdded.add(($_=this.componentSystemMap,$bind($_,$_.componentAdded)));
	this.componentRemoved.add(($_=this.componentSystemMap,$bind($_,$_.componentRemoved)));
	this.updating = false;
	this.componentPriorities = new haxe.ds.StringMap();
};
eco.core.Engine.__name__ = ["eco","core","Engine"];
eco.core.Engine.prototype = {
	addEntity: function(entity) {
		this.entities.push(entity);
		entity.onAdded(this);
	}
	,removeEntity: function(entity) {
		var i = HxOverrides.indexOf(this.entities,entity,0);
		if(i >= 0) {
			this.entities.splice(i,1);
			entity.onRemoved();
		}
	}
	,addSystem: function(system) {
		this.systems.push(system);
		var key = Type.getClassName(Type.getClass(system));
		this.systemMap.set(key,system);
		this.componentSystemMap.registerSystem(system);
		system.onAdded(this);
	}
	,removeSystem: function(system) {
		var i = HxOverrides.indexOf(this.systems,system,0);
		if(i >= 0) {
			this.systems.splice(i,1);
			system.onRemoved();
			var key = Type.getClassName(Type.getClass(system));
			this.systemMap.remove(key);
		}
	}
	,getSystemByClass: function(system) {
		var key = Type.getClassName(system);
		return this.systemMap.get(key);
	}
	,registerComponent: function(component,priority) {
		var registeredName = Type.getClassName(component).split(".").pop();
		this.componentPriorities.set(registeredName,priority);
	}
	,setComponentPriority: function(component) {
		if((function($this) {
			var $r;
			var key = component.get_name();
			$r = $this.componentPriorities.exists(key);
			return $r;
		}(this))) {
			var key1 = component.get_name();
			component.priority = this.componentPriorities.get(key1);
		} else component.priority = 0;
	}
	,update: function(time) {
		this.updating = true;
		var _g = 0;
		var _g1 = this.systems;
		while(_g < _g1.length) {
			var system = _g1[_g];
			++_g;
			system.update(time);
		}
		this.updating = false;
	}
	,__class__: eco.core.Engine
};
eco.core.Entity = function(name) {
	this.name = name;
	this.components = [];
	this.componentMap = { };
	this.events = new eco.signals.Signal2();
};
eco.core.Entity.__name__ = ["eco","core","Entity"];
eco.core.Entity.Create = function(components) {
	var entity = new eco.core.Entity();
	var _g = 0;
	while(_g < components.length) {
		var component = components[_g];
		++_g;
		entity.add(component);
	}
	return entity;
};
eco.core.Entity.prototype = {
	add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this.componentMap[name];
		if(prev != null) this.remove(prev);
		this.componentMap[name] = component;
		this.components.push(component);
		component.owner = this;
		component.onAdded();
		if(this.engine != null) {
			this.engine.setComponentPriority(component);
			this.engine.componentAdded.dispatch(this,Type.getClass(component));
			this.sortComponents();
		}
		return this;
	}
	,remove: function(component) {
		if(component.owner != this) return this;
		delete(this.componentMap[p.name]);
		var i = HxOverrides.indexOf(this.components,component,0);
		if(i >= 0) this.components.splice(i,1);
		return this;
	}
	,onAdded: function(engine) {
		this.engine = engine;
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			engine.setComponentPriority(component);
			engine.componentAdded.dispatch(this,Type.getClass(component));
		}
		this.sortComponents();
	}
	,onRemoved: function() {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			this.engine.componentRemoved.dispatch(this,Type.getClass(component));
		}
		this.engine = null;
	}
	,update: function(time) {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			if(!component.started) {
				component.started = true;
				component.onStarted();
			}
			component.update(time);
		}
	}
	,sortComponents: function() {
		this.components.sort(function(a,b) {
			return b.priority - a.priority;
		});
	}
	,getComponent: function(name) {
		return this.componentMap[name];
	}
	,getComponentByClass: function(component) {
		return this.componentMap[component.NAME];
	}
	,registerEvent: function(type,listener) {
	}
	,__class__: eco.core.Entity
};
eco.core.System = function() {
};
eco.core.System.__name__ = ["eco","core","System"];
eco.core.System.prototype = {
	get_registeredComponents: function() {
		return [];
	}
	,onAdded: function(engine) {
		this.engine = engine;
	}
	,onRemoved: function() {
	}
	,componentAdded: function(e,c) {
	}
	,componentRemoved: function(e,c) {
	}
	,update: function(time) {
	}
	,__class__: eco.core.System
};
eco.signals = {};
eco.signals.ListenerNode = function() {
};
eco.signals.ListenerNode.__name__ = ["eco","signals","ListenerNode"];
eco.signals.ListenerNode.prototype = {
	__class__: eco.signals.ListenerNode
};
eco.signals.ListenerNodePool = function() {
};
eco.signals.ListenerNodePool.__name__ = ["eco","signals","ListenerNodePool"];
eco.signals.ListenerNodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return new eco.signals.ListenerNode();
	}
	,dispose: function(node) {
		node.listener = null;
		node.once = false;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
		node.listener = null;
		node.previous = this.cacheTail;
		this.cacheTail = node;
	}
	,releaseCache: function() {
		while(this.cacheTail != null) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	}
	,__class__: eco.signals.ListenerNodePool
};
eco.signals.SignalBase = function() {
	this.listenerNodePool = new eco.signals.ListenerNodePool();
	this.numListeners = 0;
};
eco.signals.SignalBase.__name__ = ["eco","signals","SignalBase"];
eco.signals.SignalBase.prototype = {
	startDispatch: function() {
		this.dispatching = true;
	}
	,endDispatch: function() {
		this.dispatching = false;
		if(this.toAddHead != null) {
			if(this.head == null) {
				this.head = this.toAddHead;
				this.tail = this.toAddTail;
			} else {
				this.tail.next = this.toAddHead;
				this.toAddHead.previous = this.tail;
				this.tail = this.toAddTail;
			}
			this.toAddHead = null;
			this.toAddTail = null;
		}
		this.listenerNodePool.releaseCache();
	}
	,getNode: function(listener) {
		var node = this.head;
		while(node != null) {
			if(Reflect.compareMethods(node.listener,listener)) break;
			node = node.next;
		}
		if(node == null) {
			node = this.toAddHead;
			while(node != null) {
				if(Reflect.compareMethods(node.listener,listener)) break;
				node = node.next;
			}
		}
		return node;
	}
	,nodeExists: function(listener) {
		return this.getNode(listener) != null;
	}
	,add: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		this.addNode(node);
	}
	,addOnce: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		node.once = true;
		this.addNode(node);
	}
	,addNode: function(node) {
		if(this.dispatching) {
			if(this.toAddHead == null) this.toAddHead = this.toAddTail = node; else {
				this.toAddTail.next = node;
				node.previous = this.toAddTail;
				this.toAddTail = node;
			}
		} else if(this.head == null) this.head = this.tail = node; else {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		}
		this.numListeners++;
	}
	,remove: function(listener) {
		var node = this.getNode(listener);
		if(node != null) {
			if(this.head == node) this.head = this.head.next;
			if(this.tail == node) this.tail = this.tail.previous;
			if(this.toAddHead == node) this.toAddHead = this.toAddHead.next;
			if(this.toAddTail == node) this.toAddTail = this.toAddTail.previous;
			if(node.previous != null) node.previous.next = node.next;
			if(node.next != null) node.next.previous = node.previous;
			if(this.dispatching) this.listenerNodePool.cache(node); else this.listenerNodePool.dispose(node);
			this.numListeners--;
		}
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			this.listenerNodePool.dispose(node);
		}
		this.tail = null;
		this.toAddHead = null;
		this.toAddTail = null;
		this.numListeners = 0;
	}
	,__class__: eco.signals.SignalBase
};
eco.signals.Signal0 = function() {
	eco.signals.SignalBase.call(this);
};
eco.signals.Signal0.__name__ = ["eco","signals","Signal0"];
eco.signals.Signal0.__super__ = eco.signals.SignalBase;
eco.signals.Signal0.prototype = $extend(eco.signals.SignalBase.prototype,{
	dispatch: function() {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener();
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: eco.signals.Signal0
});
eco.signals.Signal2 = function() {
	eco.signals.SignalBase.call(this);
};
eco.signals.Signal2.__name__ = ["eco","signals","Signal2"];
eco.signals.Signal2.__super__ = eco.signals.SignalBase;
eco.signals.Signal2.prototype = $extend(eco.signals.SignalBase.prototype,{
	dispatch: function(object1,object2) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1,object2);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: eco.signals.Signal2
});
eco.systems = {};
eco.systems.EntityUpdater = function(entities) {
	eco.core.System.call(this);
	this.entities = entities;
};
eco.systems.EntityUpdater.__name__ = ["eco","systems","EntityUpdater"];
eco.systems.EntityUpdater.__super__ = eco.core.System;
eco.systems.EntityUpdater.prototype = $extend(eco.core.System.prototype,{
	update: function(time) {
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			entity.update(time);
		}
	}
	,__class__: eco.systems.EntityUpdater
});
var engine = {};
engine.GameLoop = function() {
	this.isRunning = false;
};
engine.GameLoop.__name__ = ["engine","GameLoop"];
engine.GameLoop.prototype = {
	update: function(timestamp) {
		this.delta = timestamp - this.prevAnimationTime;
		this.prevAnimationTime = timestamp;
		if(this.updateFunc != null) this.updateFunc(this.delta);
		this.rafID = window.requestAnimationFrame($bind(this,this.update));
		return false;
	}
	,start: function() {
		if(this.isRunning == true) return;
		this.isRunning = true;
		this.prevAnimationTime = this.animationStartTimestamp = window.performance.now();
		this.rafID = window.requestAnimationFrame($bind(this,this.update));
	}
	,stop: function() {
		if(this.isRunning == false) return;
		this.isRunning = false;
		window.cancelAnimationFrame(this.rafID);
	}
	,__class__: engine.GameLoop
};
engine.action = {};
engine.action.Action = function() {
	this.lanes = 0;
	this.duration = 0;
	this.elapsed = 0;
	this.finished = false;
	this.started = false;
	this.blocking = false;
};
engine.action.Action.__name__ = ["engine","action","Action"];
engine.action.Action.__interfaces__ = [ds.DLLNode];
engine.action.Action.prototype = {
	update: function(time) {
		this.elapsed += time;
	}
	,onStart: function() {
		this.started = true;
	}
	,onEnd: function() {
	}
	,onAdded: function() {
	}
	,insertInFrontOfMe: function(action) {
		if(this.list == null) return;
		this.list.insertBefter(this,action);
	}
	,getRootOwner: function() {
		var _list = this.list;
		while(true) {
			if(_list.list == null) break;
			_list = _list.list;
		}
		return _list.owner;
	}
	,__class__: engine.action.Action
};
engine.action.ActionList = function() {
	engine.action.Action.call(this);
	this.actions = new ds.DLL();
};
engine.action.ActionList.__name__ = ["engine","action","ActionList"];
engine.action.ActionList.__super__ = engine.action.Action;
engine.action.ActionList.prototype = $extend(engine.action.Action.prototype,{
	update: function(time) {
		var action = this.actions.head;
		while(action != null) {
			if(!action.started) action.onStart();
			action.update(time);
			if(action.blocking) break;
			if(action.finished) {
				action.onEnd();
				this.actions.remove(action);
			}
			action = action.next;
		}
	}
	,insertAfter: function(action,newAction) {
		action.list = this;
		this.actions.insertAfter(action,newAction);
	}
	,insertBefter: function(action,newAction) {
		action.list = this;
		this.actions.insertBefore(action,newAction);
	}
	,insertBegining: function(newAction) {
		newAction.list = this;
		this.actions.insertBeginning(newAction);
	}
	,insertEnd: function(newAction) {
		newAction.list = this;
		this.actions.insertEnd(newAction);
	}
	,remove: function(action) {
		action.list = null;
		this.actions.remove(action);
	}
	,__class__: engine.action.ActionList
});
engine.action.Delay = function(delay) {
	engine.action.Action.call(this);
	this.delay = delay;
	this.blocking = true;
};
engine.action.Delay.__name__ = ["engine","action","Delay"];
engine.action.Delay.__super__ = engine.action.Action;
engine.action.Delay.prototype = $extend(engine.action.Action.prototype,{
	update: function(time) {
		this.elapsed += time;
		if(this.elapsed > this.delay) {
			this.blocking = false;
			this.finished = true;
		}
	}
	,__class__: engine.action.Delay
});
engine.action.GetVisibleEntities = function(range) {
	engine.action.Action.call(this);
	this.range = range;
};
engine.action.GetVisibleEntities.__name__ = ["engine","action","GetVisibleEntities"];
engine.action.GetVisibleEntities.__super__ = engine.action.Action;
engine.action.GetVisibleEntities.prototype = $extend(engine.action.Action.prototype,{
	onStart: function() {
		engine.action.Action.prototype.onStart.call(this);
		var owner = this.getRootOwner();
		var physicsSystem = owner.engine.getSystemByClass(engine.systems.PhysicsSystem);
		this.physicsEngine = physicsSystem.physicsEngine;
		this.physics = owner.componentMap[engine.components.Physics.NAME];
	}
	,update: function(time) {
		this.physicsEngine.Search(this.physics.body.position,this.range);
		this.physicsEngine.actionResultCollection.RemoveBody(this.physics.body);
		if(this.physicsEngine.actionResultCollection.resultCount > 0) console.log(this.physicsEngine.actionResultCollection);
	}
	,__class__: engine.action.GetVisibleEntities
});
engine.action.Trace = function() {
	engine.action.Action.call(this);
};
engine.action.Trace.__name__ = ["engine","action","Trace"];
engine.action.Trace.__super__ = engine.action.Action;
engine.action.Trace.prototype = $extend(engine.action.Action.prototype,{
	update: function(time) {
		this.insertInFrontOfMe(new engine.action.Delay(2000));
	}
	,__class__: engine.action.Trace
});
engine.ai = {};
engine.ai.behaviors = {};
engine.ai.behaviors.Behavior = function() {
	this.status = engine.ai.behaviors.BehaviorStatus.Invalid;
};
engine.ai.behaviors.Behavior.__name__ = ["engine","ai","behaviors","Behavior"];
engine.ai.behaviors.Behavior.prototype = {
	initialize: function(context) {
	}
	,terminate: function(status) {
	}
	,update: function(context) {
		return this.status;
	}
	,get_terminated: function() {
		return this.status == engine.ai.behaviors.BehaviorStatus.Success || this.status == engine.ai.behaviors.BehaviorStatus.Failure;
	}
	,get_running: function() {
		return this.status == engine.ai.behaviors.BehaviorStatus.Running;
	}
	,reset: function() {
		this.status = engine.ai.behaviors.BehaviorStatus.Invalid;
	}
	,abort: function() {
		this.terminate(engine.ai.behaviors.BehaviorStatus.Aborted);
		this.status = engine.ai.behaviors.BehaviorStatus.Aborted;
	}
	,tick: function(context) {
		if(this.status != engine.ai.behaviors.BehaviorStatus.Running) this.initialize(context);
		this.status = this.update(context);
		if(this.status != engine.ai.behaviors.BehaviorStatus.Running) this.terminate(this.status);
		return this.status;
	}
	,__class__: engine.ai.behaviors.Behavior
};
engine.ai.behaviors.Action = function(action) {
	engine.ai.behaviors.Behavior.call(this);
	this.action = action;
};
engine.ai.behaviors.Action.__name__ = ["engine","ai","behaviors","Action"];
engine.ai.behaviors.Action.__super__ = engine.ai.behaviors.Behavior;
engine.ai.behaviors.Action.prototype = $extend(engine.ai.behaviors.Behavior.prototype,{
	update: function(context) {
		var f = Reflect.field(context,this.action);
		if(Reflect.isFunction(f)) {
			var result = f.apply(context,[]);
			if(js.Boot.__instanceof(result,engine.ai.behaviors.BehaviorStatus)) return result;
		}
		return engine.ai.behaviors.BehaviorStatus.Failure;
	}
	,__class__: engine.ai.behaviors.Action
});
engine.ai.behaviors.Composite = function() {
	engine.ai.behaviors.Behavior.call(this);
	this.children = new List();
};
engine.ai.behaviors.Composite.__name__ = ["engine","ai","behaviors","Composite"];
engine.ai.behaviors.Composite.__super__ = engine.ai.behaviors.Behavior;
engine.ai.behaviors.Composite.prototype = $extend(engine.ai.behaviors.Behavior.prototype,{
	addChild: function(child) {
		this.children.add(child);
	}
	,removeChild: function(child) {
		this.children.remove(child);
	}
	,removeAll: function() {
		this.children.clear();
	}
	,__class__: engine.ai.behaviors.Composite
});
engine.ai.behaviors.Selector = function() {
	engine.ai.behaviors.Composite.call(this);
};
engine.ai.behaviors.Selector.__name__ = ["engine","ai","behaviors","Selector"];
engine.ai.behaviors.Selector.__super__ = engine.ai.behaviors.Composite;
engine.ai.behaviors.Selector.prototype = $extend(engine.ai.behaviors.Composite.prototype,{
	initialize: function(context) {
		this._current = this.children.iterator();
		this._currentBehavior = this._current.next();
	}
	,update: function(context) {
		while(this._currentBehavior != null) {
			var status = this._currentBehavior.tick(context);
			if(status != engine.ai.behaviors.BehaviorStatus.Failure) return status;
			if(this._current.hasNext()) this._currentBehavior = this._current.next(); else break;
		}
		return engine.ai.behaviors.BehaviorStatus.Failure;
	}
	,__class__: engine.ai.behaviors.Selector
});
engine.ai.behaviors.ActiveSelector = function() {
	engine.ai.behaviors.Selector.call(this);
};
engine.ai.behaviors.ActiveSelector.__name__ = ["engine","ai","behaviors","ActiveSelector"];
engine.ai.behaviors.ActiveSelector.__super__ = engine.ai.behaviors.Selector;
engine.ai.behaviors.ActiveSelector.prototype = $extend(engine.ai.behaviors.Selector.prototype,{
	initialize: function(context) {
		this._current = this.children.iterator();
		while(this._current.hasNext()) this._currentBehavior = this._current.next();
	}
	,update: function(context) {
		var previousBehavior = this._currentBehavior;
		engine.ai.behaviors.Selector.prototype.initialize.call(this,context);
		var result = engine.ai.behaviors.Selector.prototype.update.call(this,context);
		if(this._currentBehavior != previousBehavior) previousBehavior.terminate(engine.ai.behaviors.BehaviorStatus.Aborted);
		return result;
	}
	,__class__: engine.ai.behaviors.ActiveSelector
});
engine.ai.behaviors.BehaviorContext = function(entity) {
	this.entity = entity;
	this.time = 0;
};
engine.ai.behaviors.BehaviorContext.__name__ = ["engine","ai","behaviors","BehaviorContext"];
engine.ai.behaviors.BehaviorContext.prototype = {
	__class__: engine.ai.behaviors.BehaviorContext
};
engine.ai.behaviors.BehaviorStatus = { __ename__ : true, __constructs__ : ["Invalid","Success","Running","Failure","Aborted"] };
engine.ai.behaviors.BehaviorStatus.Invalid = ["Invalid",0];
engine.ai.behaviors.BehaviorStatus.Invalid.toString = $estr;
engine.ai.behaviors.BehaviorStatus.Invalid.__enum__ = engine.ai.behaviors.BehaviorStatus;
engine.ai.behaviors.BehaviorStatus.Success = ["Success",1];
engine.ai.behaviors.BehaviorStatus.Success.toString = $estr;
engine.ai.behaviors.BehaviorStatus.Success.__enum__ = engine.ai.behaviors.BehaviorStatus;
engine.ai.behaviors.BehaviorStatus.Running = ["Running",2];
engine.ai.behaviors.BehaviorStatus.Running.toString = $estr;
engine.ai.behaviors.BehaviorStatus.Running.__enum__ = engine.ai.behaviors.BehaviorStatus;
engine.ai.behaviors.BehaviorStatus.Failure = ["Failure",3];
engine.ai.behaviors.BehaviorStatus.Failure.toString = $estr;
engine.ai.behaviors.BehaviorStatus.Failure.__enum__ = engine.ai.behaviors.BehaviorStatus;
engine.ai.behaviors.BehaviorStatus.Aborted = ["Aborted",4];
engine.ai.behaviors.BehaviorStatus.Aborted.toString = $estr;
engine.ai.behaviors.BehaviorStatus.Aborted.__enum__ = engine.ai.behaviors.BehaviorStatus;
engine.ai.behaviors.BehaviorTree = function() { };
engine.ai.behaviors.BehaviorTree.__name__ = ["engine","ai","behaviors","BehaviorTree"];
engine.ai.behaviors.BehaviorTree.fromXml = function(xmlData) {
	var xml = Xml.parse(xmlData);
	var selector = new engine.ai.behaviors.Selector();
	if(xml != null) {
		xml = xml.firstElement();
		engine.ai.behaviors.BehaviorTree.compositeFromXml(xml,selector);
	}
	return selector;
};
engine.ai.behaviors.BehaviorTree.compositeFromXml = function(xml,composite) {
	var $it0 = xml.elements();
	while( $it0.hasNext() ) {
		var element = $it0.next();
		composite.addChild(engine.ai.behaviors.BehaviorTree.behaviorFromXml(element));
	}
};
engine.ai.behaviors.BehaviorTree.behaviorFromXml = function(xml) {
	var _g = xml.get_nodeName();
	switch(_g) {
	case "action":
		return new engine.ai.behaviors.Action(xml.firstChild().get_nodeValue());
	case "sequence":
		var sequence = new engine.ai.behaviors.Sequence();
		engine.ai.behaviors.BehaviorTree.compositeFromXml(xml,sequence);
		return sequence;
	case "parallel":
		var success;
		if(xml.exists("success")) success = engine.ai.behaviors.BehaviorTree.policyFromString(xml.get("success")); else success = engine.ai.behaviors.Policy.RequireOne;
		var failure;
		if(xml.exists("failure")) failure = engine.ai.behaviors.BehaviorTree.policyFromString(xml.get("failure")); else failure = engine.ai.behaviors.Policy.RequireOne;
		var parallel = new engine.ai.behaviors.Parallel(success,failure);
		engine.ai.behaviors.BehaviorTree.compositeFromXml(xml,parallel);
		return parallel;
	case "repeat":
		var behavior = engine.ai.behaviors.BehaviorTree.behaviorFromXml(xml.firstElement());
		var count;
		if(xml.exists("count")) count = Std.parseInt(xml.get("count")); else count = 1;
		var repeat = new engine.ai.behaviors.Repeat(behavior,count);
		return repeat;
	case "active":
		var active = new engine.ai.behaviors.ActiveSelector();
		engine.ai.behaviors.BehaviorTree.compositeFromXml(xml,active);
		return active;
	case "selector":
		var selector = new engine.ai.behaviors.Selector();
		engine.ai.behaviors.BehaviorTree.compositeFromXml(xml,selector);
		return selector;
	default:
		throw "Unrecognized behavior type : " + xml.get_nodeName();
	}
};
engine.ai.behaviors.BehaviorTree.policyFromString = function(policy) {
	switch(policy) {
	case "one":
		return engine.ai.behaviors.Policy.RequireOne;
	case "all":
		return engine.ai.behaviors.Policy.RequireAll;
	default:
		throw "Invalid policy, expected `one` or `all`.";
	}
};
engine.ai.behaviors.Decorator = function(child) {
	engine.ai.behaviors.Behavior.call(this);
	this.child = child;
};
engine.ai.behaviors.Decorator.__name__ = ["engine","ai","behaviors","Decorator"];
engine.ai.behaviors.Decorator.__super__ = engine.ai.behaviors.Behavior;
engine.ai.behaviors.Decorator.prototype = $extend(engine.ai.behaviors.Behavior.prototype,{
	__class__: engine.ai.behaviors.Decorator
});
engine.ai.behaviors.Policy = { __ename__ : true, __constructs__ : ["RequireOne","RequireAll"] };
engine.ai.behaviors.Policy.RequireOne = ["RequireOne",0];
engine.ai.behaviors.Policy.RequireOne.toString = $estr;
engine.ai.behaviors.Policy.RequireOne.__enum__ = engine.ai.behaviors.Policy;
engine.ai.behaviors.Policy.RequireAll = ["RequireAll",1];
engine.ai.behaviors.Policy.RequireAll.toString = $estr;
engine.ai.behaviors.Policy.RequireAll.__enum__ = engine.ai.behaviors.Policy;
engine.ai.behaviors.Parallel = function(success,failure) {
	engine.ai.behaviors.Composite.call(this);
	this._successPolicy = success;
	this._failurePolicy = failure;
};
engine.ai.behaviors.Parallel.__name__ = ["engine","ai","behaviors","Parallel"];
engine.ai.behaviors.Parallel.__super__ = engine.ai.behaviors.Composite;
engine.ai.behaviors.Parallel.prototype = $extend(engine.ai.behaviors.Composite.prototype,{
	update: function(context) {
		var successCount = 0;
		var failureCount = 0;
		var $it0 = this.children.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(!(child.status == engine.ai.behaviors.BehaviorStatus.Success || child.status == engine.ai.behaviors.BehaviorStatus.Failure)) child.tick(context);
			var _g = child.status;
			switch(_g[1]) {
			case 1:
				successCount += 1;
				if(this._successPolicy == engine.ai.behaviors.Policy.RequireOne) return engine.ai.behaviors.BehaviorStatus.Success;
				break;
			case 3:
				failureCount += 1;
				if(this._failurePolicy == engine.ai.behaviors.Policy.RequireOne) return engine.ai.behaviors.BehaviorStatus.Failure;
				break;
			default:
			}
		}
		if(this._failurePolicy == engine.ai.behaviors.Policy.RequireAll && failureCount == this.children.length) return engine.ai.behaviors.BehaviorStatus.Failure;
		if(this._successPolicy == engine.ai.behaviors.Policy.RequireAll && successCount == this.children.length) return engine.ai.behaviors.BehaviorStatus.Success;
		return engine.ai.behaviors.BehaviorStatus.Running;
	}
	,terminate: function(status) {
		var $it0 = this.children.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(child.status == engine.ai.behaviors.BehaviorStatus.Running) child.abort();
		}
	}
	,__class__: engine.ai.behaviors.Parallel
});
engine.ai.behaviors.Repeat = function(child,count) {
	if(count == null) count = 0;
	this._counter = 0;
	this.count = 0;
	engine.ai.behaviors.Decorator.call(this,child);
	this.count = count;
};
engine.ai.behaviors.Repeat.__name__ = ["engine","ai","behaviors","Repeat"];
engine.ai.behaviors.Repeat.__super__ = engine.ai.behaviors.Decorator;
engine.ai.behaviors.Repeat.prototype = $extend(engine.ai.behaviors.Decorator.prototype,{
	initialize: function(context) {
		this._counter = 0;
	}
	,update: function(context) {
		try {
			while(true) {
				var _g = this.child.tick(context);
				switch(_g[1]) {
				case 2:
					throw "__break__";
					break;
				case 3:
					return engine.ai.behaviors.BehaviorStatus.Failure;
				default:
					if(++this._counter == this.count) return engine.ai.behaviors.BehaviorStatus.Success;
				}
				this.child.reset();
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return engine.ai.behaviors.BehaviorStatus.Invalid;
	}
	,__class__: engine.ai.behaviors.Repeat
});
engine.ai.behaviors.Sequence = function() {
	engine.ai.behaviors.Composite.call(this);
};
engine.ai.behaviors.Sequence.__name__ = ["engine","ai","behaviors","Sequence"];
engine.ai.behaviors.Sequence.__super__ = engine.ai.behaviors.Composite;
engine.ai.behaviors.Sequence.prototype = $extend(engine.ai.behaviors.Composite.prototype,{
	initialize: function(context) {
		this._current = this.children.iterator();
		this._currentBehavior = this._current.next();
	}
	,update: function(context) {
		while(this._currentBehavior != null) {
			var status = this._currentBehavior.tick(context);
			if(status != engine.ai.behaviors.BehaviorStatus.Success) return status;
			if(this._current.hasNext()) this._currentBehavior = this._current.next(); else break;
		}
		return engine.ai.behaviors.BehaviorStatus.Success;
	}
	,__class__: engine.ai.behaviors.Sequence
});
engine.ai.behaviors.actions = {};
engine.ai.behaviors.actions.Delay = function(delay) {
	engine.ai.behaviors.Behavior.call(this);
	this.delay = delay;
};
engine.ai.behaviors.actions.Delay.__name__ = ["engine","ai","behaviors","actions","Delay"];
engine.ai.behaviors.actions.Delay.__super__ = engine.ai.behaviors.Behavior;
engine.ai.behaviors.actions.Delay.prototype = $extend(engine.ai.behaviors.Behavior.prototype,{
	initialize: function(context) {
		console.log("initalize");
		this.elapsed = 0;
	}
	,terminate: function(status) {
		console.log("terminate:" + Std.string(status));
	}
	,update: function(context) {
		this.elapsed += context.time;
		if(this.elapsed > this.delay) return engine.ai.behaviors.BehaviorStatus.Success;
		return engine.ai.behaviors.BehaviorStatus.Running;
	}
	,__class__: engine.ai.behaviors.actions.Delay
});
engine.ai.behaviors.actions.GetLocalEntities = function(range) {
	engine.ai.behaviors.Behavior.call(this);
	this.range = range;
};
engine.ai.behaviors.actions.GetLocalEntities.__name__ = ["engine","ai","behaviors","actions","GetLocalEntities"];
engine.ai.behaviors.actions.GetLocalEntities.__super__ = engine.ai.behaviors.Behavior;
engine.ai.behaviors.actions.GetLocalEntities.prototype = $extend(engine.ai.behaviors.Behavior.prototype,{
	initialize: function(context) {
		var physicsSystem = context.entity.engine.getSystemByClass(engine.systems.PhysicsSystem);
		this.physicsEngine = physicsSystem.physicsEngine;
	}
	,update: function(context) {
		console.log(this.physicsEngine.step);
		return engine.ai.behaviors.BehaviorStatus.Success;
	}
	,__class__: engine.ai.behaviors.actions.GetLocalEntities
});
engine.ai.steering = {};
engine.ai.steering.SteeringBehavior = function(a_agent,a_calculationMethod) {
	if(a_calculationMethod == null) a_calculationMethod = 2;
	this.calculateMethod = a_calculationMethod;
	this.agent = a_agent;
	this.force = new physics.geometry.Vector2D();
	this.behaviors = new Array();
};
engine.ai.steering.SteeringBehavior.__name__ = ["engine","ai","steering","SteeringBehavior"];
engine.ai.steering.SteeringBehavior.prototype = {
	addBehavior: function(behavior) {
		this.behaviors.push(behavior);
		behavior.agent = this.agent;
		behavior.steering = this;
		this.hasChanged = true;
	}
	,removeBehaviour: function(behavior) {
		var i = 0;
		var _g = 0;
		var _g1 = this.behaviors;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(item == behavior) {
				this.behaviors.splice(i,1);
				return;
			}
			i++;
		}
	}
	,calculate: function() {
		if(this.hasChanged) {
			this.sort();
			this.hasChanged = false;
		}
		this.force.x = 0;
		this.force.y = 0;
		var _g = this.calculateMethod;
		switch(_g) {
		case 0:
			this.runningSum();
			break;
		case 1:
			this.prioritizedDithering();
			break;
		case 2:
			this.wtrsWithPriorization();
			break;
		}
		return this.force;
	}
	,prioritizedDithering: function() {
		var _g = 0;
		var _g1 = this.behaviors;
		while(_g < _g1.length) {
			var behavior = _g1[_g];
			++_g;
			if(Math.random() < behavior.probability) this.force.plusEquals(behavior.calculate().mult(behavior.weight));
			if(!this.force.equalsZero()) {
				this.force.clampMax(this.agent.maxAcceleration);
				return;
			}
		}
	}
	,wtrsWithPriorization: function() {
		var _g = 0;
		var _g1 = this.behaviors;
		while(_g < _g1.length) {
			var behavior = _g1[_g];
			++_g;
			if(!this.accumulateForce(this.force,behavior.calculate().mult(behavior.weight))) return;
		}
	}
	,runningSum: function() {
		var _g = 0;
		var _g1 = this.behaviors;
		while(_g < _g1.length) {
			var behavior = _g1[_g];
			++_g;
			this.force.plusEquals(behavior.calculate().mult(behavior.weight));
		}
		this.force.clampMax(this.agent.maxAcceleration);
	}
	,accumulateForce: function(a_runningTotal,a_forceToAdd) {
		var magnitudeSoFar = Math.sqrt(a_runningTotal.x * a_runningTotal.x + a_runningTotal.y * a_runningTotal.y);
		var magnitudeRemaining = this.agent.maxAcceleration - magnitudeSoFar;
		if(magnitudeRemaining <= 0) return false;
		var magnitudeToAdd = Math.sqrt(a_forceToAdd.x * a_forceToAdd.x + a_forceToAdd.y * a_forceToAdd.y);
		if(magnitudeToAdd < magnitudeRemaining) {
			a_runningTotal.x += a_forceToAdd.x;
			a_runningTotal.y += a_forceToAdd.y;
			return true;
		} else {
			a_runningTotal.plusEquals(a_forceToAdd.unit().multEquals(magnitudeRemaining));
			return false;
		}
	}
	,sort: function() {
		this.behaviors.sort($bind(this,this.behaviorsCompare));
	}
	,behaviorsCompare: function(a,b) {
		if(a.priority < b.priority) return -1;
		if(a.priority == b.priority) return 0;
		return 1;
	}
	,__class__: engine.ai.steering.SteeringBehavior
};
engine.ai.steering.SteeringSettings = function() { };
engine.ai.steering.SteeringSettings.__name__ = ["engine","ai","steering","SteeringSettings"];
engine.ai.steering.behaviours = {};
engine.ai.steering.behaviours.Behavior = function(a_weight,a_priority,a_probability) {
	if(a_probability == null) a_probability = 1;
	if(a_priority == null) a_priority = 1;
	if(a_weight == null) a_weight = 1.0;
	this.weight = a_weight;
	this.priority = a_priority;
	this.probability = a_probability;
};
engine.ai.steering.behaviours.Behavior.__name__ = ["engine","ai","steering","behaviours","Behavior"];
engine.ai.steering.behaviours.Behavior.prototype = {
	calculate: function() {
		return null;
	}
	,__class__: engine.ai.steering.behaviours.Behavior
};
var physics = {};
physics.geometry = {};
physics.geometry.Vector2D = function(x,y) {
	if(y == null) y = .0;
	if(x == null) x = .0;
	this.x = x;
	this.y = y;
};
physics.geometry.Vector2D.__name__ = ["physics","geometry","Vector2D"];
physics.geometry.Vector2D.fromString = function(str) {
	if(str == null) return null;
	var vectorParts = str.split(":");
	if(vectorParts == null || vectorParts.length != 2) return null;
	var xVal = Std.parseFloat(vectorParts[0]);
	var yVal = Std.parseFloat(vectorParts[1]);
	if(Math.isNaN(xVal) || Math.isNaN(yVal)) return null;
	return new physics.geometry.Vector2D(xVal,yVal);
};
physics.geometry.Vector2D.prototype = {
	setTo: function(x,y) {
		this.x = x;
		this.y = y;
		return this;
	}
	,copy: function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	,dot: function(v) {
		return this.x * v.x + this.y * v.y;
	}
	,cross: function(v) {
		return this.x * v.y - this.y * v.x;
	}
	,plus: function(v) {
		return new physics.geometry.Vector2D(this.x + v.x,this.y + v.y);
	}
	,plus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x + x,this.y + y);
	}
	,plusEquals: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	,plusEquals2: function(x,y) {
		this.x += x;
		this.y += y;
		return this;
	}
	,minus: function(v) {
		return new physics.geometry.Vector2D(this.x - v.x,this.y - v.y);
	}
	,minus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x - x,this.y - y);
	}
	,minusEquals: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	,minusEquals2: function(x,y) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	,mult: function(s) {
		return new physics.geometry.Vector2D(this.x * s,this.y * s);
	}
	,multEquals: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	,times: function(v) {
		return new physics.geometry.Vector2D(this.x * v.x,this.y * v.y);
	}
	,times2: function(x,y) {
		return new physics.geometry.Vector2D(this.x * x,this.y * y);
	}
	,timesEquals: function(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}
	,timesEquals2: function(x,y) {
		this.x *= x;
		this.y *= y;
		return this;
	}
	,div: function(s) {
		if(s == 0) s = 0.0001;
		return new physics.geometry.Vector2D(this.x / s,this.y / s);
	}
	,divEquals: function(s) {
		if(s == 0) s = 0.0001;
		this.x /= s;
		this.y /= s;
		return this;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	}
	,unit: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		return new physics.geometry.Vector2D(this.x / t,this.y / t);
	}
	,unitEquals: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		this.x /= t;
		this.y /= t;
		return this;
	}
	,leftHandNormal: function() {
		return new physics.geometry.Vector2D(this.y,-this.x);
	}
	,leftHandNormalEquals: function() {
		var t = this.x;
		this.x = this.y;
		this.y = -t;
		return this;
	}
	,rightHandNormal: function() {
		return new physics.geometry.Vector2D(-this.y,this.x);
	}
	,rightHandNormalEquals: function() {
		var t = this.x;
		this.x = -this.y;
		this.y = this.x;
		return this;
	}
	,distance: function(v) {
		var delta = new physics.geometry.Vector2D(v.x - this.x,v.y - this.y);
		return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
	}
	,distanceSqrd: function(v) {
		var dX = this.x - v.x;
		var dY = this.y - v.y;
		return dX * dX + dY * dY;
	}
	,clampMax: function(max) {
		var l = Math.sqrt(this.x * this.x + this.y * this.y);
		if(l > max) this.multEquals(max / l);
		return this;
	}
	,interpolate: function(v,t) {
		return this.mult(1 - t).plus(new physics.geometry.Vector2D(v.x * t,v.y * t));
	}
	,rotate: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		return new physics.geometry.Vector2D(cos * this.x - sin * this.y,cos * this.y + sin * this.x);
	}
	,rotateEquals: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		var rx = cos * this.x - sin * this.y;
		var ry = cos * this.y + sin * this.x;
		this.x = rx;
		this.y = ry;
		return this;
	}
	,isEquals: function(v) {
		return this.x == v.x && this.y == v.y;
	}
	,equalsZero: function() {
		return this.x == 0 && this.y == 0;
	}
	,clone: function() {
		return new physics.geometry.Vector2D(this.x,this.y);
	}
	,toString: function() {
		return this.x + ":" + this.y;
	}
	,__class__: physics.geometry.Vector2D
};
engine.ai.steering.behaviours.Seek = function(target,seekDistSq) {
	if(seekDistSq == null) seekDistSq = 0;
	engine.ai.steering.behaviours.Behavior.call(this,1,null,70);
	this.target = target;
	this.seekDistSq = seekDistSq;
};
engine.ai.steering.behaviours.Seek.__name__ = ["engine","ai","steering","behaviours","Seek"];
engine.ai.steering.behaviours.Seek.calc = function(agent,target,seekDistSq) {
	if(seekDistSq == null) seekDistSq = 0;
	var dX = target.x - agent.averageCenter.x;
	var dY = target.y - agent.averageCenter.y;
	var d = dX * dX + dY * dY;
	if(seekDistSq < 0 && d < -seekDistSq) return engine.ai.steering.behaviours.Seek.wanderResult; else if(seekDistSq > 0 && d > seekDistSq) return engine.ai.steering.behaviours.Seek.wanderResult; else {
		var t = Math.sqrt(d);
		engine.ai.steering.behaviours.Seek.wanderResult.x = dX / t;
		engine.ai.steering.behaviours.Seek.wanderResult.x *= 5;
		engine.ai.steering.behaviours.Seek.wanderResult.x -= agent.position.x - agent.prevPosition.x;
		engine.ai.steering.behaviours.Seek.wanderResult.y = dY / t;
		engine.ai.steering.behaviours.Seek.wanderResult.y *= 5;
		engine.ai.steering.behaviours.Seek.wanderResult.y -= agent.position.y - agent.prevPosition.y;
		return engine.ai.steering.behaviours.Seek.wanderResult;
	}
};
engine.ai.steering.behaviours.Seek.__super__ = engine.ai.steering.behaviours.Behavior;
engine.ai.steering.behaviours.Seek.prototype = $extend(engine.ai.steering.behaviours.Behavior.prototype,{
	calculate: function() {
		return engine.ai.steering.behaviours.Seek.calc(this.agent,this.target,this.seekDistSq);
	}
	,__class__: engine.ai.steering.behaviours.Seek
});
engine.components = {};
engine.components.CameraController = function() {
	eco.core.Component.call(this);
};
engine.components.CameraController.__name__ = ["engine","components","CameraController"];
engine.components.CameraController.__super__ = eco.core.Component;
engine.components.CameraController.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "CameraController";
	}
	,getPosition: function() {
		var position = this.owner.componentMap.Position;
		return position;
	}
	,__class__: engine.components.CameraController
});
engine.components.Controls = function() {
	eco.core.Component.call(this);
};
engine.components.Controls.__name__ = ["engine","components","Controls"];
engine.components.Controls.__super__ = eco.core.Component;
engine.components.Controls.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Controls";
	}
	,__class__: engine.components.Controls
});
engine.components.Display = function(id,tid) {
	eco.core.Component.call(this);
	this.id = id;
	this.tid = tid;
};
engine.components.Display.__name__ = ["engine","components","Display"];
engine.components.Display.__super__ = eco.core.Component;
engine.components.Display.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Display";
	}
	,onAdded: function() {
		this.position = this.owner.componentMap.Position;
	}
	,update: function(time) {
		this.displayObject.position.x = this.position.position.x;
		this.displayObject.position.y = this.position.position.y;
	}
	,__class__: engine.components.Display
});
engine.components.Lifecycle = function(ttl) {
	eco.core.Component.call(this);
	this.ttl = ttl;
	this.age = 0;
	this.expired = false;
};
engine.components.Lifecycle.__name__ = ["engine","components","Lifecycle"];
engine.components.Lifecycle.__super__ = eco.core.Component;
engine.components.Lifecycle.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Lifecycle";
	}
	,update: function(time) {
		this.age += time;
		if(!this.expired && this.age >= this.ttl) {
			this.owner.events.dispatch("lc",{ age : this.age});
			this.expired = true;
		}
	}
	,__class__: engine.components.Lifecycle
});
engine.components.ParticleEmitters = function(emitters) {
	eco.core.Component.call(this);
	this.emitters = emitters;
};
engine.components.ParticleEmitters.__name__ = ["engine","components","ParticleEmitters"];
engine.components.ParticleEmitters.__super__ = eco.core.Component;
engine.components.ParticleEmitters.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "ParticleEmitters";
	}
	,onAdded: function() {
		this.position = this.owner.componentMap.Position;
	}
	,AddEmitter: function(emitter,forceEmit) {
		this.emitters.push(emitter);
		if(forceEmit == true && this.position != null) emitter.update(0,this.position.position,this.particleEngine);
	}
	,update: function(time) {
		var _g = 0;
		var _g1 = this.emitters;
		while(_g < _g1.length) {
			var emitter = _g1[_g];
			++_g;
			emitter.update(time,this.position.position,this.particleEngine);
		}
	}
	,__class__: engine.components.ParticleEmitters
});
engine.components.Physics = function(x,y,velocityX,velocityY,shapes) {
	eco.core.Component.call(this);
	this.body = new physics.dynamics.Body();
	this.body.SetStaticPosition(new physics.geometry.Vector2D(x,y));
	this.body.SetVelocity(new physics.geometry.Vector2D(velocityX,velocityY));
	this.body.userData1 = this;
	var _g = 0;
	while(_g < shapes.length) {
		var shape = shapes[_g];
		++_g;
		this.body.AddFeature(shape,new physics.dynamics.Material());
	}
};
engine.components.Physics.__name__ = ["engine","components","Physics"];
engine.components.Physics.__super__ = eco.core.Component;
engine.components.Physics.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Physics";
	}
	,onAdded: function() {
		this.position = this.owner.componentMap.Position;
		this.position.position = this.body.position;
	}
	,__class__: engine.components.Physics
});
engine.components.Position = function(x,y,rotation) {
	if(rotation == null) rotation = 0.0;
	if(y == null) y = 0.0;
	if(x == null) x = 0.0;
	eco.core.Component.call(this);
	this.position = new physics.geometry.Vector2D(x,y);
	this.rotation = rotation;
};
engine.components.Position.__name__ = ["engine","components","Position"];
engine.components.Position.__super__ = eco.core.Component;
engine.components.Position.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Position";
	}
	,__class__: engine.components.Position
});
engine.components.Script = function() {
	eco.core.Component.call(this);
	this.actionList = new engine.action.ActionList();
	this.bt = new engine.ai.behaviors.Sequence();
};
engine.components.Script.__name__ = ["engine","components","Script"];
engine.components.Script.__super__ = eco.core.Component;
engine.components.Script.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Script";
	}
	,onAdded: function() {
		this.actionList.owner = this.owner;
		this.bc = new engine.ai.behaviors.BehaviorContext(this.owner);
		this.bt.addChild(new engine.ai.behaviors.actions.Delay(1000));
		this.bt.addChild(new engine.ai.behaviors.actions.GetLocalEntities(1000));
	}
	,update: function(time) {
		this.actionList.update(time);
		this.bc.time = time;
		this.bt.tick(this.bc);
	}
	,__class__: engine.components.Script
});
engine.components.Steering = function() {
	eco.core.Component.call(this);
	this.maxSteeringForcePerStep = 5;
	this.maxAcceleration = 1;
};
engine.components.Steering.__name__ = ["engine","components","Steering"];
engine.components.Steering.__super__ = eco.core.Component;
engine.components.Steering.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Steering";
	}
	,onAdded: function() {
		this.position = this.owner.componentMap[engine.components.Position.NAME];
		this.body = this.owner.componentMap[engine.components.Physics.NAME].body;
		this.steeringBehaviour = new engine.ai.steering.SteeringBehavior(this.body);
		this.steeringBehaviour.addBehavior(new engine.ai.steering.behaviours.Seek(new physics.geometry.Vector2D(100,100)));
	}
	,update: function(time) {
		this.body.AddForce(this.steeringBehaviour.calculate());
	}
	,__class__: engine.components.Steering
});
engine.core = {};
engine.core.BaseGame = function() {
	this.gameLoop = new engine.GameLoop();
};
engine.core.BaseGame.__name__ = ["engine","core","BaseGame"];
engine.core.BaseGame.prototype = {
	loadAssets: function(assetList) {
		this.assets = new utils.AssetLoader();
		this.assets.addEventListener("loaded",$bind(this,this.prepare));
		this.assets.SetImagesToLoad(assetList);
		this.assets.Load();
	}
	,prepare: function(event) {
		this.preInit();
		this.prepareRenderer();
		this.prepareEngine();
	}
	,preInit: function() {
	}
	,prepareEngine: function() {
	}
	,prepareRenderer: function() {
	}
	,__class__: engine.core.BaseGame
};
engine.graphics = {};
engine.graphics.IGameGraphics = function() { };
engine.graphics.IGameGraphics.__name__ = ["engine","graphics","IGameGraphics"];
engine.graphics.StaticLayerDisplayManager = function(worldData,cellSize) {
	this.worldData = worldData;
	this.grid = new ds.Grid2D(Math.ceil(worldData.worldBounds.width() / cellSize),Math.ceil(worldData.worldBounds.height() / cellSize),cellSize);
	this.hashItems();
};
engine.graphics.StaticLayerDisplayManager.__name__ = ["engine","graphics","StaticLayerDisplayManager"];
engine.graphics.StaticLayerDisplayManager.prototype = {
	hashItems: function() {
		var data = this.worldData.tmxMap.getObjectGroup("foreground");
		var _g = 0;
		var _g1 = data.objects;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(item.gid >= 0) {
				var tileSet = this.worldData.tmxMap.getGidOwner(item.gid);
				var props = tileSet.getPropertiesByGid(item.gid);
				console.log(props);
			}
		}
		console.log(data);
	}
	,update: function(viewport) {
	}
	,__class__: engine.graphics.StaticLayerDisplayManager
};
engine.input = {};
engine.input.DigitalInput = function() {
	this.keyMap = new Array();
	var _g = 0;
	while(_g < 255) {
		var i = _g++;
		this.keyMap[i] = 0;
	}
	this.mousePosition = new physics.geometry.Vector2D();
	this.mousePreviousPosition = new physics.geometry.Vector2D();
	this.mouseOffset = new physics.geometry.Vector2D();
	this.frameRef = 2;
};
engine.input.DigitalInput.__name__ = ["engine","input","DigitalInput"];
engine.input.DigitalInput.prototype = {
	InputTarget: function(target) {
		this.target = target;
		target.addEventListener("keydown",$bind(this,this.KeyDown),false);
		target.addEventListener("keyup",$bind(this,this.KeyUp),false);
		target.addEventListener("mousedown",$bind(this,this.MouseDown),false);
		target.addEventListener("mouseup",$bind(this,this.MouseUp),false);
		target.addEventListener("mousemove",$bind(this,this.MouseMove),false);
	}
	,Update: function(x,y) {
		this.mouseOffset.x = x;
		this.mouseOffset.y = y;
		this.frameRef++;
	}
	,KeyDown: function(event) {
		if(this.keyMap[event.keyCode] == 0) this.keyMap[event.keyCode] = this.frameRef;
	}
	,KeyUp: function(event) {
		this.keyMap[event.keyCode] = 0;
	}
	,MouseDown: function(event) {
		this.keyMap[200] = this.frameRef;
		return false;
	}
	,MouseUp: function(event) {
		this.keyMap[200] = 0;
		return false;
	}
	,MouseMove: function(event) {
		this.mousePreviousPosition.x = this.mousePosition.x;
		this.mousePreviousPosition.y = this.mousePosition.y;
		this.mousePosition.x = event.offsetX;
		this.mousePosition.y = event.offsetY;
		return false;
	}
	,Pressed: function(keyCode) {
		return this.keyMap[keyCode] > 0;
	}
	,JustPressed: function(keyCode) {
		return this.keyMap[keyCode] == this.frameRef - 1;
	}
	,PressedDuration: function(keyCode) {
		var duration = this.keyMap[keyCode];
		if(duration > 0) return this.frameRef - duration; else return 0;
	}
	,Released: function(keyCode) {
		return this.keyMap[keyCode] == 0;
	}
	,__class__: engine.input.DigitalInput
};
engine.map = {};
engine.map.tmx = {};
engine.map.tmx.TmxLayer = function(source,parent) {
	this.properties = new engine.map.tmx.TmxPropertySet();
	this.map = parent;
	this.name = source.att.resolve("name");
	if(source.has.resolve("x")) this.x = Std.parseInt(source.att.resolve("x")); else this.x = 0;
	if(source.has.resolve("y")) this.y = Std.parseInt(source.att.resolve("y")); else this.y = 0;
	this.width = Std.parseInt(source.att.resolve("width"));
	this.height = Std.parseInt(source.att.resolve("height"));
	if(source.has.resolve("visible") && source.att.resolve("visible") == "1") this.visible = true; else this.visible = false;
	if(source.has.resolve("opacity")) this.opacity = Std.parseFloat(source.att.resolve("opacity")); else this.opacity = 0;
	var node;
	var $it0 = source.nodes.resolve("properties").iterator();
	while( $it0.hasNext() ) {
		var node1 = $it0.next();
		this.properties.extend(node1);
	}
	var data = source.node.resolve("data");
	if(data != null) {
		var chunk = "";
		var _g = data.att.resolve("encoding");
		switch(_g) {
		case "base64":
			chunk = StringTools.trim(data.get_innerData());
			var compressed = false;
			if(data.has.resolve("compression")) {
				var _g1 = data.att.resolve("compression");
				switch(_g1) {
				case "zlib":
					compressed = true;
					break;
				default:
					throw "TmxLayer - data compression type not supported!";
				}
			}
			this.tileGIDs = new ds.Array2D(this.width,this.height,utils.Base64.Decode(chunk));
			break;
		case "csv":
			break;
		default:
		}
	}
};
engine.map.tmx.TmxLayer.__name__ = ["engine","map","tmx","TmxLayer"];
engine.map.tmx.TmxLayer.csvToArray = function(input) {
	var result = new Array();
	var rows = input.split("\n");
	var row;
	var _g = 0;
	while(_g < rows.length) {
		var row1 = rows[_g];
		++_g;
		if(row1 == "") continue;
		var resultRow = new Array();
		var entries = row1.split(",");
		var entry;
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry1 = entries[_g1];
			++_g1;
			resultRow.push(Std.parseInt(entry1));
		}
		result.push(resultRow);
	}
	return result;
};
engine.map.tmx.TmxLayer.layerToCoordTexture = function(layer) {
	var tileSet = null;
	var textureData = new ds.Array2D(layer.width,layer.height);
	var _g1 = 0;
	var _g = layer.width;
	while(_g1 < _g) {
		var xp = _g1++;
		var _g3 = 0;
		var _g2 = layer.height;
		while(_g3 < _g2) {
			var yp = _g3++;
			var source = layer.tileGIDs.get(xp,yp);
			if(source > 0) {
				if(tileSet == null) tileSet = layer.map.getGidOwner(source);
				var relativeID = source - tileSet.firstGID;
				var y = Math.floor(relativeID / tileSet.numCols);
				var x = relativeID - tileSet.numCols * y;
				var v = -16777216 | y << 8 | x;
				textureData.data32[yp * textureData.w + xp] = v;
			} else textureData.data32[yp * textureData.w + xp] = -1;
		}
	}
	return textureData;
};
engine.map.tmx.TmxLayer.layerToCollisionMap = function(layer) {
	var tileSet = null;
	var collisionMap = new ds.Array2D(layer.width,layer.height);
	var _g1 = 0;
	var _g = layer.width;
	while(_g1 < _g) {
		var xp = _g1++;
		var _g3 = 0;
		var _g2 = layer.height;
		while(_g3 < _g2) {
			var yp = _g3++;
			var source = layer.tileGIDs.get(xp,yp);
			if(source > 0) {
				if(tileSet == null) tileSet = layer.map.getGidOwner(source);
				var relativeID = source - tileSet.firstGID;
				var props = tileSet.getPropertiesByGid(source);
				if(props != null) {
					var collision = props.resolve("collision");
					if(collision != null) collisionMap.data32[yp * collisionMap.w + xp] = collision; else collisionMap.data32[yp * collisionMap.w + xp] = 0;
				} else collisionMap.data32[yp * collisionMap.w + xp] = 0;
			} else collisionMap.data32[yp * collisionMap.w + xp] = 0;
		}
	}
	return collisionMap;
};
engine.map.tmx.TmxLayer.prototype = {
	__class__: engine.map.tmx.TmxLayer
};
engine.map.tmx.TmxMap = function(data) {
	this.properties = new engine.map.tmx.TmxPropertySet();
	var source = null;
	var node = null;
	if(typeof(data) == "string") source = new haxe.xml.Fast(Xml.parse(data)); else throw "Unknown TMX map format";
	this.tilesets = new Array();
	this.layers = new engine.map.tmx.TmxOrderedHash();
	this.objectGroups = new engine.map.tmx.TmxOrderedHash();
	source = source.node.resolve("map");
	this.version = source.att.resolve("version");
	if(this.version == null) this.version = "unknown";
	this.orientation = source.att.resolve("orientation");
	if(this.orientation == null) this.orientation = "orthogonal";
	this.width = Std.parseInt(source.att.resolve("width"));
	this.height = Std.parseInt(source.att.resolve("height"));
	this.tileWidth = Std.parseInt(source.att.resolve("tilewidth"));
	this.tileHeight = Std.parseInt(source.att.resolve("tileheight"));
	this.fullWidth = this.width * this.tileWidth;
	this.fullHeight = this.height * this.tileHeight;
	var $it0 = source.nodes.resolve("properties").iterator();
	while( $it0.hasNext() ) {
		var node1 = $it0.next();
		this.properties.extend(node1);
	}
	var $it1 = source.nodes.resolve("tileset").iterator();
	while( $it1.hasNext() ) {
		var node2 = $it1.next();
		this.tilesets.push(new engine.map.tmx.TmxTileSet(node2));
	}
	var $it2 = source.nodes.resolve("layer").iterator();
	while( $it2.hasNext() ) {
		var node3 = $it2.next();
		this.layers.set(node3.att.resolve("name"),new engine.map.tmx.TmxLayer(node3,this));
	}
	var $it3 = source.nodes.resolve("objectgroup").iterator();
	while( $it3.hasNext() ) {
		var node4 = $it3.next();
		this.objectGroups.set(node4.att.resolve("name"),new engine.map.tmx.TmxObjectGroup(node4,this));
	}
};
engine.map.tmx.TmxMap.__name__ = ["engine","map","tmx","TmxMap"];
engine.map.tmx.TmxMap.prototype = {
	getLayer: function(name) {
		return this.layers._map.get(name);
	}
	,getObjectGroup: function(name) {
		return this.objectGroups._map.get(name);
	}
	,getGidOwner: function(gid) {
		var last = null;
		var set;
		var _g = 0;
		var _g1 = this.tilesets;
		while(_g < _g1.length) {
			var set1 = _g1[_g];
			++_g;
			if(set1.hasGid(gid)) return set1;
		}
		return null;
	}
	,__class__: engine.map.tmx.TmxMap
};
engine.map.tmx.TmxObject = function(source,parent) {
	this.group = parent;
	if(source.has.resolve("name")) this.name = source.att.resolve("name"); else this.name = "[object]";
	if(source.has.resolve("type")) this.type = source.att.resolve("type"); else this.type = "";
	this.x = Std.parseInt(source.att.resolve("x"));
	this.y = Std.parseInt(source.att.resolve("y"));
	if(source.has.resolve("width")) this.width = Std.parseInt(source.att.resolve("width")); else this.width = 0;
	if(source.has.resolve("height")) this.height = Std.parseInt(source.att.resolve("height")); else this.height = 0;
	this.shared = null;
	this.gid = -1;
	if(source.has.resolve("gid") && source.att.resolve("gid").length != 0) {
		this.gid = Std.parseInt(source.att.resolve("gid"));
		var set;
		var _g = 0;
		var _g1 = this.group.map.tilesets;
		while(_g < _g1.length) {
			var set1 = _g1[_g];
			++_g;
			this.shared = set1.getPropertiesByGid(this.gid);
			if(this.shared != null) break;
		}
	}
	var node;
	this.custom = new engine.map.tmx.TmxPropertySet();
	var $it0 = source.nodes.resolve("properties").iterator();
	while( $it0.hasNext() ) {
		var node1 = $it0.next();
		this.custom.extend(node1);
	}
};
engine.map.tmx.TmxObject.__name__ = ["engine","map","tmx","TmxObject"];
engine.map.tmx.TmxObject.prototype = {
	__class__: engine.map.tmx.TmxObject
};
engine.map.tmx.TmxObjectGroup = function(source,parent) {
	this.properties = new engine.map.tmx.TmxPropertySet();
	this.objects = new Array();
	this.map = parent;
	this.name = source.att.resolve("name");
	if(source.has.resolve("x")) this.x = Std.parseInt(source.att.resolve("x")); else this.x = 0;
	if(source.has.resolve("y")) this.y = Std.parseInt(source.att.resolve("y")); else this.y = 0;
	if(source.has.resolve("width")) this.width = Std.parseInt(source.att.resolve("width")); else this.width = 0;
	if(source.has.resolve("height")) this.height = Std.parseInt(source.att.resolve("height")); else this.height = 0;
	if(source.has.resolve("visible") && source.att.resolve("visible") == "1") this.visible = true; else this.visible = false;
	if(source.has.resolve("opacity")) this.opacity = Std.parseFloat(source.att.resolve("opacity")); else this.opacity = 0;
	var node;
	var $it0 = source.nodes.resolve("properties").iterator();
	while( $it0.hasNext() ) {
		var node1 = $it0.next();
		this.properties.extend(node1);
	}
	var $it1 = source.nodes.resolve("object").iterator();
	while( $it1.hasNext() ) {
		var node2 = $it1.next();
		this.objects.push(new engine.map.tmx.TmxObject(node2,this));
	}
};
engine.map.tmx.TmxObjectGroup.__name__ = ["engine","map","tmx","TmxObjectGroup"];
engine.map.tmx.TmxObjectGroup.prototype = {
	__class__: engine.map.tmx.TmxObjectGroup
};
engine.map.tmx.TmxOrderedHash = function() {
	this._keys = new Array();
	this._map = new haxe.ds.StringMap();
};
engine.map.tmx.TmxOrderedHash.__name__ = ["engine","map","tmx","TmxOrderedHash"];
engine.map.tmx.TmxOrderedHash.prototype = {
	set: function(key,value) {
		if(!this._map.exists(key)) this._keys.push(key);
		this._map.set(key,value);
	}
	,remove: function(key) {
		HxOverrides.remove(this._keys,key);
		return this._map.remove(key);
	}
	,exists: function(key) {
		return this._map.exists(key);
	}
	,get: function(key) {
		return this._map.get(key);
	}
	,iterator: function() {
		var _keys_itr = HxOverrides.iter(this._keys);
		var __map = this._map;
		return { next : function() {
			var key = _keys_itr.next();
			return __map.get(key);
		}, hasNext : $bind(_keys_itr,_keys_itr.hasNext)};
	}
	,keys: function() {
		return HxOverrides.iter(this._keys);
	}
	,toString: function() {
		var __map = this._map;
		var pairs = Lambda.map(this._keys,function(x) {
			return x + " => " + Std.string(__map.get(x));
		});
		return "{" + pairs.join(", ") + "}";
	}
	,__class__: engine.map.tmx.TmxOrderedHash
};
engine.map.tmx.TmxPropertySet = function() {
	this.keys = new haxe.ds.StringMap();
};
engine.map.tmx.TmxPropertySet.__name__ = ["engine","map","tmx","TmxPropertySet"];
engine.map.tmx.TmxPropertySet.prototype = {
	resolve: function(name) {
		return this.keys.get(name);
	}
	,extend: function(source) {
		var prop;
		var $it0 = source.nodes.resolve("property").iterator();
		while( $it0.hasNext() ) {
			var prop1 = $it0.next();
			var key = prop1.att.resolve("name");
			var value = prop1.att.resolve("value");
			this.keys.set(key,value);
		}
	}
	,__class__: engine.map.tmx.TmxPropertySet
};
engine.map.tmx.TmxTileSet = function(data) {
	var node;
	var source;
	this.numTiles = 16777215;
	this.numRows = this.numCols = 1;
	if(js.Boot.__instanceof(data,haxe.xml.Fast)) source = data; else throw "Unknown TMX tileset format";
	if(source.has.resolve("firstgid")) this.firstGID = Std.parseInt(source.att.resolve("firstgid")); else this.firstGID = 1;
	if(source.has.resolve("source")) {
	} else {
		var node1 = source.node.resolve("image");
		this.imageSource = node1.att.resolve("source");
		this.name = source.att.resolve("name");
		if(source.has.resolve("tilewidth")) this.tileWidth = Std.parseInt(source.att.resolve("tilewidth"));
		if(source.has.resolve("tileheight")) this.tileHeight = Std.parseInt(source.att.resolve("tileheight"));
		if(source.has.resolve("spacing")) this.spacing = Std.parseInt(source.att.resolve("spacing"));
		if(source.has.resolve("margin")) this.margin = Std.parseInt(source.att.resolve("margin"));
		this._tileProps = new Array();
		var $it0 = source.nodes.resolve("tile").iterator();
		while( $it0.hasNext() ) {
			var node2 = $it0.next();
			if(node2.has.resolve("id")) {
				var id = Std.parseInt(node2.att.resolve("id"));
				this._tileProps[id] = new engine.map.tmx.TmxPropertySet();
				var $it1 = node2.nodes.resolve("properties").iterator();
				while( $it1.hasNext() ) {
					var prop = $it1.next();
					this._tileProps[id].extend(prop);
				}
			}
		}
	}
};
engine.map.tmx.TmxTileSet.__name__ = ["engine","map","tmx","TmxTileSet"];
engine.map.tmx.TmxTileSet.prototype = {
	get_image: function() {
		return this._image;
	}
	,set_image: function(v) {
		this._image = v;
		this.numCols = Math.floor(v.width / this.tileWidth);
		this.numRows = Math.floor(v.height / this.tileHeight);
		this.numTiles = this.numRows * this.numCols;
		return this._image;
	}
	,hasGid: function(gid) {
		return gid >= this.firstGID && gid < this.firstGID + this.numTiles;
	}
	,fromGid: function(gid) {
		return gid - this.firstGID;
	}
	,toGid: function(id) {
		return this.firstGID + id;
	}
	,getPropertiesByGid: function(gid) {
		if(this._tileProps != null) return this._tileProps[gid - this.firstGID];
		return null;
	}
	,getProperties: function(id) {
		return this._tileProps[id];
	}
	,getRect: function(id) {
		return new wgr.geom.Rectangle(0,0,id % this.numCols * this.tileWidth,id / this.numCols * this.tileHeight);
	}
	,__class__: engine.map.tmx.TmxTileSet
};
engine.systems = {};
engine.systems.InputSystem = function(digitalInput,camera) {
	eco.core.System.call(this);
	this.digitalInput = digitalInput;
	this.camera = camera;
};
engine.systems.InputSystem.__name__ = ["engine","systems","InputSystem"];
engine.systems.InputSystem.__super__ = eco.core.System;
engine.systems.InputSystem.prototype = $extend(eco.core.System.prototype,{
	get_registeredComponents: function() {
		return [engine.components.Controls];
	}
	,componentAdded: function(e,c) {
		var controls = e.componentMap[c.NAME];
		controls.digitalInput = this.digitalInput;
	}
	,componentRemoved: function(e,c) {
		console.log("TODO removed controls");
	}
	,update: function(time) {
		this.digitalInput.Update(-this.camera.position.x,-this.camera.position.y);
	}
	,__class__: engine.systems.InputSystem
});
engine.systems.ParticleSystem = function(particleEngine) {
	eco.core.System.call(this);
	this.particleEngine = particleEngine;
};
engine.systems.ParticleSystem.__name__ = ["engine","systems","ParticleSystem"];
engine.systems.ParticleSystem.__super__ = eco.core.System;
engine.systems.ParticleSystem.prototype = $extend(eco.core.System.prototype,{
	get_registeredComponents: function() {
		return [engine.components.ParticleEmitters];
	}
	,componentAdded: function(e,c) {
		var particleEmitters = e.componentMap[c.NAME];
		particleEmitters.particleEngine = this.particleEngine;
	}
	,update: function(time) {
		this.particleEngine.Update();
	}
	,__class__: engine.systems.ParticleSystem
});
engine.systems.PhysicsSystem = function(worldData) {
	eco.core.System.call(this);
	this.physicsEngine = new worldEngine.WorldPhysicsEngine(60,60,new physics.collision.narrowphase.sat.SAT(),worldData);
	this.physicsEngine.masslessForces.setTo(0,9);
};
engine.systems.PhysicsSystem.__name__ = ["engine","systems","PhysicsSystem"];
engine.systems.PhysicsSystem.__super__ = eco.core.System;
engine.systems.PhysicsSystem.prototype = $extend(eco.core.System.prototype,{
	get_registeredComponents: function() {
		return [engine.components.Physics];
	}
	,componentAdded: function(e,c) {
		var physics = e.componentMap[c.NAME];
		this.physicsEngine.AddBody(physics.body);
	}
	,componentRemoved: function(e,c) {
		var physics = e.componentMap[c.NAME];
		this.physicsEngine.RemoveBody(physics.body);
	}
	,update: function(time) {
		this.physicsEngine.Step();
	}
	,__class__: engine.systems.PhysicsSystem
});
engine.systems.RenderSystem = function(camera,container,textureManager) {
	eco.core.System.call(this);
	this.camera = camera;
	this.container = container;
	this.textureManager = textureManager;
};
engine.systems.RenderSystem.__name__ = ["engine","systems","RenderSystem"];
engine.systems.RenderSystem.__super__ = eco.core.System;
engine.systems.RenderSystem.prototype = $extend(eco.core.System.prototype,{
	get_registeredComponents: function() {
		return [engine.components.Display,engine.components.CameraController];
	}
	,componentAdded: function(e,c) {
		if(c == engine.components.Display) {
			var display = e.componentMap[c.NAME];
			display.displayObject = this.createSprite(display.id,display.tid);
			this.container.addChild(display.displayObject);
		} else if(c == engine.components.CameraController) {
			var camera = e.componentMap.CameraController;
			this.cameraPosition = camera.getPosition();
		}
	}
	,componentRemoved: function(e,c) {
		if(c == engine.components.Display) {
			var display = e.componentMap[c.NAME];
			this.container.removeChild(display.displayObject);
		}
	}
	,update: function(time) {
		this.camera.Focus(this.cameraPosition.position.x,this.cameraPosition.position.y);
	}
	,createSprite: function(id,tid) {
		var s = new wgr.display.Sprite();
		s.id = id;
		s.texture = this.textureManager.textures.get(tid);
		s.position.x = 0;
		s.position.y = 0;
		s.pivot.x = s.texture.frame.width * s.texture.pivot.x;
		s.pivot.y = s.texture.frame.height * s.texture.pivot.y;
		return s;
	}
	,__class__: engine.systems.RenderSystem
});
engine.view = {};
engine.view.View = function(width,height,camera,debug) {
	this.stage = new wgr.display.Stage();
	this.camera = camera;
	this.stage.addChild(camera);
	this.canvasView = js.Boot.__cast(window.document.getElementById("view") , HTMLCanvasElement);
	this.renderer = new wgr.renderers.webgl.WebGLRenderer(this.stage,camera,this.canvasView,width,height);
	this.debugView = js.Boot.__cast(window.document.getElementById("viewDebug") , HTMLCanvasElement);
	this.debugRenderer = new wgr.renderers.canvas.CanvasDebugView(this.debugView,camera,width,height);
	camera.Resize(this.renderer.width,this.renderer.height);
};
engine.view.View.__name__ = ["engine","view","View"];
engine.view.View.prototype = {
	__class__: engine.view.View
};
var game = {};
game.exile = {};
game.exile.Exile = function() {
	engine.core.BaseGame.call(this);
	this.loadAssets(["data/sprites.json","data/sprites.png","data/testMap.tmx","data/spelunky0.png","data/spelunky1.png","data/spelunky-tiles.png"]);
};
game.exile.Exile.__name__ = ["game","exile","Exile"];
game.exile.Exile.__super__ = engine.core.BaseGame;
game.exile.Exile.prototype = $extend(engine.core.BaseGame.prototype,{
	prepareEngine: function() {
		this.mainEngine = new eco.core.Engine();
		game.exile.entities.EntityFactory.instance = new game.exile.entities.EntityFactory();
		this.mainEngine.registerComponent(engine.components.Physics,5);
		this.mainEngine.registerComponent(engine.components.Display,2);
		this.mainEngine.registerComponent(engine.components.CameraController,1);
		this.mainEngine.addSystem(new engine.systems.PhysicsSystem(this.worldData));
		this.mainEngine.addSystem(new eco.systems.EntityUpdater(this.mainEngine.entities));
		this.mainEngine.addSystem(new engine.systems.InputSystem(this.digitalInput,this.camera));
		this.mainEngine.addSystem(new engine.systems.ParticleSystem(this.blockParticleEngine));
		this.mainEngine.addSystem(new engine.systems.RenderSystem(this.camera,this.itemContainer,this.tm));
		this.createEntities();
		this.gameLoop.updateFunc = $bind(this,this.tick);
		this.gameLoop.start();
	}
	,createEntities: function() {
		this.mainEngine.addEntity(game.exile.entities.EntityFactory.instance.create("player",50,50));
	}
	,tick: function(time) {
		this.mainEngine.update(time);
		this.view.renderer.Render(this.view.camera.viewPortAABB);
	}
	,preInit: function() {
		this.digitalInput = new engine.input.DigitalInput();
		this.digitalInput.InputTarget(window.document);
		this.tmxMap = new engine.map.tmx.TmxMap(this.assets.assets.get("data/testMap.tmx"));
		this.tmxMap.tilesets[0].set_image(this.assets.assets.get("data/spelunky-tiles.png"));
		this.worldData = new worldEngine.WorldData(32,this.tmxMap,"Tile Layer 1");
		this.camera = new wgr.display.Camera();
		this.camera.worldExtentsAABB = new wgr.geom.AABB(this.worldData.worldBounds.t,this.worldData.worldBounds.r,this.worldData.worldBounds.b,this.worldData.worldBounds.l);
		this.camera.worldExtentsAABB.shrink(this.worldData.tileSize);
		this.view = new engine.view.View(800,600,this.camera,false);
	}
	,prepareRenderer: function() {
		this.mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(this.tmxMap.getLayer("Tile Layer 1"));
		this.tm = new wgr.texture.TextureManager(this.view.renderer.gl);
		this.tm.AddTexture("data/sprites.png",this.assets.assets.get("data/sprites.png"));
		this.tm.ParseTexturePackerJSON(this.assets.assets.get("data/sprites.json"),"data/sprites.png");
		this.tileMap = new wgr.renderers.webgl.TileMap();
		this.view.renderer.AddRenderer(this.tileMap);
		this.tileMap.SetSpriteSheet(this.assets.assets.get("data/spelunky-tiles.png"));
		this.tileMap.SetTileLayerFromData(this.mapData,"base",1,1);
		this.tileMap.SetTileLayer(this.assets.assets.get("data/spelunky1.png"),"bg",0.6,0.6);
		this.tileMap.tileSize = 16;
		this.tileMap.TileScale(2);
		this.spriteRender = new wgr.renderers.webgl.SpriteRenderer();
		this.spriteRender.AddStage(this.view.stage);
		this.view.renderer.AddRenderer(this.spriteRender);
		this.blockParticleEngine = new wgr.particle.BlockSpriteParticleEngine(4000,16.6666666666666679);
		this.view.renderer.AddRenderer(this.blockParticleEngine.renderer);
		this.itemContainer = new wgr.display.DisplayObjectContainer();
		this.itemContainer.id = "itemContainer";
		this.view.camera.addChild(this.itemContainer);
	}
	,__class__: game.exile.Exile
});
game.exile.components = {};
game.exile.components.Player = function() {
	eco.core.Component.call(this);
	this.force = new physics.geometry.Vector2D();
};
game.exile.components.Player.__name__ = ["game","exile","components","Player"];
game.exile.components.Player.__super__ = eco.core.Component;
game.exile.components.Player.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "Player";
	}
	,onStarted: function() {
		this.position = this.owner.componentMap[engine.components.Position.NAME];
		this.controls = this.owner.componentMap[engine.components.Controls.NAME];
		this.physics = this.owner.componentMap[engine.components.Physics.NAME];
		var script = new engine.components.Script();
		script.actionList.insertEnd(new engine.action.Trace());
		script.actionList.insertEnd(new engine.action.GetVisibleEntities(100));
		this.owner.add(script);
	}
	,update: function(time) {
		this.processInputs();
	}
	,processInputs: function() {
		this.left = this.controls.digitalInput.keyMap[65] > 0;
		this.right = this.controls.digitalInput.keyMap[68] > 0;
		this.up = this.controls.digitalInput.keyMap[87] > 0;
		this.down = this.controls.digitalInput.keyMap[83] > 0;
		this.force.setTo(0,0);
		if(this.left) this.force.x -= 10; else this.force.x -= 0;
		if(this.right) this.force.x += 10; else this.force.x += 0;
		if(this.up) this.force.y -= 50; else this.force.y -= 0;
		if(this.down) this.force.y += 10; else this.force.y += 0;
		this.physics.body.AddForce(this.force);
		if(this.controls.digitalInput.JustPressed(200)) {
			var viewPos = this.controls.digitalInput.mousePosition.plus(this.controls.digitalInput.mouseOffset);
			var startVelocity = viewPos.minusEquals(this.position.position).unitEquals().multEquals(15);
			this.owner.engine.addEntity(eco.core.Entity.Create([new game.exile.components.ProjectileA(this.position.position,startVelocity)]));
		}
	}
	,__class__: game.exile.components.Player
});
game.exile.components.ProjectileA = function(startPosition,startVelocity) {
	this.totalContactCount = 0;
	eco.core.Component.call(this);
	this.startPosition = startPosition;
	this.startVelocity = startVelocity;
};
game.exile.components.ProjectileA.__name__ = ["game","exile","components","ProjectileA"];
game.exile.components.ProjectileA.__super__ = eco.core.Component;
game.exile.components.ProjectileA.prototype = $extend(eco.core.Component.prototype,{
	get_name: function() {
		return "ProjectileA";
	}
	,onAdded: function() {
		var _g = this;
		this.owner.name = "ProjectileA";
		var shape = new physics.geometry.Circle(6,new physics.geometry.Vector2D(0,0));
		this.physics = new engine.components.Physics(this.startPosition.x,this.startPosition.y,0,0,[shape]);
		this.physics.body.SetMass(0.1);
		this.physics.body.group = 1;
		this.physics.body.features[0].contactCallback = $bind(this,this.OnContact);
		this.physics.body.SetVelocity(this.startVelocity);
		this.owner.add(new engine.components.Position()).add(this.physics).add(new engine.components.Display("character","projectile1.png")).add(new engine.components.Lifecycle(Math.floor(Math.random() * 500 + 1000))).add(new engine.components.ParticleEmitters([new wgr.particle.emitter.RandomSpray(60,60)]));
		this.owner.events.add(function(type,data) {
			if(type == "lc") _g.destroy();
		});
	}
	,OnContact: function(arbiter) {
		if(arbiter.isSensor) return;
		this.totalContactCount++;
		if(this.totalContactCount > 1 || (this.physics.body.id == arbiter.feature1.body.id?arbiter.feature2.body:arbiter.feature1.body).id > 0) {
		}
	}
	,destroy: function() {
		var pm = this.owner.componentMap[engine.components.ParticleEmitters.NAME];
		pm.AddEmitter(new wgr.particle.emitter.Explosion(10,100),true);
		this.owner.engine.removeEntity(this.owner);
	}
	,__class__: game.exile.components.ProjectileA
});
game.exile.entities = {};
game.exile.entities.EntityFactory = function() {
};
game.exile.entities.EntityFactory.__name__ = ["game","exile","entities","EntityFactory"];
game.exile.entities.EntityFactory.prototype = {
	create: function(name,x,y) {
		switch(name) {
		case "player":
			var player = new eco.core.Entity().add(new engine.components.Position(100,100,0)).add(new engine.components.Physics(x,y,0,0,[new physics.geometry.Polygon(physics.geometry.Polygon.CreateRectangle(30,72),new physics.geometry.Vector2D(0,0))])).add(new engine.components.Display("character","character1.png")).add(new engine.components.CameraController()).add(new engine.components.Lifecycle(1000)).add(new engine.components.Controls()).add(new game.exile.components.Player());
			player.events.add(function(type,data) {
				console.log(data);
			});
			var physics1 = player.componentMap[engine.components.Physics.NAME];
			physics1.body.group = 1;
			return player;
		case "projectile":
			var projectile = new eco.core.Entity().add(new engine.components.Position(0,0,0)).add(new engine.components.Physics(x,y,0,0,[new physics.geometry.Polygon(physics.geometry.Polygon.CreateRectangle(16,16),new physics.geometry.Vector2D(0,0))])).add(new engine.components.Display("character","projectile1.png"));
			return projectile;
		}
		return null;
	}
	,__class__: game.exile.entities.EntityFactory
};
var haxe = {};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.xml = {};
haxe.xml._Fast = {};
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname;
			if(this.__x.nodeType == Xml.Document) xname = "Document"; else xname = this.__x.get_nodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
};
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.get_nodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
};
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__class__: haxe.xml._Fast.HasAttribAccess
};
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
};
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__class__: haxe.xml._Fast.NodeListAccess
};
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	get_name: function() {
		if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
	}
	,get_innerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.get_name() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.get_nodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.get_nodeValue()) == "" && it.next() == null) return n.get_nodeValue();
			}
			throw this.get_name() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.get_name() + " does not have data";
		return v.get_nodeValue();
	}
	,__class__: haxe.xml.Fast
};
haxe.xml.Parser = function() { };
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Lib = function() { };
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
physics.Constants = function() { };
physics.Constants.__name__ = ["physics","Constants"];
physics.PhysicsEngine = function(fps,pps,narrowphase) {
	this.fps = fps;
	this.pps = pps;
	this.narrowphase = narrowphase;
	this.Initalize();
};
physics.PhysicsEngine.__name__ = ["physics","PhysicsEngine"];
physics.PhysicsEngine.prototype = {
	Initalize: function() {
		this.narrowphase.bodyContactManager = this.contactManager;
		this.accumulator = 0.0;
		this.currTime = 0.0;
		this.msPerFrame = 1000 / this.fps;
		this.msPerPhysics = 1000 / this.pps;
		this.physicsDeltaTime = 1 / this.pps;
		this.step = 0;
		this.forces = new physics.geometry.Vector2D();
		this.masslessForces = new physics.geometry.Vector2D();
		this.damping = 0.995;
		this.actionResultCollection = new physics.collision.broadphase.action.ActionResultCollection();
	}
	,Step: function() {
		this.step++;
		var newTime = new Date().getTime();
		this.deltaTime = newTime - this.currTime;
		this.currTime = newTime;
		this.ProcessOnStep(this.step);
		if(this.deltaTime > 100) this.deltaTime = 100;
		this.accumulator += this.deltaTime;
		while(this.accumulator >= this.msPerPhysics) {
			this.accumulator -= this.msPerPhysics;
			this.update++;
			this.Update();
			this.Collide();
		}
		if(this.contactManager != null) this.contactManager.ProcessBodyContacts();
	}
	,Update: function() {
	}
	,Collide: function() {
	}
	,StartStaticUpdate: function(body) {
	}
	,EndStaticUpdate: function(body) {
	}
	,ProcessOnStep: function(step) {
	}
	,AddBody: function(body) {
		body.OnAddedToEngine(this);
	}
	,RemoveBody: function(body) {
	}
	,SleepItem: function(body) {
		return true;
	}
	,WakeItem: function(body) {
		return true;
	}
	,CastRay: function(ray) {
		return null;
	}
	,Search: function(position,radius) {
		return null;
	}
	,ProcessShapes: function(position,range,action) {
	}
	,__class__: physics.PhysicsEngine
};
physics.collision = {};
physics.collision.broadphase = {};
physics.collision.broadphase.action = {};
physics.collision.broadphase.action.ActionResult = function() {
};
physics.collision.broadphase.action.ActionResult.__name__ = ["physics","collision","broadphase","action","ActionResult"];
physics.collision.broadphase.action.ActionResult.prototype = {
	Reset: function() {
		this.body = null;
		this.distanceSqrd = 0;
	}
	,__class__: physics.collision.broadphase.action.ActionResult
};
physics.collision.broadphase.action.ActionResultCollection = function() {
	this.results = new Array();
	this.opaqueBodies = new Array();
};
physics.collision.broadphase.action.ActionResultCollection.__name__ = ["physics","collision","broadphase","action","ActionResultCollection"];
physics.collision.broadphase.action.ActionResultCollection.prototype = {
	Reset: function() {
		var _g1 = 0;
		var _g = this.resultCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.results[i].Reset();
		}
		this.resultCount = 0;
		var _g11 = 0;
		var _g2 = this.opaqueBodyCount;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.opaqueBodies[i1].Reset();
		}
		this.opaqueBodyCount = 0;
		this.furthestDistSqrd = 0;
	}
	,AddResult: function(body,distanceSqrd) {
		var result;
		this.resultCount++;
		if(this.resultCount > this.results.length) {
			result = new physics.collision.broadphase.action.ActionResult();
			this.results.push(result);
		} else result = this.results[this.resultCount - 1];
		result.body = body;
		result.distanceSqrd = distanceSqrd;
		if(body.isOpaque) {
			this.opaqueBodyCount++;
			if(this.opaqueBodyCount > this.opaqueBodies.length) {
				result = new physics.collision.broadphase.action.ActionResult();
				this.opaqueBodies.push(result);
			} else result = this.opaqueBodies[this.opaqueBodyCount - 1];
			result.body = body;
			result.distanceSqrd = distanceSqrd;
		}
	}
	,RemoveBody: function(body) {
		var i = 0;
		while(i < this.results.length) if(this.results[i].body == body) {
			this.results.splice(i,1);
			this.resultCount--;
			break;
		}
	}
	,Sort: function() {
		this.quicksort(this.results,0,this.resultCount - 1);
		this.quicksort(this.opaqueBodies,0,this.opaqueBodyCount - 1);
	}
	,quicksort: function(arrayInput,left,right) {
		var i = left;
		var j = right;
		var pivotPoint = arrayInput[Math.round((left + right) * .5)];
		while(i <= j) {
			while(arrayInput[i].distanceSqrd < pivotPoint.distanceSqrd) i++;
			while(arrayInput[j].distanceSqrd > pivotPoint.distanceSqrd) j--;
			if(i <= j) {
				var tempStore = arrayInput[i];
				arrayInput[i] = arrayInput[j];
				i++;
				arrayInput[j] = tempStore;
				j--;
			}
		}
		if(left < j) this.quicksort(arrayInput,left,j);
		if(i < right) this.quicksort(arrayInput,i,right);
	}
	,__class__: physics.collision.broadphase.action.ActionResultCollection
};
physics.collision.broadphase.managedgrid = {};
physics.collision.broadphase.managedgrid.Cell = function(index,x,y,w,h) {
	this.index = index;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.aabb = new physics.geometry.AABB(x,y + h,x + w,y);
	this.dynamicItems = new Array();
	this.sleepingItems = new Array();
	this.staticItems = new Array();
	this.adjacentCells = new Array();
};
physics.collision.broadphase.managedgrid.Cell.__name__ = ["physics","collision","broadphase","managedgrid","Cell"];
physics.collision.broadphase.managedgrid.Cell.prototype = {
	AddBody: function(body) {
		body.broadphaseData1 = this.index;
		if(body.isStatic) this.staticItems.push(body); else this.dynamicItems.push(body);
	}
	,RemoveBody: function(body) {
		if(body.isStatic) HxOverrides.remove(this.staticItems,body); else HxOverrides.remove(this.dynamicItems,body);
		body.broadphaseData1 = -1;
	}
	,SearchList: function(list,position,radius,actionResultCollection) {
		var radiusSqrd = radius * radius;
		var _g = 0;
		while(_g < list.length) {
			var body = list[_g];
			++_g;
			var dX = position.x - body.averageCenter.x;
			var dY = position.y - body.averageCenter.y;
			var dSqrd = dX * dX + dY * dY;
			if(dSqrd <= radiusSqrd - body.radiusSqrd) actionResultCollection.AddResult(body,dSqrd);
		}
	}
	,SearchCell: function(position,radius,result) {
		this.SearchList(this.dynamicItems,position,radius,result);
	}
	,__class__: physics.collision.broadphase.managedgrid.Cell
};
physics.collision.broadphase.managedgrid.ManagedGrid = function(fps,pps,narrowphase,worldGridWidth,worldGridHeight,cellSize) {
	physics.PhysicsEngine.call(this,fps,pps,narrowphase);
	this.grid = new ds.Grid2D(worldGridWidth,worldGridHeight,cellSize);
	this.init();
};
physics.collision.broadphase.managedgrid.ManagedGrid.__name__ = ["physics","collision","broadphase","managedgrid","ManagedGrid"];
physics.collision.broadphase.managedgrid.ManagedGrid.__super__ = physics.PhysicsEngine;
physics.collision.broadphase.managedgrid.ManagedGrid.prototype = $extend(physics.PhysicsEngine.prototype,{
	init: function() {
		var index = 0;
		var _g1 = 0;
		var _g = this.grid.gridWidth;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.grid.gridHeight;
			while(_g3 < _g2) {
				var x = _g3++;
				this.grid.data.push(new physics.collision.broadphase.managedgrid.Cell(index++,x * this.grid.cellSize,y * this.grid.cellSize,this.grid.cellSize,this.grid.cellSize));
			}
		}
		var _g11 = 0;
		var _g4 = this.grid.gridWidth;
		while(_g11 < _g4) {
			var y1 = _g11++;
			var _g31 = 0;
			var _g21 = this.grid.gridHeight;
			while(_g31 < _g21) {
				var x1 = _g31++;
				var cell = this.grid.GetGridSafe(x1,y1);
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 - 1,y1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 - 1,y1 - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1,y1 - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 + 1,y1 - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 + 1,y1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 + 1,y1 + 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1,y1 + 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x1 - 1,y1 + 1));
			}
		}
	}
	,Update: function() {
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = cell.dynamicItems;
			while(_g2 < _g3.length) {
				var body = _g3[_g2];
				++_g2;
				body.Update(this.step);
				if(!cell.aabb.containtsPoint(body.position)) {
					cell.RemoveBody(body);
					this.AddBodyToCell(body);
				}
			}
		}
	}
	,Collide: function() {
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			var _g3 = 0;
			var _g2 = cell.dynamicItems.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var bodyA = cell.dynamicItems[i];
				var _g5 = i + 1;
				var _g4 = cell.dynamicItems.length;
				while(_g5 < _g4) {
					var j = _g5++;
					var bodyB = cell.dynamicItems[j];
					this.narrowphase.CollideBodies(bodyA,bodyB);
				}
			}
		}
	}
	,AddBody: function(body) {
		physics.PhysicsEngine.prototype.AddBody.call(this,body);
		this.AddBodyToCell(body);
	}
	,AddBodyToCell: function(body) {
		var x = body.position.x * this.grid.invCellSize | 0;
		var y = body.position.y * this.grid.invCellSize | 0;
		var cell = this.grid.GetGridSafe(x,y);
		if(cell != null) cell.AddBody(body);
	}
	,RemoveBody: function(body) {
		var cell = this.grid.data[body.broadphaseData1];
		var index = HxOverrides.indexOf(cell.dynamicItems,body,0);
		if(index >= 0) {
			cell.dynamicItems.splice(index,1);
			return;
		}
	}
	,Search: function(position,radius) {
		this.actionResultCollection.Reset();
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.SearchCell(position,radius,this.actionResultCollection);
		}
		return this.actionResultCollection;
	}
	,__class__: physics.collision.broadphase.managedgrid.ManagedGrid
});
physics.collision.narrowphase = {};
physics.collision.narrowphase.INarrowphase = function() { };
physics.collision.narrowphase.INarrowphase.__name__ = ["physics","collision","narrowphase","INarrowphase"];
physics.collision.narrowphase.INarrowphase.prototype = {
	__class__: physics.collision.narrowphase.INarrowphase
};
physics.collision.narrowphase.sat = {};
physics.collision.narrowphase.sat.SAT = function() {
	this.result = new physics.dynamics.Arbiter();
};
physics.collision.narrowphase.sat.SAT.__name__ = ["physics","collision","narrowphase","sat","SAT"];
physics.collision.narrowphase.sat.SAT.__interfaces__ = [physics.collision.narrowphase.INarrowphase];
physics.collision.narrowphase.sat.SAT.poly2poly = function(shape1,shape1Pos,shape2,shape2Pos,arbiter) {
	var vertValOnAxis;
	var minValOnAxis;
	var minPen1 = -1e+99;
	var minAxis1 = null;
	var _g = 0;
	var _g1 = shape1.transformedAxes;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		minValOnAxis = shape2.ValueOnAxis(a,shape1Pos,shape2Pos);
		if(minValOnAxis > 0) return false;
		if(minValOnAxis > minPen1) {
			minPen1 = minValOnAxis;
			minAxis1 = a;
		}
	}
	var minPen2 = -1e+99;
	var minAxis2 = null;
	var _g2 = 0;
	var _g11 = shape2.transformedAxes;
	while(_g2 < _g11.length) {
		var a1 = _g11[_g2];
		++_g2;
		minValOnAxis = shape1.ValueOnAxis(a1,shape2Pos,shape1Pos);
		if(minValOnAxis > 0) return false;
		if(minValOnAxis > minPen2) {
			minPen2 = minValOnAxis;
			minAxis2 = a1;
		}
	}
	var minAxis;
	var nCoef;
	var dist;
	if(minPen1 > minPen2) {
		minAxis = minAxis1;
		nCoef = 1;
		dist = minPen1;
	} else {
		minAxis = minAxis2;
		nCoef = -1;
		dist = minPen2;
	}
	arbiter.AddContact(0,0,minAxis.n.x,minAxis.n.y,nCoef,dist);
	return true;
};
physics.collision.narrowphase.sat.SAT.circle2circle = function(circle1,circle1Pos,circle2,circle2Pos,arbiter) {
	return physics.collision.narrowphase.sat.SAT.circle2circleQuery(circle1.transformedCentre.x + circle1Pos.x,circle1.transformedCentre.y + circle1Pos.y,circle2.transformedCentre.x + circle2Pos.x,circle2.transformedCentre.y + circle2Pos.y,circle1.radius,circle2.radius,arbiter);
};
physics.collision.narrowphase.sat.SAT.circle2circleQuery = function(p1x,p1y,p2x,p2y,r1,r2,arbiter) {
	var minDist = r1 + r2;
	var x = p2x - p1x;
	var y = p2y - p1y;
	var distSqr = x * x + y * y;
	var result = false;
	if(distSqr < minDist * minDist) {
		var dist = Math.sqrt(distSqr) + 0.0000001;
		var invDist = 1 / dist;
		var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;
		arbiter.AddContact(p1x + x * deltaFact,p1y + y * deltaFact,x * invDist,y * invDist,1,dist - minDist);
		result = true;
	}
	return result;
};
physics.collision.narrowphase.sat.SAT.circle2poly = function(circle,circlePos,poly,polyPos,arbiter) {
	var miniA = null;
	var min = -1e+99;
	var tCx = circle.transformedCentre.x + circlePos.x;
	var tCy = circle.transformedCentre.y + circlePos.y;
	var miniVindex = 0;
	var _g1 = 0;
	var _g = poly.vertexCount;
	while(_g1 < _g) {
		var i = _g1++;
		var tA = poly.transformedAxes[i];
		var dist = tA.n.x * tCx + tA.n.y * tCy - (polyPos.x * tA.n.x + polyPos.y * tA.n.y + tA.d) - circle.radius;
		if(dist > 0) return false;
		if(dist > min) {
			min = dist;
			miniA = tA;
			miniVindex = i;
		}
	}
	var miniV = poly.transformedVertices[miniVindex];
	var n = miniA.n;
	var ax = miniV.x + polyPos.x;
	var ay = miniV.y + polyPos.y;
	miniVindex++;
	var b = poly.transformedVertices[miniVindex % poly.vertexCount];
	var bx = b.x + polyPos.x;
	var by = b.y + polyPos.y;
	var dtb = n.x * by - n.y * bx;
	var dt = n.x * tCy - n.y * tCx;
	if(dt < dtb) return physics.collision.narrowphase.sat.SAT.circle2circleQuery(tCx,tCy,bx,by,circle.radius,0,arbiter);
	var dta = n.x * ay - n.y * ax;
	if(dt < dta) {
		var factor = circle.radius + min / 2;
		arbiter.AddContact(tCx - n.x * factor,tCy - n.y * factor,n.x,n.y,-1,min);
		return true;
	}
	return physics.collision.narrowphase.sat.SAT.circle2circleQuery(tCx,tCy,ax,ay,circle.radius,0,arbiter);
};
physics.collision.narrowphase.sat.SAT.circle2segment = function(circle,circlePos,segment,segmentPos,arbiter) {
	var tAP = segment.tA.plus(segmentPos);
	var tCP = circle.transformedCentre.plus(circlePos);
	var closest_t = segment.delta.dot(new physics.geometry.Vector2D(tCP.x - tAP.x,tCP.y - tAP.y)) / segment.delta.lengthSqr();
	if(closest_t < 0) closest_t = 0;
	if(closest_t > 1) closest_t = 1;
	var closest = tAP.plus(segment.delta.mult(closest_t));
	return physics.collision.narrowphase.sat.SAT.circle2circleQuery(tCP.x,tCP.y,closest.x,closest.y,circle.radius,segment.radius,arbiter);
};
physics.collision.narrowphase.sat.SAT.prototype = {
	CollideBodies: function(body1,body2,n) {
		var _g = 0;
		var _g1 = body1.features;
		while(_g < _g1.length) {
			var feature1 = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = body2.features;
			while(_g2 < _g3.length) {
				var feature2 = _g3[_g2];
				++_g2;
				if(physics.geometry.AABB.intersects(feature1.shape.aabb,feature1.body.position,feature2.shape.aabb,feature2.body.position)) this.CollideFeatures(feature1,feature2,n);
			}
		}
	}
	,CollideFeatures: function(feature1,feature2,n) {
		if(feature1.body == feature2.body) return false;
		if((feature1.body.layers & feature2.body.layers) == 0) return false;
		if(feature1.body.group > 0 && feature2.body.group > 0 && feature1.body.group == feature2.body.group) return false;
		var s1 = feature1.shape;
		var s2 = feature2.shape;
		this.result.contactCount = 0;
		if(s1.typeID > s2.typeID) {
			var tempShape2 = s1;
			s1 = s2;
			s2 = tempShape2;
			this.result.feature1 = feature2;
			this.result.feature2 = feature1;
		} else {
			this.result.feature1 = feature1;
			this.result.feature2 = feature2;
		}
		var collided = false;
		if(s1.typeID == 0) collided = true; else {
			var _g = s1.typeID | s2.typeID;
			switch(_g) {
			case 4:
				collided = physics.collision.narrowphase.sat.SAT.poly2poly(s1,this.result.feature1.position,s2,this.result.feature2.position,this.result);
				break;
			case 5:
				collided = physics.collision.narrowphase.sat.SAT.circle2poly(s1,this.result.feature1.position,s2,this.result.feature2.position,this.result);
				break;
			case 1:
				collided = physics.collision.narrowphase.sat.SAT.circle2circle(s1,this.result.feature1.position,s2,this.result.feature2.position,this.result);
				break;
			case 3:
				collided = physics.collision.narrowphase.sat.SAT.circle2segment(s1,this.result.feature1.position,s2,this.result.feature2.position,this.result);
				break;
			}
		}
		if(collided) {
			feature1.body.Wake();
			feature2.body.Wake();
			if(this.result.Resolve()) {
				if(this.bodyContactManager != null) this.bodyContactManager.UpdateContacts(feature1.body,feature2.body);
				return true;
			}
		}
		return false;
	}
	,__class__: physics.collision.narrowphase.sat.SAT
};
physics.constraints = {};
physics.constraints.Constraint = function() {
};
physics.constraints.Constraint.__name__ = ["physics","constraints","Constraint"];
physics.constraints.Constraint.prototype = {
	resolve: function() {
		return false;
	}
	,Destroy: function() {
		if(this.destroyCallback != null) this.destroyCallback(this);
		this.body1.RemoveConstraint(this);
		this.body2.RemoveConstraint(this);
	}
	,__class__: physics.constraints.Constraint
};
physics.dynamics = {};
physics.dynamics.Arbiter = function() {
	this.contacts = new Array();
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		this.contacts.push(new physics.dynamics.Contact());
	}
	this.contactCount = 0;
	this.mtdA = new physics.geometry.Vector2D();
	this.mtdB = new physics.geometry.Vector2D();
	this.vnA = new physics.geometry.Vector2D();
	this.vnB = new physics.geometry.Vector2D();
};
physics.dynamics.Arbiter.__name__ = ["physics","dynamics","Arbiter"];
physics.dynamics.Arbiter.prototype = {
	Reset: function() {
		this.contactCount = 0;
	}
	,AddContact: function(pX,pY,nX,nY,nCoef,dist) {
		var contact = this.contacts[this.contactCount];
		contact.point.x = pX;
		contact.point.y = pY;
		contact.normal.x = nX * nCoef;
		contact.normal.y = nY * nCoef;
		contact.penDist = dist;
	}
	,OpposingBody: function(thiz) {
		if(thiz.id == this.feature1.body.id) return this.feature2.body; else return this.feature1.body;
	}
	,Resolve: function() {
		var bodyA = this.feature1.body;
		var bodyB = this.feature2.body;
		this.isSensor = this.feature1.isSensor || this.feature2.isSensor;
		if(!this.isSensor) {
			var normal = this.contacts[0].normal;
			var depth = this.contacts[0].penDist;
			var mtd = new physics.geometry.Vector2D(normal.x * depth,normal.y * depth);
			var te = this.feature1.material.elasticity + this.feature2.material.elasticity;
			var sumInvMass = this.feature1.body.invMass + this.feature2.body.invMass;
			var tf = utils.Maths.Clamp(1 - (this.feature1.material.friction + this.feature2.material.friction),0,1);
			var ca_velX = bodyA.position.x - bodyA.prevPosition.x;
			var ca_velY = bodyA.position.y - bodyA.prevPosition.y;
			var ca_vdotn = normal.x * ca_velX + normal.y * ca_velY;
			var ca_vnX = normal.x * ca_vdotn;
			var ca_vnY = normal.y * ca_vdotn;
			var ca_vtX = ca_velX - ca_vnX;
			var ca_vtY = ca_velY - ca_vnY;
			var cb_velX = bodyB.position.x - bodyB.prevPosition.x;
			var cb_velY = bodyB.position.y - bodyB.prevPosition.y;
			var cb_vdotn = normal.x * cb_velX + normal.y * cb_velY;
			var cb_vnX = normal.x * cb_vdotn;
			var cb_vnY = normal.y * cb_vdotn;
			var cb_vtX = cb_velX - cb_vnX;
			var cb_vtY = cb_velY - cb_vnY;
			var vnAX = (cb_vnX * ((te + 1) * bodyA.invMass) + ca_vnX * (bodyB.invMass - te * bodyA.invMass)) / sumInvMass;
			var vnAY = (cb_vnY * ((te + 1) * bodyA.invMass) + ca_vnY * (bodyB.invMass - te * bodyA.invMass)) / sumInvMass;
			var vnBX = (ca_vnX * ((te + 1) * bodyB.invMass) + cb_vnX * (bodyA.invMass - te * bodyB.invMass)) / sumInvMass;
			var vnBY = (ca_vnY * ((te + 1) * bodyB.invMass) + cb_vnY * (bodyA.invMass - te * bodyB.invMass)) / sumInvMass;
			ca_vtX *= tf;
			ca_vtY *= tf;
			cb_vtX *= tf;
			cb_vtY *= tf;
			var aMassRatio = bodyA.invMass / sumInvMass;
			this.mtdA.x = mtd.x * aMassRatio;
			this.mtdA.y = mtd.y * aMassRatio;
			var bMassRatio = -bodyB.invMass / sumInvMass;
			this.mtdB.x = mtd.x * bMassRatio;
			this.mtdB.y = mtd.y * bMassRatio;
			this.vnA.x = vnAX + ca_vtX;
			this.vnA.y = vnAY + ca_vtY;
			this.vnB.x = vnBX + cb_vtX;
			this.vnB.y = vnBY + cb_vtY;
			bodyA.RespondToCollision(this,this.mtdA,this.vnA,normal,depth,-1);
			bodyB.RespondToCollision(this,this.mtdB,this.vnB,normal,depth,1);
		}
		if(this.feature1.contactCallback != null) this.feature1.contactCallback(this);
		if(this.feature2.contactCallback != null) this.feature2.contactCallback(this);
		return !this.isSensor;
	}
	,__class__: physics.dynamics.Arbiter
};
physics.dynamics.Body = function() {
	if(this["transient"]) this.id = ds.IDManager.GetTransientID(); else this.id = ds.IDManager.GetPersistentID();
	this.aabb = new physics.geometry.AABB();
	this.averageCenterOffset = new physics.geometry.Vector2D();
	this.averageCenter = new physics.geometry.Vector2D();
	this.position = new physics.geometry.Vector2D();
	this.prevPosition = new physics.geometry.Vector2D();
	this.tempPosition = new physics.geometry.Vector2D();
	this.accumulatedForces = new physics.geometry.Vector2D();
	this.rotation = new physics.geometry.Vector2D();
	this.features = new Array();
	this.constraints = new Array();
	this.SetAngle(0);
	this.SetMass(1);
	this.SetMaximumScalarVelocity(20);
	this.maxAcceleration = 50;
	this.motion = 10;
	this.damping = 1;
	this.masslessForcesFactor = 1;
	this.radius = this.radiusSqrd = 0;
	this.group = 0;
	this.layers = 65535;
	this.canKeepAlive = true;
	this.allowedToSleep = true;
	this.canSleep = true;
	this.isSleeping = false;
	this.isStatic = false;
	this.isKinematic = false;
	this.isOpaque = false;
	this.collisionProcessingMask = 0;
	this.lastStep = -1;
	this.Initalize();
};
physics.dynamics.Body.__name__ = ["physics","dynamics","Body"];
physics.dynamics.Body.HashBodyIDs = function(body1ID,body2ID) {
	if(body1ID < body2ID) return body1ID << 16 | body2ID; else return body2ID << 16 | body1ID;
};
physics.dynamics.Body.prototype = {
	Initalize: function() {
	}
	,Update: function(step) {
		if(this.isStatic || this.isSleeping) return;
		if(step == this.lastStep) return;
		this.lastStep = step;
		this.accumulatedForces.x += this.engine.masslessForces.x * this.masslessForcesFactor;
		this.accumulatedForces.y += this.engine.masslessForces.y * this.masslessForcesFactor;
		this.accumulatedForces.x += this.engine.forces.x * this.invMass;
		this.accumulatedForces.y += this.engine.forces.y * this.invMass;
		this.tempPosition.x = this.position.x;
		this.tempPosition.y = this.position.y;
		var nvX = this.position.x - this.prevPosition.x + this.accumulatedForces.x * this.engine.physicsDeltaTime;
		var nvY = this.position.y - this.prevPosition.y + this.accumulatedForces.y * this.engine.physicsDeltaTime;
		nvX *= this.damping * this.engine.damping;
		nvY *= this.damping * this.engine.damping;
		if(this.maxVelocityScalarSqrd > 0) {
			var scalarVelocitySqr = nvX * nvX + nvY * nvY;
			if(scalarVelocitySqr > this.maxVelocityScalarSqrd) {
				var factor = this.maxVelocityScalar / Math.sqrt(scalarVelocitySqr);
				nvX *= factor;
				nvY *= factor;
			}
		}
		this.position.x += nvX;
		this.position.y += nvY;
		this.prevPosition.x = this.tempPosition.x;
		this.prevPosition.y = this.tempPosition.y;
		this.accumulatedForces.x = this.accumulatedForces.y = 0;
		this.damping = 1;
		this.motion = 0.99332805041467 * this.motion + 0.00667194958533001703 * (nvX * nvX + nvY * nvY);
		if(this.motion > 0.009) this.motion = 0.009;
		this.canSleep = false;
		if(this.motion < 0.0009) this.canSleep = true;
		var _g = 0;
		var _g1 = this.constraints;
		while(_g < _g1.length) {
			var constraint = _g1[_g];
			++_g;
			if(!constraint.resolve()) constraint.Destroy();
		}
		this.averageCenter.x = this.position.x + this.averageCenterOffset.x;
		this.averageCenter.y = this.position.y + this.averageCenterOffset.y;
	}
	,OnStep: function(step) {
		return true;
	}
	,OnPause: function() {
		return true;
	}
	,Sleep: function() {
		if(this.isSleeping || !this.allowedToSleep) return false;
		if(this.engine.SleepItem(this)) {
			this.motion = 0;
			return true;
		}
		return false;
	}
	,Wake: function() {
		if(!this.isSleeping) return false;
		if(this.engine.WakeItem(this)) {
			this.motion = 10;
			return true;
		}
		return false;
	}
	,GetVelocity: function() {
		return this.position.minus(this.prevPosition);
	}
	,SetVelocity: function(value) {
		this.prevPosition.x = this.position.x - value.x;
		this.prevPosition.y = this.position.y - value.y;
		if(this.isSleeping) this.Wake();
	}
	,AddForce: function(force) {
		this.accumulatedForces.plusEquals(force.mult(this.invMass));
		if(this.isSleeping) this.Wake();
	}
	,AddMasslessForce: function(force) {
		this.accumulatedForces.plusEquals(force);
		if(this.isSleeping) this.Wake();
	}
	,RespondToCollision: function(collision,mtd,newVelocity,normal,depth,o) {
		if(this.isStatic) return;
		this.position.x += mtd.x * 1.001;
		this.position.y += mtd.y * 1.001;
		this.prevPosition.x = this.position.x - newVelocity.x;
		this.prevPosition.y = this.position.y - newVelocity.y;
		if(this.isSleeping) this.Wake();
		if(this.isSleeping) this.Wake();
	}
	,SetAngle: function(angle) {
		this.angle = angle % 6.28318530717;
		this.rotation.x = Math.cos(this.angle);
		this.rotation.y = Math.sin(this.angle);
		this.UpdateFeatures();
	}
	,SetMass: function(mass) {
		this.mass = mass;
		this.invMass = 1 / mass;
	}
	,MakeStatic: function() {
		this.isStatic = true;
		this.isOpaque = true;
		this.SetMass(Math.POSITIVE_INFINITY);
	}
	,SetMaximumScalarVelocity: function(maxVelocity) {
		this.maxVelocityScalar = maxVelocity;
		this.maxVelocityScalarSqrd = this.maxVelocityScalar * this.maxVelocityScalar;
	}
	,SetStaticPosition: function(position) {
		this.position.copy(position);
		this.prevPosition.copy(position);
		this.averageCenter.x = position.x + this.averageCenterOffset.x;
		this.averageCenter.y = position.y + this.averageCenterOffset.y;
		if(this.isSleeping) this.Wake();
	}
	,Skew: function(delta) {
		this.position.plusEquals(delta);
		this.prevPosition.plusEquals(delta);
		if(this.isSleeping) this.Wake();
	}
	,SetRadius: function(r) {
		this.radius = r;
		this.radiusSqrd = r * r;
	}
	,AddFeature: function(shape,material) {
		var feature = new physics.dynamics.Feature(this,shape,material);
		this.features.push(feature);
		feature.shape.Update(this.rotation);
		this.aabb.expand(feature.shape.aabb);
		this.aabb.setToCenter(this.averageCenterOffset);
		var rX = this.averageCenterOffset.x - this.aabb.r;
		var rY = this.averageCenterOffset.y - this.aabb.t;
		this.radiusSqrd = rX * rX + rY * rY;
		this.radius = Math.sqrt(this.radiusSqrd);
		return feature;
	}
	,UpdateFeatures: function() {
		this.aabb.reset();
		var _g = 0;
		var _g1 = this.features;
		while(_g < _g1.length) {
			var feature = _g1[_g];
			++_g;
			feature.shape.Update(this.rotation);
			this.aabb.expand(feature.shape.aabb);
		}
		this.aabb.setToCenter(this.averageCenterOffset);
		var rX = this.averageCenterOffset.x - this.aabb.r;
		var rY = this.averageCenterOffset.y - this.aabb.t;
		this.radiusSqrd = rX * rX + rY * rY;
		this.radius = Math.sqrt(this.radiusSqrd);
		if(this.relativePoints != null) this.relativePoints.Update(this.rotation,false);
	}
	,AddConstraint: function(constraint) {
		this.constraints.push(constraint);
	}
	,RemoveConstraint: function(constraint) {
		HxOverrides.remove(this.constraints,constraint);
	}
	,OnAddedToEngine: function(engine) {
		this.engine = engine;
		this.createdMS = engine.currTime;
	}
	,OnStartCollision: function(contact) {
		console.log("Start " + contact.hash);
	}
	,OnCollision: function(contact) {
		console.log("hit");
	}
	,OnEndCollision: function(contact) {
	}
	,Destroy: function() {
		this.engine.RemoveBody(this);
		var _g = 0;
		var _g1 = this.constraints;
		while(_g < _g1.length) {
			var constraint = _g1[_g];
			++_g;
			constraint.Destroy();
		}
		if(this["transient"]) ds.IDManager.ReleaseTransientID(this.id);
	}
	,__class__: physics.dynamics.Body
};
physics.dynamics.BodyContact = function() {
};
physics.dynamics.BodyContact.__name__ = ["physics","dynamics","BodyContact"];
physics.dynamics.BodyContact.prototype = {
	__class__: physics.dynamics.BodyContact
};
physics.dynamics.BodyContactManager = function(engine) {
	this.engine = engine;
	this.contacts = new haxe.ds.IntMap();
};
physics.dynamics.BodyContactManager.__name__ = ["physics","dynamics","BodyContactManager"];
physics.dynamics.BodyContactManager.prototype = {
	UpdateContacts: function(body1,body2) {
		if(body1.collisionProcessingMask == 0 && body2.collisionProcessingMask == 0) return false;
		var bodyHash = physics.dynamics.Body.HashBodyIDs(body1.id,body2.id);
		var bodyContact = this.contacts.get(bodyHash);
		if(bodyContact != null) {
			if(bodyContact.stamp < this.engine.update) {
				bodyContact.contactCount = 0;
				bodyContact.stamp = this.engine.update;
			}
			bodyContact.contactCount++;
		} else {
			bodyContact = new physics.dynamics.BodyContact();
			bodyContact.hash = bodyHash;
			bodyContact.stamp = this.engine.update;
			bodyContact.contactCount = 1;
			bodyContact.startContact = true;
			bodyContact.endContact = false;
			bodyContact.bodyA = body1;
			bodyContact.bodyB = body2;
			this.contacts.set(bodyHash,bodyContact);
		}
		return true;
	}
	,ProcessBodyContacts: function() {
		var contactIter = this.contacts.iterator();
		var count = 0;
		while( contactIter.hasNext() ) {
			var bodyContact = contactIter.next();
			count++;
			if(bodyContact.stamp < this.engine.update) bodyContact.endContact = true;
			if(bodyContact.bodyA.collisionProcessingMask > 0) {
				if((bodyContact.bodyA.collisionProcessingMask & 1) > 0 && bodyContact.startContact) bodyContact.bodyA.OnStartCollision(bodyContact);
				if((bodyContact.bodyA.collisionProcessingMask & 2) > 0) bodyContact.bodyA.OnCollision(bodyContact);
				if((bodyContact.bodyA.collisionProcessingMask & 4) > 0 && bodyContact.endContact) bodyContact.bodyA.OnEndCollision(bodyContact);
			}
			if(bodyContact.bodyB.collisionProcessingMask > 0) {
				if((bodyContact.bodyB.collisionProcessingMask & 1) > 0 && bodyContact.startContact) bodyContact.bodyB.OnStartCollision(bodyContact);
				if((bodyContact.bodyB.collisionProcessingMask & 2) > 0) bodyContact.bodyB.OnCollision(bodyContact);
				if((bodyContact.bodyB.collisionProcessingMask & 4) > 0 && bodyContact.endContact) bodyContact.bodyB.OnEndCollision(bodyContact);
			}
			bodyContact.startContact = false;
			if(bodyContact.endContact) this.contacts.remove(bodyContact.hash);
		}
		console.log("Count=" + count);
	}
	,__class__: physics.dynamics.BodyContactManager
};
physics.dynamics.Contact = function() {
	this.point = new physics.geometry.Vector2D();
	this.normal = new physics.geometry.Vector2D();
	this.penDist = 0;
};
physics.dynamics.Contact.__name__ = ["physics","dynamics","Contact"];
physics.dynamics.Contact.prototype = {
	__class__: physics.dynamics.Contact
};
physics.dynamics.Feature = function(body,shape,material) {
	this.body = body;
	this.shape = shape;
	this.material = material;
	this.isSensor = false;
	this.isCollidable = false;
	this.position = body.position;
};
physics.dynamics.Feature.__name__ = ["physics","dynamics","Feature"];
physics.dynamics.Feature.prototype = {
	copy: function(feature) {
		this.body = feature.body;
		this.shape = feature.shape;
		this.material = feature.material;
		this.position = feature.position;
	}
	,__class__: physics.dynamics.Feature
};
physics.dynamics.Material = function(density,elasticity,friction) {
	if(friction == null) friction = 0.0;
	if(elasticity == null) elasticity = 0.3;
	if(density == null) density = 1;
	this.density = density;
	this.elasticity = elasticity;
	this.friction = friction;
};
physics.dynamics.Material.__name__ = ["physics","dynamics","Material"];
physics.dynamics.Material.prototype = {
	__class__: physics.dynamics.Material
};
physics.geometry.AABB = function(l,b,r,t) {
	if(t == null) t = .0;
	if(r == null) r = .0;
	if(b == null) b = .0;
	if(l == null) l = .0;
	this.l = l;
	this.b = b;
	this.r = r;
	this.t = t;
};
physics.geometry.AABB.__name__ = ["physics","geometry","AABB"];
physics.geometry.AABB.intersects = function(aabb1,position1,aabb2,position2) {
	if(aabb1.l + position1.x > aabb2.r + position2.x) return false; else if(aabb1.r + position1.x < aabb2.l + position2.x) return false; else if(aabb1.t + position1.y > aabb2.b + position2.y) return false; else if(aabb1.b + position1.y < aabb2.t + position2.y) return false; else return true;
};
physics.geometry.AABB.prototype = {
	containtsPoint: function(point) {
		return point.x >= this.l && point.x < this.r && point.y >= this.t && point.y < this.b;
	}
	,expand: function(aabb) {
		if(aabb.l < this.l) this.l = aabb.l;
		if(aabb.r > this.r) this.r = aabb.r;
		if(aabb.t < this.t) this.t = aabb.t;
		if(aabb.b > this.b) this.b = aabb.b;
	}
	,reset: function() {
		this.l = 1e99;
		this.r = -1e+99;
		this.t = 1e99;
		this.b = -1e+99;
	}
	,width: function() {
		return this.r - this.l;
	}
	,height: function() {
		return this.b - this.t;
	}
	,area: function() {
		return (this.r - this.l) * (this.b - this.t);
	}
	,setToCenter: function(c) {
		c.x = (this.r + this.l) / 2;
		c.y = (this.b + this.t) / 2;
	}
	,Union: function(position,aabb,aabbPosition) {
		return new physics.geometry.AABB(Math.max(this.l + position.x,aabb.l + aabbPosition.x),Math.min(this.b + position.y,aabb.b + aabbPosition.y),Math.min(this.r + position.x,aabb.r + aabbPosition.x),Math.max(this.t + position.y,aabb.t + aabbPosition.y));
	}
	,clone: function() {
		return new physics.geometry.AABB(this.l,this.b,this.r,this.t);
	}
	,__class__: physics.geometry.AABB
};
physics.geometry.Axis = function(n,d) {
	this.n = n;
	this.d = d;
};
physics.geometry.Axis.__name__ = ["physics","geometry","Axis"];
physics.geometry.Axis.prototype = {
	clone: function() {
		return new physics.geometry.Axis(this.n.clone(),this.d);
	}
	,__class__: physics.geometry.Axis
};
physics.geometry.GeometricShape = function(typeID,offset) {
	this.typeID = typeID;
	this.offset = offset;
	this.aabb = new physics.geometry.AABB();
	this.UID = physics.geometry.GeometricShape.nextUID++;
};
physics.geometry.GeometricShape.__name__ = ["physics","geometry","GeometricShape"];
physics.geometry.GeometricShape.prototype = {
	Update: function(rotation) {
	}
	,ContainsPoint: function(point,shapePosition) {
		return false;
	}
	,IntersectRay: function(ray,feature) {
		return false;
	}
	,IntersectSegment: function(a,b,feature) {
	}
	,__class__: physics.geometry.GeometricShape
};
physics.geometry.Circle = function(radius,offset) {
	physics.geometry.GeometricShape.call(this,1,offset);
	this.radius = radius;
	this.InitShape();
};
physics.geometry.Circle.__name__ = ["physics","geometry","Circle"];
physics.geometry.Circle.__super__ = physics.geometry.GeometricShape;
physics.geometry.Circle.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	InitShape: function() {
		this.centre = this.offset.clone();
		this.transformedCentre = this.centre.clone();
		this.area = Math.PI * (this.radius * this.radius);
	}
	,Update: function(rotation) {
		this.transformedCentre.x = this.centre.x * rotation.x - this.centre.y * rotation.y;
		this.transformedCentre.y = this.centre.x * rotation.y + this.centre.y * rotation.x;
		this.aabb.l = this.transformedCentre.x - this.radius;
		this.aabb.r = this.transformedCentre.x + this.radius;
		this.aabb.t = this.transformedCentre.y - this.radius;
		this.aabb.b = this.transformedCentre.y + this.radius;
	}
	,ContainsPoint: function(point,shapePosition) {
		var x = this.transformedCentre.x + shapePosition.x - point.x;
		var y = this.transformedCentre.y + shapePosition.y - point.y;
		return x * x + y * y <= this.radius * this.radius;
	}
	,IntersectRay: function(ray,feature) {
		var distX = ray.origin.x - (this.transformedCentre.x + feature.position.x);
		var distY = ray.origin.y - (this.transformedCentre.y + feature.position.y);
		var b = distX * ray.direction.x + distY * ray.direction.y;
		if(b > 0) return false;
		var d = this.radius * this.radius - (distX * distX + distY * distY - b * b);
		if(d < 0) return false;
		d = -b - Math.sqrt(d);
		return ray.ReportResult(feature,d,ray.returnNormal?new physics.geometry.Vector2D(ray.origin.x + ray.direction.x * d - (this.transformedCentre.x + feature.position.x),ray.origin.y + ray.direction.y * d - (this.transformedCentre.y + feature.position.y)).unitEquals():null);
	}
	,IntersectSegment: function(a,b,feature) {
		var tA = a.minus(this.transformedCentre).minus(feature.position);
		var tB = b.minus(this.transformedCentre).minus(feature.position);
		var qa = a.x * a.x + a.y * a.y - 2 * (a.x * b.x + a.y * b.y) + (b.x * b.x + b.y * b.y);
		var qb = -2 * (a.x * a.x + a.y * a.y) + 2 * (a.x * b.x + a.y * b.y);
		var qc = a.x * a.x + a.y * a.y - this.radius * this.radius;
		var det = qb * qb - 4 * qa * qc;
		if(det >= 0.0) {
			var t = (-qb - Math.sqrt(det)) / (2 * qa);
			if(0.0 <= t && t <= 1.0) {
			}
		}
	}
	,__class__: physics.geometry.Circle
});
physics.geometry.Polygon = function(vertices,offset) {
	physics.geometry.GeometricShape.call(this,4,offset);
	this.InitShape(vertices);
};
physics.geometry.Polygon.__name__ = ["physics","geometry","Polygon"];
physics.geometry.Polygon.CreateRectangle = function(w,h) {
	var rect = new Array();
	rect.push(new physics.geometry.Vector2D(-w / 2,-h / 2));
	rect.push(new physics.geometry.Vector2D(-w / 2,h / 2));
	rect.push(new physics.geometry.Vector2D(w / 2,h / 2));
	rect.push(new physics.geometry.Vector2D(w / 2,-h / 2));
	return rect;
};
physics.geometry.Polygon.__super__ = physics.geometry.GeometricShape;
physics.geometry.Polygon.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	InitShape: function(originalVertices) {
		var v0;
		var v1;
		var v2;
		var a;
		var b;
		var n;
		var axis;
		this.vertices = new Array();
		this.transformedVertices = new Array();
		this.axes = new Array();
		this.transformedAxes = new Array();
		this.vertexCount = originalVertices.length;
		this.area = 0;
		var _g1 = 0;
		var _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			v0 = originalVertices[i];
			v1 = originalVertices[(i + 1) % this.vertexCount];
			v2 = originalVertices[(i + 2) % this.vertexCount];
			a = new physics.geometry.Vector2D(v0.x + this.offset.x,v0.y + this.offset.y);
			b = new physics.geometry.Vector2D(v1.x + this.offset.x,v1.y + this.offset.y);
			n = new physics.geometry.Vector2D(b.x - a.x,b.y - a.y).rightHandNormal().unit();
			this.vertices.push(a);
			this.transformedVertices.push(a.clone());
			axis = new physics.geometry.Axis(n,n.x * a.x + n.y * a.y);
			this.axes.push(axis);
			this.transformedAxes.push(axis.clone());
			this.area += v1.x * (v2.y - v0.y);
		}
		this.area /= -2;
		originalVertices = null;
	}
	,Update: function(rotation) {
		var v;
		var tv;
		this.aabb.l = this.aabb.t = 4294967296;
		this.aabb.r = this.aabb.b = -4294967296;
		var _g1 = 0;
		var _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			v = this.vertices[i];
			tv = this.transformedVertices[i];
			tv.x = v.x * rotation.x - v.y * rotation.y;
			tv.y = v.x * rotation.y + v.y * rotation.x;
			if(tv.x < this.aabb.l) this.aabb.l = tv.x;
			if(tv.x > this.aabb.r) this.aabb.r = tv.x;
			if(tv.y < this.aabb.t) this.aabb.t = tv.y;
			if(tv.y > this.aabb.b) this.aabb.b = tv.y;
		}
		var a;
		var ta;
		var _g11 = 0;
		var _g2 = this.vertexCount;
		while(_g11 < _g2) {
			var i1 = _g11++;
			a = this.axes[i1];
			ta = this.transformedAxes[i1];
			ta.n.x = a.n.x * rotation.x - a.n.y * rotation.y;
			ta.n.y = a.n.x * rotation.y + a.n.y * rotation.x;
			ta.d = a.d;
		}
	}
	,ContainsPoint: function(point,shapePosition) {
		var _g = 0;
		var _g1 = this.transformedAxes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.n.x * point.x + a.n.y * point.y - (shapePosition.x * a.n.x + shapePosition.y * a.n.y + a.d) > 0) return false;
		}
		return true;
	}
	,IntersectRay: function(ray,feature) {
		var tfar = ray.range;
		var tnear = 0;
		var nnear = null;
		var nfar = null;
		var ta;
		var tv;
		var _g1 = 0;
		var _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			ta = this.transformedAxes[i];
			tv = this.transformedVertices[i];
			var Dx = tv.x + feature.position.x - ray.origin.x;
			var Dy = tv.y + feature.position.y - ray.origin.y;
			var denom = Dx * ta.n.x + Dy * ta.n.y;
			var numer = ray.direction.x * ta.n.x + ray.direction.y * ta.n.y;
			if((numer < 0?-numer:numer) < 0.000000001) {
				if(denom < 0) return false;
			} else {
				var tclip = denom / numer;
				if(numer < 0) {
					if(tclip > tfar) return false;
					if(tclip > tnear) {
						tnear = tclip;
						nnear = ta;
					}
				} else {
					if(tclip < tnear) return false;
					if(tclip < tfar) {
						tfar = tclip;
						nfar = ta;
					}
				}
			}
		}
		if(nnear == null) return false;
		var t = -(ray.origin.x * nnear.n.x + ray.origin.y * nnear.n.y - (feature.position.x * nnear.n.x + feature.position.y * nnear.n.y + nnear.d)) / (ray.direction.x * nnear.n.x + ray.direction.y * nnear.n.y);
		return ray.ReportResult(feature,t,nnear.n);
	}
	,IntersectSegment: function(a,b,feature) {
		var ta;
		var _g1 = 0;
		var _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			ta = this.transformedAxes[i];
			var an = a.dot(ta.n);
			var ad = feature.position.x * ta.n.x + feature.position.y * ta.n.y + ta.d;
			if(ad > an) continue;
			var bn = b.dot(ta.n);
			var t = (ad - an) / (bn - an);
			if(t < 0.0 || 1.0 < t) continue;
			var point = a.interpolate(b,t);
			var dt = -ta.n.cross(point);
			var dtMin = -ta.n.cross(this.transformedVertices[i]);
			var dtMax = -ta.n.cross(this.transformedVertices[(i + 1) % this.vertexCount]);
			if(dtMin <= dt && dt <= dtMax) {
			}
		}
	}
	,ValueOnAxis: function(a,axisPosition,shapePosition) {
		var min = 4294967296;
		var result;
		var _g = 0;
		var _g1 = this.transformedVertices;
		while(_g < _g1.length) {
			var vertex = _g1[_g];
			++_g;
			result = a.n.x * (vertex.x + shapePosition.x) + a.n.y * (vertex.y + shapePosition.y) - (axisPosition.x * a.n.x + axisPosition.y * a.n.y + a.d);
			if(result < min) min = result;
		}
		return min;
	}
	,__class__: physics.geometry.Polygon
});
physics.geometry.Ray = function() {
};
physics.geometry.Ray.__name__ = ["physics","geometry","Ray"];
physics.geometry.Ray.prototype = {
	SetParams: function(origin,target,range) {
		this.origin = origin;
		this.target = target;
		this.delta = new physics.geometry.Vector2D(target.x - origin.x,target.y - origin.y);
		var m = this.delta.length();
		if(m == 0) m = 0.0000001;
		this.direction = this.delta.mult(1 / m);
		this.lastIntersectResult = false;
		this.lastIntersectDistance = 0;
		this.lastIntersectFeature = null;
		this.intersectInRange = false;
		this.closestIntersectDistance = Math.POSITIVE_INFINITY;
		this.closestIntersectFeature = null;
		if(range == 0) this.range = m; else this.range = range;
		this.rangeSqr = this.range * this.range;
	}
	,Seen: function() {
		return this.lastIntersectFeature == null || this.lastIntersectDistance >= this.range;
	}
	,Seen2: function() {
		return this.lastIntersectDistance >= this.range;
	}
	,TestFeature: function(feature) {
		this.lastIntersectResult = false;
		return feature.shape.IntersectRay(this,feature);
	}
	,ReportResult: function(feature,dist,normal) {
		if(dist >= this.range) {
			this.lastIntersectResult = false;
			return false;
		}
		this.intersectInRange = true;
		this.lastIntersectResult = true;
		this.lastIntersectDistance = dist;
		this.lastIntersectFeature = feature;
		if(dist < this.closestIntersectDistance) {
			this.closestIntersectDistance = dist;
			this.closestIntersectFeature = feature;
			this.closestIntersectNormal = normal;
		}
		return true;
	}
	,LastIntersectPoint: function() {
		return new physics.geometry.Vector2D(this.origin.x + this.direction.x * this.lastIntersectDistance,this.origin.y + this.direction.y * this.lastIntersectDistance);
	}
	,ClosestIntersectPoint: function() {
		return new physics.geometry.Vector2D(this.origin.x + this.direction.x * this.closestIntersectDistance,this.origin.y + this.direction.y * this.closestIntersectDistance);
	}
	,IntersectBoundingCircle: function(position,radius) {
		var distX = this.origin.x - position.x;
		var distY = this.origin.y - position.y;
		var b = distX * this.direction.x + distY * this.direction.y;
		if(b > 0) return false;
		var d = radius * radius - (distX * distX + distY * distY - b * b);
		if(d < 0) return false;
		return true;
	}
	,__class__: physics.geometry.Ray
};
physics.geometry.Segment = function(a,b,radius) {
	physics.geometry.GeometricShape.call(this,2,null);
	this.a = a.clone();
	this.b = b.clone();
	this.radius = radius;
	this.InitShape();
};
physics.geometry.Segment.__name__ = ["physics","geometry","Segment"];
physics.geometry.Segment.__super__ = physics.geometry.GeometricShape;
physics.geometry.Segment.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	InitShape: function() {
		this.delta = this.b.minus(this.a);
		this.n = this.delta.unit().rightHandNormal();
		this.tA = new physics.geometry.Vector2D();
		this.tB = new physics.geometry.Vector2D();
		this.tN = new physics.geometry.Vector2D();
		this.tNneg = new physics.geometry.Vector2D();
	}
	,Update: function(rotation) {
		this.tA.x = this.a.x * rotation.x - this.a.y * rotation.y;
		this.tA.y = this.a.x * rotation.y + this.a.y * rotation.x;
		this.tB.x = this.b.x * rotation.x - this.b.y * rotation.y;
		this.tB.y = this.b.x * rotation.y + this.b.y * rotation.x;
		this.tN.x = this.n.x * rotation.x - this.n.y * rotation.y;
		this.tN.y = this.n.y * rotation.y + this.n.y * rotation.x;
		this.tNneg.x = -this.tN.x;
		this.tNneg.y = -this.tN.y;
		this.tNdottA = this.tN.x * this.tA.x + this.tN.y * this.tA.y;
		if(this.tA.x < this.tB.x) {
			this.aabb.l = this.tA.x - this.radius;
			this.aabb.r = this.tB.x + this.radius;
		} else {
			this.aabb.l = this.tB.x - this.radius;
			this.aabb.r = this.tA.x + this.radius;
		}
		if(this.tA.y < this.tB.y) {
			this.aabb.t = this.tA.y - this.radius;
			this.aabb.b = this.tB.y + this.radius;
		} else {
			this.aabb.t = this.tB.y - this.radius;
			this.aabb.b = this.tA.y + this.radius;
		}
	}
	,__class__: physics.geometry.Segment
});
physics.geometry.Shapes = function() { };
physics.geometry.Shapes.__name__ = ["physics","geometry","Shapes"];
physics.geometry.VertexList = function() {
	this.vertices = new Array();
	this.transformedVertices = new Array();
};
physics.geometry.VertexList.__name__ = ["physics","geometry","VertexList"];
physics.geometry.VertexList.prototype = {
	AddVertex: function(v) {
		this.vertices.push(v);
		var tV = v.clone();
		this.transformedVertices.push(tV);
		return tV;
	}
	,RemoveVertex: function(v) {
		var _g1 = 0;
		var _g = this.transformedVertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.transformedVertices[i] == v) {
				this.vertices.splice(i,1);
				this.transformedVertices.splice(i,1);
				return;
			}
		}
	}
	,Update: function(rotation,flipVerticaly) {
		var vertexCount = this.vertices.length;
		var _g = 0;
		while(_g < vertexCount) {
			var i = _g++;
			var v = this.vertices[i];
			var tv = this.transformedVertices[i];
			tv.x = v.x * rotation.x - v.y * rotation.y;
			tv.y = v.x * rotation.y + v.y * rotation.x;
			if(flipVerticaly) {
				tv.x *= -1;
				tv.y *= -1;
			}
		}
	}
	,__class__: physics.geometry.VertexList
};
var utils = {};
utils.EventTarget = function() {
	this.listeners = new haxe.ds.StringMap();
};
utils.EventTarget.__name__ = ["utils","EventTarget"];
utils.EventTarget.prototype = {
	addEventListener: function(type,listener) {
		if(!this.listeners.exists(type)) this.listeners.set(type,new Array());
		var listenerTypes = this.listeners.get(type);
		if(Lambda.indexOf(listenerTypes,listener) < 0) listenerTypes.push(listener);
	}
	,dispatchEvent: function(event) {
		var listenerTypes = this.listeners.get(event.type);
		if(listenerTypes == null) return;
		var _g = 0;
		while(_g < listenerTypes.length) {
			var listener = listenerTypes[_g];
			++_g;
			listener(event);
		}
	}
	,removeEventListener: function(type,listener) {
	}
	,__class__: utils.EventTarget
};
utils.AssetLoader = function() {
	utils.EventTarget.call(this);
	this.assets = new haxe.ds.StringMap();
	this.Reset();
};
utils.AssetLoader.__name__ = ["utils","AssetLoader"];
utils.AssetLoader.__super__ = utils.EventTarget;
utils.AssetLoader.prototype = $extend(utils.EventTarget.prototype,{
	Reset: function() {
		this.running = false;
		this.loaders = new Array();
	}
	,SetImagesToLoad: function(urls) {
		var _g = 0;
		while(_g < urls.length) {
			var url = urls[_g];
			++_g;
			this.AddAsset(url);
		}
	}
	,AddAsset: function(url) {
		if(this.running == true) return;
		var loader = this.LoaderFactory(url);
		loader.Init(url);
		this.loaders.push(loader);
	}
	,LoaderFactory: function(url) {
		var extention = url.substring(url.length - 3,url.length);
		if(extention == "png") return new utils.ImageAsset(this);
		if(extention == "tmx" || extention == "xml" || extention == "son") return new utils.BlobAsset(this);
		return null;
	}
	,Load: function() {
		if(this.running == true || this.loaders.length == 0) return;
		this.completeCount = this.loaders.length;
		this.running = true;
		var _g = 0;
		var _g1 = this.loaders;
		while(_g < _g1.length) {
			var loader = _g1[_g];
			++_g;
			loader.Load();
		}
	}
	,onLoad: function(item) {
		this.completeCount--;
		this.assets.set(item.getKey(),item.getValue());
		if(this.completeCount == 0) {
			utils.EventTarget.prototype.dispatchEvent.call(this,{ type : "loaded", count : this.completeCount});
			this.running = false;
		}
	}
	,__class__: utils.AssetLoader
});
utils.ILoader = function() { };
utils.ILoader.__name__ = ["utils","ILoader"];
utils.ILoader.prototype = {
	__class__: utils.ILoader
};
utils.ImageAsset = function(mgr) {
	this.mgr = mgr;
};
utils.ImageAsset.__name__ = ["utils","ImageAsset"];
utils.ImageAsset.__interfaces__ = [utils.ILoader];
utils.ImageAsset.prototype = {
	Init: function(url) {
		this.url = url;
		this.image = new Image();
		this.image.onload = $bind(this,this.onLoad);
		this.image.crossOrigin = "anonymous";
	}
	,Load: function() {
		this.image.src = this.url;
		if(this.image.complete == true) this.onLoad(null);
	}
	,onLoad: function(event) {
		if(this.mgr != null) this.mgr.onLoad(this);
	}
	,getKey: function() {
		return this.url;
	}
	,getValue: function() {
		return this.image;
	}
	,__class__: utils.ImageAsset
};
utils.BlobAsset = function(mgr) {
	this.mgr = mgr;
};
utils.BlobAsset.__name__ = ["utils","BlobAsset"];
utils.BlobAsset.__interfaces__ = [utils.ILoader];
utils.BlobAsset.prototype = {
	Init: function(url) {
		this.url = url;
		this.xhr = new XMLHttpRequest();
		this.xhr.open("GET",url,true);
		this.xhr.responseType = "text";
		this.xhr.onload = $bind(this,this.onLoad);
	}
	,Load: function() {
		this.xhr.send();
	}
	,onLoad: function(event) {
		if(this.mgr != null) this.mgr.onLoad(this);
	}
	,getKey: function() {
		return this.url;
	}
	,getValue: function() {
		return this.xhr.response;
	}
	,__class__: utils.BlobAsset
};
utils.Base64 = function() { };
utils.Base64.__name__ = ["utils","Base64"];
utils.Base64.Decode = function(input) {
	var len = input.length / 4 * 3;
	var lkey1 = utils.Base64.keyStr.indexOf(input.charAt(input.length - 1));
	var lkey2 = utils.Base64.keyStr.indexOf(input.charAt(input.length - 2));
	if(lkey1 == 64) len--;
	if(lkey2 == 64) len--;
	var ab = new ArrayBuffer(len);
	var uarray = new Uint8Array(ab);
	var r = new EReg("[^A-Za-z0-9\\+/=]","g");
	input = r.replace(input,"");
	var i = 0;
	var j = 0;
	while(i < len) {
		var enc1 = utils.Base64.keyStr.indexOf(input.charAt(j++));
		var enc2 = utils.Base64.keyStr.indexOf(input.charAt(j++));
		var enc3 = utils.Base64.keyStr.indexOf(input.charAt(j++));
		var enc4 = utils.Base64.keyStr.indexOf(input.charAt(j++));
		var chr1 = enc1 << 2 | enc2 >> 4;
		var chr2 = (enc2 & 15) << 4 | enc3 >> 2;
		var chr3 = (enc3 & 3) << 6 | enc4;
		uarray[i] = chr1;
		if(enc3 != 64) uarray[i + 1] = chr2;
		if(enc4 != 64) uarray[i + 2] = chr3;
		i += 3;
	}
	return ab;
};
utils.Limits = function() { };
utils.Limits.__name__ = ["utils","Limits"];
utils.Maths = function() { };
utils.Maths.__name__ = ["utils","Maths"];
utils.Maths.toRad = function(deg) {
	return deg * 0.0174532925199432955;
};
utils.Maths.toDeg = function(rad) {
	return rad * 57.2957795130823229;
};
utils.Maths.Clamp = function(input,min,max) {
	if(input > max) return max; else if(input < min) return min; else return input;
};
utils.Maths.ScaleRectangleWithRatio = function(containerRect,itemRect) {
	var sX = containerRect.x / itemRect.x;
	var sY = containerRect.y / itemRect.y;
	var rD = containerRect.x / containerRect.y;
	var rR = itemRect.x / itemRect.y;
	if(rD < rR) return sX; else return sY;
};
utils.Random = function() { };
utils.Random.__name__ = ["utils","Random"];
utils.Random.SetPseudoRandomSeed = function(seed) {
	utils.Random.PseudoRandomSeed = seed;
};
utils.Random.RandomFloat = function(min,max) {
	return Math.random() * (max - min) + min;
};
utils.Random.RandomBoolean = function(chance) {
	if(chance == null) chance = 0.5;
	return Math.random() < chance;
};
utils.Random.RandomSign = function(chance) {
	if(chance == null) chance = 0.5;
	if(Math.random() < chance) return 1; else return -1;
};
utils.Random.RandomInteger = function(min,max) {
	return Math.floor(Math.random() * (max - min) + min);
};
utils.Random.PseudoInteger = function(n) {
	if(n == null) n = 2147483647;
	if(n > 0) return Std["int"]((function($this) {
		var $r;
		utils.Random.PseudoRandomSeed = (utils.Random.PseudoRandomSeed * 9301 + 49297) % 233280;
		$r = utils.Random.PseudoRandomSeed / 233280.0;
		return $r;
	}(this)) * n); else return Std["int"]((function($this) {
		var $r;
		utils.Random.PseudoRandomSeed = (utils.Random.PseudoRandomSeed * 9301 + 49297) % 233280;
		$r = utils.Random.PseudoRandomSeed / 233280.0;
		return $r;
	}(this)));
};
utils.Random.PseudoFloat = function() {
	utils.Random.PseudoRandomSeed = (utils.Random.PseudoRandomSeed * 9301 + 49297) % 233280;
	return utils.Random.PseudoRandomSeed / 233280.0;
};
var wgr = {};
wgr.display = {};
wgr.display.DisplayObject = function() {
	this.position = new wgr.geom.Point();
	this.scale = new wgr.geom.Point(1,1);
	this.pivot = new wgr.geom.Point();
	this._rotationComponents = new wgr.geom.Point();
	this._rotation = 0;
	this._rotationComponents.x = Math.cos(this._rotation);
	this._rotationComponents.y = Math.sin(this._rotation);
	this._rotation;
	this.alpha = 1;
	this._visible = true;
	if(this.stage != null) this.stage.dirty = true;
	this._visible;
	this.renderable = false;
	this.aabb = new wgr.geom.AABB();
	this.parent = null;
	this.worldTransform = wgr.geom.Matrix3.Create();
	this.localTransform = wgr.geom.Matrix3.Create();
};
wgr.display.DisplayObject.__name__ = ["wgr","display","DisplayObject"];
wgr.display.DisplayObject.prototype = {
	get_rotation: function() {
		return this._rotation;
	}
	,set_rotation: function(v) {
		this._rotation = v;
		this._rotationComponents.x = Math.cos(this._rotation);
		this._rotationComponents.y = Math.sin(this._rotation);
		return this._rotation;
	}
	,get_visible: function() {
		return this._visible;
	}
	,set_visible: function(v) {
		this._visible = v;
		if(this.stage != null) this.stage.dirty = true;
		return this._visible;
	}
	,RoundFunction: function(v) {
		return Math.round(v * 10) / 10;
	}
	,updateTransform: function() {
		var positionx = Math.floor(this.position.x + 0.5);
		var positiony = Math.floor(this.position.y + 0.5);
		var sinR = this._rotationComponents.y;
		var cosR = this._rotationComponents.x;
		this.localTransform[0] = cosR * this.scale.x;
		this.localTransform[1] = -sinR * this.scale.y;
		this.localTransform[3] = sinR * this.scale.x;
		this.localTransform[4] = cosR * this.scale.y;
		var px = this.pivot.x;
		var py = this.pivot.y;
		var parentTransform = this.parent.worldTransform;
		var a00 = this.localTransform[0];
		var a01 = this.localTransform[1];
		var a02 = positionx - this.localTransform[0] * px - py * this.localTransform[1];
		var a10 = this.localTransform[3];
		var a11 = this.localTransform[4];
		var a12 = positiony - this.localTransform[4] * py - px * this.localTransform[3];
		var b00 = parentTransform[0];
		var b01 = parentTransform[1];
		var b02 = parentTransform[2];
		var b10 = parentTransform[3];
		var b11 = parentTransform[4];
		var b12 = parentTransform[5];
		this.localTransform[2] = a02;
		this.localTransform[5] = a12;
		this.worldTransform[0] = b00 * a00 + b01 * a10;
		this.worldTransform[1] = b00 * a01 + b01 * a11;
		this.worldTransform[2] = b00 * a02 + b01 * a12 + b02;
		this.worldTransform[3] = b10 * a00 + b11 * a10;
		this.worldTransform[4] = b10 * a01 + b11 * a11;
		this.worldTransform[5] = b10 * a02 + b11 * a12 + b12;
		this.worldAlpha = this.alpha * this.parent.worldAlpha;
	}
	,calcExtents: function() {
	}
	,applySlot: function(slot,p) {
		return slot(this,p);
	}
	,__class__: wgr.display.DisplayObject
};
wgr.display.DisplayObjectContainer = function() {
	wgr.display.DisplayObject.call(this);
	this.subTreeAABB = new wgr.geom.AABB();
	this.childCount = 0;
};
wgr.display.DisplayObjectContainer.__name__ = ["wgr","display","DisplayObjectContainer"];
wgr.display.DisplayObjectContainer.__super__ = wgr.display.DisplayObject;
wgr.display.DisplayObjectContainer.prototype = $extend(wgr.display.DisplayObject.prototype,{
	addChild: function(child) {
		if(child.parent != null) child.parent.removeChild(child);
		if(this.tail == null) {
			if(this.head == null) {
				this.head = child;
				this.tail = child;
				child.prev = null;
				child.next = null;
			} else this.insertBefore(this.head,child);
		} else this.insertAfter(this.tail,child);
		this.childAdded(child);
	}
	,addChildAt: function(child,index) {
		if(index >= this.childCount) {
			this.addChild(child);
			return;
		}
		if(index == 0) {
			if(this.head == null) {
				this.head = child;
				this.tail = child;
				child.prev = null;
				child.next = null;
			} else this.insertBefore(this.head,child);
		} else this.insertBefore(this.findChildByIndex(index),child);
		this.childAdded(child);
	}
	,childAdded: function(child) {
		this.childCount++;
		child.parent = this;
		child.applySlot(function(target,p) {
			target.stage = p;
			return true;
		},this.stage);
		if(this.stage != null) this.stage.dirty = true;
	}
	,findChildByIndex: function(index) {
		var child = this.head;
		var count = 0;
		while(child != null) {
			if(count++ == index) return child;
			child = child.next;
		}
		return this.tail;
	}
	,removeChild: function(child) {
		if(child.parent == this) {
			if(child.prev == null) this.head = child.next; else child.prev.next = child.next;
			if(child.next == null) this.tail = child.prev; else child.next.prev = child.prev;
			child.prev = child.next = null;
			this.childRemoved(child);
		}
	}
	,removeChildAt: function(index) {
		var child = this.findChildByIndex(index);
		console.log(child);
		this.removeChild(child);
		this.debug();
		return child;
	}
	,childRemoved: function(child) {
		this.childCount--;
		if(this.stage != null) this.stage.dirty = true;
		child.parent = null;
		child.applySlot(function(target,p) {
			target.stage = null;
			return true;
		},null);
	}
	,updateTransform: function() {
		this.aabb.reset();
		wgr.display.DisplayObject.prototype.updateTransform.call(this);
		this.calcExtents();
		this.subTreeAABB.reset();
		this.subTreeAABB.addAABB(this.aabb);
		var child = this.head;
		while(child != null) {
			child.updateTransform();
			this.subTreeAABB.addAABB(child.aabb);
			child = child.next;
		}
	}
	,apply: function(slot,p) {
	}
	,applySlot: function(slot,p) {
		if(!wgr.display.DisplayObject.prototype.applySlot.call(this,slot,p)) return false;
		var child = this.head;
		while(child != null) {
			child.applySlot(slot,p);
			child = child.next;
		}
		return true;
	}
	,insertAfter: function(node,newNode) {
		newNode.prev = node;
		newNode.next = node.next;
		if(node.next == null) this.tail = newNode; else node.next.prev = newNode;
		node.next = newNode;
	}
	,insertBefore: function(node,newNode) {
		newNode.prev = node.prev;
		newNode.next = node;
		if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
		node.prev = newNode;
	}
	,insertBeginning: function(newNode) {
		if(this.head == null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.prev = null;
			newNode.next = null;
		} else this.insertBefore(this.head,newNode);
	}
	,insertEnd: function(newNode) {
		if(this.tail == null) {
			if(this.head == null) {
				this.head = newNode;
				this.tail = newNode;
				newNode.prev = null;
				newNode.next = null;
			} else this.insertBefore(this.head,newNode);
		} else this.insertAfter(this.tail,newNode);
	}
	,remove: function(node) {
		if(node.prev == null) this.head = node.next; else node.prev.next = node.next;
		if(node.next == null) this.tail = node.prev; else node.next.prev = node.prev;
		node.prev = node.next = null;
	}
	,debug: function() {
		var child = this.head;
		while(child != null) {
			console.log(child.id);
			child = child.next;
		}
	}
	,__class__: wgr.display.DisplayObjectContainer
});
wgr.display.Camera = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.id = "Camera";
	this.realPosition = new wgr.geom.Point();
	this.viewportSize = new wgr.geom.Point();
	this.halfViewportSize = new wgr.geom.Point();
	this.viewPortAABB = new wgr.geom.AABB();
	this.worldExtentsAABB = new wgr.geom.AABB();
};
wgr.display.Camera.__name__ = ["wgr","display","Camera"];
wgr.display.Camera.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Camera.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	Focus: function(x,y) {
		this.realPosition.x = x;
		this.realPosition.y = y;
		this.cameraExtentsAABB.fitPoint(this.realPosition);
		this.position.x = -this.realPosition.x + this.halfViewportSize.x;
		this.position.y = -this.realPosition.y + this.halfViewportSize.y;
	}
	,Resize: function(width,height) {
		this.viewportSize.x = width;
		this.viewportSize.y = height;
		this.halfViewportSize.x = width / 2;
		this.halfViewportSize.y = height / 2;
		this.viewPortAABB.l = this.viewPortAABB.t = 0;
		this.viewPortAABB.r = this.viewportSize.x;
		this.viewPortAABB.b = this.viewportSize.y;
		this.cameraExtentsAABB = this.worldExtentsAABB.clone();
		this.cameraExtentsAABB.shrinkAroundCenter(width,height);
	}
	,__class__: wgr.display.Camera
});
wgr.display.Sprite = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.renderable = true;
	this.anchor = new wgr.geom.Point();
	this.transformedVerts = new Float32Array(8);
};
wgr.display.Sprite.__name__ = ["wgr","display","Sprite"];
wgr.display.Sprite.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Sprite.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	calcExtents: function() {
		var width = this.texture.frame.width;
		var height = this.texture.frame.height;
		var aX = this.anchor.x;
		var aY = this.anchor.y;
		var w0 = width * (1 - aX);
		var w1 = width * -aX;
		var h0 = height * (1 - aY);
		var h1 = height * -aY;
		var a = this.worldTransform[0];
		var b = this.worldTransform[3];
		var c = this.worldTransform[1];
		var d = this.worldTransform[4];
		var tx = this.worldTransform[2];
		var ty = this.worldTransform[5];
		this.transformedVerts[0] = a * w1 + c * h1 + tx;
		this.transformedVerts[1] = d * h1 + b * w1 + ty;
		this.transformedVerts[2] = a * w0 + c * h1 + tx;
		this.transformedVerts[3] = d * h1 + b * w0 + ty;
		this.transformedVerts[4] = a * w0 + c * h0 + tx;
		this.transformedVerts[5] = d * h0 + b * w0 + ty;
		this.transformedVerts[6] = a * w1 + c * h0 + tx;
		this.transformedVerts[7] = d * h0 + b * w1 + ty;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			this.aabb.addPoint(this.transformedVerts[i * 2],this.transformedVerts[i * 2 + 1]);
		}
	}
	,__class__: wgr.display.Sprite
});
wgr.display.Stage = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.id = "Stage";
	this.worldAlpha = this.alpha;
	this.stage = this;
};
wgr.display.Stage.__name__ = ["wgr","display","Stage"];
wgr.display.Stage.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Stage.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	updateTransform: function() {
		var child = this.head;
		while(child != null) {
			child.updateTransform();
			child = child.next;
		}
	}
	,PreRender: function() {
		if(this.dirty == true) {
			this.Flatten();
			this.dirty = false;
		}
	}
	,Flatten: function() {
		this.renderHead = null;
		this.renderTail = null;
		this.renderCount = 0;
	}
	,Traverse: function(node) {
		if(node._visible == false) return;
		if(js.Boot.__instanceof(node,wgr.display.Sprite)) {
			if(this.renderHead == null) {
				this.renderHead = node;
				this.renderHead.prevSprite = this.renderHead.nextSprite = null;
			} else {
				var sprite = node;
				sprite.prevSprite = sprite.nextSprite = null;
				if(this.renderTail == null) {
					this.renderTail = sprite;
					this.renderHead.nextSprite = this.renderTail;
					this.renderTail.prevSprite = this.renderHead;
				} else {
					this.renderTail.nextSprite = sprite;
					sprite.prevSprite = this.renderTail;
					this.renderTail = sprite;
				}
			}
			this.renderCount++;
		}
		if(js.Boot.__instanceof(node,wgr.display.DisplayObjectContainer)) {
			var doc = node;
			var child = doc.head;
			while(child != null) {
				this.Traverse(child);
				child = child.next;
			}
		}
	}
	,__class__: wgr.display.Stage
});
wgr.geom = {};
wgr.geom.AABB = function(t,r,b,l) {
	if(l == null) l = .0;
	if(b == null) b = .0;
	if(r == null) r = .0;
	if(t == null) t = .0;
	this.t = t;
	this.r = r;
	this.b = b;
	this.l = l;
};
wgr.geom.AABB.__name__ = ["wgr","geom","AABB"];
wgr.geom.AABB.prototype = {
	clone: function() {
		return new wgr.geom.AABB(this.t,this.r,this.b,this.l);
	}
	,reset: function() {
		this.t = this.l = Math.POSITIVE_INFINITY;
		this.r = this.b = Math.NEGATIVE_INFINITY;
	}
	,get_width: function() {
		return this.r - this.l;
	}
	,get_height: function() {
		return this.b - this.t;
	}
	,intersect: function(aabb) {
		if(this.l > aabb.r) return false; else if(this.r < aabb.l) return false; else if(this.t > aabb.b) return false; else if(this.b < aabb.t) return false; else return true;
	}
	,addAABB: function(aabb) {
		if(aabb.t < this.t) this.t = aabb.t;
		if(aabb.r > this.r) this.r = aabb.r;
		if(aabb.b > this.b) this.b = aabb.b;
		if(aabb.l < this.l) this.l = aabb.l;
	}
	,addPoint: function(x,y) {
		if(y < this.t) this.t = y;
		if(x > this.r) this.r = x;
		if(y > this.b) this.b = y;
		if(x < this.l) this.l = x;
	}
	,fitPoint: function(point) {
		if(point.x < this.l) point.x = this.l;
		if(point.x > this.r) point.x = this.r;
		if(point.y < this.t) point.y = this.t;
		if(point.y > this.b) point.y = this.b;
	}
	,shrinkAroundCenter: function(deltaWidth,delatHeight) {
		this.l += deltaWidth / 2;
		this.r -= deltaWidth / 2;
		this.t += delatHeight / 2;
		this.b -= delatHeight / 2;
	}
	,shrink: function(i) {
		this.l += i;
		this.r -= i;
		this.t += i;
		this.b -= i;
	}
	,__class__: wgr.geom.AABB
};
wgr.geom.Matrix3 = function() { };
wgr.geom.Matrix3.__name__ = ["wgr","geom","Matrix3"];
wgr.geom.Matrix3.Create = function() {
	return wgr.geom.Matrix3.Identity(new Float32Array(9));
};
wgr.geom.Matrix3.Identity = function(matrix) {
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 1;
	matrix[5] = 0;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 1;
	return matrix;
};
wgr.geom.Matrix3.Multiply = function(mat,mat2,dest) {
	if(dest != null) dest = mat;
	var a00 = mat[0];
	var a01 = mat[1];
	var a02 = mat[2];
	var a10 = mat[3];
	var a11 = mat[4];
	var a12 = mat[5];
	var a20 = mat[6];
	var a21 = mat[7];
	var a22 = mat[8];
	var b00 = mat2[0];
	var b01 = mat2[1];
	var b02 = mat2[2];
	var b10 = mat2[3];
	var b11 = mat2[4];
	var b12 = mat2[5];
	var b20 = mat2[6];
	var b21 = mat2[7];
	var b22 = mat2[8];
	dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
	dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
	dest[2] = b00 * a02 + b01 * a12 + b02 * a22;
	dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
	dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
	dest[5] = b10 * a02 + b11 * a12 + b12 * a22;
	dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
	dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
	dest[8] = b20 * a02 + b21 * a12 + b22 * a22;
	return dest;
};
wgr.geom.Matrix3.Clone = function(mat) {
	var matrix = new Float32Array(9);
	matrix[0] = mat[0];
	matrix[1] = mat[1];
	matrix[2] = mat[2];
	matrix[3] = mat[3];
	matrix[4] = mat[4];
	matrix[5] = mat[5];
	matrix[6] = mat[6];
	matrix[7] = mat[7];
	matrix[8] = mat[8];
	return matrix;
};
wgr.geom.Matrix3.Transpose = function(mat,dest) {
	if(dest != null || mat == dest) {
		var a01 = mat[1];
		var a02 = mat[2];
		var a12 = mat[5];
		mat[1] = mat[3];
		mat[2] = mat[6];
		mat[3] = a01;
		mat[5] = mat[7];
		mat[6] = a02;
		mat[7] = a12;
		return mat;
	}
	dest[0] = mat[0];
	dest[1] = mat[3];
	dest[2] = mat[6];
	dest[3] = mat[1];
	dest[4] = mat[4];
	dest[5] = mat[7];
	dest[6] = mat[2];
	dest[7] = mat[5];
	dest[8] = mat[8];
	return dest;
};
wgr.geom.Matrix3.ToMatrix4 = function(mat,dest) {
	if(dest == null) dest = wgr.geom.Matrix4.Create();
	dest[15] = 1;
	dest[14] = 0;
	dest[13] = 0;
	dest[12] = 0;
	dest[11] = 0;
	dest[10] = mat[8];
	dest[9] = mat[7];
	dest[8] = mat[6];
	dest[7] = 0;
	dest[6] = mat[5];
	dest[5] = mat[4];
	dest[4] = mat[3];
	dest[3] = 0;
	dest[2] = mat[2];
	dest[1] = mat[1];
	dest[0] = mat[0];
	return dest;
};
wgr.geom.Matrix4 = function() { };
wgr.geom.Matrix4.__name__ = ["wgr","geom","Matrix4"];
wgr.geom.Matrix4.Create = function() {
	return wgr.geom.Matrix4.Identity(new Float32Array(16));
};
wgr.geom.Matrix4.Identity = function(matrix) {
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};
wgr.geom.Matrix4.Transpose = function(mat,dest) {
	if(dest != null || mat == dest) {
		var a01 = mat[1];
		var a02 = mat[2];
		var a03 = mat[3];
		var a12 = mat[6];
		var a13 = mat[7];
		var a23 = mat[11];
		mat[1] = mat[4];
		mat[2] = mat[8];
		mat[3] = mat[12];
		mat[4] = a01;
		mat[6] = mat[9];
		mat[7] = mat[13];
		mat[8] = a02;
		mat[9] = a12;
		mat[11] = mat[14];
		mat[12] = a03;
		mat[13] = a13;
		mat[14] = a23;
		return mat;
	}
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
};
wgr.geom.Matrix4.Multiply = function(mat,mat2,dest) {
	if(dest != null) dest = mat;
	var a00 = mat[0];
	var a01 = mat[1];
	var a02 = mat[2];
	var a03 = mat[3];
	var a10 = mat[4];
	var a11 = mat[5];
	var a12 = mat[6];
	var a13 = mat[7];
	var a20 = mat[8];
	var a21 = mat[9];
	var a22 = mat[10];
	var a23 = mat[11];
	var a30 = mat[12];
	var a31 = mat[13];
	var a32 = mat[14];
	var a33 = mat[15];
	var b0 = mat2[0];
	var b1 = mat2[1];
	var b2 = mat2[2];
	var b3 = mat2[3];
	dest[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	dest[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	dest[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	dest[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = mat2[4];
	b1 = mat2[5];
	b2 = mat2[6];
	b3 = mat2[7];
	dest[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	dest[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	dest[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	dest[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = mat2[8];
	b1 = mat2[9];
	b2 = mat2[10];
	b3 = mat2[11];
	dest[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	dest[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	dest[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	dest[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = mat2[12];
	b1 = mat2[13];
	b2 = mat2[14];
	b3 = mat2[15];
	dest[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	dest[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	dest[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	dest[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	return dest;
};
wgr.geom.Point = function(x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
};
wgr.geom.Point.__name__ = ["wgr","geom","Point"];
wgr.geom.Point.prototype = {
	__class__: wgr.geom.Point
};
wgr.geom.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0.;
	if(width == null) width = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
wgr.geom.Rectangle.__name__ = ["wgr","geom","Rectangle"];
wgr.geom.Rectangle.prototype = {
	__class__: wgr.geom.Rectangle
};
wgr.particle = {};
wgr.particle.BlockSpriteParticle = function() {
};
wgr.particle.BlockSpriteParticle.__name__ = ["wgr","particle","BlockSpriteParticle"];
wgr.particle.BlockSpriteParticle.prototype = {
	Initalize: function(x,y,vX,vY,fX,fY,ttl,damping,decay,top,externalForce,data1,data2,data3,data4,data5) {
		this.pX = x;
		this.pY = y;
		this.vX = vX;
		this.vY = vY;
		this.fX = fX;
		this.fY = fY;
		this.ttl = ttl;
		this.age = ttl;
		this.damping = damping;
		this.decay = decay;
		this.externalForce = externalForce;
		this.size = data1;
		this.alpha = data2 * 0.00392156862745098;
		this.red = data3;
		this.green = data4;
		this.blue = data5;
	}
	,Update: function(deltaTime,invDeltaTime) {
		this.vX += this.fX + this.externalForce.x;
		this.vY += this.fY + this.externalForce.y;
		this.vX *= this.damping;
		this.vY *= this.damping;
		this.pX += this.vX * invDeltaTime;
		this.pY += this.vY * invDeltaTime;
		this.age -= deltaTime;
		this.alpha -= this.decay;
		return this.age > 0;
	}
	,__class__: wgr.particle.BlockSpriteParticle
};
wgr.particle.IParticleEngine = function() { };
wgr.particle.IParticleEngine.__name__ = ["wgr","particle","IParticleEngine"];
wgr.particle.IParticleEngine.prototype = {
	__class__: wgr.particle.IParticleEngine
};
wgr.particle.BlockSpriteParticleEngine = function(particleCount,deltaTime) {
	this.particleCount = particleCount;
	this.deltaTime = deltaTime;
	this.invDeltaTime = deltaTime / 1000;
	this.ZERO_FORCE = new wgr.geom.Point();
	var _g = 0;
	while(_g < particleCount) {
		var i = _g++;
		var p = new wgr.particle.BlockSpriteParticle();
		p.next = this.cachedParticles;
		this.cachedParticles = p;
	}
	this.renderer = new wgr.renderers.webgl.PointSpriteLightMapRenderer();
	this.renderer.ResizeBatch(particleCount);
};
wgr.particle.BlockSpriteParticleEngine.__name__ = ["wgr","particle","BlockSpriteParticleEngine"];
wgr.particle.BlockSpriteParticleEngine.__interfaces__ = [wgr.particle.IParticleEngine];
wgr.particle.BlockSpriteParticleEngine.prototype = {
	EmitParticle: function(x,y,vX,vY,fX,fY,ttl,damping,decayable,top,externalForce,data1,data2,data3,data4,data5) {
		if(this.cachedParticles == null) return false;
		var particle = this.cachedParticles;
		this.cachedParticles = this.cachedParticles.next;
		if(this.activeParticles == null) {
			this.activeParticles = particle;
			particle.next = particle.prev = null;
		} else {
			particle.next = this.activeParticles;
			particle.prev = null;
			this.activeParticles.prev = particle;
			this.activeParticles = particle;
		}
		particle.pX = x;
		particle.pY = y;
		particle.vX = vX;
		particle.vY = vY;
		particle.fX = fX;
		particle.fY = fY;
		particle.ttl = ttl;
		particle.age = ttl;
		particle.damping = damping;
		if(decayable) particle.decay = this.deltaTime / ttl; else particle.decay = 0;
		if(externalForce != null) particle.externalForce = externalForce; else particle.externalForce = this.ZERO_FORCE;
		particle.size = data1;
		particle.alpha = data2 * 0.00392156862745098;
		particle.red = data3;
		particle.green = data4;
		particle.blue = data5;
		return true;
	}
	,Update: function() {
		this.renderer.ResetBatch();
		var particle = this.activeParticles;
		while(particle != null) if(!particle.Update(this.deltaTime,this.invDeltaTime)) {
			var next = particle.next;
			if(particle.prev == null) this.activeParticles = particle.next; else particle.prev.next = particle.next;
			if(particle.next != null) particle.next.prev = particle.prev;
			particle.next = this.cachedParticles;
			this.cachedParticles = particle;
			particle = next;
		} else {
			this.renderer.AddSpriteToBatch(particle.pX,particle.pY,particle.size,particle.alpha * 255 | 0,particle.red,particle.green,particle.blue);
			particle = particle.next;
		}
	}
	,__class__: wgr.particle.BlockSpriteParticleEngine
};
wgr.particle.PointSpriteParticle = function() {
};
wgr.particle.PointSpriteParticle.__name__ = ["wgr","particle","PointSpriteParticle"];
wgr.particle.PointSpriteParticle.prototype = {
	Initalize: function(x,y,vX,vY,fX,fY,ttl,damping,decay,top,externalForce,data1,data2,data3,data4) {
		this.pX = x;
		this.pY = y;
		this.vX = vX;
		this.vY = vY;
		this.fX = fX;
		this.fY = fY;
		this.ttl = ttl;
		this.age = ttl;
		this.damping = damping;
		this.decay = decay;
		this.externalForce = externalForce;
		this.type = data1;
		this.size = data2;
		this.colour = data3;
		this.alpha = (this.colour & 255) * 0.00392156862745098;
	}
	,Update: function(deltaTime,invDeltaTime) {
		this.vX += this.fX + this.externalForce.x;
		this.vY += this.fY + this.externalForce.y;
		this.vX *= this.damping;
		this.vY *= this.damping;
		this.pX += this.vX * invDeltaTime;
		this.pY += this.vY * invDeltaTime;
		this.age -= deltaTime;
		this.alpha -= this.decay;
		return this.age > 0;
	}
	,__class__: wgr.particle.PointSpriteParticle
};
wgr.particle.PointSpriteParticleEngine = function(particleCount,deltaTime) {
	this.particleCount = particleCount;
	this.deltaTime = deltaTime;
	this.invDeltaTime = deltaTime / 1000;
	this.ZERO_FORCE = new wgr.geom.Point();
	var _g = 0;
	while(_g < particleCount) {
		var i = _g++;
		var p = new wgr.particle.PointSpriteParticle();
		p.next = this.cachedParticles;
		this.cachedParticles = p;
	}
	this.renderer = new wgr.renderers.webgl.PointSpriteRenderer();
	this.renderer.ResizeBatch(particleCount);
};
wgr.particle.PointSpriteParticleEngine.__name__ = ["wgr","particle","PointSpriteParticleEngine"];
wgr.particle.PointSpriteParticleEngine.__interfaces__ = [wgr.particle.IParticleEngine];
wgr.particle.PointSpriteParticleEngine.prototype = {
	EmitParticle: function(x,y,vX,vY,fX,fY,ttl,damping,decayable,top,externalForce,data1,data2,data3,data4,data5) {
		if(this.cachedParticles == null) return false;
		var particle = this.cachedParticles;
		this.cachedParticles = this.cachedParticles.next;
		if(this.activeParticles == null) {
			this.activeParticles = particle;
			particle.next = particle.prev = null;
		} else {
			particle.next = this.activeParticles;
			particle.prev = null;
			this.activeParticles.prev = particle;
			this.activeParticles = particle;
		}
		particle.pX = x;
		particle.pY = y;
		particle.vX = vX;
		particle.vY = vY;
		particle.fX = fX;
		particle.fY = fY;
		particle.ttl = ttl;
		particle.age = ttl;
		particle.damping = damping;
		if(decayable) particle.decay = this.deltaTime / ttl; else particle.decay = 0;
		if(externalForce != null) particle.externalForce = externalForce; else particle.externalForce = this.ZERO_FORCE;
		particle.type = data1;
		particle.size = data2;
		particle.colour = data3;
		particle.alpha = (particle.colour & 255) * 0.00392156862745098;
		return true;
	}
	,Update: function() {
		this.renderer.ResetBatch();
		var particle = this.activeParticles;
		while(particle != null) if(!particle.Update(this.deltaTime,this.invDeltaTime)) {
			var next = particle.next;
			if(particle.prev == null) this.activeParticles = particle.next; else particle.prev.next = particle.next;
			if(particle.next != null) particle.next.prev = particle.prev;
			particle.next = this.cachedParticles;
			this.cachedParticles = particle;
			particle = next;
		} else {
			this.renderer.AddSpriteToBatch(particle.type | 0,particle.pX,particle.pY,particle.size,particle.alpha * 255 | 0,255,255,255);
			particle = particle.next;
		}
	}
	,__class__: wgr.particle.PointSpriteParticleEngine
};
wgr.particle.emitter = {};
wgr.particle.emitter.IParticleEmitter = function() { };
wgr.particle.emitter.IParticleEmitter.__name__ = ["wgr","particle","emitter","IParticleEmitter"];
wgr.particle.emitter.IParticleEmitter.prototype = {
	__class__: wgr.particle.emitter.IParticleEmitter
};
wgr.particle.emitter.Explosion = function(mass,power) {
	this.mass = mass;
	this.power = power;
};
wgr.particle.emitter.Explosion.__name__ = ["wgr","particle","emitter","Explosion"];
wgr.particle.emitter.Explosion.__interfaces__ = [wgr.particle.emitter.IParticleEmitter];
wgr.particle.emitter.Explosion.prototype = {
	update: function(time,position,engine) {
		var _g1 = 0;
		var _g = this.mass;
		while(_g1 < _g) {
			var i = _g1++;
			var angle = Math.random() * (Math.PI * 2);
			var p = Math.random() * (this.power * 2);
			var vx = Math.cos(angle) * p;
			var vy = Math.sin(angle) * p;
			engine.EmitParticle(position.x,position.y,vx,vy,0,0.5,Math.floor(Math.random() * 700 + 300),0.9,true,true,null,4,255,255,0,0);
		}
	}
	,__class__: wgr.particle.emitter.Explosion
};
wgr.particle.emitter.RandomSpray = function(rate,speed) {
	this.rate = rate;
	this.speed = speed;
};
wgr.particle.emitter.RandomSpray.__name__ = ["wgr","particle","emitter","RandomSpray"];
wgr.particle.emitter.RandomSpray.__interfaces__ = [wgr.particle.emitter.IParticleEmitter];
wgr.particle.emitter.RandomSpray.prototype = {
	update: function(time,position,engine) {
		var angle = Math.random() * (2 * Math.PI);
		var vx = Math.cos(angle) * this.speed;
		var vy = Math.sin(angle) * this.speed;
		engine.EmitParticle(position.x,position.y,vx,vy,0,0,800,0.99,true,true,null,4,255,255,255,255);
	}
	,__class__: wgr.particle.emitter.RandomSpray
};
wgr.renderers = {};
wgr.renderers.canvas = {};
wgr.renderers.canvas.CanvasDebugView = function(view,camera,width,height) {
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.view = view;
	this.camera = camera;
	this.ctx = view.getContext("2d");
	this.Resize(width,height);
};
wgr.renderers.canvas.CanvasDebugView.__name__ = ["wgr","renderers","canvas","CanvasDebugView"];
wgr.renderers.canvas.CanvasDebugView.prototype = {
	Resize: function(width,height) {
		this.width = width;
		this.height = height;
		this.view.width = width;
		this.view.height = height;
	}
	,Clear: function() {
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0,0,this.width,this.height);
		this.ctx.strokeStyle = "rgba(0,255,0,1)";
		this.ctx.translate(this.camera.position.x,this.camera.position.y);
	}
	,DrawRect: function(x,y,w,h) {
		this.ctx.strokeRect(x,y,w,h);
	}
	,DrawAABB: function(aabb) {
		this.ctx.strokeRect(aabb.l,aabb.t,aabb.r - aabb.l,aabb.b - aabb.t);
	}
	,DrawPhysicsAABB: function(aabb) {
		this.ctx.beginPath();
		this.ctx.moveTo(aabb.l,aabb.t);
		this.ctx.lineTo(aabb.r,aabb.t);
		this.ctx.moveTo(aabb.r,aabb.b);
		this.ctx.lineTo(aabb.l,aabb.b);
		this.ctx.stroke();
	}
	,DrawCross: function(x,y,l) {
		this.ctx.beginPath();
		this.ctx.moveTo(x - l,y);
		this.ctx.lineTo(x + l,y);
		this.ctx.moveTo(x,y - l);
		this.ctx.lineTo(x,y + l);
		this.ctx.stroke();
	}
	,__class__: wgr.renderers.canvas.CanvasDebugView
};
wgr.renderers.webgl = {};
wgr.renderers.webgl.IRenderer = function() { };
wgr.renderers.webgl.IRenderer.__name__ = ["wgr","renderers","webgl","IRenderer"];
wgr.renderers.webgl.IRenderer.prototype = {
	__class__: wgr.renderers.webgl.IRenderer
};
wgr.renderers.webgl.PointSpriteLightMapRenderer = function() {
};
wgr.renderers.webgl.PointSpriteLightMapRenderer.__name__ = ["wgr","renderers","webgl","PointSpriteLightMapRenderer"];
wgr.renderers.webgl.PointSpriteLightMapRenderer.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.PointSpriteLightMapRenderer.prototype = {
	Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.projection = new wgr.geom.Point();
		this.pointSpriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_FRAGMENT_SHADER));
		this.dataBuffer = gl.createBuffer();
	}
	,ResizeBatch: function(size) {
		this.arrayBuffer = new ArrayBuffer(80 * size);
		this.data = new Float32Array(this.arrayBuffer);
		this.data8 = new Uint8ClampedArray(this.arrayBuffer);
		this.ResetBatch();
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,ResetBatch: function() {
		this.indexRun = 0;
	}
	,AddSpriteToBatch: function(x,y,size,alpha,red,green,blue) {
		var index = this.indexRun * 4;
		this.data[index] = x + this.camera.position.x | 0;
		this.data[index + 1] = y + this.camera.position.y | 0;
		this.data[index + 2] = size;
		index *= 4;
		this.data8[index + 12] = red;
		this.data8[index + 13] = blue;
		this.data8[index + 14] = green;
		this.data8[index + 15] = alpha;
		this.indexRun++;
	}
	,Render: function(clip) {
		this.gl.enable(3042);
		this.gl.blendFunc(770,771);
		this.gl.useProgram(this.pointSpriteShader.program);
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35048);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.position,2,5126,false,16,0);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.size,1,5126,false,16,8);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.colour,4,5121,true,16,12);
		this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.gl.drawArrays(0,0,this.indexRun);
	}
	,__class__: wgr.renderers.webgl.PointSpriteLightMapRenderer
};
wgr.renderers.webgl.PointSpriteRenderer = function() {
};
wgr.renderers.webgl.PointSpriteRenderer.__name__ = ["wgr","renderers","webgl","PointSpriteRenderer"];
wgr.renderers.webgl.PointSpriteRenderer.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.PointSpriteRenderer.prototype = {
	Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.projection = new wgr.geom.Point();
		this.pointSpriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.PointSpriteRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.PointSpriteRenderer.SPRITE_FRAGMENT_SHADER));
		this.dataBuffer = gl.createBuffer();
	}
	,ResizeBatch: function(size) {
		this.arrayBuffer = new ArrayBuffer(80 * size);
		this.data = new Float32Array(this.arrayBuffer);
		this.data8 = new Uint8ClampedArray(this.arrayBuffer);
		this.ResetBatch();
	}
	,SetSpriteSheet: function(texture,spriteSize,spritesWide,spritesHigh) {
		this.texture = texture;
		this.tileSize = spriteSize;
		this.texTilesWide = spritesWide;
		this.texTilesHigh = spritesHigh;
		this.invTexTilesWide = 1 / this.texTilesWide;
		this.invTexTilesHigh = 1 / this.texTilesHigh;
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,ResetBatch: function() {
		this.indexRun = 0;
	}
	,AddSpriteToBatch: function(spriteID,x,y,size,alpha,red,green,blue) {
		var index = this.indexRun * 5;
		this.data[index] = x + this.camera.position.x | 0;
		this.data[index + 1] = y + this.camera.position.y | 0;
		this.data[index + 2] = size;
		this.data[index + 3] = spriteID;
		index *= 4;
		this.data8[index + 16] = red;
		this.data8[index + 17] = blue;
		this.data8[index + 18] = green;
		this.data8[index + 19] = alpha;
		this.indexRun++;
	}
	,Render: function(clip) {
		this.gl.enable(3042);
		this.gl.blendFunc(770,771);
		this.gl.useProgram(this.pointSpriteShader.program);
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35048);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.tileType);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.position,2,5126,false,20,0);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.size,1,5126,false,20,8);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.tileType,1,5126,false,20,12);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.colour,4,5121,true,20,16);
		this.gl.uniform1f(this.pointSpriteShader.uniform.texTilesWide,this.texTilesWide);
		this.gl.uniform1f(this.pointSpriteShader.uniform.texTilesHigh,this.texTilesHigh);
		this.gl.uniform1f(this.pointSpriteShader.uniform.invTexTilesWide,this.invTexTilesWide);
		this.gl.uniform1f(this.pointSpriteShader.uniform.invTexTilesHigh,this.invTexTilesHigh);
		this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.gl.uniform2f(this.pointSpriteShader.uniform.flip,0,0);
		this.gl.activeTexture(33984);
		this.gl.bindTexture(3553,this.texture);
		this.gl.drawArrays(0,0,this.indexRun);
	}
	,__class__: wgr.renderers.webgl.PointSpriteRenderer
};
wgr.renderers.webgl.ShaderWrapper = function(gl,program) {
	this.program = program;
	gl.useProgram(this.program);
	this.attribute = { };
	this.uniform = { };
	var cnt = gl.getProgramParameter(program,35721);
	var i = 0;
	while(i < cnt) {
		var attrib = gl.getActiveAttrib(program,i);
		this.attribute[attrib.name] = gl.getAttribLocation(program,attrib.name);
		i++;
	}
	cnt = gl.getProgramParameter(program,35718);
	i = 0;
	while(i < cnt) {
		var attrib1 = gl.getActiveUniform(program,i);
		this.uniform[attrib1.name] = gl.getUniformLocation(program,attrib1.name);
		i++;
	}
};
wgr.renderers.webgl.ShaderWrapper.__name__ = ["wgr","renderers","webgl","ShaderWrapper"];
wgr.renderers.webgl.ShaderWrapper.prototype = {
	__class__: wgr.renderers.webgl.ShaderWrapper
};
wgr.renderers.webgl.SpriteRenderer = function() {
};
wgr.renderers.webgl.SpriteRenderer.__name__ = ["wgr","renderers","webgl","SpriteRenderer"];
wgr.renderers.webgl.SpriteRenderer.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.SpriteRenderer.prototype = {
	Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.projection = new wgr.geom.Point();
		this.spriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER));
		this.spriteBatch = new wgr.renderers.webgl.WebGLBatch(gl);
		this.spriteBatch.ResizeBatch(1000);
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,Render: function(clip) {
		this.gl.useProgram(this.spriteShader.program);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aVertexPosition);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aTextureCoord);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aColor);
		this.gl.vertexAttribPointer(this.spriteShader.attribute.aVertexPosition,2,5126,false,20,0);
		this.gl.vertexAttribPointer(this.spriteShader.attribute.aTextureCoord,2,5126,false,20,8);
		this.gl.vertexAttribPointer(this.spriteShader.attribute.aColor,1,5126,false,20,16);
		this.gl.uniform2f(this.spriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.spriteBatch.Render(this.spriteShader,this.stage,this.camera.viewPortAABB);
	}
	,__class__: wgr.renderers.webgl.SpriteRenderer
};
wgr.renderers.webgl.TileLayer = function() {
	this.scrollScale = new wgr.geom.Point(1,1);
	this.inverseTextureSize = new Float32Array(2);
};
wgr.renderers.webgl.TileLayer.__name__ = ["wgr","renderers","webgl","TileLayer"];
wgr.renderers.webgl.TileLayer.prototype = {
	setTextureFromMap: function(gl,data) {
		if(this.tileTexture == null) this.tileTexture = gl.createTexture();
		gl.bindTexture(3553,this.tileTexture);
		gl.texImage2D(3553,0,6408,data.w,data.h,0,6408,5121,data.data8);
		gl.texParameteri(3553,10240,9728);
		gl.texParameteri(3553,10241,9728);
		gl.texParameteri(3553,10242,33071);
		gl.texParameteri(3553,10243,33071);
		this.inverseTextureSize[0] = 1 / data.w;
		this.inverseTextureSize[1] = 1 / data.h;
	}
	,setTexture: function(gl,image,repeat) {
		if(this.tileTexture == null) this.tileTexture = gl.createTexture();
		gl.bindTexture(3553,this.tileTexture);
		gl.texImage2D(3553,0,6408,6408,5121,image);
		gl.texParameteri(3553,10240,9728);
		gl.texParameteri(3553,10241,9728);
		if(repeat) {
			gl.texParameteri(3553,10242,10497);
			gl.texParameteri(3553,10243,10497);
		} else {
			gl.texParameteri(3553,10242,33071);
			gl.texParameteri(3553,10243,33071);
		}
		this.inverseTextureSize[0] = 1 / image.width;
		this.inverseTextureSize[1] = 1 / image.height;
	}
	,__class__: wgr.renderers.webgl.TileLayer
};
wgr.renderers.webgl.TileMap = function() {
};
wgr.renderers.webgl.TileMap.__name__ = ["wgr","renderers","webgl","TileMap"];
wgr.renderers.webgl.TileMap.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.TileMap.prototype = {
	Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.tileScale = 1.0;
		this.tileSize = 16;
		this.filtered = false;
		this.spriteSheet = gl.createTexture();
		this.layers = new Array();
		this.viewportSize = new wgr.geom.Point();
		this.scaledViewportSize = new Float32Array(2);
		this.inverseTileTextureSize = new Float32Array(2);
		this.inverseSpriteTextureSize = new Float32Array(2);
		this.quadVertBuffer = gl.createBuffer();
		gl.bindBuffer(34962,this.quadVertBuffer);
		var quadVerts = new Float32Array([-1,-1,0,1,1,-1,1,1,1,1,1,0,-1,-1,0,1,1,1,1,0,-1,1,0,0]);
		gl.bufferData(34962,quadVerts,35044);
		this.tilemapShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.TileMap.TILEMAP_VERTEX_SHADER,wgr.renderers.webgl.TileMap.TILEMAP_FRAGMENT_SHADER));
	}
	,Resize: function(width,height) {
		this.viewportSize.x = width;
		this.viewportSize.y = height;
		this.scaledViewportSize[0] = width / this.tileScale;
		this.scaledViewportSize[1] = height / this.tileScale;
	}
	,TileScale: function(scale) {
		this.tileScale = scale;
		this.scaledViewportSize[0] = this.viewportSize.x / scale;
		this.scaledViewportSize[1] = this.viewportSize.y / scale;
	}
	,Filtered: function(filtered) {
		this.filtered = filtered;
		this.gl.bindTexture(3553,this.spriteSheet);
		if(filtered) {
			this.gl.texParameteri(3553,10240,9728);
			this.gl.texParameteri(3553,10241,9728);
		} else {
			this.gl.texParameteri(3553,10240,9729);
			this.gl.texParameteri(3553,10241,9729);
		}
	}
	,SetSpriteSheet: function(image) {
		this.gl.bindTexture(3553,this.spriteSheet);
		this.gl.texImage2D(3553,0,6408,6408,5121,image);
		if(!this.filtered) {
			this.gl.texParameteri(3553,10240,9728);
			this.gl.texParameteri(3553,10241,9728);
		} else {
			this.gl.texParameteri(3553,10240,9729);
			this.gl.texParameteri(3553,10241,9729);
		}
		this.inverseSpriteTextureSize[0] = 1 / image.width;
		this.inverseSpriteTextureSize[1] = 1 / image.height;
	}
	,SetTileLayer: function(image,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.renderers.webgl.TileLayer();
		layer.setTexture(this.gl,image,false);
		layer.scrollScale.x = scrollScaleX;
		layer.scrollScale.y = scrollScaleY;
		this.layers.push(layer);
	}
	,SetTileLayerFromData: function(data,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.renderers.webgl.TileLayer();
		layer.setTextureFromMap(this.gl,data);
		layer.scrollScale.x = scrollScaleX;
		layer.scrollScale.y = scrollScaleY;
		this.layers.push(layer);
	}
	,RoundFunction: function(v) {
		return v;
		return Math.round(v * 10) / 10;
	}
	,Render: function(clip) {
		var x = -this.camera.position.x / (this.tileScale * 2);
		var y = -this.camera.position.y / (this.tileScale * 2);
		this.gl.enable(3042);
		this.gl.blendFunc(770,771);
		this.gl.useProgram(this.tilemapShader.program);
		this.gl.bindBuffer(34962,this.quadVertBuffer);
		this.gl.enableVertexAttribArray(this.tilemapShader.attribute.position);
		this.gl.enableVertexAttribArray(this.tilemapShader.attribute.texture);
		this.gl.vertexAttribPointer(this.tilemapShader.attribute.position,2,5126,false,16,0);
		this.gl.vertexAttribPointer(this.tilemapShader.attribute.texture,2,5126,false,16,8);
		this.gl.uniform2fv(this.tilemapShader.uniform.viewportSize,this.scaledViewportSize);
		this.gl.uniform2fv(this.tilemapShader.uniform.inverseSpriteTextureSize,this.inverseSpriteTextureSize);
		this.gl.uniform1f(this.tilemapShader.uniform.tileSize,this.tileSize);
		this.gl.uniform1f(this.tilemapShader.uniform.inverseTileSize,1 / this.tileSize);
		this.gl.activeTexture(33984);
		this.gl.uniform1i(this.tilemapShader.uniform.sprites,0);
		this.gl.bindTexture(3553,this.spriteSheet);
		this.gl.activeTexture(33985);
		this.gl.uniform1i(this.tilemapShader.uniform.tiles,1);
		var i = this.layers.length;
		while(i > 0) {
			i--;
			var layer = this.layers[i];
			var pX = this.RoundFunction(x * this.tileScale * layer.scrollScale.x);
			var pY = this.RoundFunction(y * this.tileScale * layer.scrollScale.y);
			this.gl.uniform2f(this.tilemapShader.uniform.viewOffset,pX,pY);
			this.gl.uniform2fv(this.tilemapShader.uniform.inverseTileTextureSize,layer.inverseTextureSize);
			this.gl.bindTexture(3553,layer.tileTexture);
			this.gl.drawArrays(4,0,6);
		}
	}
	,__class__: wgr.renderers.webgl.TileMap
};
wgr.renderers.webgl.WebGLBatch = function(gl) {
	this.gl = gl;
	this.size = 1;
	this.indexBuffer = gl.createBuffer();
	this.dataBuffer = gl.createBuffer();
	this.blendMode = 0;
	this.dynamicSize = 1;
};
wgr.renderers.webgl.WebGLBatch.__name__ = ["wgr","renderers","webgl","WebGLBatch"];
wgr.renderers.webgl.WebGLBatch.prototype = {
	Clean: function() {
	}
	,ResizeBatch: function(size) {
		this.size = size;
		this.dynamicSize = size;
		this.data = new Float32Array(this.dynamicSize * 20);
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35048);
		this.indices = new Uint16Array(this.dynamicSize * 6);
		var _g1 = 0;
		var _g = this.dynamicSize;
		while(_g1 < _g) {
			var i = _g1++;
			var index2 = i * 6;
			var index3 = i * 4;
			this.indices[index2] = index3;
			this.indices[index2 + 1] = index3 + 1;
			this.indices[index2 + 2] = index3 + 2;
			this.indices[index2 + 3] = index3;
			this.indices[index2 + 4] = index3 + 2;
			this.indices[index2 + 5] = index3 + 3;
		}
		this.gl.bindBuffer(34963,this.indexBuffer);
		this.gl.bufferData(34963,this.indices,35044);
	}
	,Flush: function(shader,texture,size) {
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35044);
		this.gl.vertexAttribPointer(shader.attribute.aVertexPosition,2,5126,false,20,0);
		this.gl.vertexAttribPointer(shader.attribute.aTextureCoord,2,5126,false,20,8);
		this.gl.vertexAttribPointer(shader.attribute.aColor,1,5126,false,20,16);
		this.gl.activeTexture(33984);
		this.gl.bindTexture(3553,texture);
		this.gl.drawElements(4,size * 6,5123,0);
	}
	,AddSpriteToBatch: function(sprite,indexRun) {
		var index = indexRun * 20;
		var frame = sprite.texture.frame;
		var tw = sprite.texture.baseTexture.width;
		var th = sprite.texture.baseTexture.height;
		var uvs = sprite.texture.uvs;
		this.data[index] = sprite.transformedVerts[0];
		this.data[index + 1] = sprite.transformedVerts[1];
		this.data[index + 2] = uvs[0];
		this.data[index + 3] = uvs[1];
		this.data[index + 4] = sprite.worldAlpha;
		this.data[index + 5] = sprite.transformedVerts[2];
		this.data[index + 6] = sprite.transformedVerts[3];
		this.data[index + 7] = uvs[2];
		this.data[index + 8] = uvs[3];
		this.data[index + 9] = sprite.worldAlpha;
		this.data[index + 10] = sprite.transformedVerts[4];
		this.data[index + 11] = sprite.transformedVerts[5];
		this.data[index + 12] = uvs[4];
		this.data[index + 13] = uvs[5];
		this.data[index + 14] = sprite.worldAlpha;
		this.data[index + 15] = sprite.transformedVerts[6];
		this.data[index + 16] = sprite.transformedVerts[7];
		this.data[index + 17] = uvs[6];
		this.data[index + 18] = uvs[7];
		this.data[index + 19] = sprite.worldAlpha;
	}
	,Render: function(shader,stage,clip) {
		this.gl.useProgram(shader.program);
		var node;
		var stack;
		var top;
		node = stage;
		stack = new Array();
		stack[0] = node;
		top = 1;
		var indexRun = 0;
		var currentTexture = null;
		while(top > 0) {
			var thisNode = stack[--top];
			if(thisNode.next != null) stack[top++] = thisNode.next;
			if(thisNode.head != null) stack[top++] = thisNode.head;
			if(thisNode._visible && thisNode.renderable) {
				var sprite = thisNode;
				if(sprite.texture.baseTexture.texture != currentTexture || indexRun == this.size) {
					this.Flush(shader,currentTexture,indexRun);
					indexRun = 0;
					currentTexture = sprite.texture.baseTexture.texture;
				}
				if(clip == null || sprite.aabb.intersect(clip)) {
					this.AddSpriteToBatch(sprite,indexRun);
					indexRun++;
				}
			}
		}
		if(indexRun > 0) this.Flush(shader,currentTexture,indexRun);
	}
	,Render2: function(shader,stage,clip) {
		var _g = this;
		this.gl.useProgram(shader.program);
		var indexRun = 0;
		var currentTexture = null;
		var renderDisplayObject = function(target,p) {
			if(!target._visible) return false;
			if(!target.renderable) return true;
			var sprite = target;
			if(sprite.texture.baseTexture.texture != currentTexture || indexRun == _g.size) {
				_g.Flush(shader,currentTexture,indexRun);
				indexRun = 0;
				currentTexture = sprite.texture.baseTexture.texture;
			}
			if(clip == null || sprite.aabb.intersect(clip)) {
				_g.AddSpriteToBatch(sprite,indexRun);
				indexRun++;
			}
			return true;
		};
		stage.applySlot(renderDisplayObject);
		if(indexRun > 0) this.Flush(shader,currentTexture,indexRun);
	}
	,Render1: function(shader,spriteHead,clip) {
		if(spriteHead == null) return;
		this.gl.useProgram(shader.program);
		var indexRun = 0;
		var sprite = spriteHead;
		var currentTexture = sprite.texture.baseTexture.texture;
		while(sprite != null) {
			if(sprite.texture.baseTexture.texture != currentTexture || indexRun == this.size) {
				this.Flush(shader,currentTexture,indexRun);
				indexRun = 0;
				currentTexture = sprite.texture.baseTexture.texture;
			}
			if(clip == null || sprite.aabb.intersect(clip)) {
				this.AddSpriteToBatch(sprite,indexRun);
				indexRun++;
			}
			sprite = sprite.nextSprite;
		}
		if(indexRun > 0) this.Flush(shader,currentTexture,indexRun);
	}
	,__class__: wgr.renderers.webgl.WebGLBatch
};
wgr.renderers.webgl.WebGLRenderer = function(stage,camera,view,width,height,transparent,antialias) {
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.stage = stage;
	this.camera = camera;
	this.view = view;
	this.contextLost = false;
	this.contextAttributes = { };
	this.contextAttributes.alpha = transparent;
	this.contextAttributes.antialias = antialias;
	this.contextAttributes.premultipliedAlpha = false;
	this.contextAttributes.stencil = false;
	this.renderers = new Array();
	this.InitalizeWebGlContext();
	this.Resize(width,height);
};
wgr.renderers.webgl.WebGLRenderer.__name__ = ["wgr","renderers","webgl","WebGLRenderer"];
wgr.renderers.webgl.WebGLRenderer.prototype = {
	InitalizeWebGlContext: function() {
		this.view.addEventListener("webglcontextlost",$bind(this,this.onContextLost),false);
		this.view.addEventListener("webglcontextrestored",$bind(this,this.onContextRestored),false);
		this.gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(this.view,this.contextAttributes);
		this.gl.disable(2929);
		this.gl.disable(2884);
		this.gl.enable(3042);
		this.gl.colorMask(true,true,true,this.contextAttributes.alpha);
		this.gl.clearColor(0,0,0,1);
	}
	,Resize: function(width,height) {
		this.width = width;
		this.height = height;
		this.view.width = width;
		this.view.height = height;
		this.gl.viewport(0,0,width,height);
	}
	,AddRenderer: function(renderer) {
		renderer.Init(this.gl,this.camera);
		renderer.Resize(this.width,this.height);
		this.renderers.push(renderer);
	}
	,Render: function(clip) {
		if(this.contextLost) return;
		this.stage.updateTransform();
		this.stage.PreRender();
		var _g = 0;
		var _g1 = this.renderers;
		while(_g < _g1.length) {
			var renderer = _g1[_g];
			++_g;
			renderer.Render(clip);
		}
	}
	,onContextLost: function(event) {
		this.contextLost = true;
		console.log("webGL Context Lost");
	}
	,onContextRestored: function(event) {
		this.contextLost = false;
		console.log("webGL Context Restored");
	}
	,__class__: wgr.renderers.webgl.WebGLRenderer
};
wgr.renderers.webgl.WebGLShaders = function() { };
wgr.renderers.webgl.WebGLShaders.__name__ = ["wgr","renderers","webgl","WebGLShaders"];
wgr.renderers.webgl.WebGLShaders.CompileVertexShader = function(gl,shaderSrc) {
	return wgr.renderers.webgl.WebGLShaders.CompileShader(gl,shaderSrc,35633);
};
wgr.renderers.webgl.WebGLShaders.CompileFragmentShader = function(gl,shaderSrc) {
	return wgr.renderers.webgl.WebGLShaders.CompileShader(gl,shaderSrc,35632);
};
wgr.renderers.webgl.WebGLShaders.CompileShader = function(gl,shaderSrc,shaderType) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,35713)) {
		js.Lib.alert(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
};
wgr.renderers.webgl.WebGLShaders.CompileProgram = function(gl,vertexSrc,fragmentSrc) {
	var vertexShader = wgr.renderers.webgl.WebGLShaders.CompileVertexShader(gl,vertexSrc);
	var fragmentShader = wgr.renderers.webgl.WebGLShaders.CompileFragmentShader(gl,fragmentSrc);
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);
	if(!gl.getProgramParameter(shaderProgram,35714)) {
		js.Lib.alert("Could not initialize program");
		console.log(vertexSrc);
		console.log(fragmentSrc);
		console.log(gl.getProgramInfoLog(shaderProgram));
	}
	return shaderProgram;
};
wgr.texture = {};
wgr.texture.BaseTexture = function(source) {
	this.source = source;
	this.powerOfTwo = false;
	this.resolution = 1;
	this.width = source.width;
	this.height = source.width;
};
wgr.texture.BaseTexture.__name__ = ["wgr","texture","BaseTexture"];
wgr.texture.BaseTexture.prototype = {
	RegisterTexture: function(gl) {
		if(this.texture == null) this.texture = gl.createTexture();
		gl.bindTexture(3553,this.texture);
		gl.pixelStorei(37441,1);
		gl.texImage2D(3553,0,6408,6408,5121,this.source);
		gl.texParameteri(3553,10240,9729);
		gl.texParameteri(3553,10241,9729);
		if(this.powerOfTwo) {
			gl.texParameteri(3553,10242,10497);
			gl.texParameteri(3553,10243,10497);
		} else {
			gl.texParameteri(3553,10242,33071);
			gl.texParameteri(3553,10243,33071);
		}
		gl.bindTexture(3553,null);
	}
	,UnregisterTexture: function(gl) {
		if(this.texture != null) {
		}
	}
	,__class__: wgr.texture.BaseTexture
};
wgr.texture.Texture = function(baseTexture,frame,pivot) {
	this.noFrame = false;
	this.baseTexture = baseTexture;
	if(frame == null) {
		this.noFrame = true;
		this.frame = new wgr.geom.Rectangle(0,0,1,1);
	} else this.frame = frame;
	this.trim = new wgr.geom.Point();
	if(pivot == null) this.pivot = new wgr.geom.Point(); else this.pivot = pivot;
	this.uvs = new Float32Array(8);
	this.updateUVS();
};
wgr.texture.Texture.__name__ = ["wgr","texture","Texture"];
wgr.texture.Texture.prototype = {
	updateUVS: function() {
		var tw = this.baseTexture.width;
		var th = this.baseTexture.height;
		this.uvs[0] = this.frame.x / tw;
		this.uvs[1] = this.frame.y / th;
		this.uvs[2] = (this.frame.x + this.frame.width) / tw;
		this.uvs[3] = this.frame.y / th;
		this.uvs[4] = (this.frame.x + this.frame.width) / tw;
		this.uvs[5] = (this.frame.y + this.frame.height) / th;
		this.uvs[6] = this.frame.x / tw;
		this.uvs[7] = (this.frame.y + this.frame.height) / th;
	}
	,__class__: wgr.texture.Texture
};
wgr.texture.TextureManager = function(gl) {
	this.gl = gl;
	this.baseTextures = new haxe.ds.StringMap();
	this.textures = new haxe.ds.StringMap();
};
wgr.texture.TextureManager.__name__ = ["wgr","texture","TextureManager"];
wgr.texture.TextureManager.prototype = {
	AddTexture: function(id,image) {
		var baseTexture = new wgr.texture.BaseTexture(image);
		baseTexture.RegisterTexture(this.gl);
		this.baseTextures.set(id,baseTexture);
		return baseTexture;
	}
	,ParseTexturePackerJSON: function(textureConfig,id) {
		if(!(typeof(textureConfig) == "string")) return;
		var baseTexture = this.baseTextures.get(id);
		var textureData = JSON.parse(textureConfig);
		var fields = Reflect.fields(textureData.frames);
		var _g = 0;
		while(_g < fields.length) {
			var prop = fields[_g];
			++_g;
			var frame = Reflect.field(textureData.frames,prop);
			this.textures.set(prop,new wgr.texture.Texture(baseTexture,new wgr.geom.Rectangle(Std.parseInt(frame.frame.x),Std.parseInt(frame.frame.y),Std.parseInt(frame.frame.w),Std.parseInt(frame.frame.h)),new wgr.geom.Point(Std.parseFloat(frame.pivot.x),Std.parseFloat(frame.pivot.y))));
		}
	}
	,ParseTexturesFromTiles: function(tileSize,id) {
	}
	,__class__: wgr.texture.TextureManager
};
var worldEngine = {};
worldEngine.World = function(worldData) {
	this.worldData = worldData;
	this.worldBody = new physics.dynamics.Body();
	this.worldBody.MakeStatic();
};
worldEngine.World.__name__ = ["worldEngine","World"];
worldEngine.World.prototype = {
	Collide: function(body) {
	}
	,__class__: worldEngine.World
};
worldEngine.WorldData = function(tileSize,tmxMap,collisionLayerName) {
	this.tileSize = tileSize;
	this.invTileSize = 1 / tileSize;
	this.tmxMap = tmxMap;
	this.tileFactory = new worldEngine.tiles.TileFactory();
	this.collisionData = engine.map.tmx.TmxLayer.layerToCollisionMap(tmxMap.getLayer(collisionLayerName));
	this.worldBounds = new physics.geometry.AABB(0,this.collisionData.h * tileSize,this.collisionData.w * tileSize,0);
	this.worldCellSize = this.worldBounds.width();
};
worldEngine.WorldData.__name__ = ["worldEngine","WorldData"];
worldEngine.WorldData.prototype = {
	InitalizeWorld: function() {
		this.ProcessTiles();
		this.ProcessObjects();
		this.ProcessWayPoints();
	}
	,Index: function(value) {
		return value * this.invTileSize | 0;
	}
	,ProcessTiles: function() {
	}
	,ProcessObjects: function() {
	}
	,ProcessWayPoints: function() {
	}
	,__class__: worldEngine.WorldData
};
worldEngine.WorldPhysicsEngine = function(fps,pps,narrowphase,worldData) {
	this.worldBody = new physics.dynamics.Body();
	this.worldBody.MakeStatic();
	this.worldData = worldData;
	physics.collision.broadphase.managedgrid.ManagedGrid.call(this,fps,pps,narrowphase,Math.ceil(worldData.worldBounds.width() / worldData.worldCellSize),Math.ceil(worldData.worldBounds.height() / worldData.worldCellSize),worldData.worldCellSize);
	this.tempFeature = new physics.dynamics.Feature(this.worldBody,null,new physics.dynamics.Material());
	this.tempFeature.position = new physics.geometry.Vector2D();
	this.collisionData = worldData.collisionData;
	this.collisionOrderX = [0,-1,1];
	this.collisionOrderY = [2,1,0,-1,-2];
};
worldEngine.WorldPhysicsEngine.__name__ = ["worldEngine","WorldPhysicsEngine"];
worldEngine.WorldPhysicsEngine.__super__ = physics.collision.broadphase.managedgrid.ManagedGrid;
worldEngine.WorldPhysicsEngine.prototype = $extend(physics.collision.broadphase.managedgrid.ManagedGrid.prototype,{
	Collide: function() {
		physics.collision.broadphase.managedgrid.ManagedGrid.prototype.Collide.call(this);
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			var _g3 = 0;
			var _g2 = cell.dynamicItems.length;
			while(_g3 < _g2) {
				var i = _g3++;
				var body = cell.dynamicItems[i];
				var _g4 = 0;
				var _g5 = body.features;
				while(_g4 < _g5.length) {
					var bodyFeature = _g5[_g4];
					++_g4;
					var cx = ((bodyFeature.shape.aabb.r + bodyFeature.shape.aabb.l) / 2 + body.position.x) * this.worldData.invTileSize | 0;
					var cy = ((bodyFeature.shape.aabb.b + bodyFeature.shape.aabb.t) / 2 + body.position.y) * this.worldData.invTileSize | 0;
					var _g6 = 0;
					var _g7 = this.collisionOrderY;
					while(_g6 < _g7.length) {
						var y = _g7[_g6];
						++_g6;
						var _g8 = 0;
						var _g9 = this.collisionOrderX;
						while(_g8 < _g9.length) {
							var x = _g9[_g8];
							++_g8;
							var tileID = this.collisionData.get(cx + x,cy + y);
							if(tileID > 0) {
								this.tempFeature.shape = this.worldData.tileFactory.tiles[tileID];
								this.tempFeature.position.setTo((cx + x) * this.worldData.tileSize,(cy + y) * this.worldData.tileSize);
								this.narrowphase.CollideFeatures(this.tempFeature,bodyFeature);
							}
						}
					}
				}
			}
		}
	}
	,CastRay: function(ray) {
		var x = ray.origin.x * this.worldData.invTileSize | 0;
		var y = ray.origin.y * this.worldData.invTileSize | 0;
		var cpos_x = x * this.worldData.tileSize;
		var cpos_y = y * this.worldData.tileSize;
		var d = ray.direction;
		var p_x = ray.origin.x;
		var p_y = ray.origin.y;
		var op_x = ray.origin.x;
		var op_y = ray.origin.y;
		var flipFlop = true;
		var transitionEdge = 0;
		var out;
		var stepX;
		var tMaxX;
		var tDeltaX;
		if(d.x < 0) {
			stepX = -1;
			tMaxX = (cpos_x - ray.origin.x) / d.x;
			tDeltaX = this.worldData.tileSize / -d.x;
		} else if(0 < d.x) {
			stepX = 1;
			tMaxX = (cpos_x + this.worldData.tileSize - ray.origin.x) / d.x;
			tDeltaX = this.worldData.tileSize / d.x;
		} else {
			stepX = 0;
			tMaxX = 100000000;
			tDeltaX = 0;
		}
		var stepY;
		var tMaxY;
		var tDeltaY;
		if(d.y < 0) {
			stepY = -1;
			tMaxY = (cpos_y - ray.origin.y) / d.y;
			tDeltaY = this.worldData.tileSize / -d.y;
		} else if(0 < d.y) {
			stepY = 1;
			tMaxY = (cpos_y + this.worldData.tileSize - ray.origin.y) / d.y;
			tDeltaY = this.worldData.tileSize / d.y;
		} else {
			stepY = 0;
			tMaxY = 100000000;
			tDeltaY = 0;
		}
		var tileID = this.collisionData.get(x,y);
		var tile;
		if(tileID > 0) {
			tile = this.worldData.tileFactory.tiles[tileID];
			this.tempFeature.shape = this.worldData.tileFactory.tiles[tileID];
			this.tempFeature.position.setTo(cpos_x,cpos_y);
			if(this.tempFeature.shape.IntersectRay(ray,this.tempFeature)) {
				out = ray.ClosestIntersectPoint();
				return out;
			}
		}
		while(true) {
			if(tMaxX < tMaxY) {
				if(stepX < 0) transitionEdge = 1; else transitionEdge = 3;
				p_x = ray.origin.x + tMaxX * d.x;
				p_y = ray.origin.y + tMaxX * d.y;
				tMaxX = tMaxX + tDeltaX;
				x = x + stepX;
			} else {
				if(stepY < 0) transitionEdge = 2; else transitionEdge = 0;
				p_x = ray.origin.x + tMaxY * d.x;
				p_y = ray.origin.y + tMaxY * d.y;
				tMaxY = tMaxY + tDeltaY;
				y = y + stepY;
			}
			tileID = this.collisionData.get(x,y);
			var distX = p_x - ray.origin.x;
			var distY = p_y - ray.origin.y;
			var currentLen = distX * distX + distY * distY;
			if(currentLen > ray.rangeSqr) {
				ray.ReportResult(null,Math.sqrt(currentLen));
				return null;
			}
			if(tileID > 0) {
				tile = this.worldData.tileFactory.tiles[tileID];
				this.tempFeature.shape = tile;
				if(transitionEdge == 0 && tile.edgeT == 1 || transitionEdge == 1 && tile.edgeR == 1 || transitionEdge == 2 && tile.edgeB == 1 || transitionEdge == 3 && tile.edgeL == 1) {
					out = new physics.geometry.Vector2D(p_x,p_y);
					ray.ReportResult(this.tempFeature,Math.sqrt(currentLen));
					return out;
				} else {
					this.tempFeature.position.setTo(x * this.worldData.tileSize,y * this.worldData.tileSize);
					if(this.tempFeature.shape.IntersectRay(ray,this.tempFeature)) {
						out = ray.ClosestIntersectPoint();
						return out;
					}
				}
			}
			op_x = p_x;
			op_y = p_y;
		}
		return null;
	}
	,__class__: worldEngine.WorldPhysicsEngine
});
worldEngine.tiles = {};
worldEngine.tiles.TileSegment = function(v0,v1,mask) {
	this.v0 = v0;
	this.v1 = v1;
	this.mask = mask;
};
worldEngine.tiles.TileSegment.__name__ = ["worldEngine","tiles","TileSegment"];
worldEngine.tiles.TileSegment.prototype = {
	CheckVertexPairAndApplyMask: function(c0,c1) {
		if(this.v0.isEquals(c0) && this.v1.isEquals(c1) || this.v0.isEquals(c1) && this.v1.isEquals(c0)) return this.mask;
		return 0;
	}
	,__class__: worldEngine.tiles.TileSegment
};
worldEngine.tiles.Tile = function(size,originalVertMask,tileID,modifier) {
	this.modifier = modifier;
	this.size = size;
	this.originalVertMask = originalVertMask;
	this.GetScaledVerts();
	physics.geometry.Polygon.call(this,this.scaledVerts,new physics.geometry.Vector2D());
	this.tileWidth = size;
	this.tileID = tileID;
	if((modifier & 4) > 0) this.tileID = -2147483648 | this.tileID;
	if((modifier & 2) > 0) this.tileID = 1073741824 | this.tileID;
	if((modifier & 1) > 0) this.tileID = 536870912 | this.tileID;
};
worldEngine.tiles.Tile.__name__ = ["worldEngine","tiles","Tile"];
worldEngine.tiles.Tile.IsCollidable = function(data) {
	return true;
};
worldEngine.tiles.Tile.__super__ = physics.geometry.Polygon;
worldEngine.tiles.Tile.prototype = $extend(physics.geometry.Polygon.prototype,{
	GetScaledVerts: function() {
		var vertMask = this.originalVertMask;
		var _g1 = 0;
		var _g = this.modifier;
		while(_g1 < _g) {
			var i = _g1++;
			vertMask = this.rotateClockwise(vertMask);
		}
		this.unscaledVerts = new Array();
		var _g11 = 0;
		var _g2 = vertMask.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(vertMask[i1] == 1) this.unscaledVerts.push(worldEngine.tiles.Tile.VERTS[i1].clone());
		}
		var numVerts = this.unscaledVerts.length;
		var _g3 = 0;
		while(_g3 < numVerts) {
			var i2 = _g3++;
			var v0 = this.unscaledVerts[i2];
			var v1 = this.unscaledVerts[(i2 + 1) % numVerts];
			var n = new physics.geometry.Vector2D(v1.x - v0.x,v1.y - v0.y).rightHandNormal().unit();
			var _g12 = 0;
			var _g21 = worldEngine.tiles.Tile.VERT_TO_SEG_DEF;
			while(_g12 < _g21.length) {
				var segment = _g21[_g12];
				++_g12;
				var mask = segment.CheckVertexPairAndApplyMask(v0,v1);
				if(mask > 0) {
					this.edges |= mask;
					if(n.y < 0 || n.x == -1 && n.y == 0) this.edgeUp |= mask;
					break;
				}
			}
		}
		if((this.edges & worldEngine.tiles.Tile.SEG_7) > 0 && (this.edges & worldEngine.tiles.Tile.SEG_8) > 0) this.edgeT = 1; else this.edgeT = 4;
		if((this.edges & worldEngine.tiles.Tile.SEG_5) > 0 && (this.edges & worldEngine.tiles.Tile.SEG_6) > 0) this.edgeR = 1; else this.edgeR = 4;
		if((this.edges & worldEngine.tiles.Tile.SEG_3) > 0 && (this.edges & worldEngine.tiles.Tile.SEG_4) > 0) this.edgeB = 1; else this.edgeB = 4;
		if((this.edges & worldEngine.tiles.Tile.SEG_1) > 0 && (this.edges & worldEngine.tiles.Tile.SEG_2) > 0) this.edgeL = 1; else this.edgeL = 4;
		this.scaledVerts = new Array();
		var _g4 = 0;
		var _g13 = this.unscaledVerts;
		while(_g4 < _g13.length) {
			var v = _g13[_g4];
			++_g4;
			this.scaledVerts.push(v.mult(this.size));
		}
	}
	,CheckVertexPair: function(v0,v1,c0,c1) {
		return v0.x == c0.x && v0.y == c0.y && (v1.x == c1.x && v1.y == c1.y) || v0.x == c1.x && v0.y == c1.y && (v1.x == c0.x && v1.y == c0.y);
	}
	,rotateClockwise: function(verts) {
		var result = [];
		result[0] = verts[6];
		result[1] = verts[7];
		result[2] = verts[0];
		result[3] = verts[1];
		result[4] = verts[2];
		result[5] = verts[3];
		result[6] = verts[4];
		result[7] = verts[5];
		result[8] = verts[8];
		return result;
	}
	,__class__: worldEngine.tiles.Tile
});
worldEngine.tiles.TileFactory = function() {
	this.tiles = new Array();
	this.tilesDict = new haxe.ds.IntMap();
	this.tileTypes = new haxe.ds.StringMap();
	this.Initalize();
};
worldEngine.tiles.TileFactory.__name__ = ["worldEngine","tiles","TileFactory"];
worldEngine.tiles.TileFactory.prototype = {
	Initalize: function() {
		var idInc = 0;
		var _g = new haxe.ds.StringMap();
		_g.set("empty",[0,0,0,0,0,0,0,0,0]);
		_g.set("full",[1,0,1,0,1,0,1,0,0]);
		_g.set("half45",[1,0,1,0,1,0,0,0,0]);
		_g.set("half",[1,0,1,1,0,0,0,1,0]);
		_g.set("half22",[1,0,1,1,0,0,0,0,0]);
		_g.set("half66",[0,1,1,0,1,0,0,0,0]);
		_g.set("full22",[1,0,1,0,1,0,0,1,0]);
		_g.set("full66",[1,0,1,0,1,1,0,0,0]);
		this.tileTypes = _g;
		var $it0 = this.tileTypes.iterator();
		while( $it0.hasNext() ) {
			var tileType = $it0.next();
			var modifierCount;
			if(idInc < 2) modifierCount = 1; else modifierCount = 4;
			var _g1 = 0;
			while(_g1 < modifierCount) {
				var modifier = _g1++;
				this.tiles.push(new worldEngine.tiles.Tile(32,tileType,idInc++,modifier));
			}
		}
	}
	,__class__: worldEngine.tiles.TileFactory
};
worldEngine.tiles.TileFeature = function(tile) {
	this.tile = tile;
	this.data = 2;
	if(tile.vertices.length > 0) this.data |= 1; else this.data &= -2;
};
worldEngine.tiles.TileFeature.__name__ = ["worldEngine","tiles","TileFeature"];
worldEngine.tiles.TileFeature.prototype = {
	HasFlagBool: function(flag) {
		return (this.data & flag) > 0;
	}
	,SetFlagBool: function(flag,state) {
		if(state) this.data |= flag; else this.data &= ~flag;
	}
	,SetRandomData: function(random) {
		this.data |= random << 24;
	}
	,GetRandomData: function() {
		return this.data >> 24 & 255;
	}
	,SetStyleData: function(style) {
		this.data |= style << 16;
	}
	,GetStyleData: function() {
		return this.data >> 16 & 255;
	}
	,SetEdgeData: function(left,up,right,down) {
		if(!((this.data & 1) > 0)) return;
		if(left != null && (left.data & 1) > 0) {
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_1) > 0 && (left.tile.edges & worldEngine.tiles.Tile.SEG_6) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_1;
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_2) > 0 && (left.tile.edges & worldEngine.tiles.Tile.SEG_5) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_2;
		}
		if(right != null && (right.data & 1) > 0) {
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_6) > 0 && (right.tile.edges & worldEngine.tiles.Tile.SEG_1) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_6;
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_5) > 0 && (right.tile.edges & worldEngine.tiles.Tile.SEG_2) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_5;
		}
		if(up != null && (up.data & 1) > 0) {
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_8) > 0 && (up.tile.edges & worldEngine.tiles.Tile.SEG_3) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_8;
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_7) > 0 && (up.tile.edges & worldEngine.tiles.Tile.SEG_4) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_7;
		}
		if(down != null && (down.data & 1) > 0) {
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_3) > 0 && (down.tile.edges & worldEngine.tiles.Tile.SEG_8) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_3;
			if((this.tile.edges & worldEngine.tiles.Tile.SEG_4) > 0 && (down.tile.edges & worldEngine.tiles.Tile.SEG_7) > 0) this.edgeData |= worldEngine.tiles.Tile.SEG_4;
		}
	}
	,__class__: worldEngine.tiles.TileFeature
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
ds.IDManager.NEXT_PERSISTENT_ID = 0;
ds.IDManager.TRANSIENT_START_ID = 10000;
ds.IDManager.TRANSIENT_CACHE_LENGTH = 10000;
ds.IDManager.TRANSIENT_CACHE = (function($this) {
	var $r;
	var cache = new Array();
	{
		var _g1 = 0;
		var _g = ds.IDManager.TRANSIENT_CACHE_LENGTH;
		while(_g1 < _g) {
			var i = _g1++;
			cache.push(ds.IDManager.TRANSIENT_START_ID + i);
		}
	}
	$r = cache;
	return $r;
}(this));
ds.IDManager.TRANSIENT_POINTER = 0;
engine.ai.steering.SteeringBehavior.CALCULATE_SUM = 0;
engine.ai.steering.SteeringBehavior.CALCULATE_SPEED = 1;
engine.ai.steering.SteeringBehavior.CALCULATE_ACCURACY = 2;
engine.ai.steering.SteeringSettings.speedTweaker = .3;
engine.ai.steering.SteeringSettings.arriveFast = 1;
engine.ai.steering.SteeringSettings.arriveNormal = 3;
engine.ai.steering.SteeringSettings.arriveSlow = 5;
engine.ai.steering.SteeringSettings.wanderJitter = 300;
engine.ai.steering.SteeringSettings.wanderDistance = 25;
engine.ai.steering.SteeringSettings.wanderRadius = 15;
engine.ai.steering.SteeringSettings.separationProbability = 0.2;
engine.ai.steering.SteeringSettings.cohesionProbability = 0.6;
engine.ai.steering.SteeringSettings.alignmentProbability = 0.3;
engine.ai.steering.SteeringSettings.dodgeProbability = 0.6;
engine.ai.steering.SteeringSettings.seekProbability = 0.8;
engine.ai.steering.SteeringSettings.fleeProbability = 0.6;
engine.ai.steering.SteeringSettings.pursuitProbability = 0.8;
engine.ai.steering.SteeringSettings.evadeProbability = 1;
engine.ai.steering.SteeringSettings.offsetPursuitProbability = 0.8;
engine.ai.steering.SteeringSettings.arriveProbability = 0.5;
engine.ai.steering.SteeringSettings.obstacleAvoidanceProbability = 0.5;
engine.ai.steering.SteeringSettings.wallAvoidanceProbability = 0.5;
engine.ai.steering.SteeringSettings.hideProbability = 0.8;
engine.ai.steering.SteeringSettings.followPathProbability = 0.7;
engine.ai.steering.SteeringSettings.interposeProbability = 0.8;
engine.ai.steering.SteeringSettings.wanderProbability = 0.8;
engine.ai.steering.SteeringSettings.separationWeight = 1;
engine.ai.steering.SteeringSettings.alignmentWeight = 3;
engine.ai.steering.SteeringSettings.cohesionWeight = 2;
engine.ai.steering.SteeringSettings.dodgeWeight = 1;
engine.ai.steering.SteeringSettings.seekWeight = 1;
engine.ai.steering.SteeringSettings.fleeWeight = 1;
engine.ai.steering.SteeringSettings.pursuitWeight = 1;
engine.ai.steering.SteeringSettings.evadeWeight = 0.1;
engine.ai.steering.SteeringSettings.offsetPursuitWeight = 1;
engine.ai.steering.SteeringSettings.arriveWeight = 1;
engine.ai.steering.SteeringSettings.obstacleAvoidanceWeight = 10;
engine.ai.steering.SteeringSettings.wallAvoidanceWeight = 10;
engine.ai.steering.SteeringSettings.hideWeight = 1;
engine.ai.steering.SteeringSettings.followPathWeight = 0.5;
engine.ai.steering.SteeringSettings.interposeWeight = 1;
engine.ai.steering.SteeringSettings.wanderWeight = 1;
engine.ai.steering.SteeringSettings.wallAvoidancePriority = 10;
engine.ai.steering.SteeringSettings.obstacleAvoidancePriority = 20;
engine.ai.steering.SteeringSettings.evadePriority = 30;
engine.ai.steering.SteeringSettings.hidePriority = 35;
engine.ai.steering.SteeringSettings.seperationPriority = 40;
engine.ai.steering.SteeringSettings.alignmentPriority = 50;
engine.ai.steering.SteeringSettings.cohesionPriority = 60;
engine.ai.steering.SteeringSettings.dodgePriority = 65;
engine.ai.steering.SteeringSettings.seekPriority = 70;
engine.ai.steering.SteeringSettings.fleePriority = 80;
engine.ai.steering.SteeringSettings.arrivePriority = 90;
engine.ai.steering.SteeringSettings.pursuitPriority = 100;
engine.ai.steering.SteeringSettings.offsetPursuitPriority = 110;
engine.ai.steering.SteeringSettings.interposePriority = 120;
engine.ai.steering.SteeringSettings.followPathPriority = 130;
engine.ai.steering.SteeringSettings.wanderPriority = 140;
engine.ai.steering.behaviours.Seek.wanderResult = new physics.geometry.Vector2D();
engine.components.CameraController.NAME = "CameraController";
engine.components.Controls.NAME = "Controls";
engine.components.Display.NAME = "Display";
engine.components.Lifecycle.NAME = "Lifecycle";
engine.components.ParticleEmitters.NAME = "ParticleEmitters";
engine.components.Physics.NAME = "Physics";
engine.components.Position.NAME = "Position";
engine.components.Script.NAME = "Script";
engine.components.Steering.NAME = "Steering";
engine.map.tmx.TmxLayer.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
game.exile.Exile.TEXTURE_CONFIG = "data/sprites.json";
game.exile.Exile.TEXTURE_DATA = "data/sprites.png";
game.exile.Exile.MAP_DATA = "data/testMap.tmx";
game.exile.Exile.TILE_SPRITE_SHEET = "data/spelunky-tiles.png";
game.exile.Exile.TILE_MAP_DATA_1 = "data/spelunky0.png";
game.exile.Exile.TILE_MAP_DATA_2 = "data/spelunky1.png";
game.exile.components.Player.NAME = "Player";
game.exile.components.ProjectileA.NAME = "ProjectileA";
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
physics.Constants.FMAX = 1e99;
physics.Constants.SLEEP_BIAS = 0.99332805041467;
physics.Constants.SLEEP_EPSILON = 0.0009;
physics.Constants.WAKE_MOTION = 10;
physics.dynamics.Body.nextBodyID = 0;
physics.geometry.GeometricShape.nextUID = 0;
physics.geometry.Ray.MAX_RANGE = 1e100;
physics.geometry.Shapes.AXIS_ALIGNED_BOX_SHAPE = 0;
physics.geometry.Shapes.CIRCLE_SHAPE = 1;
physics.geometry.Shapes.SEGMENT_SHAPE = 2;
physics.geometry.Shapes.POLYGON_SHAPE = 4;
physics.geometry.Shapes.POLYGON_POLYGON = 4;
physics.geometry.Shapes.CIRCLE_POLYGON = 5;
physics.geometry.Shapes.CIRCLE_CIRCLE = 1;
physics.geometry.Shapes.CIRCLE_SEGMENT = 3;
physics.geometry.Shapes.SEGMENT_POLYGON = 6;
utils.Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
utils.Limits.INT8_MIN = -128;
utils.Limits.INT8_MAX = 127;
utils.Limits.UINT8_MAX = 255;
utils.Limits.INT16_MIN = -32768;
utils.Limits.INT16_MAX = 32767;
utils.Limits.UINT16_MAX = 65535;
utils.Limits.INT32_MIN = -2147483648;
utils.Limits.INT32_MAX = 2147483647;
utils.Limits.UINT32_MAX = -1;
utils.Limits.INT_BITS = 32;
utils.Limits.FLOAT_MAX = 3.40282346638528e+38;
utils.Limits.FLOAT_MIN = -3.40282346638528e+38;
utils.Limits.DOUBLE_MAX = 1.79769313486231e+308;
utils.Limits.DOUBLE_MIN = -1.79769313486231e+308;
utils.Maths.ZERO_TOLERANCE = 1e-08;
utils.Maths.RAD_DEG = 57.2957795130823229;
utils.Maths.DEG_RAD = 0.0174532925199432955;
utils.Maths.LN2 = 0.6931471805599453;
utils.Maths.LN10 = 2.302585092994046;
utils.Maths.PIHALF = 1.5707963267948966;
utils.Maths.PI = 3.141592653589793;
utils.Maths.PI2 = 6.283185307179586;
utils.Maths.EPS = 1e-6;
utils.Maths.SQRT2 = 1.414213562373095;
utils.Random.PseudoRandomSeed = 3489752;
wgr.particle.BlockSpriteParticle.INV_ALPHA = 0.00392156862745098;
wgr.particle.PointSpriteParticle.INV_ALPHA = 0.00392156862745098;
wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","uniform vec2 projectionVector;","attribute vec2 position;","attribute float size;","attribute vec4 colour;","varying vec4 vColor;","void main() {","gl_PointSize = size;","vColor = colour;","gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec4 vColor;","void main() {","gl_FragColor = vColor;","}"];
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","uniform float texTilesWide;","uniform float texTilesHigh;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 projectionVector;","uniform vec2 flip;","attribute vec2 position;","attribute float size;","attribute float tileType;","attribute vec4 colour;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","float t = floor(tileType/texTilesWide);","vTilePos = vec2(tileType-(t*texTilesWide), t);","gl_PointSize = size;","vColor = colour;","gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","uniform sampler2D texture;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 flip;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","vec2 uv = vec2( ((-1.0+(2.0*flip.x))*(flip.x-gl_PointCoord.x))*invTexTilesWide + invTexTilesWide*vTilePos.x, ((-1.0+(2.0*flip.y))*(flip.y-gl_PointCoord.y))*invTexTilesHigh + invTexTilesHigh*vTilePos.y);","gl_FragColor = texture2D( texture, uv ) * vColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler,vTextureCoord) * vColor;","}"];
wgr.renderers.webgl.TileMap.TILEMAP_VERTEX_SHADER = ["precision mediump float;","attribute vec2 position;","attribute vec2 texture;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform vec2 viewOffset;","uniform vec2 viewportSize;","uniform vec2 inverseTileTextureSize;","uniform float inverseTileSize;","void main(void) {","   pixelCoord = (texture * viewportSize) + viewOffset;","   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;","   gl_Position = vec4(position, 0.0, 1.0);","}"];
wgr.renderers.webgl.TileMap.TILEMAP_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform sampler2D tiles;","uniform sampler2D sprites;","uniform vec2 inverseTileTextureSize;","uniform vec2 inverseSpriteTextureSize;","uniform float tileSize;","void main(void) {","   vec4 tile = texture2D(tiles, texCoord);","   if(tile.x == 1.0 && tile.y == 1.0) { discard; }","   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;","   vec2 spriteCoord = mod(pixelCoord, tileSize);","   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);","}"];
worldEngine.tiles.Tile.ZERO = 0;
worldEngine.tiles.Tile.HALF = 0.5;
worldEngine.tiles.Tile.ONE = 1;
worldEngine.tiles.Tile.TOP_LEFT_0 = new physics.geometry.Vector2D(0,0);
worldEngine.tiles.Tile.MIDDLE_LEFT_1 = new physics.geometry.Vector2D(0,0.5);
worldEngine.tiles.Tile.BOTTOM_LEFT_2 = new physics.geometry.Vector2D(0,1);
worldEngine.tiles.Tile.BOTTOM_MIDDLE_3 = new physics.geometry.Vector2D(0.5,1);
worldEngine.tiles.Tile.BOTTOM_RIGHT_4 = new physics.geometry.Vector2D(1,1);
worldEngine.tiles.Tile.MIDDLE_RIGHT_5 = new physics.geometry.Vector2D(1,0.5);
worldEngine.tiles.Tile.TOP_RIGHT_6 = new physics.geometry.Vector2D(1,0);
worldEngine.tiles.Tile.TOP_MIDDLE_7 = new physics.geometry.Vector2D(0.5,0);
worldEngine.tiles.Tile.MIDDLE_MIDDLE_8 = new physics.geometry.Vector2D(0.5,0.5);
worldEngine.tiles.Tile.VERTS = [worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.MIDDLE_MIDDLE_8];
worldEngine.tiles.Tile.EDGE_STATE_OFF = 0;
worldEngine.tiles.Tile.EDGE_STATE_FULL = 1;
worldEngine.tiles.Tile.EDGE_STATE_INTERESTING = 4;
worldEngine.tiles.Tile.EDGE_TOP = 0;
worldEngine.tiles.Tile.EDGE_RIGHT = 1;
worldEngine.tiles.Tile.EDGE_BOTTOM = 2;
worldEngine.tiles.Tile.EDGE_LEFT = 3;
worldEngine.tiles.Tile.SEG_1 = 1;
worldEngine.tiles.Tile.SEG_2 = 2;
worldEngine.tiles.Tile.SEG_3 = 4;
worldEngine.tiles.Tile.SEG_4 = 8;
worldEngine.tiles.Tile.SEG_5 = 16;
worldEngine.tiles.Tile.SEG_6 = 32;
worldEngine.tiles.Tile.SEG_7 = 64;
worldEngine.tiles.Tile.SEG_8 = 128;
worldEngine.tiles.Tile.SEG_9 = 256;
worldEngine.tiles.Tile.SEG_10 = 512;
worldEngine.tiles.Tile.SEG_11 = 1024;
worldEngine.tiles.Tile.SEG_12 = 2048;
worldEngine.tiles.Tile.SEG_13 = 4096;
worldEngine.tiles.Tile.SEG_14 = 8192;
worldEngine.tiles.Tile.SEG_15 = 16384;
worldEngine.tiles.Tile.SEG_16 = 32768;
worldEngine.tiles.Tile.SEG_17 = 65536;
worldEngine.tiles.Tile.SEG_18 = 131072;
worldEngine.tiles.Tile.SEG_19 = 262144;
worldEngine.tiles.Tile.SEG_20 = 524288;
worldEngine.tiles.Tile.SEG_21 = 1048576;
worldEngine.tiles.Tile.SEG_22 = 2097152;
worldEngine.tiles.Tile.SEG_23 = 4194304;
worldEngine.tiles.Tile.SEG_24 = 8388608;
worldEngine.tiles.Tile.SEG_25 = 16777216;
worldEngine.tiles.Tile.SEG_26 = 33554432;
worldEngine.tiles.Tile.SEG_27 = 67108864;
worldEngine.tiles.Tile.SEG_28 = 134217728;
worldEngine.tiles.Tile.SEG_UP = 0;
worldEngine.tiles.Tile.EDGE_SEGMENT_MASK = 255;
worldEngine.tiles.Tile.VERT_TO_SEG_DEF = [new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.SEG_1),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.SEG_1 | worldEngine.tiles.Tile.SEG_2),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.SEG_2),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.SEG_3),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.SEG_3 | worldEngine.tiles.Tile.SEG_4),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.SEG_4),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.SEG_5),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_5 | worldEngine.tiles.Tile.SEG_6),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_6),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.SEG_7),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.SEG_7 | worldEngine.tiles.Tile.SEG_8),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.SEG_8),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.SEG_9),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.SEG_9 | worldEngine.tiles.Tile.SEG_12),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.SEG_12),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.SEG_10),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.SEG_10 | worldEngine.tiles.Tile.SEG_11),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.SEG_11),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.SEG_13),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.SEG_14),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_14 | worldEngine.tiles.Tile.SEG_15),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_15),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.SEG_16),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.SEG_18),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.SEG_17),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.SEG_17 | worldEngine.tiles.Tile.SEG_20),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_MIDDLE_8,worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.SEG_20),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.SEG_19),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.SEG_21),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_22),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_MIDDLE_3,worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.SEG_23),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.TOP_MIDDLE_7,worldEngine.tiles.Tile.SEG_24),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.TOP_RIGHT_6,worldEngine.tiles.Tile.SEG_25),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_LEFT_2,worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.SEG_26),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.MIDDLE_RIGHT_5,worldEngine.tiles.Tile.TOP_LEFT_0,worldEngine.tiles.Tile.SEG_27),new worldEngine.tiles.TileSegment(worldEngine.tiles.Tile.BOTTOM_RIGHT_4,worldEngine.tiles.Tile.MIDDLE_LEFT_1,worldEngine.tiles.Tile.SEG_28)];
worldEngine.tiles.TileFeature.COLLIDABLE = 1;
worldEngine.tiles.TileFeature.DRAWABLE = 2;
worldEngine.tiles.TileFeature.STYLE_OFFSET = 16;
worldEngine.tiles.TileFeature.RANDOMDATA_OFFSET = 24;
Main.main();
})();
