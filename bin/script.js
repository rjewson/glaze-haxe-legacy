(function () { "use strict";
var $hxClasses = {};
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
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
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
$hxClasses["Lambda"] = Lambda;
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
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
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
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	var assets = new utils.AssetLoader();
	assets.addEventListener("loaded",function(event) {
		var gameLoop = new engine.GameLoop();
		var tmxMap = new engine.map.tmx.TmxMap(assets.assets.get("data/testMap.tmx"));
		tmxMap.tilesets[0].set_image(assets.assets.get("data/spelunky-tiles.png"));
		var mapData = engine.map.tmx.TmxLayer.layerToCoordTexture(tmxMap.getLayer("Tile Layer 1"));
		var view = new engine.view.View(800,600,false);
		var tm = new wgr.texture.TextureManager(view.renderer.gl);
		tm.AddTexturesFromConfig(assets.assets.get("data/textureConfig.xml"),assets.assets);
		var tileMap = new wgr.renderers.webgl.TileMap();
		view.renderer.AddRenderer(tileMap);
		tileMap.SetSpriteSheet(assets.assets.get("data/spelunky-tiles.png"));
		tileMap.SetTileLayerFromData(mapData,"base",1,1);
		tileMap.SetTileLayer(assets.assets.get("data/spelunky1.png"),"bg",0.6,0.6);
		tileMap.tileSize = 16;
		tileMap.TileScale(2);
		var spriteRender = new wgr.renderers.webgl.SpriteRenderer();
		spriteRender.AddStage(view.stage);
		view.renderer.AddRenderer(spriteRender);
		var pointParticleEngine = new wgr.particle.PointSpriteParticleEngine(14000,16.6666666666666679);
		pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
		view.renderer.AddRenderer(pointParticleEngine.renderer);
		var lightGrid = new wgr.lighting.ParticleLightGrid();
		view.renderer.AddRenderer(lightGrid.renderer);
		var createSprite = function(id,x,y,px,py,tid) {
			var s = new wgr.display.Sprite();
			s.id = id;
			s.texture = tm.textures.get(tid);
			s.position.x = x;
			s.position.y = y;
			s.pivot.x = px;
			s.pivot.y = py;
			return s;
		};
		var itemContainer = new wgr.display.DisplayObjectContainer();
		itemContainer.id = "itemContainer";
		view.camera.addChild(itemContainer);
		var mainEngine = new ash.core.Engine();
		mainEngine.addSystem(new engine.systems.MotionControlSystem(gameLoop.keyboard),1);
		mainEngine.addSystem(new engine.systems.PhysicsSystem([new engine.map.TileMapBroadphase(tmxMap.getLayer("Tile Layer 1"))]),3);
		mainEngine.addSystem(new engine.systems.CameraControlSystem(view.camera),4);
		mainEngine.addSystem(new engine.systems.RenderSystem(itemContainer),5);
		mainEngine.addSystem(new engine.systems.DebugRenderSystem(view.debugRenderer),6);
		var spr3 = createSprite("character",400,380,0,0,"texturechar1");
		spr3.scale.x = -1;
		spr3.pivot.x = 24.;
		spr3.pivot.y = 36.;
		var e1 = new ash.core.Entity().add(new engine.components.Position(300,0,0)).add(new engine.components.Display(spr3)).add(new engine.components.DebugDisplay()).add(new engine.components.Collision(24.,36.)).add(new engine.components.Motion(0,0,0,0.99)).add(new engine.components.MotionControls()).add(new engine.components.Camera());
		mainEngine.addEntity(e1);
		var tick = function(time) {
			mainEngine.update(time);
			view.renderer.Render(view.camera.viewPortAABB);
		};
		gameLoop.updateFunc = tick;
		gameLoop.start();
		window.document.getElementById("stopbutton").addEventListener("click",function(event1) {
			gameLoop.stop();
		});
		window.document.getElementById("startbutton").addEventListener("click",function(event2) {
			gameLoop.start();
		});
		window.document.getElementById("debugbutton").addEventListener("click",function(event3) {
		});
		window.document.getElementById("action1").addEventListener("click",function(event4) {
			e1.remove(engine.components.Display);
		});
		window.document.getElementById("action2").addEventListener("click",function(event5) {
		});
	});
	assets.SetImagesToLoad(["data/textureConfig.xml","data/testMap.tmx","data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png","data/tilescompressed.png"]);
	assets.Load();
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.setField = function(o,field,value) {
	o[field] = value;
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
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
$hxClasses["StringBuf"] = StringBuf;
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
$hxClasses["StringTools"] = StringTools;
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
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
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
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
};
var ash = {};
ash.ClassMap = function() {
	this.h = new haxe.ds.StringMap();
};
$hxClasses["ash.ClassMap"] = ash.ClassMap;
ash.ClassMap.__name__ = ["ash","ClassMap"];
ash.ClassMap.__interfaces__ = [IMap];
ash.ClassMap.prototype = {
	get: function(k) {
		return this.h.get(Type.getClassName(k));
	}
	,set: function(k,v) {
		this.h.set(Type.getClassName(k),v);
	}
	,exists: function(k) {
		return this.h.exists(Type.getClassName(k));
	}
	,remove: function(k) {
		return this.h.remove(Type.getClassName(k));
	}
	,keys: function() {
		var i = this.h.keys();
		return { hasNext : $bind(i,i.hasNext), next : function() {
			return Type.resolveClass(i.next());
		}};
	}
	,iterator: function() {
		return this.h.iterator();
	}
	,toString: function() {
		return this.h.toString();
	}
	,__class__: ash.ClassMap
};
ash.GenericListIterator = function(head) {
	this.previous = { next : head};
};
$hxClasses["ash.GenericListIterator"] = ash.GenericListIterator;
ash.GenericListIterator.__name__ = ["ash","GenericListIterator"];
ash.GenericListIterator.prototype = {
	hasNext: function() {
		return this.previous.next != null;
	}
	,next: function() {
		var node = this.previous.next;
		this.previous = node;
		return node;
	}
	,__class__: ash.GenericListIterator
};
ash.core = {};
ash.core.IFamily = function() { };
$hxClasses["ash.core.IFamily"] = ash.core.IFamily;
ash.core.IFamily.__name__ = ["ash","core","IFamily"];
ash.core.IFamily.prototype = {
	__class__: ash.core.IFamily
};
ash.core.ComponentMatchingFamily = function(nodeClass,engine) {
	this.nodeClass = nodeClass;
	this.engine = engine;
	this.init();
};
$hxClasses["ash.core.ComponentMatchingFamily"] = ash.core.ComponentMatchingFamily;
ash.core.ComponentMatchingFamily.__name__ = ["ash","core","ComponentMatchingFamily"];
ash.core.ComponentMatchingFamily.__interfaces__ = [ash.core.IFamily];
ash.core.ComponentMatchingFamily.prototype = {
	init: function() {
		this.nodeList = new ash.core.NodeList();
		this.entities = new haxe.ds.ObjectMap();
		this.components = this.nodeClass._getComponents();
		this.nodePool = new ash.core.NodePool(this.nodeClass,this.components);
	}
	,newEntity: function(entity) {
		this.addIfMatch(entity);
	}
	,componentAddedToEntity: function(entity,componentClass) {
		this.addIfMatch(entity);
	}
	,componentRemovedFromEntity: function(entity,componentClass) {
		if(this.components.h.exists(Type.getClassName(componentClass))) this.removeIfMatch(entity);
	}
	,removeEntity: function(entity) {
		this.removeIfMatch(entity);
	}
	,addIfMatch: function(entity) {
		if(!(this.entities.h.__keys__[entity.__id__] != null)) {
			var $it0 = this.components.keys();
			while( $it0.hasNext() ) {
				var componentClass = $it0.next();
				if(!entity.has(componentClass)) return;
			}
			var node = this.nodePool.get();
			node.entity = entity;
			var $it1 = this.components.keys();
			while( $it1.hasNext() ) {
				var componentClass1 = $it1.next();
				Reflect.setField(node,this.components.h.get(Type.getClassName(componentClass1)),entity.get(componentClass1));
			}
			this.entities.set(entity,node);
			this.nodeList.add(node);
		}
	}
	,removeIfMatch: function(entity) {
		if(this.entities.h.__keys__[entity.__id__] != null) {
			var node = this.entities.h[entity.__id__];
			this.entities.remove(entity);
			this.nodeList.remove(node);
			if(this.engine.updating) {
				this.nodePool.cache(node);
				this.engine.updateComplete.add($bind(this,this.releaseNodePoolCache));
			} else this.nodePool.dispose(node);
		}
	}
	,releaseNodePoolCache: function() {
		this.engine.updateComplete.remove($bind(this,this.releaseNodePoolCache));
		this.nodePool.releaseCache();
	}
	,cleanUp: function() {
		var _g = new ash.GenericListIterator(this.nodeList.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			this.entities.remove(node.entity);
		}
		this.nodeList.removeAll();
	}
	,__class__: ash.core.ComponentMatchingFamily
};
ash.core.Engine = function() {
	this.familyClass = ash.core.ComponentMatchingFamily;
	this.entityList = new ash.core.EntityList();
	this.entityNames = new haxe.ds.StringMap();
	this.systemList = new ash.core.SystemList();
	this.families = new ash.ClassMap();
	this.entityAdded = new ash.signals.Signal1();
	this.entityRemoved = new ash.signals.Signal1();
	this.updateComplete = new ash.signals.Signal0();
	this.updating = false;
};
$hxClasses["ash.core.Engine"] = ash.core.Engine;
ash.core.Engine.__name__ = ["ash","core","Engine"];
ash.core.Engine.prototype = {
	addEntity: function(entity) {
		if(this.entityNames.exists(entity.name)) throw "The entity name " + entity.name + " is already in use by another entity.";
		this.entityList.add(entity);
		this.entityNames.set(entity.name,entity);
		entity.componentAdded.add($bind(this,this.componentAdded));
		entity.componentRemoved.add($bind(this,this.componentRemoved));
		entity.nameChanged.add($bind(this,this.entityNameChanged));
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.newEntity(entity);
		}
		this.entityAdded.dispatch(entity);
	}
	,removeEntity: function(entity) {
		entity.componentAdded.remove($bind(this,this.componentAdded));
		entity.componentRemoved.remove($bind(this,this.componentRemoved));
		entity.nameChanged.remove($bind(this,this.entityNameChanged));
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.removeEntity(entity);
		}
		this.entityNames.remove(entity.name);
		this.entityList.remove(entity);
		this.entityRemoved.dispatch(entity);
	}
	,entityNameChanged: function(entity,oldName) {
		if(this.entityNames.get(oldName) == entity) {
			this.entityNames.remove(oldName);
			this.entityNames.set(entity.name,entity);
		}
	}
	,getEntityByName: function(name) {
		return this.entityNames.get(name);
	}
	,removeAllEntities: function() {
		while(this.entityList.head != null) this.removeEntity(this.entityList.head);
	}
	,get_entities: function() {
		return this.entityList;
	}
	,componentAdded: function(entity,componentClass) {
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentAddedToEntity(entity,componentClass);
		}
	}
	,componentRemoved: function(entity,componentClass) {
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentRemovedFromEntity(entity,componentClass);
		}
	}
	,getNodeList: function(nodeClass) {
		if(this.families.h.exists(Type.getClassName(nodeClass))) return this.families.h.get(Type.getClassName(nodeClass)).nodeList;
		var family = Type.createInstance(this.familyClass,[nodeClass,this]);
		this.families.h.set(Type.getClassName(nodeClass),family);
		var _g = new ash.GenericListIterator(this.entityList.head);
		while(_g.previous.next != null) {
			var entity = _g.next();
			family.newEntity(entity);
		}
		return family.nodeList;
	}
	,releaseNodeList: function(nodeClass) {
		if(this.families.h.exists(Type.getClassName(nodeClass))) {
			this.families.h.get(Type.getClassName(nodeClass)).cleanUp();
			this.families.h.remove(Type.getClassName(nodeClass));
		}
	}
	,addSystem: function(system,priority) {
		system.priority = priority;
		system.addToEngine(this);
		this.systemList.add(system);
	}
	,getSystem: function(type) {
		return this.systemList.get(type);
	}
	,get_systems: function() {
		return this.systemList;
	}
	,removeSystem: function(system) {
		this.systemList.remove(system);
		system.removeFromEngine(this);
	}
	,removeAllSystems: function() {
		while(this.systemList.head != null) this.removeSystem(this.systemList.head);
	}
	,update: function(time) {
		this.updating = true;
		var _g = new ash.GenericListIterator(this.systemList.head);
		while(_g.previous.next != null) {
			var system = _g.next();
			system.update(time);
		}
		this.updating = false;
		this.updateComplete.dispatch();
	}
	,__class__: ash.core.Engine
};
ash.core.Entity = function(name) {
	if(name == null) name = "";
	this.componentAdded = new ash.signals.Signal2();
	this.componentRemoved = new ash.signals.Signal2();
	this.nameChanged = new ash.signals.Signal2();
	this.components = new ash.ClassMap();
	if(name != "") this.set_name(name); else this.set_name("_entity" + ++ash.core.Entity.nameCount);
};
$hxClasses["ash.core.Entity"] = ash.core.Entity;
ash.core.Entity.__name__ = ["ash","core","Entity"];
ash.core.Entity.prototype = {
	set_name: function(value) {
		if(this.name != value) {
			var previous = this.name;
			this.name = value;
			this.nameChanged.dispatch(this,previous);
		}
		return value;
	}
	,add: function(component,componentClass) {
		if(componentClass == null) componentClass = Type.getClass(component);
		if(this.components.h.exists(Type.getClassName(componentClass))) this.remove(componentClass);
		this.components.h.set(Type.getClassName(componentClass),component);
		this.componentAdded.dispatch(this,componentClass);
		return this;
	}
	,remove: function(componentClass) {
		var component = this.components.h.get(Type.getClassName(componentClass));
		if(component != null) {
			this.components.h.remove(Type.getClassName(componentClass));
			this.componentRemoved.dispatch(this,componentClass);
			return component;
		}
		return null;
	}
	,get: function(componentClass) {
		return this.components.h.get(Type.getClassName(componentClass));
	}
	,getAll: function() {
		var componentArray = new Array();
		var $it0 = this.components.h.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			componentArray.push(component);
		}
		return componentArray;
	}
	,has: function(componentClass) {
		return this.components.h.exists(Type.getClassName(componentClass));
	}
	,__class__: ash.core.Entity
};
ash.core.EntityList = function() {
};
$hxClasses["ash.core.EntityList"] = ash.core.EntityList;
ash.core.EntityList.__name__ = ["ash","core","EntityList"];
ash.core.EntityList.prototype = {
	add: function(entity) {
		if(this.head == null) {
			this.head = this.tail = entity;
			entity.next = entity.previous = null;
		} else {
			this.tail.next = entity;
			entity.previous = this.tail;
			entity.next = null;
			this.tail = entity;
		}
	}
	,remove: function(entity) {
		if(this.head == entity) this.head = this.head.next;
		if(this.tail == entity) this.tail = this.tail.previous;
		if(entity.previous != null) entity.previous.next = entity.next;
		if(entity.next != null) entity.next.previous = entity.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var entity = this.head;
			this.head = this.head.next;
			entity.previous = null;
			entity.next = null;
		}
		this.tail = null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,__class__: ash.core.EntityList
};
ash.core.Node = function() { };
$hxClasses["ash.core.Node"] = ash.core.Node;
ash.core.Node.__name__ = ["ash","core","Node"];
ash.core.Node.prototype = {
	__class__: ash.core.Node
};
ash.core.NodeList = function() {
	this.nodeAdded = new ash.signals.Signal1();
	this.nodeRemoved = new ash.signals.Signal1();
};
$hxClasses["ash.core.NodeList"] = ash.core.NodeList;
ash.core.NodeList.__name__ = ["ash","core","NodeList"];
ash.core.NodeList.prototype = {
	add: function(node) {
		if(this.head == null) {
			this.head = this.tail = node;
			node.next = node.previous = null;
		} else {
			this.tail.next = node;
			node.previous = this.tail;
			node.next = null;
			this.tail = node;
		}
		this.nodeAdded.dispatch(node);
	}
	,remove: function(node) {
		if(this.head == node) this.head = this.head.next;
		if(this.tail == node) this.tail = this.tail.previous;
		if(node.previous != null) node.previous.next = node.next;
		if(node.next != null) node.next.previous = node.previous;
		this.nodeRemoved.dispatch(node);
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			node.previous = null;
			node.next = null;
			this.nodeRemoved.dispatch(node);
		}
		this.tail = null;
	}
	,get_empty: function() {
		return this.head == null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,swap: function(node1,node2) {
		if(node1.previous == node2) {
			node1.previous = node2.previous;
			node2.previous = node1;
			node2.next = node1.next;
			node1.next = node2;
		} else if(node2.previous == node1) {
			node2.previous = node1.previous;
			node1.previous = node2;
			node1.next = node2.next;
			node2.next = node1;
		} else {
			var temp = node1.previous;
			node1.previous = node2.previous;
			node2.previous = temp;
			temp = node1.next;
			node1.next = node2.next;
			node2.next = temp;
		}
		if(this.head == node1) this.head = node2; else if(this.head == node2) this.head = node1;
		if(this.tail == node1) this.tail = node2; else if(this.tail == node2) this.tail = node1;
		if(node1.previous != null) node1.previous.next = node1;
		if(node2.previous != null) node2.previous.next = node2;
		if(node1.next != null) node1.next.previous = node1;
		if(node2.next != null) node2.next.previous = node2;
	}
	,insertionSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var remains = this.head.next;
		var node = remains;
		while(node != null) {
			remains = node.next;
			var other = node.previous;
			while(other != null) {
				if(sortFunction(node,other) >= 0) {
					if(node != other.next) {
						if(this.tail == node) this.tail = node.previous;
						node.previous.next = node.next;
						if(node.next != null) node.next.previous = node.previous;
						node.next = other.next;
						node.previous = other;
						node.next.previous = node;
						other.next = node;
					}
					break;
				}
				other = other.previous;
			}
			if(other == null) {
				if(this.tail == node) this.tail = node.previous;
				node.previous.next = node.next;
				if(node.next != null) node.next.previous = node.previous;
				node.next = this.head;
				this.head.previous = node;
				node.previous = null;
				this.head = node;
			}
			node = remains;
		}
	}
	,mergeSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var lists = [];
		var start = this.head;
		var end;
		while(start != null) {
			end = start;
			while(end.next != null && sortFunction(end,end.next) <= 0) end = end.next;
			var next = end.next;
			start.previous = end.next = null;
			lists.push(start);
			start = next;
		}
		while(lists.length > 1) lists.push(this.merge(lists.shift(),lists.shift(),sortFunction));
		this.tail = this.head = lists[0];
		while(this.tail.next != null) this.tail = this.tail.next;
	}
	,merge: function(head1,head2,sortFunction) {
		var node;
		var head;
		if(sortFunction(head1,head2) <= 0) {
			head = node = head1;
			head1 = head1.next;
		} else {
			head = node = head2;
			head2 = head2.next;
		}
		while(head1 != null && head2 != null) if(sortFunction(head1,head2) <= 0) {
			node.next = head1;
			head1.previous = node;
			node = head1;
			head1 = head1.next;
		} else {
			node.next = head2;
			head2.previous = node;
			node = head2;
			head2 = head2.next;
		}
		if(head1 != null) {
			node.next = head1;
			head1.previous = node;
		} else {
			node.next = head2;
			head2.previous = node;
		}
		return head;
	}
	,__class__: ash.core.NodeList
};
ash.core.NodePool = function(nodeClass,components) {
	this.nodeClass = nodeClass;
	this.components = components;
};
$hxClasses["ash.core.NodePool"] = ash.core.NodePool;
ash.core.NodePool.__name__ = ["ash","core","NodePool"];
ash.core.NodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return Type.createEmptyInstance(this.nodeClass);
	}
	,dispose: function(node) {
		var $it0 = this.components.h.iterator();
		while( $it0.hasNext() ) {
			var componentName = $it0.next();
			node[componentName] = null;
		}
		node.entity = null;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
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
	,__class__: ash.core.NodePool
};
ash.core.System = function() {
	this.priority = 0;
};
$hxClasses["ash.core.System"] = ash.core.System;
ash.core.System.__name__ = ["ash","core","System"];
ash.core.System.prototype = {
	addToEngine: function(engine) {
	}
	,removeFromEngine: function(engine) {
	}
	,update: function(time) {
	}
	,__class__: ash.core.System
};
ash.core.SystemList = function() {
};
$hxClasses["ash.core.SystemList"] = ash.core.SystemList;
ash.core.SystemList.__name__ = ["ash","core","SystemList"];
ash.core.SystemList.prototype = {
	add: function(system) {
		if(this.head == null) {
			this.head = this.tail = system;
			system.next = system.previous = null;
		} else {
			var node = this.tail;
			while(node != null) {
				if(node.priority <= system.priority) break;
				node = node.previous;
			}
			if(node == this.tail) {
				this.tail.next = system;
				system.previous = this.tail;
				system.next = null;
				this.tail = system;
			} else if(node == null) {
				system.next = this.head;
				system.previous = null;
				this.head.previous = system;
				this.head = system;
			} else {
				system.next = node.next;
				system.previous = node;
				node.next.previous = system;
				node.next = system;
			}
		}
	}
	,remove: function(system) {
		if(this.head == system) this.head = this.head.next;
		if(this.tail == system) this.tail = this.tail.previous;
		if(system.previous != null) system.previous.next = system.next;
		if(system.next != null) system.next.previous = system.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var system = this.head;
			this.head = this.head.next;
			system.previous = null;
			system.next = null;
		}
		this.tail = null;
	}
	,get: function(type) {
		var system = this.head;
		while(system != null) {
			if(js.Boot.__instanceof(system,type)) return system;
			system = system.next;
		}
		return null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,__class__: ash.core.SystemList
};
ash.signals = {};
ash.signals.ListenerNode = function() {
};
$hxClasses["ash.signals.ListenerNode"] = ash.signals.ListenerNode;
ash.signals.ListenerNode.__name__ = ["ash","signals","ListenerNode"];
ash.signals.ListenerNode.prototype = {
	__class__: ash.signals.ListenerNode
};
ash.signals.ListenerNodePool = function() {
};
$hxClasses["ash.signals.ListenerNodePool"] = ash.signals.ListenerNodePool;
ash.signals.ListenerNodePool.__name__ = ["ash","signals","ListenerNodePool"];
ash.signals.ListenerNodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return new ash.signals.ListenerNode();
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
	,__class__: ash.signals.ListenerNodePool
};
ash.signals.SignalBase = function() {
	this.listenerNodePool = new ash.signals.ListenerNodePool();
	this.numListeners = 0;
};
$hxClasses["ash.signals.SignalBase"] = ash.signals.SignalBase;
ash.signals.SignalBase.__name__ = ["ash","signals","SignalBase"];
ash.signals.SignalBase.prototype = {
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
	,__class__: ash.signals.SignalBase
};
ash.signals.Signal0 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal0"] = ash.signals.Signal0;
ash.signals.Signal0.__name__ = ["ash","signals","Signal0"];
ash.signals.Signal0.__super__ = ash.signals.SignalBase;
ash.signals.Signal0.prototype = $extend(ash.signals.SignalBase.prototype,{
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
	,__class__: ash.signals.Signal0
});
ash.signals.Signal1 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal1"] = ash.signals.Signal1;
ash.signals.Signal1.__name__ = ["ash","signals","Signal1"];
ash.signals.Signal1.__super__ = ash.signals.SignalBase;
ash.signals.Signal1.prototype = $extend(ash.signals.SignalBase.prototype,{
	dispatch: function(object1) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash.signals.Signal1
});
ash.signals.Signal2 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal2"] = ash.signals.Signal2;
ash.signals.Signal2.__name__ = ["ash","signals","Signal2"];
ash.signals.Signal2.__super__ = ash.signals.SignalBase;
ash.signals.Signal2.prototype = $extend(ash.signals.SignalBase.prototype,{
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
	,__class__: ash.signals.Signal2
});
ash.tools = {};
ash.tools.ListIteratingSystem = function(nodeClass,nodeUpdateFunction,nodeAddedFunction,nodeRemovedFunction) {
	ash.core.System.call(this);
	this.nodeClass = nodeClass;
	this.nodeUpdateFunction = nodeUpdateFunction;
	this.nodeAddedFunction = nodeAddedFunction;
	this.nodeRemovedFunction = nodeRemovedFunction;
};
$hxClasses["ash.tools.ListIteratingSystem"] = ash.tools.ListIteratingSystem;
ash.tools.ListIteratingSystem.__name__ = ["ash","tools","ListIteratingSystem"];
ash.tools.ListIteratingSystem.__super__ = ash.core.System;
ash.tools.ListIteratingSystem.prototype = $extend(ash.core.System.prototype,{
	addToEngine: function(engine) {
		this.nodeList = engine.getNodeList(this.nodeClass);
		if(this.nodeAddedFunction != null) {
			var _g = new ash.GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeAddedFunction(node);
			}
			this.nodeList.nodeAdded.add(this.nodeAddedFunction);
		}
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.add(this.nodeRemovedFunction);
	}
	,removeFromEngine: function(engine) {
		if(this.nodeAddedFunction != null) this.nodeList.nodeAdded.remove(this.nodeAddedFunction);
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.remove(this.nodeRemovedFunction);
		this.nodeList = null;
	}
	,update: function(time) {
		if(this.nodeUpdateFunction != null) {
			var _g = new ash.GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeUpdateFunction(node,time);
			}
		}
	}
	,__class__: ash.tools.ListIteratingSystem
});
var ds = {};
ds.Array2D = function(width,height,buffer) {
	this.w = width;
	this.h = height;
	if(buffer == null) this.buffer = new ArrayBuffer(this.w * this.h * 4); else this.buffer = buffer;
	this.data32 = new Uint32Array(this.buffer);
	this.data8 = new Uint8Array(this.buffer);
};
$hxClasses["ds.Array2D"] = ds.Array2D;
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
		var p1 = new geom.Vector2D(p1Original.x / tileSize,p1Original.y / tileSize);
		var p2 = new geom.Vector2D(p2Original.x / tileSize,p2Original.y / tileSize);
		if((p1.x | 0) == (p2.x | 0) && (p1.y | 0) == (p2.y | 0)) return p2Original;
		var stepX;
		if(p2.x > p1.x) stepX = 1; else stepX = -1;
		var stepY;
		if(p2.y > p1.y) stepY = 1; else stepY = -1;
		var rayDirection = new geom.Vector2D(p2.x - p1.x,p2.y - p1.y);
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
		var collisionPoint = new geom.Vector2D();
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
var engine = {};
engine.GameLoop = function() {
	this.isRunning = false;
	this.keyboard = new engine.input.DigitalInput();
	this.keyboard.InputTarget(window.document);
};
$hxClasses["engine.GameLoop"] = engine.GameLoop;
engine.GameLoop.__name__ = ["engine","GameLoop"];
engine.GameLoop.prototype = {
	update: function(timestamp) {
		this.delta = timestamp - this.prevAnimationTime;
		this.prevAnimationTime = timestamp;
		this.keyboard.Update();
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
engine.components = {};
engine.components.Camera = function() {
};
$hxClasses["engine.components.Camera"] = engine.components.Camera;
engine.components.Camera.__name__ = ["engine","components","Camera"];
engine.components.Camera.prototype = {
	__class__: engine.components.Camera
};
engine.components.Collision = function(width,height) {
	this.aabb = new geom.AABB(width,height);
};
$hxClasses["engine.components.Collision"] = engine.components.Collision;
engine.components.Collision.__name__ = ["engine","components","Collision"];
engine.components.Collision.prototype = {
	__class__: engine.components.Collision
};
engine.components.DebugDisplay = function() {
};
$hxClasses["engine.components.DebugDisplay"] = engine.components.DebugDisplay;
engine.components.DebugDisplay.__name__ = ["engine","components","DebugDisplay"];
engine.components.DebugDisplay.prototype = {
	__class__: engine.components.DebugDisplay
};
engine.components.Display = function(displayObject) {
	this.displayObject = displayObject;
};
$hxClasses["engine.components.Display"] = engine.components.Display;
engine.components.Display.__name__ = ["engine","components","Display"];
engine.components.Display.prototype = {
	__class__: engine.components.Display
};
engine.components.Motion = function(velocityX,velocityY,angularVelocity,damping) {
	if(damping == null) damping = 0.99999;
	if(angularVelocity == null) angularVelocity = .0;
	if(velocityY == null) velocityY = .0;
	if(velocityX == null) velocityX = .0;
	this.velocity = new geom.Vector2D(velocityX,velocityY);
	this.positionCorrection = new geom.Vector2D();
	this.angularVelocity = angularVelocity;
	this.damping = damping;
	this.forces = new geom.Vector2D();
	this.onGround = false;
	this.preOnGround = false;
};
$hxClasses["engine.components.Motion"] = engine.components.Motion;
engine.components.Motion.__name__ = ["engine","components","Motion"];
engine.components.Motion.prototype = {
	__class__: engine.components.Motion
};
engine.components.MotionControls = function() {
};
$hxClasses["engine.components.MotionControls"] = engine.components.MotionControls;
engine.components.MotionControls.__name__ = ["engine","components","MotionControls"];
engine.components.MotionControls.prototype = {
	__class__: engine.components.MotionControls
};
engine.components.Position = function(x,y,rotation) {
	this.position = new geom.Vector2D(x,y);
	this.rotation = rotation;
};
$hxClasses["engine.components.Position"] = engine.components.Position;
engine.components.Position.__name__ = ["engine","components","Position"];
engine.components.Position.prototype = {
	__class__: engine.components.Position
};
engine.input = {};
engine.input.DigitalInput = function() {
	this.keyMap = new Array();
	var _g = 0;
	while(_g < 255) {
		var i = _g++;
		this.keyMap[i] = 0;
	}
	this.frameRef = 1;
};
$hxClasses["engine.input.DigitalInput"] = engine.input.DigitalInput;
engine.input.DigitalInput.__name__ = ["engine","input","DigitalInput"];
engine.input.DigitalInput.prototype = {
	InputTarget: function(target) {
		this.target = target;
		target.addEventListener("keydown",$bind(this,this.KeyDown),false);
		target.addEventListener("keyup",$bind(this,this.KeyUp),false);
	}
	,Update: function() {
		if(this.target == null) return;
		this.frameRef++;
	}
	,KeyDown: function(event) {
		if(this.keyMap[event.keyCode] == 0) this.keyMap[event.keyCode] = this.frameRef;
	}
	,KeyUp: function(event) {
		this.keyMap[event.keyCode] = 0;
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
engine.physics = {};
engine.physics.IBroadphase = function() { };
$hxClasses["engine.physics.IBroadphase"] = engine.physics.IBroadphase;
engine.physics.IBroadphase.__name__ = ["engine","physics","IBroadphase"];
engine.physics.IBroadphase.prototype = {
	__class__: engine.physics.IBroadphase
};
engine.map = {};
engine.map.TileMapBroadphase = function(layer) {
	this.collisionLayer = layer;
	this.tileSize = layer.map.tileWidth * 2;
	console.log(this.tileSize);
	this.invTileSize = 1 / this.tileSize;
};
$hxClasses["engine.map.TileMapBroadphase"] = engine.map.TileMapBroadphase;
engine.map.TileMapBroadphase.__name__ = ["engine","map","TileMapBroadphase"];
engine.map.TileMapBroadphase.__interfaces__ = [engine.physics.IBroadphase];
engine.map.TileMapBroadphase.prototype = {
	add: function(shape) {
		console.log("add");
	}
	,remove: function(shape) {
		console.log("remove");
	}
	,IsInternalCollision: function(tileX,tileY,normal) {
		var tile = this.collisionLayer.tileGIDs.get(tileX + normal.x,tileY + normal.y);
		return tile > 0;
	}
	,collide: function(nodes,time) {
		var tileAABB = new geom.AABB(this.tileSize / 2,this.tileSize / 2);
		var tilePosition = new geom.Vector2D();
		var contact = new engine.physics.Contact();
		var _g = new ash.GenericListIterator(nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			var position = node.position.position;
			var motion = node.motion;
			var extents = node.collision.aabb.extents;
			motion.preOnGround = motion.onGround;
			motion.onGround = false;
			var predictedPos = position.plus(motion.velocity.mult(time));
			var min = new geom.Vector2D(Math.min(position.x,predictedPos.x),Math.min(position.y,predictedPos.y));
			var max = new geom.Vector2D(Math.max(position.x,predictedPos.x),Math.max(position.y,predictedPos.y));
			min.x -= extents.x;
			min.y -= extents.y;
			min;
			max.x += extents.x;
			max.y += extents.y;
			max;
			var x1 = Math.floor(min.x * this.invTileSize);
			var y1 = Math.floor(min.y * this.invTileSize);
			var x2 = Math.ceil(max.x * this.invTileSize);
			var y2 = Math.ceil(max.y * this.invTileSize);
			var result = "";
			var _g1 = x1;
			while(_g1 < x2) {
				var x = _g1++;
				var _g11 = y1;
				while(_g11 < y2) {
					var y = _g11++;
					var tile = this.collisionLayer.tileGIDs.get(x,y);
					if(tile > 0) {
						tilePosition.x = x * this.tileSize + this.tileSize / 2;
						tilePosition.y = y * this.tileSize + this.tileSize / 2;
						if(engine.physics.Collide.IntersectAABBvsSegment(tileAABB.extents,tilePosition,position,new geom.Vector2D(predictedPos.x - position.x,predictedPos.y - position.y),node.collision.aabb.extents.x,node.collision.aabb.extents.y)) {
							engine.physics.Collide.AABBvsAABB(node.collision.aabb,position,tileAABB,tilePosition,contact);
							if(!this.IsInternalCollision(x,y,contact.normal)) engine.physics.Collide.CollisionResponse(contact,motion,time);
							result += x + ":" + y + " ";
						}
					}
				}
			}
		}
	}
	,collide2: function(nodes) {
		var _g = new ash.GenericListIterator(nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			var position = node.position.position;
			var result = "";
			var extents = node.collision.aabb.extents;
			var x1 = Math.floor((position.x - extents.x) * this.invTileSize);
			var y1 = Math.floor((position.y - extents.y) * this.invTileSize);
			var x2 = Math.ceil((position.x + extents.x) * this.invTileSize);
			var y2 = Math.ceil((position.y + extents.y) * this.invTileSize);
			var _g1 = x1;
			while(_g1 < x2) {
				var x = _g1++;
				var _g11 = y1;
				while(_g11 < y2) {
					var y = _g11++;
					var tile = this.collisionLayer.tileGIDs.get(x,y);
					if(tile > 0) result += x + ":" + y + " ";
				}
			}
			console.log(result);
		}
	}
	,Index: function(value) {
		return value * this.invTileSize;
	}
	,__class__: engine.map.TileMapBroadphase
};
engine.map.TileMapMap = function(w,h,data) {
	this.mapData = new ds.Array2D(w,h,data);
	this.tiles = new haxe.ds.IntMap();
};
$hxClasses["engine.map.TileMapMap"] = engine.map.TileMapMap;
engine.map.TileMapMap.__name__ = ["engine","map","TileMapMap"];
engine.map.TileMapMap.prototype = {
	addTileType: function(index,x,y) {
		var v = -16777216 | y << 8 | x;
		this.tiles.set(index,v);
	}
	,toTexture: function() {
		var textureData = new ds.Array2D(this.mapData.w,this.mapData.h);
		var _g1 = 0;
		var _g = this.mapData.w;
		while(_g1 < _g) {
			var xp = _g1++;
			var _g3 = 0;
			var _g2 = this.mapData.h;
			while(_g3 < _g2) {
				var yp = _g3++;
				var source = this.mapData.get(xp,yp);
				if(source > 0) textureData.set(xp,yp,this.tiles.get(source)); else textureData.data32[yp * textureData.w + xp] = -1;
			}
		}
		return textureData;
	}
	,__class__: engine.map.TileMapMap
};
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
$hxClasses["engine.map.tmx.TmxLayer"] = engine.map.tmx.TmxLayer;
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
$hxClasses["engine.map.tmx.TmxMap"] = engine.map.tmx.TmxMap;
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
$hxClasses["engine.map.tmx.TmxObject"] = engine.map.tmx.TmxObject;
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
	var $it1 = source.nodes.resolve("object").iterator();
	while( $it1.hasNext() ) {
		var node2 = $it1.next();
		this.objects.push(new engine.map.tmx.TmxObject(node2,this));
	}
};
$hxClasses["engine.map.tmx.TmxObjectGroup"] = engine.map.tmx.TmxObjectGroup;
engine.map.tmx.TmxObjectGroup.__name__ = ["engine","map","tmx","TmxObjectGroup"];
engine.map.tmx.TmxObjectGroup.prototype = {
	__class__: engine.map.tmx.TmxObjectGroup
};
engine.map.tmx.TmxOrderedHash = function() {
	this._keys = new Array();
	this._map = new haxe.ds.StringMap();
};
$hxClasses["engine.map.tmx.TmxOrderedHash"] = engine.map.tmx.TmxOrderedHash;
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
$hxClasses["engine.map.tmx.TmxPropertySet"] = engine.map.tmx.TmxPropertySet;
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
$hxClasses["engine.map.tmx.TmxTileSet"] = engine.map.tmx.TmxTileSet;
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
engine.nodes = {};
engine.nodes.CameraControlNode = function() { };
$hxClasses["engine.nodes.CameraControlNode"] = engine.nodes.CameraControlNode;
engine.nodes.CameraControlNode.__name__ = ["engine","nodes","CameraControlNode"];
engine.nodes.CameraControlNode._getComponents = function() {
	if(engine.nodes.CameraControlNode._components == null) {
		engine.nodes.CameraControlNode._components = new ash.ClassMap();
		engine.nodes.CameraControlNode._components.h.set(Type.getClassName(engine.components.Camera),"camera");
		engine.nodes.CameraControlNode._components.h.set(Type.getClassName(engine.components.Position),"position");
	}
	return engine.nodes.CameraControlNode._components;
};
engine.nodes.CameraControlNode.__super__ = ash.core.Node;
engine.nodes.CameraControlNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: engine.nodes.CameraControlNode
});
engine.nodes.DebugRenderNode = function() { };
$hxClasses["engine.nodes.DebugRenderNode"] = engine.nodes.DebugRenderNode;
engine.nodes.DebugRenderNode.__name__ = ["engine","nodes","DebugRenderNode"];
engine.nodes.DebugRenderNode._getComponents = function() {
	if(engine.nodes.DebugRenderNode._components == null) {
		engine.nodes.DebugRenderNode._components = new ash.ClassMap();
		engine.nodes.DebugRenderNode._components.h.set(Type.getClassName(engine.components.Position),"position");
		engine.nodes.DebugRenderNode._components.h.set(Type.getClassName(engine.components.Collision),"collision");
		engine.nodes.DebugRenderNode._components.h.set(Type.getClassName(engine.components.DebugDisplay),"debugDisplay");
	}
	return engine.nodes.DebugRenderNode._components;
};
engine.nodes.DebugRenderNode.__super__ = ash.core.Node;
engine.nodes.DebugRenderNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: engine.nodes.DebugRenderNode
});
engine.nodes.MotionControlNode = function() { };
$hxClasses["engine.nodes.MotionControlNode"] = engine.nodes.MotionControlNode;
engine.nodes.MotionControlNode.__name__ = ["engine","nodes","MotionControlNode"];
engine.nodes.MotionControlNode._getComponents = function() {
	if(engine.nodes.MotionControlNode._components == null) {
		engine.nodes.MotionControlNode._components = new ash.ClassMap();
		engine.nodes.MotionControlNode._components.h.set(Type.getClassName(engine.components.MotionControls),"controls");
		engine.nodes.MotionControlNode._components.h.set(Type.getClassName(engine.components.Position),"position");
		engine.nodes.MotionControlNode._components.h.set(Type.getClassName(engine.components.Motion),"motion");
	}
	return engine.nodes.MotionControlNode._components;
};
engine.nodes.MotionControlNode.__super__ = ash.core.Node;
engine.nodes.MotionControlNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: engine.nodes.MotionControlNode
});
engine.nodes.MovementNode = function() { };
$hxClasses["engine.nodes.MovementNode"] = engine.nodes.MovementNode;
engine.nodes.MovementNode.__name__ = ["engine","nodes","MovementNode"];
engine.nodes.MovementNode._getComponents = function() {
	if(engine.nodes.MovementNode._components == null) {
		engine.nodes.MovementNode._components = new ash.ClassMap();
		engine.nodes.MovementNode._components.h.set(Type.getClassName(engine.components.Position),"position");
		engine.nodes.MovementNode._components.h.set(Type.getClassName(engine.components.Motion),"motion");
	}
	return engine.nodes.MovementNode._components;
};
engine.nodes.MovementNode.__super__ = ash.core.Node;
engine.nodes.MovementNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: engine.nodes.MovementNode
});
engine.nodes.PhysicsNode = function() { };
$hxClasses["engine.nodes.PhysicsNode"] = engine.nodes.PhysicsNode;
engine.nodes.PhysicsNode.__name__ = ["engine","nodes","PhysicsNode"];
engine.nodes.PhysicsNode._getComponents = function() {
	if(engine.nodes.PhysicsNode._components == null) {
		engine.nodes.PhysicsNode._components = new ash.ClassMap();
		engine.nodes.PhysicsNode._components.h.set(Type.getClassName(engine.components.Collision),"collision");
		engine.nodes.PhysicsNode._components.h.set(Type.getClassName(engine.components.Position),"position");
		engine.nodes.PhysicsNode._components.h.set(Type.getClassName(engine.components.Motion),"motion");
	}
	return engine.nodes.PhysicsNode._components;
};
engine.nodes.PhysicsNode.__super__ = ash.core.Node;
engine.nodes.PhysicsNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: engine.nodes.PhysicsNode
});
engine.nodes.RenderNode = function() { };
$hxClasses["engine.nodes.RenderNode"] = engine.nodes.RenderNode;
engine.nodes.RenderNode.__name__ = ["engine","nodes","RenderNode"];
engine.nodes.RenderNode._getComponents = function() {
	if(engine.nodes.RenderNode._components == null) {
		engine.nodes.RenderNode._components = new ash.ClassMap();
		engine.nodes.RenderNode._components.h.set(Type.getClassName(engine.components.Position),"position");
		engine.nodes.RenderNode._components.h.set(Type.getClassName(engine.components.Display),"display");
	}
	return engine.nodes.RenderNode._components;
};
engine.nodes.RenderNode.__super__ = ash.core.Node;
engine.nodes.RenderNode.prototype = $extend(ash.core.Node.prototype,{
	get_displayObject: function() {
		return this.display.displayObject;
	}
	,__class__: engine.nodes.RenderNode
});
engine.physics.Collide = function() { };
$hxClasses["engine.physics.Collide"] = engine.physics.Collide;
engine.physics.Collide.__name__ = ["engine","physics","Collide"];
engine.physics.Collide.AABBvsAABBInternal = function(delta,aabbCenter,aabbExtents,point,contact) {
	if(Math.abs(delta.x) > Math.abs(delta.y)) {
		if(delta.x < 0) contact.normal.x = 1; else contact.normal.x = -1;
		contact.normal.y = 0;
	} else {
		contact.normal.x = 0;
		if(delta.y < 0) contact.normal.y = 1; else contact.normal.y = -1;
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
};
engine.physics.Collide.AABBvsAABB = function(a,aPos,b,bPos,contact) {
	var combinedExtents = a.extents.plus(b.extents);
	var delta = new geom.Vector2D(bPos.x - aPos.x,bPos.y - aPos.y);
	engine.physics.Collide.AABBvsAABBInternal(delta,bPos,combinedExtents,aPos,contact);
	return true;
};
engine.physics.Collide.CollisionResponse = function(contact,motion,time) {
	var seperation = Math.max(contact.distance,0);
	var penetration = Math.min(contact.distance,0);
	var nv = motion.velocity.dot(contact.normal) + seperation / time;
	motion.positionCorrection.minusEquals(contact.normal.mult(penetration / time));
	if(nv < 0) {
		motion.velocity.minusEquals(contact.normal.mult(nv));
		if(contact.normal.y < 0) {
			motion.onGround = true;
			var tangent = contact.normal.rightHandNormal();
			var tv = motion.velocity.dot(tangent) * 0.5;
			motion.velocity.minusEquals(new geom.Vector2D(tangent.x * tv,tangent.y * tv));
		}
	}
};
engine.physics.Collide.sign = function(v) {
	if(v < 0) return -1; else return 1;
};
engine.physics.Collide.IntersectAABBvsSegment = function(aabbExtends,aabbPos,pos,delta,paddingX,paddingY) {
	var scaleX = 1.0 / delta.x;
	var scaleY = 1.0 / delta.y;
	var signX = engine.physics.Collide.sign(scaleX);
	var signY = engine.physics.Collide.sign(scaleY);
	var nearTimeX = (aabbPos.x - signX * (aabbExtends.x + paddingX) - pos.x) * scaleX;
	var nearTimeY = (aabbPos.y - signY * (aabbExtends.y + paddingY) - pos.y) * scaleY;
	var farTimeX = (aabbPos.x + signX * (aabbExtends.x + paddingX) - pos.x) * scaleX;
	var farTimeY = (aabbPos.y + signY * (aabbExtends.y + paddingY) - pos.y) * scaleY;
	if(nearTimeX > farTimeY || nearTimeY > farTimeX) return false;
	var nearTime;
	if(nearTimeX > nearTimeY) nearTime = nearTimeX; else nearTime = nearTimeY;
	var farTime;
	if(farTimeX < farTimeY) farTime = farTimeX; else farTime = farTimeY;
	if(nearTime >= 1 || farTime <= 0) return false;
	return true;
};
engine.physics.Contact = function() {
	this.normal = new geom.Vector2D();
	this.distance = .0;
	this.point = new geom.Vector2D();
};
$hxClasses["engine.physics.Contact"] = engine.physics.Contact;
engine.physics.Contact.__name__ = ["engine","physics","Contact"];
engine.physics.Contact.prototype = {
	__class__: engine.physics.Contact
};
engine.systems = {};
engine.systems.CameraControlSystem = function(camera) {
	ash.tools.ListIteratingSystem.call(this,engine.nodes.CameraControlNode,$bind(this,this.updateNode));
	this.camera = camera;
};
$hxClasses["engine.systems.CameraControlSystem"] = engine.systems.CameraControlSystem;
engine.systems.CameraControlSystem.__name__ = ["engine","systems","CameraControlSystem"];
engine.systems.CameraControlSystem.__super__ = ash.tools.ListIteratingSystem;
engine.systems.CameraControlSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
		var position = node.position;
		this.camera.Focus(position.position.x,position.position.y);
	}
	,__class__: engine.systems.CameraControlSystem
});
engine.systems.DebugRenderSystem = function(view) {
	ash.core.System.call(this);
	this.view = view;
};
$hxClasses["engine.systems.DebugRenderSystem"] = engine.systems.DebugRenderSystem;
engine.systems.DebugRenderSystem.__name__ = ["engine","systems","DebugRenderSystem"];
engine.systems.DebugRenderSystem.__super__ = ash.core.System;
engine.systems.DebugRenderSystem.prototype = $extend(ash.core.System.prototype,{
	addToEngine: function(engine1) {
		this.nodes = engine1.getNodeList(engine.nodes.DebugRenderNode);
	}
	,update: function(time) {
		this.view.Clear();
		var _g = new ash.GenericListIterator(this.nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			var position = node.position.position;
			var collision = node.collision;
			this.view.DrawCross(position.x,position.y,10);
			this.view.DrawRect(position.x - collision.aabb.extents.x,position.y - collision.aabb.extents.y,collision.aabb.extents.x * 2,collision.aabb.extents.y * 2);
		}
	}
	,removeFromEngine: function(engine) {
		this.nodes = null;
	}
	,__class__: engine.systems.DebugRenderSystem
});
engine.systems.MotionControlSystem = function(input) {
	ash.tools.ListIteratingSystem.call(this,engine.nodes.MotionControlNode,$bind(this,this.updateNode));
	this.input = input;
};
$hxClasses["engine.systems.MotionControlSystem"] = engine.systems.MotionControlSystem;
engine.systems.MotionControlSystem.__name__ = ["engine","systems","MotionControlSystem"];
engine.systems.MotionControlSystem.__super__ = ash.tools.ListIteratingSystem;
engine.systems.MotionControlSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
		var control = node.controls;
		var position = node.position;
		var motion = node.motion;
		var delta;
		if(motion.onGround) delta = 4.0; else delta = 2;
		if(this.input.keyMap[65] > 0) motion.forces.x -= delta;
		if(this.input.keyMap[68] > 0) motion.forces.x += delta;
		if(motion.onGround && this.input.JustPressed(87)) motion.forces.y -= delta * 4;
		if(this.input.keyMap[83] > 0) motion.forces.y += delta;
	}
	,__class__: engine.systems.MotionControlSystem
});
engine.systems.MovementSystem = function() {
	ash.tools.ListIteratingSystem.call(this,engine.nodes.MovementNode,$bind(this,this.updateNode));
};
$hxClasses["engine.systems.MovementSystem"] = engine.systems.MovementSystem;
engine.systems.MovementSystem.__name__ = ["engine","systems","MovementSystem"];
engine.systems.MovementSystem.__super__ = ash.tools.ListIteratingSystem;
engine.systems.MovementSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
	}
	,__class__: engine.systems.MovementSystem
});
engine.systems.PhysicsSystem = function(broadphases) {
	ash.core.System.call(this);
	this.broadphases = broadphases;
};
$hxClasses["engine.systems.PhysicsSystem"] = engine.systems.PhysicsSystem;
engine.systems.PhysicsSystem.__name__ = ["engine","systems","PhysicsSystem"];
engine.systems.PhysicsSystem.__super__ = ash.core.System;
engine.systems.PhysicsSystem.prototype = $extend(ash.core.System.prototype,{
	addToEngine: function(engine1) {
		this.nodes = engine1.getNodeList(engine.nodes.PhysicsNode);
		var _g = new ash.GenericListIterator(this.nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			this.addToBroadphase(node);
		}
		this.nodes.nodeAdded.add($bind(this,this.addToBroadphase));
		this.nodes.nodeRemoved.add($bind(this,this.removeFromBroadphase));
	}
	,addToBroadphase: function(node) {
		var _g = 0;
		var _g1 = this.broadphases;
		while(_g < _g1.length) {
			var broadphase = _g1[_g];
			++_g;
			broadphase.add(node.collision.aabb);
		}
	}
	,removeFromBroadphase: function(node) {
		var _g = 0;
		var _g1 = this.broadphases;
		while(_g < _g1.length) {
			var broadphase = _g1[_g];
			++_g;
			broadphase.remove(node.collision.aabb);
		}
	}
	,update: function(time) {
		var _g = new ash.GenericListIterator(this.nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			var motion = node.motion;
			node.motion.forces.y += 1;
			motion.forces.multEquals(1 / time);
			motion.velocity.plusEquals(motion.forces);
			motion.velocity.multEquals(motion.damping);
			node.motion.velocity.clampMax(1);
			motion.forces.setTo(0,0);
		}
		var _g1 = 0;
		var _g11 = this.broadphases;
		while(_g1 < _g11.length) {
			var broadphase = _g11[_g1];
			++_g1;
			broadphase.collide(this.nodes,time);
		}
		var _g2 = new ash.GenericListIterator(this.nodes.head);
		while(_g2.previous.next != null) {
			var node1 = _g2.next();
			node1.position.position.x += (node1.motion.velocity.x + node1.motion.positionCorrection.x) * time;
			node1.position.position.y += (node1.motion.velocity.y + node1.motion.positionCorrection.y) * time;
			node1.motion.positionCorrection.setTo(0,0);
		}
	}
	,Update: function() {
	}
	,removeFromEngine: function(engine) {
		this.nodes = null;
	}
	,__class__: engine.systems.PhysicsSystem
});
engine.systems.RenderSystem = function(container) {
	ash.core.System.call(this);
	this.container = container;
};
$hxClasses["engine.systems.RenderSystem"] = engine.systems.RenderSystem;
engine.systems.RenderSystem.__name__ = ["engine","systems","RenderSystem"];
engine.systems.RenderSystem.__super__ = ash.core.System;
engine.systems.RenderSystem.prototype = $extend(ash.core.System.prototype,{
	addToEngine: function(engine1) {
		this.nodes = engine1.getNodeList(engine.nodes.RenderNode);
		var _g = new ash.GenericListIterator(this.nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			this.addToDisplay(node);
		}
		this.nodes.nodeAdded.add($bind(this,this.addToDisplay));
		this.nodes.nodeRemoved.add($bind(this,this.removeFromDisplay));
	}
	,addToDisplay: function(node) {
		this.container.addChild(node.display.displayObject);
	}
	,removeFromDisplay: function(node) {
		this.container.removeChild(node.display.displayObject);
	}
	,update: function(time) {
		var _g = new ash.GenericListIterator(this.nodes.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			var displayObject = node.display.displayObject;
			var position = node.position;
			displayObject.position.x = position.position.x;
			displayObject.position.y = position.position.y;
			displayObject._rotation = position.rotation * 180 / Math.PI;
			displayObject._rotationComponents.x = Math.cos(displayObject._rotation);
			displayObject._rotationComponents.y = Math.sin(displayObject._rotation);
			displayObject._rotation;
		}
	}
	,removeFromEngine: function(engine) {
		this.nodes = null;
	}
	,__class__: engine.systems.RenderSystem
});
engine.view = {};
engine.view.View = function(width,height,debug) {
	this.stage = new wgr.display.Stage();
	this.camera = new wgr.display.Camera();
	this.stage.addChild(this.camera);
	this.canvasView = js.Boot.__cast(window.document.getElementById("view") , HTMLCanvasElement);
	this.renderer = new wgr.renderers.webgl.WebGLRenderer(this.stage,this.camera,this.canvasView,width,height);
	this.debugView = js.Boot.__cast(window.document.getElementById("viewDebug") , HTMLCanvasElement);
	this.debugRenderer = new wgr.renderers.canvas.CanvasDebugView(this.debugView,this.camera,width,height);
	this.camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
	this.camera.Resize(this.renderer.width,this.renderer.height);
};
$hxClasses["engine.view.View"] = engine.view.View;
engine.view.View.__name__ = ["engine","view","View"];
engine.view.View.prototype = {
	__class__: engine.view.View
};
var geom = {};
geom.AABB = function(width,height) {
	this.extents = new geom.Vector2D(width,height);
	this.position = new geom.Vector2D();
};
$hxClasses["geom.AABB"] = geom.AABB;
geom.AABB.__name__ = ["geom","AABB"];
geom.AABB.prototype = {
	__class__: geom.AABB
};
geom.Vector2D = function(x,y) {
	if(y == null) y = .0;
	if(x == null) x = .0;
	this.x = x;
	this.y = y;
};
$hxClasses["geom.Vector2D"] = geom.Vector2D;
geom.Vector2D.__name__ = ["geom","Vector2D"];
geom.Vector2D.fromString = function(str) {
	if(str == null) return null;
	var vectorParts = str.split(":");
	if(vectorParts == null || vectorParts.length != 2) return null;
	var xVal = Std.parseFloat(vectorParts[0]);
	var yVal = Std.parseFloat(vectorParts[1]);
	if(Math.isNaN(xVal) || Math.isNaN(yVal)) return null;
	return new geom.Vector2D(xVal,yVal);
};
geom.Vector2D.prototype = {
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
		return new geom.Vector2D(this.x + v.x,this.y + v.y);
	}
	,plus2: function(x,y) {
		return new geom.Vector2D(this.x + x,this.y + y);
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
		return new geom.Vector2D(this.x - v.x,this.y - v.y);
	}
	,minus2: function(x,y) {
		return new geom.Vector2D(this.x - x,this.y - y);
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
		return new geom.Vector2D(this.x * s,this.y * s);
	}
	,multEquals: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	,times: function(v) {
		return new geom.Vector2D(this.x * v.x,this.y * v.y);
	}
	,times2: function(x,y) {
		return new geom.Vector2D(this.x * x,this.y * y);
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
		return new geom.Vector2D(this.x / s,this.y / s);
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
		return new geom.Vector2D(this.x / t,this.y / t);
	}
	,unitEquals: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		this.x /= t;
		this.y /= t;
		return this;
	}
	,leftHandNormal: function() {
		return new geom.Vector2D(this.y,-this.x);
	}
	,leftHandNormalEquals: function() {
		var t = this.x;
		this.x = this.y;
		this.y = -t;
		return this;
	}
	,rightHandNormal: function() {
		return new geom.Vector2D(-this.y,this.x);
	}
	,rightHandNormalEquals: function() {
		var t = this.x;
		this.x = -this.y;
		this.y = this.x;
		return this;
	}
	,distance: function(v) {
		var delta = new geom.Vector2D(v.x - this.x,v.y - this.y);
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
		return this.mult(1 - t).plus(new geom.Vector2D(v.x * t,v.y * t));
	}
	,rotate: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		return new geom.Vector2D(cos * this.x - sin * this.y,cos * this.y + sin * this.x);
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
	,reverse: function() {
		return new geom.Vector2D(-this.x,-this.y);
	}
	,majorAxis: function() {
		if(Math.abs(this.x) > Math.abs(this.y)) return new geom.Vector2D(this.x >= 0?1:-1,0); else return new geom.Vector2D(0,this.y >= 0?1:-1);
	}
	,isEquals: function(v) {
		return this.x == v.x && this.y == v.y;
	}
	,equalsZero: function() {
		return this.x == 0 && this.y == 0;
	}
	,clone: function() {
		return new geom.Vector2D(this.x,this.y);
	}
	,toString: function() {
		return this.x + ":" + this.y;
	}
	,__class__: geom.Vector2D
};
var haxe = {};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
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
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(i == null) s.b += "null"; else s.b += "" + i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe.ds.StringMap
};
haxe.xml = {};
haxe.xml._Fast = {};
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
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
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
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
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
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
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
};
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
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
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
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
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
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
$hxClasses["js.Boot"] = js.Boot;
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
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
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
var utils = {};
utils.EventTarget = function() {
	this.listeners = new haxe.ds.StringMap();
};
$hxClasses["utils.EventTarget"] = utils.EventTarget;
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
$hxClasses["utils.AssetLoader"] = utils.AssetLoader;
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
		if(extention == "tmx" || extention == "xml") return new utils.BlobAsset(this);
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
$hxClasses["utils.ILoader"] = utils.ILoader;
utils.ILoader.__name__ = ["utils","ILoader"];
utils.ILoader.prototype = {
	__class__: utils.ILoader
};
utils.ImageAsset = function(mgr) {
	this.mgr = mgr;
};
$hxClasses["utils.ImageAsset"] = utils.ImageAsset;
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
$hxClasses["utils.BlobAsset"] = utils.BlobAsset;
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
$hxClasses["utils.Base64"] = utils.Base64;
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
utils.Maths = function() { };
$hxClasses["utils.Maths"] = utils.Maths;
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
$hxClasses["wgr.display.DisplayObject"] = wgr.display.DisplayObject;
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
$hxClasses["wgr.display.DisplayObjectContainer"] = wgr.display.DisplayObjectContainer;
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
$hxClasses["wgr.display.Camera"] = wgr.display.Camera;
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
wgr.display.DisplayListIter = function(root) {
	this.node = root;
	this.stack = new Array();
	this.reset();
};
$hxClasses["wgr.display.DisplayListIter"] = wgr.display.DisplayListIter;
wgr.display.DisplayListIter.__name__ = ["wgr","display","DisplayListIter"];
wgr.display.DisplayListIter.prototype = {
	reset: function() {
		this.stack[0] = this.node;
		this.top = 1;
	}
	,hasNext: function() {
		return this.top > 0;
	}
	,next: function() {
		var thisNode = this.stack[--this.top];
		if(thisNode.next != null) this.stack[this.top++] = thisNode.next;
		if(thisNode.head != null) this.stack[this.top++] = thisNode.head;
		return thisNode;
	}
	,__class__: wgr.display.DisplayListIter
};
wgr.display.Sprite = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.renderable = true;
	this.anchor = new wgr.geom.Point();
	this.transformedVerts = new Float32Array(8);
};
$hxClasses["wgr.display.Sprite"] = wgr.display.Sprite;
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
$hxClasses["wgr.display.Stage"] = wgr.display.Stage;
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
		console.log("Flatten");
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
$hxClasses["wgr.geom.AABB"] = wgr.geom.AABB;
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
	,__class__: wgr.geom.AABB
};
wgr.geom.Matrix3 = function() { };
$hxClasses["wgr.geom.Matrix3"] = wgr.geom.Matrix3;
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
$hxClasses["wgr.geom.Matrix4"] = wgr.geom.Matrix4;
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
$hxClasses["wgr.geom.Point"] = wgr.geom.Point;
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
$hxClasses["wgr.geom.Rectangle"] = wgr.geom.Rectangle;
wgr.geom.Rectangle.__name__ = ["wgr","geom","Rectangle"];
wgr.geom.Rectangle.prototype = {
	__class__: wgr.geom.Rectangle
};
wgr.lighting = {};
wgr.lighting.ILight = function() { };
$hxClasses["wgr.lighting.ILight"] = wgr.lighting.ILight;
wgr.lighting.ILight.__name__ = ["wgr","lighting","ILight"];
wgr.lighting.ILight.prototype = {
	__class__: wgr.lighting.ILight
};
wgr.lighting.FloodFillLight = function(x,y,range,intensity) {
	if(intensity == null) intensity = 255;
	if(range == null) range = 255;
	this.x = x;
	this.y = y;
	this.range = Math.min(255,range);
	this.range2 = range * 2;
	this.intensity = Math.min(255,intensity);
	this.preRenderedLight = new Uint8Array(this.range2 * this.range2);
	this.renderedLight = new Uint8Array(this.range2 * this.range2);
	this.workingCells = new Uint32Array(this.range2 * this.range2);
	this.colour = 16777215;
	this.preRenderLight();
};
$hxClasses["wgr.lighting.FloodFillLight"] = wgr.lighting.FloodFillLight;
wgr.lighting.FloodFillLight.__name__ = ["wgr","lighting","FloodFillLight"];
wgr.lighting.FloodFillLight.__interfaces__ = [wgr.lighting.ILight];
wgr.lighting.FloodFillLight.prototype = {
	preRenderLight: function() {
		var _g1 = 0;
		var _g = this.range2;
		while(_g1 < _g) {
			var ypos = _g1++;
			var _g3 = 0;
			var _g2 = this.range2;
			while(_g3 < _g2) {
				var xpos = _g3++;
				var dX = ypos - this.range;
				var dY = xpos - this.range;
				var dSQR = dX * dX + dY * dY;
				var cellIntensity = this.intensity * Math.max(0,1 - dSQR / (this.range * this.range));
				this.preRenderedLight[ypos * this.range2 + xpos] = cellIntensity;
			}
		}
	}
	,resetRenderedLight: function() {
		var _g1 = 0;
		var _g = this.range2;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.range2;
			while(_g3 < _g2) {
				var x = _g3++;
				this.renderedLight[y * this.range2 + x] = 0;
			}
		}
	}
	,renderLight: function(map,opacityLookup,lightMap) {
		var cellX = this.x;
		var cellY = this.y;
		var encounteredWallness = 0;
		var cellCount = 0;
		this.workingCells[cellCount++] = 0 | cellX << 8 | cellY;
		while(cellCount > 0) {
			var cellValue = this.workingCells[--cellCount];
			encounteredWallness = cellValue >> 16 & 255;
			cellX = cellValue >> 8 & 255;
			cellY = cellValue & 255;
			if(cellX >= 0 && this.x < map.w && cellY >= 0 && this.y < map.h) {
				var relX = this.x - cellX + this.range;
				var relY = this.y - cellY + this.range;
				if(relX >= 0 || relX < this.range2 || relY >= 0 || relY <= this.range2) {
					encounteredWallness += opacityLookup[map.data32[cellY * map.w + cellX]];
					var newLight = this.preRenderedLight[relY * this.range2 + relX] - encounteredWallness;
					var currentLight = lightMap.data32[cellY * lightMap.w + cellX];
					if(newLight > currentLight) {
						lightMap.data32[cellY * lightMap.w + cellX] = newLight;
						this.workingCells[cellCount++] = encounteredWallness << 16 | cellX + 1 << 8 | cellY;
						this.workingCells[cellCount++] = encounteredWallness << 16 | cellX << 8 | cellY + 1;
						this.workingCells[cellCount++] = encounteredWallness << 16 | cellX - 1 << 8 | cellY;
						this.workingCells[cellCount++] = encounteredWallness << 16 | cellX << 8 | cellY - 1;
					}
				}
			}
		}
	}
	,getRelativeLight: function(rx,ry) {
		rx += this.range;
		ry += this.range;
		if(rx < 0 || rx > this.range2 - 1 || ry < 0 || ry > this.range2 - 1) return 0;
		return this.preRenderedLight[ry * this.range2 + rx];
	}
	,getIndex: function(x,y) {
		return y * this.range2 + x;
	}
	,__class__: wgr.lighting.FloodFillLight
};
wgr.lighting.ParticleLightGrid = function() {
	this.width = 50;
	this.height = 40;
	this.map = new ds.Array2D(this.width,this.height);
	this.lightMap = new ds.Array2D(this.width,this.height);
	this.tileSize = 32;
	this.halfTileSize = this.tileSize / 2;
	this.renderer = new wgr.renderers.webgl.PointSpriteLightMapRenderer();
	this.renderer.ResizeBatch(this.width * this.height);
	this.lights = new Array();
	this.lights.push(new wgr.lighting.FloodFillLight(25,5,20,255));
	this.SetTileOpacities();
};
$hxClasses["wgr.lighting.ParticleLightGrid"] = wgr.lighting.ParticleLightGrid;
wgr.lighting.ParticleLightGrid.__name__ = ["wgr","lighting","ParticleLightGrid"];
wgr.lighting.ParticleLightGrid.prototype = {
	SetTileOpacities: function() {
		var leftWall = 20;
		var rightWall = 30;
		var _g1 = 0;
		var _g = this.height - 1;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.width - 1;
			while(_g3 < _g2) {
				var x = _g3++;
				var tileType = 77;
				if(x == leftWall || x == rightWall) tileType = 80;
				if(x > leftWall && x < rightWall) tileType = 31;
				this.map.set(x,y,tileType);
			}
		}
		this.map.set(25,10,80);
		this.map.set(26,10,80);
		this.map.set(25,11,80);
		this.map.set(26,11,80);
		this.tileOpacities = new Uint8Array(256);
		var _g11 = 0;
		var _g4 = this.tileOpacities.length;
		while(_g11 < _g4) {
			var i = _g11++;
			this.tileOpacities[i] = 1;
		}
		this.tileOpacities[80] = 40;
		this.tileOpacities[77] = 30;
		this.tileOpacities[31] = 5;
	}
	,draw: function() {
		this.reset();
		this.drawLights();
		this.renderLightGrid();
	}
	,reset: function() {
		this.renderer.ResetBatch();
		var _g1 = 0;
		var _g = this.height - 1;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.width - 1;
			while(_g3 < _g2) {
				var x = _g3++;
				this.lightMap.set(x,y,0);
			}
		}
	}
	,drawLights: function() {
		this.count = 0;
		var _g = 0;
		var _g1 = this.lights;
		while(_g < _g1.length) {
			var light = _g1[_g];
			++_g;
			light.renderLight(this.map,this.tileOpacities,this.lightMap);
		}
	}
	,renderLightGrid: function() {
		var _g1 = 0;
		var _g = this.height - 1;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.width - 1;
			while(_g3 < _g2) {
				var x = _g3++;
				var light = this.lightMap.get(x,y);
				this.renderer.AddSpriteToBatch(x * this.tileSize + this.halfTileSize,y * this.tileSize + this.halfTileSize,255 - light,0,0,0);
			}
		}
	}
	,__class__: wgr.lighting.ParticleLightGrid
};
wgr.particle = {};
wgr.particle.IParticleEngine = function() { };
$hxClasses["wgr.particle.IParticleEngine"] = wgr.particle.IParticleEngine;
wgr.particle.IParticleEngine.__name__ = ["wgr","particle","IParticleEngine"];
wgr.particle.IParticleEngine.prototype = {
	__class__: wgr.particle.IParticleEngine
};
wgr.particle.PointSpriteParticle = function() {
};
$hxClasses["wgr.particle.PointSpriteParticle"] = wgr.particle.PointSpriteParticle;
wgr.particle.PointSpriteParticle.__name__ = ["wgr","particle","PointSpriteParticle"];
wgr.particle.PointSpriteParticle.prototype = {
	Initalize: function(x,y,vX,vY,fX,fY,ttl,damping,decay,top,externalForce,type,data1,data2) {
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
		this.type = type;
		this.size = data1;
		this.colour = data2;
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
$hxClasses["wgr.particle.PointSpriteParticleEngine"] = wgr.particle.PointSpriteParticleEngine;
wgr.particle.PointSpriteParticleEngine.__name__ = ["wgr","particle","PointSpriteParticleEngine"];
wgr.particle.PointSpriteParticleEngine.__interfaces__ = [wgr.particle.IParticleEngine];
wgr.particle.PointSpriteParticleEngine.prototype = {
	EmitParticle: function(x,y,vX,vY,fX,fY,ttl,damping,decayable,top,externalForce,type,data1,data2) {
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
		particle.type = type;
		particle.size = data1;
		particle.colour = data2;
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
$hxClasses["wgr.renderers.canvas.CanvasDebugView"] = wgr.renderers.canvas.CanvasDebugView;
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
$hxClasses["wgr.renderers.webgl.IRenderer"] = wgr.renderers.webgl.IRenderer;
wgr.renderers.webgl.IRenderer.__name__ = ["wgr","renderers","webgl","IRenderer"];
wgr.renderers.webgl.IRenderer.prototype = {
	__class__: wgr.renderers.webgl.IRenderer
};
wgr.renderers.webgl.PointSpriteLightMapRenderer = function() {
};
$hxClasses["wgr.renderers.webgl.PointSpriteLightMapRenderer"] = wgr.renderers.webgl.PointSpriteLightMapRenderer;
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
	,AddSpriteToBatch: function(x,y,alpha,red,green,blue) {
		var index = this.indexRun * 3;
		this.data[index] = x + this.camera.position.x | 0;
		this.data[index + 1] = y + this.camera.position.y | 0;
		index *= 4;
		this.data8[index + 8] = red;
		this.data8[index + 9] = blue;
		this.data8[index + 10] = green;
		this.data8[index + 11] = alpha;
		this.indexRun++;
	}
	,Render: function(clip) {
		this.gl.enable(3042);
		this.gl.blendFunc(770,771);
		this.gl.useProgram(this.pointSpriteShader.program);
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35048);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
		this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.position,2,5126,false,12,0);
		this.gl.vertexAttribPointer(this.pointSpriteShader.attribute.colour,4,5121,true,12,8);
		this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.gl.uniform1f(this.pointSpriteShader.uniform.size,32);
		this.gl.drawArrays(0,0,this.indexRun);
	}
	,__class__: wgr.renderers.webgl.PointSpriteLightMapRenderer
};
wgr.renderers.webgl.PointSpriteRenderer = function() {
};
$hxClasses["wgr.renderers.webgl.PointSpriteRenderer"] = wgr.renderers.webgl.PointSpriteRenderer;
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
$hxClasses["wgr.renderers.webgl.ShaderWrapper"] = wgr.renderers.webgl.ShaderWrapper;
wgr.renderers.webgl.ShaderWrapper.__name__ = ["wgr","renderers","webgl","ShaderWrapper"];
wgr.renderers.webgl.ShaderWrapper.prototype = {
	__class__: wgr.renderers.webgl.ShaderWrapper
};
wgr.renderers.webgl.SpriteRenderer = function() {
};
$hxClasses["wgr.renderers.webgl.SpriteRenderer"] = wgr.renderers.webgl.SpriteRenderer;
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
$hxClasses["wgr.renderers.webgl.TileLayer"] = wgr.renderers.webgl.TileLayer;
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
$hxClasses["wgr.renderers.webgl.TileMap"] = wgr.renderers.webgl.TileMap;
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
$hxClasses["wgr.renderers.webgl.WebGLBatch"] = wgr.renderers.webgl.WebGLBatch;
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
		this.data[index] = sprite.transformedVerts[0];
		this.data[index + 1] = sprite.transformedVerts[1];
		this.data[index + 2] = frame.x / tw;
		this.data[index + 3] = frame.y / th;
		this.data[index + 4] = sprite.worldAlpha;
		this.data[index + 5] = sprite.transformedVerts[2];
		this.data[index + 6] = sprite.transformedVerts[3];
		this.data[index + 7] = (frame.x + frame.width) / tw;
		this.data[index + 8] = frame.y / th;
		this.data[index + 9] = sprite.worldAlpha;
		this.data[index + 10] = sprite.transformedVerts[4];
		this.data[index + 11] = sprite.transformedVerts[5];
		this.data[index + 12] = (frame.x + frame.width) / tw;
		this.data[index + 13] = (frame.y + frame.height) / th;
		this.data[index + 14] = sprite.worldAlpha;
		this.data[index + 15] = sprite.transformedVerts[6];
		this.data[index + 16] = sprite.transformedVerts[7];
		this.data[index + 17] = frame.x / tw;
		this.data[index + 18] = (frame.y + frame.height) / th;
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
	if(antialias == null) antialias = true;
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
$hxClasses["wgr.renderers.webgl.WebGLRenderer"] = wgr.renderers.webgl.WebGLRenderer;
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
$hxClasses["wgr.renderers.webgl.WebGLShaders"] = wgr.renderers.webgl.WebGLShaders;
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
	this.width = source.width;
	this.height = source.width;
};
$hxClasses["wgr.texture.BaseTexture"] = wgr.texture.BaseTexture;
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
wgr.texture.Texture = function(baseTexture,frame) {
	this.noFrame = false;
	this.baseTexture = baseTexture;
	if(frame == null) {
		this.noFrame = true;
		this.frame = new wgr.geom.Rectangle(0,0,1,1);
	} else this.frame = frame;
	this.trim = new wgr.geom.Point();
};
$hxClasses["wgr.texture.Texture"] = wgr.texture.Texture;
wgr.texture.Texture.__name__ = ["wgr","texture","Texture"];
wgr.texture.Texture.prototype = {
	__class__: wgr.texture.Texture
};
wgr.texture.TextureManager = function(gl) {
	this.gl = gl;
	this.baseTextures = new haxe.ds.StringMap();
	this.textures = new haxe.ds.StringMap();
};
$hxClasses["wgr.texture.TextureManager"] = wgr.texture.TextureManager;
wgr.texture.TextureManager.__name__ = ["wgr","texture","TextureManager"];
wgr.texture.TextureManager.prototype = {
	AddTexture: function(id,image) {
		var baseTexture = new wgr.texture.BaseTexture(image);
		baseTexture.RegisterTexture(this.gl);
		this.baseTextures.set(id,baseTexture);
		return baseTexture;
	}
	,AddTexturesFromConfig: function(textureConfig,assets) {
		if(!(typeof(textureConfig) == "string")) return;
		var source = new haxe.xml.Fast(Xml.parse(textureConfig));
		source = source.node.resolve("textureconfig");
		var $it0 = source.nodes.resolve("basetexture").iterator();
		while( $it0.hasNext() ) {
			var btnode = $it0.next();
			var id = btnode.att.resolve("id");
			var asset = btnode.att.resolve("asset");
			var baseTextureImage = assets.get(asset);
			var baseTexture = this.AddTexture(id,baseTextureImage);
			var $it1 = btnode.nodes.resolve("texture").iterator();
			while( $it1.hasNext() ) {
				var tnode = $it1.next();
				var top = Std.parseInt(tnode.att.resolve("top"));
				var left = Std.parseInt(tnode.att.resolve("left"));
				var width = Std.parseInt(tnode.att.resolve("width"));
				var height = Std.parseInt(tnode.att.resolve("height"));
				this.textures.set(tnode.att.resolve("id"),new wgr.texture.Texture(baseTexture,new wgr.geom.Rectangle(top,left,width,height)));
			}
		}
	}
	,__class__: wgr.texture.TextureManager
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
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
ash.core.Entity.nameCount = 0;
engine.map.tmx.TmxLayer.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
haxe.ds.ObjectMap.count = 0;
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
utils.Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
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
wgr.particle.PointSpriteParticle.INV_ALPHA = 0.00392156862745098;
wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","uniform vec2 projectionVector;","uniform float size;","attribute vec2 position;","attribute vec4 colour;","varying vec4 vColor;","void main() {","gl_PointSize = size;","vColor = colour;","gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
wgr.renderers.webgl.PointSpriteLightMapRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec4 vColor;","void main() {","gl_FragColor = vColor;","}"];
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","uniform float texTilesWide;","uniform float texTilesHigh;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 projectionVector;","uniform vec2 flip;","attribute vec2 position;","attribute float size;","attribute float tileType;","attribute vec4 colour;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","float t = floor(tileType/texTilesWide);","vTilePos = vec2(tileType-(t*texTilesWide), t);","gl_PointSize = size;","vColor = colour;","gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","uniform sampler2D texture;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 flip;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","vec2 uv = vec2( ((-1.0+(2.0*flip.x))*(flip.x-gl_PointCoord.x))*invTexTilesWide + invTexTilesWide*vTilePos.x, ((-1.0+(2.0*flip.y))*(flip.y-gl_PointCoord.y))*invTexTilesHigh + invTexTilesHigh*vTilePos.y);","gl_FragColor = texture2D( texture, uv ) * vColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER = ["precision mediump float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * vColor;","}"];
wgr.renderers.webgl.TileMap.TILEMAP_VERTEX_SHADER = ["precision mediump float;","attribute vec2 position;","attribute vec2 texture;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform vec2 viewOffset;","uniform vec2 viewportSize;","uniform vec2 inverseTileTextureSize;","uniform float inverseTileSize;","void main(void) {","   pixelCoord = (texture * viewportSize) + viewOffset;","   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;","   gl_Position = vec4(position, 0.0, 1.0);","}"];
wgr.renderers.webgl.TileMap.TILEMAP_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform sampler2D tiles;","uniform sampler2D sprites;","uniform vec2 inverseTileTextureSize;","uniform vec2 inverseSpriteTextureSize;","uniform float tileSize;","void main(void) {","   vec4 tile = texture2D(tiles, texCoord);","   if(tile.x == 1.0 && tile.y == 1.0) { discard; }","   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;","   vec2 spriteCoord = mod(pixelCoord, tileSize);","   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);","}"];
Main.main();
})();

//# sourceMappingURL=script.js.map