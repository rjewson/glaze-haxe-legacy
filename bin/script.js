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
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
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
List.__name__ = true;
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
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,__class__: List
};
var Main = function() { };
Main.__name__ = true;
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
		var entityManager = new engine.core.EntityManager();
		entityManager.addSystem(new engine.systems.RenderSystem(itemContainer));
		entityManager.addSystem(new engine.systems.ParticleSystem(pointParticleEngine));
		entityManager.componentAdded.add(function(component) {
		});
		var e1 = new engine.core.Entity();
		var spr3 = createSprite("character",400,380,0,0,"texturechar1");
		spr3.scale.x = -1;
		spr3.pivot.x = 25.;
		spr3.pivot.y = 75;
		e1.add(new engine.components.Physics(400,380,0)).add(new engine.components.Sprite(spr3)).add(new engine.components.KeyboardControls(gameLoop.keyboard)).add(new engine.components.ParticleEmitter());
		entityManager.addEntity(e1);
		var xpos = 0;
		var ypos = 0;
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			var newSpr = new wgr.display.Sprite();
			newSpr.id = "newSpr" + i;
			newSpr.texture = tm.textures.get("texturechar1");
			xpos++;
			if(xpos > 99) {
				xpos = 0;
				ypos++;
			}
			newSpr.pivot.x = 25.;
			newSpr.pivot.y = 37.5;
			var e = new engine.core.Entity();
			e.add(new engine.components.Physics(100 + xpos * 20,100 + ypos * 20,0)).add(new engine.components.Sprite(newSpr));
			entityManager.addEntity(e);
		}
		var tick = function() {
			entityManager.Update(16.6666666666666679);
			view.camera.Focus(spr3.position.x,spr3.position.y);
			view.renderer.Render(view.camera.viewPortAABB);
		};
		gameLoop.updateFunc = tick;
		gameLoop.start();
		window.document.getElementById("stopbutton").addEventListener("click",function(event1) {
			gameLoop.stop();
		});
		window.document.getElementById("startbutton").addEventListener("click",function(event1) {
			gameLoop.start();
		});
		window.document.getElementById("debugbutton").addEventListener("click",function(event1) {
		});
		window.document.getElementById("action1").addEventListener("click",function(event1) {
		});
		window.document.getElementById("action2").addEventListener("click",function(event1) {
		});
	});
	assets.SetImagesToLoad(["data/textureConfig.xml","data/testMap.tmx","data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png","data/tilescompressed.png"]);
	assets.Load();
	var pengine = new physics.collision.broadphase.managedgrid.ManagedGrid(60,60,new physics.collision.narrowphase.sat.SAT(),16,16,400);
	var b1 = new physics.dynamics.Body();
	b1.AddFeature(new physics.geometry.AABBShape(new physics.geometry.Vector2D(5,10)));
	b1.SetStaticPosition(new physics.geometry.Vector2D(100,100));
	var b2 = new physics.dynamics.Body();
	b2.AddFeature(new physics.geometry.AABBShape(new physics.geometry.Vector2D(5,10)));
	b2.SetStaticPosition(new physics.geometry.Vector2D(100,115));
	pengine.AddBody(b1);
	pengine.AddBody(b2);
	pengine.Step();
	console.log(b1);
	console.log(b2);
};
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
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
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
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
var XmlType = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
Xml.__name__ = true;
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
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
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
var ds = {};
ds.Array2D = function(width,height,buffer) {
	this.w = width;
	this.h = height;
	if(buffer == null) this.buffer = new ArrayBuffer(this.w * this.h * 4); else this.buffer = buffer;
	this.data32 = new Uint32Array(this.buffer);
	this.data8 = new Uint8Array(this.buffer);
};
ds.Array2D.__name__ = true;
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
			var data = this.data32[testY * this.w + testX];
			if(data != 0) {
				collisionPoint.y = testY;
				if(stepY < 0) collisionPoint.y += 1.0;
				collisionPoint.x = p1.x + ratioX * (collisionPoint.y - p1.y);
				collisionPoint.x *= tileSize;
				collisionPoint.y *= tileSize;
				return collisionPoint;
			}
		}
		return p2Original;
	}
	,__class__: ds.Array2D
};
ds.DLLNode = function() { };
ds.DLLNode.__name__ = true;
ds.DLLNode.prototype = {
	__class__: ds.DLLNode
};
ds.DLL = function() {
};
ds.DLL.__name__ = true;
ds.DLL.prototype = {
	insertAfter: function(node,newNode) {
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
		} else {
			var node = this.head;
			newNode.prev = node.prev;
			newNode.next = node;
			if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
			node.prev = newNode;
		}
	}
	,insertEnd: function(newNode) {
		if(this.tail == null) {
			if(this.head == null) {
				this.head = newNode;
				this.tail = newNode;
				newNode.prev = null;
				newNode.next = null;
			} else {
				var node = this.head;
				newNode.prev = node.prev;
				newNode.next = node;
				if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
				node.prev = newNode;
			}
		} else {
			var node = this.tail;
			newNode.prev = node;
			newNode.next = node.next;
			if(node.next == null) this.tail = newNode; else node.next.prev = newNode;
			node.next = newNode;
		}
	}
	,remove: function(node) {
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
ds.Grid2D.__name__ = true;
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
ds.Grid2DIterator.__name__ = true;
ds.Grid2DIterator.prototype = {
	__class__: ds.Grid2DIterator
};
ds.IDManager = function() { };
ds.IDManager.__name__ = true;
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
var engine = {};
engine.GameLoop = function() {
	this.isRunning = false;
	this.keyboard = new engine.input.DigitalInput();
	this.keyboard.InputTarget(window.document);
};
engine.GameLoop.__name__ = true;
engine.GameLoop.prototype = {
	update: function(timestamp) {
		this.delta = timestamp - this.prevAnimationTime;
		this.prevAnimationTime = timestamp;
		this.keyboard.Update();
		if(this.updateFunc != null) this.updateFunc();
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
engine.core = {};
engine.core.Component = function() { };
engine.core.Component.__name__ = true;
engine.core.Component.__interfaces__ = [ds.DLLNode];
engine.core.Component.prototype = {
	onAdded: function() {
	}
	,onRemoved: function() {
	}
	,onUpdate: function(dt) {
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,__class__: engine.core.Component
};
engine.components = {};
engine.components.KeyboardControls = function(input) {
	this.name = "Keyboard";
	this.input = input;
};
engine.components.KeyboardControls.__name__ = true;
engine.components.KeyboardControls.__super__ = engine.core.Component;
engine.components.KeyboardControls.prototype = $extend(engine.core.Component.prototype,{
	onAdded: function() {
		this.physics = this.owner.componentMap.Physics;
	}
	,onUpdate: function(dt) {
		var cameraDelta = 6;
		if(this.input.keyMap[65] > 0) this.physics.position.x -= cameraDelta;
		if(this.input.keyMap[68] > 0) this.physics.position.x += cameraDelta;
		if(this.input.keyMap[87] > 0) this.physics.position.y -= cameraDelta;
		if(this.input.keyMap[83] > 0) this.physics.position.y += cameraDelta;
	}
	,__class__: engine.components.KeyboardControls
});
engine.components.ParticleEmitter = function() {
	this.name = "Particle";
};
engine.components.ParticleEmitter.__name__ = true;
engine.components.ParticleEmitter.__super__ = engine.core.Component;
engine.components.ParticleEmitter.prototype = $extend(engine.core.Component.prototype,{
	onAdded: function() {
		this.physics = this.owner.componentMap.Physics;
	}
	,onUpdate: function(dt) {
		var _g = 0;
		while(_g < 1) {
			var pCount = _g++;
			var vX = Std.random(100) - 50;
			var vY = Std.random(100) - 50;
			var ttl = Std.random(5000) + 500;
			var type = 1;
			this.particleEngine.EmitParticle(this.physics.position.x,this.physics.position.y,vX,vY,0,0,ttl,0.99,true,true,null,type,32,-1);
		}
	}
	,__class__: engine.components.ParticleEmitter
});
engine.components.Physics = function(x,y,rotation) {
	this.name = "Physics";
	this.position = new physics.geometry.Vector2D(x,y);
	this.rotation = rotation;
};
engine.components.Physics.__name__ = true;
engine.components.Physics.__super__ = engine.core.Component;
engine.components.Physics.prototype = $extend(engine.core.Component.prototype,{
	onUpdate: function(dt) {
	}
	,__class__: engine.components.Physics
});
engine.components.Sprite = function(display) {
	this.name = "Sprite";
	this.display = display;
};
engine.components.Sprite.__name__ = true;
engine.components.Sprite.__super__ = engine.core.Component;
engine.components.Sprite.prototype = $extend(engine.core.Component.prototype,{
	onAdded: function() {
		this.physics = this.owner.componentMap.Physics;
	}
	,onUpdate: function(dt) {
		this.display.position.x = this.physics.position.x;
		this.display.position.y = this.physics.position.y;
		var _this = this.display;
		_this._rotation = this.physics.rotation;
		_this._rotationComponents.x = Math.cos(_this._rotation);
		_this._rotationComponents.y = Math.sin(_this._rotation);
		_this._rotation;
	}
	,__class__: engine.components.Sprite
});
engine.core.Entity = function() {
	this.components = new ds.DLL();
	this.componentMap = { };
};
engine.core.Entity.__name__ = true;
engine.core.Entity.__interfaces__ = [ds.DLLNode];
engine.core.Entity.prototype = {
	add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.name;
		var prev = this.componentMap[name];
		if(prev != null) this.remove(prev);
		component.owner = this;
		this.componentMap[name] = component;
		var _this = this.components;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = component;
				_this.tail = component;
				component.prev = null;
				component.next = null;
			} else {
				var node = _this.head;
				component.prev = node.prev;
				component.next = node;
				if(node.prev == null) _this.head = component; else node.prev.next = component;
				node.prev = component;
			}
		} else {
			var node = _this.tail;
			component.prev = node;
			component.next = node.next;
			if(node.next == null) _this.tail = component; else node.next.prev = component;
			node.next = component;
		}
		component.onAdded();
		if(this.manager != null) this.manager.componentAdded.dispatch(component);
		return this;
	}
	,remove: function(component) {
		var _this = this.components;
		var next = component.next;
		if(component.prev == null) _this.head = component.next; else component.prev.next = component.next;
		if(component.next == null) _this.tail = component.prev; else component.next.prev = component.prev;
		component.prev = component.next = null;
		next;
		component.onRemoved();
		delete(this.componentMap[component.name]);
		if(this.manager != null) this.manager.componentRemoved.dispatch(component);
	}
	,onAddedToManager: function(manager) {
		this.manager = manager;
		var component = this.components.head;
		while(component != null) {
			manager.componentAdded.dispatch(component);
			component = component.next;
		}
	}
	,onRemovedFromManager: function() {
		var component = this.components.head;
		while(component != null) {
			this.manager.componentRemoved.dispatch(component);
			component = component.next;
		}
		this.manager = null;
	}
	,getComponent: function(name) {
		return this.componentMap[name];
	}
	,__class__: engine.core.Entity
};
engine.core.EntityManager = function() {
	this.entities = new ds.DLL();
	this.entityAdded = new engine.core.signals.Signal1();
	this.entityRemoved = new engine.core.signals.Signal1();
	this.componentAdded = new engine.core.signals.Signal1();
	this.componentRemoved = new engine.core.signals.Signal1();
	this.systems = new ds.DLL();
	this.systemAdded = new engine.core.signals.Signal1();
	this.systemRemoved = new engine.core.signals.Signal1();
	this.componentSystemMap = { };
	this.componentAdded.add($bind(this,this.addComponentToSystem));
};
engine.core.EntityManager.__name__ = true;
engine.core.EntityManager.prototype = {
	addEntity: function(entity) {
		var _this = this.entities;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = entity;
				_this.tail = entity;
				entity.prev = null;
				entity.next = null;
			} else {
				var node = _this.head;
				entity.prev = node.prev;
				entity.next = node;
				if(node.prev == null) _this.head = entity; else node.prev.next = entity;
				node.prev = entity;
			}
		} else {
			var node = _this.tail;
			entity.prev = node;
			entity.next = node.next;
			if(node.next == null) _this.tail = entity; else node.next.prev = entity;
			node.next = entity;
		}
		entity.onAddedToManager(this);
		this.entityAdded.dispatch(entity);
	}
	,removeEntity: function(entity) {
		var _this = this.entities;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = entity;
				_this.tail = entity;
				entity.prev = null;
				entity.next = null;
			} else {
				var node = _this.head;
				entity.prev = node.prev;
				entity.next = node;
				if(node.prev == null) _this.head = entity; else node.prev.next = entity;
				node.prev = entity;
			}
		} else {
			var node = _this.tail;
			entity.prev = node;
			entity.next = node.next;
			if(node.next == null) _this.tail = entity; else node.next.prev = entity;
			node.next = entity;
		}
		entity.onRemovedFromManager();
		this.entityRemoved.dispatch(entity);
	}
	,addSystem: function(system) {
		var _this = this.systems;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = system;
				_this.tail = system;
				system.prev = null;
				system.next = null;
			} else {
				var node = _this.head;
				system.prev = node.prev;
				system.next = node;
				if(node.prev == null) _this.head = system; else node.prev.next = system;
				node.prev = system;
			}
		} else {
			var node = _this.tail;
			system.prev = node;
			system.next = node.next;
			if(node.next == null) _this.tail = system; else node.next.prev = system;
			node.next = system;
		}
		var signal = this.componentSystemMap[system.componentInterest];
		if(signal == null) {
			signal = new engine.core.signals.Signal1();
			this.componentSystemMap[system.componentInterest] = signal;
		}
		signal.add($bind(system,system.onComponentAdded));
		system.onAddedToManager(this);
		this.systemAdded.dispatch(system);
	}
	,removeSystem: function(system) {
		var _this = this.systems;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = system;
				_this.tail = system;
				system.prev = null;
				system.next = null;
			} else {
				var node = _this.head;
				system.prev = node.prev;
				system.next = node;
				if(node.prev == null) _this.head = system; else node.prev.next = system;
				node.prev = system;
			}
		} else {
			var node = _this.tail;
			system.prev = node;
			system.next = node.next;
			if(node.next == null) _this.tail = system; else node.next.prev = system;
			node.next = system;
		}
		var signal = this.componentSystemMap[system.componentInterest];
		if(signal == null) signal.remove($bind(system,system.onComponentAdded));
		system.onRemovedFromManager();
		this.systemRemoved.dispatch(system);
	}
	,addComponentToSystem: function(component) {
		var systemSignal = this.componentSystemMap[component.name];
		if(systemSignal != null) systemSignal.dispatch(component);
	}
	,Update: function(dt) {
		var entity = this.entities.head;
		while(entity != null) {
			var component = entity.components.head;
			while(component != null) {
				component.onUpdate(dt);
				component = component.next;
			}
			entity = entity.next;
		}
		var system = this.systems.head;
		while(system != null) {
			system.update(dt);
			system = system.next;
		}
	}
	,__class__: engine.core.EntityManager
};
engine.core.System = function() {
};
engine.core.System.__name__ = true;
engine.core.System.__interfaces__ = [ds.DLLNode];
engine.core.System.prototype = {
	onAddedToManager: function(manager) {
		this.maanger = manager;
	}
	,onRemovedFromManager: function() {
		this.maanger = null;
	}
	,onComponentAdded: function(component) {
	}
	,onComponentRemoved: function(component) {
	}
	,update: function(dt) {
	}
	,__class__: engine.core.System
};
engine.core.signals = {};
engine.core.signals.Signal = function(listener,once) {
	if(once == null) once = false;
	this.slots = new ds.DLL();
	if(listener != null) this.add(listener,once);
};
engine.core.signals.Signal.__name__ = true;
engine.core.signals.Signal.prototype = {
	add: function(listener,once) {
		if(once == null) once = false;
		var slot = new engine.core.signals.Slot(listener,once);
		var _this = this.slots;
		if(_this.tail == null) {
			if(_this.head == null) {
				_this.head = slot;
				_this.tail = slot;
				slot.prev = null;
				slot.next = null;
			} else {
				var node = _this.head;
				slot.prev = node.prev;
				slot.next = node;
				if(node.prev == null) _this.head = slot; else node.prev.next = slot;
				node.prev = slot;
			}
		} else {
			var node = _this.tail;
			slot.prev = node;
			slot.next = node.next;
			if(node.next == null) _this.tail = slot; else node.next.prev = slot;
			node.next = slot;
		}
	}
	,remove: function(listener) {
		var slot = this.findSlot(listener);
		if(slot != null) {
			var _this = this.slots;
			var next = slot.next;
			if(slot.prev == null) _this.head = slot.next; else slot.prev.next = slot.next;
			if(slot.next == null) _this.tail = slot.prev; else slot.next.prev = slot.prev;
			slot.prev = slot.next = null;
			next;
		}
	}
	,findSlot: function(listener) {
		var slot = this.slots.head;
		while(slot != null) {
			if(slot.listener == listener) return slot;
			slot = slot.next;
		}
		return null;
	}
	,__class__: engine.core.signals.Signal
};
engine.core.signals.Signal0 = function(listener) {
	engine.core.signals.Signal.call(this,listener);
};
engine.core.signals.Signal0.__name__ = true;
engine.core.signals.Signal0.__super__ = engine.core.signals.Signal;
engine.core.signals.Signal0.prototype = $extend(engine.core.signals.Signal.prototype,{
	dispatch: function() {
		var slot = this.slots.head;
		while(slot != null) {
			slot.listener();
			if(slot.once) {
				var _this = this.slots;
				var next = slot.next;
				if(slot.prev == null) _this.head = slot.next; else slot.prev.next = slot.next;
				if(slot.next == null) _this.tail = slot.prev; else slot.next.prev = slot.prev;
				slot.prev = slot.next = null;
				slot = next;
			} else slot = slot.next;
		}
	}
	,__class__: engine.core.signals.Signal0
});
engine.core.signals.Signal1 = function(listener) {
	engine.core.signals.Signal.call(this,listener);
};
engine.core.signals.Signal1.__name__ = true;
engine.core.signals.Signal1.__super__ = engine.core.signals.Signal;
engine.core.signals.Signal1.prototype = $extend(engine.core.signals.Signal.prototype,{
	dispatch: function(arg1) {
		var slot = this.slots.head;
		while(slot != null) {
			slot.listener(arg1);
			if(slot.once) {
				var _this = this.slots;
				var next = slot.next;
				if(slot.prev == null) _this.head = slot.next; else slot.prev.next = slot.next;
				if(slot.next == null) _this.tail = slot.prev; else slot.next.prev = slot.prev;
				slot.prev = slot.next = null;
				slot = next;
			} else slot = slot.next;
		}
	}
	,__class__: engine.core.signals.Signal1
});
engine.core.signals.Slot = function(listener,once) {
	this.listener = listener;
	this.once = once;
};
engine.core.signals.Slot.__name__ = true;
engine.core.signals.Slot.__interfaces__ = [ds.DLLNode];
engine.core.signals.Slot.prototype = {
	__class__: engine.core.signals.Slot
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
engine.input.DigitalInput.__name__ = true;
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
engine.map = {};
engine.map.TileMapMap = function(w,h,data) {
	this.mapData = new ds.Array2D(w,h,data);
	this.tiles = new haxe.ds.IntMap();
};
engine.map.TileMapMap.__name__ = true;
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
				var source;
				var _this = this.mapData;
				source = _this.data32[yp * _this.w + xp];
				if(source > 0) {
					var v = this.tiles.get(source);
					textureData.data32[yp * textureData.w + xp] = v;
				} else textureData.data32[yp * textureData.w + xp] = -1;
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
engine.map.tmx.TmxLayer.__name__ = true;
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
			var source;
			var _this = layer.tileGIDs;
			source = _this.data32[yp * _this.w + xp];
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
	if(js.Boot.__instanceof(data,String)) source = new haxe.xml.Fast(Xml.parse(data)); else throw "Unknown TMX map format";
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
		var node1 = $it1.next();
		this.tilesets.push(new engine.map.tmx.TmxTileSet(node1));
	}
	var $it2 = source.nodes.resolve("layer").iterator();
	while( $it2.hasNext() ) {
		var node1 = $it2.next();
		var _this = this.layers;
		var key = node1.att.resolve("name");
		var value = new engine.map.tmx.TmxLayer(node1,this);
		if(!_this._map.exists(key)) _this._keys.push(key);
		_this._map.set(key,value);
	}
	var $it3 = source.nodes.resolve("objectgroup").iterator();
	while( $it3.hasNext() ) {
		var node1 = $it3.next();
		var _this = this.objectGroups;
		var key = node1.att.resolve("name");
		var value = new engine.map.tmx.TmxObjectGroup(node1,this);
		if(!_this._map.exists(key)) _this._keys.push(key);
		_this._map.set(key,value);
	}
};
engine.map.tmx.TmxMap.__name__ = true;
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
engine.map.tmx.TmxObject.__name__ = true;
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
		var node1 = $it1.next();
		this.objects.push(new engine.map.tmx.TmxObject(node1,this));
	}
};
engine.map.tmx.TmxObjectGroup.__name__ = true;
engine.map.tmx.TmxObjectGroup.prototype = {
	__class__: engine.map.tmx.TmxObjectGroup
};
engine.map.tmx.TmxOrderedHash = function() {
	this._keys = new Array();
	this._map = new haxe.ds.StringMap();
};
engine.map.tmx.TmxOrderedHash.__name__ = true;
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
engine.map.tmx.TmxPropertySet.__name__ = true;
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
engine.map.tmx.TmxTileSet.__name__ = true;
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
engine.systems.ParticleSystem = function(particleEngine) {
	engine.core.System.call(this);
	this.particleEngine = particleEngine;
	this.componentInterest = "Particle";
};
engine.systems.ParticleSystem.__name__ = true;
engine.systems.ParticleSystem.__super__ = engine.core.System;
engine.systems.ParticleSystem.prototype = $extend(engine.core.System.prototype,{
	onComponentAdded: function(component) {
		(js.Boot.__cast(component , engine.components.ParticleEmitter)).particleEngine = this.particleEngine;
	}
	,onComponentRemoved: function(component) {
	}
	,update: function(dt) {
		this.particleEngine.Update();
	}
	,__class__: engine.systems.ParticleSystem
});
engine.systems.RenderSystem = function(container) {
	engine.core.System.call(this);
	this.container = container;
	this.componentInterest = "Sprite";
};
engine.systems.RenderSystem.__name__ = true;
engine.systems.RenderSystem.__super__ = engine.core.System;
engine.systems.RenderSystem.prototype = $extend(engine.core.System.prototype,{
	onComponentAdded: function(component) {
		this.container.addChild((js.Boot.__cast(component , engine.components.Sprite)).display);
	}
	,onComponentRemoved: function(component) {
		this.container.removeChild((js.Boot.__cast(component , engine.components.Sprite)).display);
	}
	,update: function(dt) {
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
	var debug1 = new wgr.renderers.canvas.CanvasDebugView(this.debugView,width,height);
	this.camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
	this.camera.Resize(this.renderer.width,this.renderer.height);
};
engine.view.View.__name__ = true;
engine.view.View.prototype = {
	__class__: engine.view.View
};
var haxe = {};
haxe.ds = {};
haxe.ds.GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe.ds.GenericCell.__name__ = true;
haxe.ds.GenericCell.prototype = {
	__class__: haxe.ds.GenericCell
};
haxe.ds.GenericStack = function() {
};
haxe.ds.GenericStack.__name__ = true;
haxe.ds.GenericStack.prototype = {
	remove: function(v) {
		var prev = null;
		var l = this.head;
		while(l != null) {
			if(l.elt == v) {
				if(prev == null) this.head = l.next; else prev.next = l.next;
				break;
			}
			prev = l;
			l = l.next;
		}
		return l != null;
	}
	,iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,__class__: haxe.ds.GenericStack
};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
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
haxe.ds.StringMap.__name__ = true;
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
	,__class__: haxe.ds.StringMap
};
haxe.xml = {};
haxe.xml._Fast = {};
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeAccess.__name__ = true;
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
haxe.xml._Fast.AttribAccess.__name__ = true;
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
haxe.xml._Fast.HasAttribAccess.__name__ = true;
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
haxe.xml._Fast.HasNodeAccess.__name__ = true;
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
};
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeListAccess.__name__ = true;
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
haxe.xml.Fast.__name__ = true;
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
haxe.xml.Parser.__name__ = true;
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
			case 10:
				break;
			case 13:
				break;
			case 9:
				break;
			case 32:
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
				var len = p - start;
				buf.b += len == null?HxOverrides.substr(str,start,null):HxOverrides.substr(str,start,len);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
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
			case 34:
				state = 8;
				start = p;
				break;
			case 39:
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
					var x = String.fromCharCode(i);
					buf.b += Std.string(x);
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else {
					var x = haxe.xml.Parser.escapes.get(s);
					buf.b += Std.string(x);
				}
				start = p + 1;
				state = next;
			}
			break;
		}
		var index = ++p;
		c = str.charCodeAt(index);
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
js.Boot.__name__ = true;
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
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
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
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
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
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
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
js.Lib.__name__ = true;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
js.html._CanvasElement.CanvasUtil.__name__ = true;
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
var physics = {};
physics.Constants = function() { };
physics.Constants.__name__ = true;
physics.PhysicsEngine = function(fps,pps,narrowphase) {
	this.fps = fps;
	this.pps = pps;
	this.narrowphase = narrowphase;
	this.Initalize();
};
physics.PhysicsEngine.__name__ = true;
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
	,RenderItems: function(timeStamp,aabb) {
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
	,ProcessAction: function(action) {
	}
	,ProcessShapes: function(position,range,action) {
	}
	,__class__: physics.PhysicsEngine
};
physics.collision = {};
physics.collision.broadphase = {};
physics.collision.broadphase.action = {};
physics.collision.broadphase.action.ActionParams = function() {
};
physics.collision.broadphase.action.ActionParams.__name__ = true;
physics.collision.broadphase.action.ActionParams.prototype = {
	PreProcess: function() {
		this.radiusSqrd = this.radius * this.radius;
	}
	,__class__: physics.collision.broadphase.action.ActionParams
};
physics.collision.broadphase.action.ActionResult = function() {
};
physics.collision.broadphase.action.ActionResult.__name__ = true;
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
physics.collision.broadphase.action.ActionResultCollection.__name__ = true;
physics.collision.broadphase.action.ActionResultCollection.prototype = {
	Reset: function() {
		var _g1 = 0;
		var _g = this.resultCount;
		while(_g1 < _g) {
			var i = _g1++;
			var _this = this.results[i];
			_this.body = null;
			_this.distanceSqrd = 0;
		}
		this.resultCount = 0;
		var _g1 = 0;
		var _g = this.opaqueBodyCount;
		while(_g1 < _g) {
			var i = _g1++;
			var _this = this.opaqueBodies[i];
			_this.body = null;
			_this.distanceSqrd = 0;
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
physics.collision.broadphase.action.IBroadphaseAction = function() { };
physics.collision.broadphase.action.IBroadphaseAction.__name__ = true;
physics.collision.broadphase.action.IBroadphaseAction.prototype = {
	__class__: physics.collision.broadphase.action.IBroadphaseAction
};
physics.collision.broadphase.managedgrid = {};
physics.collision.broadphase.managedgrid.Cell = function(manager,index,x,y,w,h) {
	this.manager = manager;
	this.index = index;
	this.width = w;
	this.height = h;
	this.aabb = new physics.geometry.AABB(x,y + h,x + w,y);
	this.dynamicItems = new haxe.ds.GenericStack();
	this.sleepingItems = new haxe.ds.GenericStack();
	this.staticItems = new haxe.ds.GenericStack();
	this.adjacentCells = new Array();
	this.stamp = -1;
	this.forceWakeLockCount = 0;
	this.isPaused = true;
};
physics.collision.broadphase.managedgrid.Cell.__name__ = true;
physics.collision.broadphase.managedgrid.Cell.prototype = {
	AddItem: function(body) {
		if(!body.isSleeping) {
			var _this = this.dynamicItems;
			_this.head = new haxe.ds.GenericCell(body,_this.head);
			this.dynamicCount++;
			this.Start();
		} else {
			var _this = this.sleepingItems;
			_this.head = new haxe.ds.GenericCell(body,_this.head);
			this.sleepingCount++;
		}
		if(body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b) {
			body.broadphaseData = this.index;
			var occupany = 0;
			if(body.position.x + body.aabb.l < this.aabb.l) occupany |= 1; else if(body.position.x + body.aabb.r > this.aabb.r) occupany |= 16;
			if(body.position.y + body.aabb.t < this.aabb.t) occupany |= 4; else if(body.position.y + body.aabb.b > this.aabb.b) occupany |= 64;
			if(occupany > 0) {
				if((occupany & 1) > 0 && (occupany & 4) > 0) occupany |= 2;
				if((occupany & 16) > 0 && (occupany & 4) > 0) occupany |= 8;
				if((occupany & 1) > 0 && (occupany & 64) > 0) occupany |= 128;
				if((occupany & 16) > 0 && (occupany & 64) > 0) occupany |= 32;
			}
			body.broadphaseData2 = occupany;
			this.SetOccupancy(body);
		}
	}
	,AddStaticItem: function(body) {
		var _this = this.staticItems;
		_this.head = new haxe.ds.GenericCell(body,_this.head);
		this.staticCount++;
	}
	,RemoveItem: function(body) {
		if(!body.isSleeping) {
			this.dynamicItems.remove(body);
			this.dynamicCount--;
		} else {
			this.sleepingItems.remove(body);
			this.sleepingCount--;
		}
	}
	,RemoveStaticItem: function(body) {
		this.staticItems.remove(body);
		this.staticCount--;
	}
	,SetOccupancy: function(body) {
		var cell;
		var offset;
		var _g = 0;
		while(_g < 8) {
			var i = _g++;
			offset = 1 << i;
			if((body.broadphaseData2 & offset) > 0) {
				var cell1 = this.adjacentCells[i];
				if(cell1 != null) cell1.AddItem(body);
			}
		}
	}
	,ClearOccupancy: function(body) {
		var cell;
		var offset;
		var _g = 0;
		while(_g < 8) {
			var i = _g++;
			offset = 1 << i;
			if((body.broadphaseData2 & offset) > 0) this.adjacentCells[i].RemoveItem(body);
		}
	}
	,IsCoreCell: function(body) {
		return body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b;
	}
	,CalcCellItemOccupancy: function(body) {
		var occupany = 0;
		if(body.position.x + body.aabb.l < this.aabb.l) occupany |= 1; else if(body.position.x + body.aabb.r > this.aabb.r) occupany |= 16;
		if(body.position.y + body.aabb.t < this.aabb.t) occupany |= 4; else if(body.position.y + body.aabb.b > this.aabb.b) occupany |= 64;
		if(occupany > 0) {
			if((occupany & 1) > 0 && (occupany & 4) > 0) occupany |= 2;
			if((occupany & 16) > 0 && (occupany & 4) > 0) occupany |= 8;
			if((occupany & 1) > 0 && (occupany & 64) > 0) occupany |= 128;
			if((occupany & 16) > 0 && (occupany & 64) > 0) occupany |= 32;
		}
		return occupany;
	}
	,HashCellItem: function(body) {
		if(body.broadphaseData == this.index) {
			if(body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b) {
				var newOccupany;
				var occupany = 0;
				if(body.position.x + body.aabb.l < this.aabb.l) occupany |= 1; else if(body.position.x + body.aabb.r > this.aabb.r) occupany |= 16;
				if(body.position.y + body.aabb.t < this.aabb.t) occupany |= 4; else if(body.position.y + body.aabb.b > this.aabb.b) occupany |= 64;
				if(occupany > 0) {
					if((occupany & 1) > 0 && (occupany & 4) > 0) occupany |= 2;
					if((occupany & 16) > 0 && (occupany & 4) > 0) occupany |= 8;
					if((occupany & 1) > 0 && (occupany & 64) > 0) occupany |= 128;
					if((occupany & 16) > 0 && (occupany & 64) > 0) occupany |= 32;
				}
				newOccupany = occupany;
				if(newOccupany != body.broadphaseData2) {
					this.ClearOccupancy(body);
					body.broadphaseData2 = newOccupany;
					this.SetOccupancy(body);
				}
			} else {
				this.manager.RemoveDynamicBody(body);
				this.manager.AddDynamicBody(body);
			}
		}
	}
	,SetProcessOnStepStatus: function() {
		this.adjacentPersistentActivity = false;
		this.adjacentTransientActivity = false;
		var cell;
		var offset;
		var _g = 0;
		while(_g < 8) {
			var i = _g++;
			cell = this.adjacentCells[i];
			if(cell != null) {
				this.adjacentPersistentActivity = this.adjacentPersistentActivity || cell.persistentActivity;
				this.adjacentTransientActivity = this.adjacentTransientActivity || cell.transientActivity;
			}
		}
	}
	,Update: function() {
		if(this.aabb.l == 0 && this.aabb.t == 0) {
			var stop = 1;
		}
		this.processSleep = false;
		this.persistentActivity = false;
		this.transientActivity = false;
		var $it0 = this.dynamicItems.iterator();
		while( $it0.hasNext() ) {
			var body = $it0.next();
			if(body.broadphaseData == this.index) {
				body.Update();
				if(body.broadphaseData == this.index) {
					if(body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b) {
						var newOccupany;
						var occupany = 0;
						if(body.position.x + body.aabb.l < this.aabb.l) occupany |= 1; else if(body.position.x + body.aabb.r > this.aabb.r) occupany |= 16;
						if(body.position.y + body.aabb.t < this.aabb.t) occupany |= 4; else if(body.position.y + body.aabb.b > this.aabb.b) occupany |= 64;
						if(occupany > 0) {
							if((occupany & 1) > 0 && (occupany & 4) > 0) occupany |= 2;
							if((occupany & 16) > 0 && (occupany & 4) > 0) occupany |= 8;
							if((occupany & 1) > 0 && (occupany & 64) > 0) occupany |= 128;
							if((occupany & 16) > 0 && (occupany & 64) > 0) occupany |= 32;
						}
						newOccupany = occupany;
						if(newOccupany != body.broadphaseData2) {
							this.ClearOccupancy(body);
							body.broadphaseData2 = newOccupany;
							this.SetOccupancy(body);
						}
					} else {
						this.manager.RemoveDynamicBody(body);
						this.manager.AddDynamicBody(body);
					}
				}
				if(body.canSleep) body.Sleep();
			}
			if(body.canKeepAlive && !body.isSleeping) this.persistentActivity = true; else this.transientActivity = true;
		}
	}
	,Collide: function() {
		var s1 = this.dynamicItems.head;
		while(s1 != null) {
			var item1 = s1.elt;
			var s2 = s1.next;
			while(s2 != null) {
				var item2 = s2.elt;
				var _this = this.manager;
				if(_this.doubleCollisionLength == 0 || item1.broadphaseData2 == 0 && item2.broadphaseData2 == 0) false; else {
					var hash;
					var body1ID = item1.id;
					var body2ID = item2.id;
					if(body1ID < body2ID) hash = body1ID << 16 | body2ID; else hash = body2ID << 16 | body1ID;
					var _g = 0;
					var _g1 = _this.doubleCollisionList;
					while(_g < _g1.length) {
						var i = _g1[_g];
						++_g;
						if(i == hash) {
							hash = -1;
							break;
						}
					}
					hash == -1;
				}
				if((function($this) {
					var $r;
					var aabb1 = item1.aabb;
					var position1 = item1.position;
					var aabb2 = item2.aabb;
					var position2 = item2.position;
					$r = aabb1.l + position1.x > aabb2.r + position2.x?false:aabb1.r + position1.x < aabb2.l + position2.x?false:aabb1.t + position1.y > aabb2.b + position2.y?false:aabb1.b + position1.y < aabb2.t + position2.y?false:true;
					return $r;
				}(this))) this.manager.narrowphase.CollideBodies(item1,item2);
				s2 = s2.next;
			}
			var s3 = this.staticItems.head;
			while(s3 != null) {
				var item3 = s3.elt;
				if((function($this) {
					var $r;
					var aabb1 = item1.aabb;
					var position1 = item1.position;
					var aabb2 = item3.aabb;
					var position2 = item3.position;
					$r = aabb1.l + position1.x > aabb2.r + position2.x?false:aabb1.r + position1.x < aabb2.l + position2.x?false:aabb1.t + position1.y > aabb2.b + position2.y?false:aabb1.b + position1.y < aabb2.t + position2.y?false:true;
					return $r;
				}(this))) this.manager.narrowphase.CollideBodies(item1,item3);
				s3 = s3.next;
			}
			var s4 = this.sleepingItems.head;
			while(s4 != null) {
				var item4 = s4.elt;
				if((function($this) {
					var $r;
					var aabb1 = item1.aabb;
					var position1 = item1.position;
					var aabb2 = item4.aabb;
					var position2 = item4.position;
					$r = aabb1.l + position1.x > aabb2.r + position2.x?false:aabb1.r + position1.x < aabb2.l + position2.x?false:aabb1.t + position1.y > aabb2.b + position2.y?false:aabb1.b + position1.y < aabb2.t + position2.y?false:true;
					return $r;
				}(this))) this.manager.narrowphase.CollideBodies(item1,item4);
				s4 = s4.next;
			}
			this.AdditionalCollide(item1);
			s1 = s1.next;
		}
	}
	,AdditionalCollide: function(body) {
	}
	,OnStep: function(step) {
		this.adjacentPersistentActivity = false;
		this.adjacentTransientActivity = false;
		var cell;
		var offset;
		var _g = 0;
		while(_g < 8) {
			var i = _g++;
			cell = this.adjacentCells[i];
			if(cell != null) {
				this.adjacentPersistentActivity = this.adjacentPersistentActivity || cell.persistentActivity;
				this.adjacentTransientActivity = this.adjacentTransientActivity || cell.transientActivity;
			}
		}
		if(this.transientActivity && !this.persistentActivity && !this.adjacentPersistentActivity) this.Pause();
		if(this.persistentActivity || this.adjacentPersistentActivity) {
			var $it0 = this.dynamicItems.iterator();
			while( $it0.hasNext() ) {
				var body = $it0.next();
				if(body.broadphaseData == this.index) body.OnStep(step);
			}
			var $it1 = this.sleepingItems.iterator();
			while( $it1.hasNext() ) {
				var body = $it1.next();
				if(body.broadphaseData == this.index) body.OnStep(step);
			}
			var $it2 = this.staticItems.iterator();
			while( $it2.hasNext() ) {
				var body = $it2.next();
				body.OnStep(step);
			}
		} else if(this.forceWakeLockCount > 0) {
			var $it3 = this.staticItems.iterator();
			while( $it3.hasNext() ) {
				var body = $it3.next();
				body.OnStep(step);
			}
		}
	}
	,Start: function() {
		if(!this.isPaused) return;
		this.isPaused = false;
		this.manager.CellStart(this);
	}
	,Pause: function() {
		if(this.isPaused) return;
		this.isPaused = true;
		var $it0 = this.dynamicItems.iterator();
		while( $it0.hasNext() ) {
			var body = $it0.next();
			if(body.broadphaseData == this.index) {
				if(!body.OnPause()) this.manager.RemoveBody(body);
			}
		}
		var $it1 = this.sleepingItems.iterator();
		while( $it1.hasNext() ) {
			var body = $it1.next();
			if(body.broadphaseData == this.index) {
				if(!body.OnPause()) this.manager.RemoveBody(body);
			}
		}
		this.manager.CellPause(this);
	}
	,SleepItem: function(body) {
		console.log("Sleep " + Std.string(body));
		if(body.isSleeping || this.forceWakeLockCount > 0) return false;
		this.ClearOccupancy(body);
		this.RemoveItem(body);
		body.isSleeping = true;
		this.AddItem(body);
		return true;
	}
	,WakeItem: function(body) {
		console.log("Wake " + Std.string(body));
		if(!body.isSleeping) return false;
		this.ClearOccupancy(body);
		this.RemoveItem(body);
		body.isSleeping = false;
		this.AddItem(body);
		return true;
	}
	,WakeAll: function() {
		var $it0 = this.sleepingItems.iterator();
		while( $it0.hasNext() ) {
			var body = $it0.next();
			body.Wake();
		}
	}
	,SearchList: function(list,action,actionResultCollection) {
		var $it0 = list.iterator();
		while( $it0.hasNext() ) {
			var body = $it0.next();
			if(body == action.params.queryBody) continue;
			var dX = action.params.position.x - body.averageCenter.x;
			var dY = action.params.position.y - body.averageCenter.y;
			var dSqrd = dX * dX + dY * dY;
			if(dSqrd <= action.params.radiusSqrd - body.radiusSqrd) actionResultCollection.AddResult(body,dSqrd);
		}
	}
	,SearchCell: function(action,actionResultCollection) {
		this.SearchList(this.dynamicItems,action,actionResultCollection);
		this.SearchList(this.sleepingItems,action,actionResultCollection);
		this.SearchList(this.staticItems,action,actionResultCollection);
	}
	,__class__: physics.collision.broadphase.managedgrid.Cell
};
physics.collision.broadphase.managedgrid.ManagedGrid = function(fps,pps,narrowphase,worldGridWidth,worldGridHeight,cellSize) {
	physics.PhysicsEngine.call(this,fps,pps,narrowphase);
	this.grid = new ds.Grid2D(worldGridWidth,worldGridHeight,cellSize);
	this.worldExtents = new physics.geometry.AABB(0,worldGridHeight * cellSize,worldGridWidth * cellSize,0);
	this.actionResultCollection = new physics.collision.broadphase.action.ActionResultCollection();
	this.doubleCollisionList = new Array();
	this.staticUpdateHash = new haxe.ds.IntMap();
	this.init();
};
physics.collision.broadphase.managedgrid.ManagedGrid.__name__ = true;
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
				this.grid.data.push(this.CellFactory(index++,x,y));
			}
		}
		var _g1 = 0;
		var _g = this.grid.gridWidth;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.grid.gridHeight;
			while(_g3 < _g2) {
				var x = _g3++;
				var cell;
				var _this = this.grid;
				if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x - 1;
					$r = x1 >= _this.gridWidth || y >= _this.gridHeight || x1 < 0 || y < 0?null:_this.data[y * _this.gridWidth + x1];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x - 1;
					var y1 = y - 1;
					$r = x1 >= _this.gridWidth || y1 >= _this.gridHeight || x1 < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x1];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var y1 = y - 1;
					$r = x >= _this.gridWidth || y1 >= _this.gridHeight || x < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x + 1;
					var y1 = y - 1;
					$r = x1 >= _this.gridWidth || y1 >= _this.gridHeight || x1 < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x1];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x + 1;
					$r = x1 >= _this.gridWidth || y >= _this.gridHeight || x1 < 0 || y < 0?null:_this.data[y * _this.gridWidth + x1];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x + 1;
					var y1 = y + 1;
					$r = x1 >= _this.gridWidth || y1 >= _this.gridHeight || x1 < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x1];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var y1 = y + 1;
					$r = x >= _this.gridWidth || y1 >= _this.gridHeight || x < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x];
					return $r;
				}(this)));
				cell.adjacentCells.push((function($this) {
					var $r;
					var _this = $this.grid;
					var x1 = x - 1;
					var y1 = y + 1;
					$r = x1 >= _this.gridWidth || y1 >= _this.gridHeight || x1 < 0 || y1 < 0?null:_this.data[y1 * _this.gridWidth + x1];
					return $r;
				}(this)));
			}
		}
	}
	,CellFactory: function(i,x,y) {
		return new physics.collision.broadphase.managedgrid.Cell(this,i,x * this.grid.cellSize,y * this.grid.cellSize,this.grid.cellSize,this.grid.cellSize);
	}
	,Update: function() {
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.Update();
		}
	}
	,Collide: function() {
		this.doubleCollisionLength = 0;
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.Collide();
		}
	}
	,ProcessOnStep: function(step) {
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.OnStep(step);
		}
	}
	,AddBody: function(body) {
		if(!body.isStatic) this.AddDynamicBody(body); else {
			var x1 = (body.aabb.l + body.position.x) * this.grid.invCellSize | 0;
			var y1 = (body.aabb.t + body.position.y) * this.grid.invCellSize | 0;
			var x2 = ((body.aabb.r + body.position.x) * this.grid.invCellSize | 0) + 1;
			var y2 = ((body.aabb.b + body.position.y) * this.grid.invCellSize | 0) + 1;
			var _g = x1;
			while(_g < x2) {
				var x = _g++;
				var _g1 = y1;
				while(_g1 < y2) {
					var y = _g1++;
					var cell;
					var _this = this.grid;
					if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
					cell.AddStaticItem(body);
				}
			}
		}
		physics.PhysicsEngine.prototype.AddBody.call(this,body);
	}
	,AddDynamicBody: function(body) {
		var cell;
		var _this = this.grid;
		var x = body.position.x * this.grid.invCellSize | 0;
		var y = body.position.y * this.grid.invCellSize | 0;
		if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
		if(cell != null) cell.AddItem(body);
	}
	,RemoveBody: function(body) {
		if(!body.isStatic) this.RemoveDynamicBody(body); else {
			var x1 = (body.aabb.l + body.position.x) * this.grid.invCellSize | 0;
			var y1 = (body.aabb.t + body.position.y) * this.grid.invCellSize | 0;
			var x2 = ((body.aabb.r + body.position.x) * this.grid.invCellSize | 0) + 1;
			var y2 = ((body.aabb.b + body.position.y) * this.grid.invCellSize | 0) + 1;
			var _g = x1;
			while(_g < x2) {
				var x = _g++;
				var _g1 = y1;
				while(_g1 < y2) {
					var y = _g1++;
					var cell;
					var _this = this.grid;
					if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
					cell.RemoveStaticItem(body);
				}
			}
		}
		physics.PhysicsEngine.prototype.RemoveBody.call(this,body);
	}
	,RemoveDynamicBody: function(body) {
		var cell = this.grid.data[body.broadphaseData];
		cell.ClearOccupancy(body);
		cell.RemoveItem(body);
	}
	,SleepItem: function(body) {
		return this.grid.data[body.broadphaseData].SleepItem(body);
	}
	,WakeItem: function(body) {
		return this.grid.data[body.broadphaseData].WakeItem(body);
	}
	,StartStaticUpdate: function(body) {
		if(this.staticUpdateHash.exists(body.id)) return;
		var indexPos = new physics.geometry.Vector2D(body.position.x * this.grid.invCellSize | 0,body.position.y * this.grid.invCellSize | 0);
		this.staticUpdateHash.set(body.id,indexPos);
		var _g1 = indexPos.x - 1 | 0;
		var _g = indexPos.x + 1 | 0;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = indexPos.y - 1 | 0;
			var _g2 = indexPos.y + 1 | 0;
			while(_g3 < _g2) {
				var y = _g3++;
				var cell;
				var _this = this.grid;
				if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
				if(cell != null) {
					cell.forceWakeLockCount++;
					cell.WakeAll();
				}
			}
		}
	}
	,EndStaticUpdate: function(body) {
		if(!this.staticUpdateHash.exists(body.id)) return;
		var indexPos = this.staticUpdateHash.get(body.id);
		this.staticUpdateHash.remove(body.id);
		var _g1 = indexPos.x - 1 | 0;
		var _g = indexPos.x + 1 | 0;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = indexPos.y - 1 | 0;
			var _g2 = indexPos.y + 1 | 0;
			while(_g3 < _g2) {
				var y = _g3++;
				var cell;
				var _this = this.grid;
				if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
				if(cell != null) cell.forceWakeLockCount--;
			}
		}
	}
	,CellPause: function(cell) {
	}
	,CellStart: function(cell) {
	}
	,CastRay: function(ray) {
		return null;
	}
	,ProcessAction: function(action) {
		this.actionResultCollection.Reset();
		action.params.PreProcess();
		var x1 = (action.params.position.x - action.params.radius) * this.grid.invCellSize | 0;
		var y1 = (action.params.position.y - action.params.radius) * this.grid.invCellSize | 0;
		var x2 = ((action.params.position.x + action.params.radius) * this.grid.invCellSize | 0) + 1;
		var y2 = ((action.params.position.y + action.params.radius) * this.grid.invCellSize | 0) + 1;
		var _g = x1;
		while(_g < x2) {
			var x = _g++;
			var _g1 = y1;
			while(_g1 < y2) {
				var y = _g1++;
				var cell;
				var _this = this.grid;
				if(x >= _this.gridWidth || y >= _this.gridHeight || x < 0 || y < 0) cell = null; else cell = _this.data[y * _this.gridWidth + x];
				if(cell != null) cell.SearchCell(action,this.actionResultCollection);
			}
		}
		action.Execute(this.actionResultCollection);
	}
	,CheckDoubleCollisions: function(body1,body2) {
		if(this.doubleCollisionLength == 0 || body1.broadphaseData2 == 0 && body2.broadphaseData2 == 0) return false; else {
			var hash;
			var body1ID = body1.id;
			var body2ID = body2.id;
			if(body1ID < body2ID) hash = body1ID << 16 | body2ID; else hash = body2ID << 16 | body1ID;
			var _g = 0;
			var _g1 = this.doubleCollisionList;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(i == hash) {
					hash = -1;
					break;
				}
			}
			return hash == -1;
		}
	}
	,toString: function() {
		var result = "";
		var _g = 0;
		var _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			if(cell.dynamicCount > 0) result += "(" + cell.aabb.l / 100 + ":" + cell.aabb.t / 100 + "=" + cell.dynamicCount + ")";
		}
		return result;
	}
	,__class__: physics.collision.broadphase.managedgrid.ManagedGrid
});
physics.collision.narrowphase = {};
physics.collision.narrowphase.INarrowphase = function() { };
physics.collision.narrowphase.INarrowphase.__name__ = true;
physics.collision.narrowphase.INarrowphase.prototype = {
	__class__: physics.collision.narrowphase.INarrowphase
};
physics.collision.narrowphase.sat = {};
physics.collision.narrowphase.sat.SAT = function() {
	this.result = new physics.dynamics.Arbiter();
};
physics.collision.narrowphase.sat.SAT.__name__ = true;
physics.collision.narrowphase.sat.SAT.__interfaces__ = [physics.collision.narrowphase.INarrowphase];
physics.collision.narrowphase.sat.SAT.aabb2aabb = function(shape1,shape1Pos,shape2,shape2Pos,arbiter) {
	var tx = shape1.transformedCentre.x + shape1Pos.x - (shape2.transformedCentre.x + shape2Pos.x);
	var x_overlap = shape1.halfWidths.x + shape2.halfWidths.x - Math.abs(tx);
	var ty = shape1.transformedCentre.y + shape1Pos.y - (shape2.transformedCentre.y + shape2Pos.y);
	var y_overlap = shape1.halfWidths.y + shape2.halfWidths.y - Math.abs(ty);
	if(x_overlap > y_overlap) {
		var nCoef;
		if(tx < 0) nCoef = 1; else nCoef = -1;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = 0;
		contact.point.y = 0;
		contact.normal.x = nCoef;
		contact.normal.y = 0 * nCoef;
		contact.penDist = x_overlap;
	} else {
		var nCoef;
		if(ty < 0) nCoef = 1; else nCoef = -1;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = 0;
		contact.point.y = 0;
		contact.normal.x = 0 * nCoef;
		contact.normal.y = nCoef;
		contact.penDist = x_overlap;
	}
	return true;
};
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
		var min = 4294967296;
		var result;
		var _g2 = 0;
		var _g11 = shape2.transformedVertices;
		while(_g2 < _g11.length) {
			var vertex = _g11[_g2];
			++_g2;
			result = a.n.x * (vertex.x + shape2Pos.x) + a.n.y * (vertex.y + shape2Pos.y) - (shape1Pos.x * a.n.x + shape1Pos.y * a.n.y + a.d);
			if(result < min) min = result;
		}
		minValOnAxis = min;
		if(minValOnAxis > 0) return false;
		if(minValOnAxis > minPen1) {
			minPen1 = minValOnAxis;
			minAxis1 = a;
		}
	}
	var minPen2 = -1e+99;
	var minAxis2 = null;
	var _g = 0;
	var _g1 = shape2.transformedAxes;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		var min = 4294967296;
		var result;
		var _g2 = 0;
		var _g11 = shape1.transformedVertices;
		while(_g2 < _g11.length) {
			var vertex = _g11[_g2];
			++_g2;
			result = a.n.x * (vertex.x + shape1Pos.x) + a.n.y * (vertex.y + shape1Pos.y) - (shape2Pos.x * a.n.x + shape2Pos.y * a.n.y + a.d);
			if(result < min) min = result;
		}
		minValOnAxis = min;
		if(minValOnAxis > 0) return false;
		if(minValOnAxis > minPen2) {
			minPen2 = minValOnAxis;
			minAxis2 = a;
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
	var contact = arbiter.contacts[arbiter.contactCount];
	contact.point.x = 0;
	contact.point.y = 0;
	contact.normal.x = minAxis.n.x * nCoef;
	contact.normal.y = minAxis.n.y * nCoef;
	contact.penDist = dist;
	return true;
};
physics.collision.narrowphase.sat.SAT.circle2circle = function(circle1,circle1Pos,circle2,circle2Pos,arbiter) {
	var p1x = circle1.transformedCentre.x + circle1Pos.x;
	var p1y = circle1.transformedCentre.y + circle1Pos.y;
	var r1 = circle1.radius;
	var minDist = r1 + circle2.radius;
	var x = circle2.transformedCentre.x + circle2Pos.x - p1x;
	var y = circle2.transformedCentre.y + circle2Pos.y - p1y;
	var distSqr = x * x + y * y;
	var result = false;
	if(distSqr < minDist * minDist) {
		var dist = Math.sqrt(distSqr) + 0.0000001;
		var invDist = 1 / dist;
		var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = p1x + x * deltaFact;
		contact.point.y = p1y + y * deltaFact;
		contact.normal.x = x * invDist;
		contact.normal.y = y * invDist;
		contact.penDist = dist - minDist;
		result = true;
	}
	return result;
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
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = p1x + x * deltaFact;
		contact.point.y = p1y + y * deltaFact;
		contact.normal.x = x * invDist;
		contact.normal.y = y * invDist;
		contact.penDist = dist - minDist;
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
	if(dt < dtb) {
		var r1 = circle.radius;
		var minDist = r1;
		var x = bx - tCx;
		var y = by - tCy;
		var distSqr = x * x + y * y;
		var result = false;
		if(distSqr < minDist * minDist) {
			var dist = Math.sqrt(distSqr) + 0.0000001;
			var invDist = 1 / dist;
			var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;
			var contact = arbiter.contacts[arbiter.contactCount];
			contact.point.x = tCx + x * deltaFact;
			contact.point.y = tCy + y * deltaFact;
			contact.normal.x = x * invDist;
			contact.normal.y = y * invDist;
			contact.penDist = dist - minDist;
			result = true;
		}
		return result;
	}
	var dta = n.x * ay - n.y * ax;
	if(dt < dta) {
		var factor = circle.radius + min / 2;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = tCx - n.x * factor;
		contact.point.y = tCy - n.y * factor;
		contact.normal.x = n.x * -1;
		contact.normal.y = n.y * -1;
		contact.penDist = min;
		return true;
	}
	var r1 = circle.radius;
	var minDist = r1;
	var x = ax - tCx;
	var y = ay - tCy;
	var distSqr = x * x + y * y;
	var result = false;
	if(distSqr < minDist * minDist) {
		var dist = Math.sqrt(distSqr) + 0.0000001;
		var invDist = 1 / dist;
		var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = tCx + x * deltaFact;
		contact.point.y = tCy + y * deltaFact;
		contact.normal.x = x * invDist;
		contact.normal.y = y * invDist;
		contact.penDist = dist - minDist;
		result = true;
	}
	return result;
};
physics.collision.narrowphase.sat.SAT.circle2segment = function(circle,circlePos,segment,segmentPos,arbiter) {
	var tAP;
	var _this = segment.tA;
	tAP = new physics.geometry.Vector2D(_this.x + segmentPos.x,_this.y + segmentPos.y);
	var tCP;
	var _this = circle.transformedCentre;
	tCP = new physics.geometry.Vector2D(_this.x + circlePos.x,_this.y + circlePos.y);
	var closest_t;
	closest_t = (function($this) {
		var $r;
		var _this = segment.delta;
		var v = new physics.geometry.Vector2D(tCP.x - tAP.x,tCP.y - tAP.y);
		$r = _this.x * v.x + _this.y * v.y;
		return $r;
	}(this)) / (function($this) {
		var $r;
		var _this = segment.delta;
		$r = _this.x * _this.x + _this.y * _this.y;
		return $r;
	}(this));
	if(closest_t < 0) closest_t = 0;
	if(closest_t > 1) closest_t = 1;
	var closest;
	var v;
	var _this = segment.delta;
	v = new physics.geometry.Vector2D(_this.x * closest_t,_this.y * closest_t);
	closest = new physics.geometry.Vector2D(tAP.x + v.x,tAP.y + v.y);
	var p1x = tCP.x;
	var p1y = tCP.y;
	var r1 = circle.radius;
	var minDist = r1 + segment.radius;
	var x = closest.x - p1x;
	var y = closest.y - p1y;
	var distSqr = x * x + y * y;
	var result = false;
	if(distSqr < minDist * minDist) {
		var dist = Math.sqrt(distSqr) + 0.0000001;
		var invDist = 1 / dist;
		var deltaFact = 0.5 + (r1 - 0.5 * minDist) / dist;
		var contact = arbiter.contacts[arbiter.contactCount];
		contact.point.x = p1x + x * deltaFact;
		contact.point.y = p1y + y * deltaFact;
		contact.normal.x = x * invDist;
		contact.normal.y = y * invDist;
		contact.penDist = dist - minDist;
		result = true;
	}
	return result;
};
physics.collision.narrowphase.sat.SAT.prototype = {
	CollideBodies: function(body1,body2,n) {
		if(body1.features.length == 1 && body2.features.length == 1) this.CollideFeatures(body1.features[0],body2.features[0],n); else {
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
					if((function($this) {
						var $r;
						var aabb1 = feature1.shape.aabb;
						var position1 = feature1.body.position;
						var aabb2 = feature2.shape.aabb;
						var position2 = feature2.body.position;
						$r = aabb1.l + position1.x > aabb2.r + position2.x?false:aabb1.r + position1.x < aabb2.l + position2.x?false:aabb1.t + position1.y > aabb2.b + position2.y?false:aabb1.b + position1.y < aabb2.t + position2.y?false:true;
						return $r;
					}(this))) this.CollideFeatures(feature1,feature2,n);
				}
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
		var _g = s1.typeID | s2.typeID;
		switch(_g) {
		case 0:
			collided = physics.collision.narrowphase.sat.SAT.aabb2aabb(s1,this.result.feature1.position,s2,this.result.feature2.position,this.result);
			break;
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
		if(collided) {
			feature1.body.Wake();
			feature2.body.Wake();
			if((function($this) {
				var $r;
				var _this = $this.result;
				var bodyA = _this.feature1.body;
				var bodyB = _this.feature2.body;
				_this.isSensor = _this.feature1.isSensor || _this.feature2.isSensor;
				if(!_this.isSensor) {
					var normal = _this.contacts[0].normal;
					var depth = _this.contacts[0].penDist;
					var mtd = new physics.geometry.Vector2D(normal.x * depth,normal.y * depth);
					var te = _this.feature1.material.elasticity + _this.feature2.material.elasticity;
					var sumInvMass = _this.feature1.body.invMass + _this.feature2.body.invMass;
					var tf;
					var input = 1 - (_this.feature1.material.friction + _this.feature2.material.friction);
					if(input > 1) tf = 1; else if(input < 0) tf = 0; else tf = input;
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
					_this.mtdA.x = mtd.x * aMassRatio;
					_this.mtdA.y = mtd.y * aMassRatio;
					var bMassRatio = -bodyB.invMass / sumInvMass;
					_this.mtdB.x = mtd.x * bMassRatio;
					_this.mtdB.y = mtd.y * bMassRatio;
					_this.vnA.x = vnAX + ca_vtX;
					_this.vnA.y = vnAY + ca_vtY;
					_this.vnB.x = vnBX + cb_vtX;
					_this.vnB.y = vnBY + cb_vtY;
					bodyA.RespondToCollision(_this,_this.mtdA,_this.vnA,normal,depth,-1);
					bodyB.RespondToCollision(_this,_this.mtdB,_this.vnB,normal,depth,1);
				}
				if(_this.feature1.contactCallback != null) _this.feature1.contactCallback(_this);
				if(_this.feature2.contactCallback != null) _this.feature2.contactCallback(_this);
				$r = !_this.isSensor;
				return $r;
			}(this))) {
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
physics.constraints.Constraint.__name__ = true;
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
physics.dynamics.Arbiter.__name__ = true;
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
			var tf;
			var input = 1 - (this.feature1.material.friction + this.feature2.material.friction);
			if(input > 1) tf = 1; else if(input < 0) tf = 0; else tf = input;
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
	if(this.transient) this.id = ds.IDManager.GetTransientID(); else this.id = ds.IDManager.GetPersistentID();
	this.aabb = new physics.geometry.AABB();
	this.averageCenterOffset = new physics.geometry.Vector2D();
	this.averageCenter = new physics.geometry.Vector2D();
	this.position = new physics.geometry.Vector2D();
	this.prevPosition = new physics.geometry.Vector2D();
	this.tempPosition = new physics.geometry.Vector2D();
	this.accumulatedForces = new physics.geometry.Vector2D();
	this.rotation = new physics.geometry.Vector2D();
	this.features = new Array();
	this.constraints = new haxe.ds.GenericStack();
	this.SetAngle(0);
	this.SetMass(1);
	this.SetMaximumScalarVelocity(20);
	this.maxAcceleration = 5;
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
	this.isOpaque = false;
	this.collisionProcessingMask = 0;
	this.Initalize();
};
physics.dynamics.Body.__name__ = true;
physics.dynamics.Body.HashBodyIDs = function(body1ID,body2ID) {
	if(body1ID < body2ID) return body1ID << 16 | body2ID; else return body2ID << 16 | body1ID;
};
physics.dynamics.Body.prototype = {
	Initalize: function() {
	}
	,Update: function() {
		if(this.isStatic || this.isSleeping) return;
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
		var $it0 = this.constraints.iterator();
		while( $it0.hasNext() ) {
			var constraint = $it0.next();
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
		var _this = this.position;
		var v = this.prevPosition;
		return new physics.geometry.Vector2D(_this.x - v.x,_this.y - v.y);
	}
	,SetVelocity: function(value) {
		this.prevPosition.x = this.position.x - value.x;
		this.prevPosition.y = this.position.y - value.y;
		if(this.isSleeping) this.Wake();
	}
	,AddForce: function(force) {
		var _this = this.accumulatedForces;
		var v;
		var s = this.invMass;
		v = new physics.geometry.Vector2D(force.x * s,force.y * s);
		_this.x += v.x;
		_this.y += v.y;
		_this;
		if(this.isSleeping) this.Wake();
	}
	,AddMasslessForce: function(force) {
		var _this = this.accumulatedForces;
		_this.x += force.x;
		_this.y += force.y;
		_this;
		if(this.isSleeping) this.Wake();
	}
	,RespondToCollision: function(collision,mtd,newVelocity,normal,depth,o) {
		if(this.isStatic) return;
		this.position.x += mtd.x;
		this.position.y += mtd.y;
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
		var _this = this.position;
		_this.x = position.x;
		_this.y = position.y;
		var _this = this.prevPosition;
		_this.x = position.x;
		_this.y = position.y;
		this.averageCenter.x = position.x + this.averageCenterOffset.x;
		this.averageCenter.y = position.y + this.averageCenterOffset.y;
		if(this.isSleeping) this.Wake();
	}
	,Skew: function(delta) {
		var _this = this.position;
		_this.x += delta.x;
		_this.y += delta.y;
		_this;
		var _this = this.prevPosition;
		_this.x += delta.x;
		_this.y += delta.y;
		_this;
		if(this.isSleeping) this.Wake();
	}
	,SetRadius: function(r) {
		this.radius = r;
		this.radiusSqrd = r * r;
	}
	,AddFeature: function(shape,material) {
		var feature = new physics.dynamics.Feature(this,shape,material == null?new physics.dynamics.Material():material);
		this.features.push(feature);
		feature.shape.Update(this.rotation);
		var _this = this.aabb;
		var aabb = feature.shape.aabb;
		if(aabb.l < _this.l) _this.l = aabb.l;
		if(aabb.r > _this.r) _this.r = aabb.r;
		if(aabb.t < _this.t) _this.t = aabb.t;
		if(aabb.b > _this.b) _this.b = aabb.b;
		var _this = this.aabb;
		var c = this.averageCenterOffset;
		c.x = (_this.r + _this.l) / 2;
		c.y = (_this.b + _this.t) / 2;
		var rX = this.averageCenterOffset.x - this.aabb.r;
		var rY = this.averageCenterOffset.y - this.aabb.t;
		this.radiusSqrd = rX * rX + rY * rY;
		this.radius = Math.sqrt(this.radiusSqrd);
		return feature;
	}
	,UpdateFeatures: function() {
		var _this = this.aabb;
		_this.l = 1e99;
		_this.r = -1e+99;
		_this.t = 1e99;
		_this.b = -1e+99;
		var _g = 0;
		var _g1 = this.features;
		while(_g < _g1.length) {
			var feature = _g1[_g];
			++_g;
			feature.shape.Update(this.rotation);
			var _this = this.aabb;
			var aabb = feature.shape.aabb;
			if(aabb.l < _this.l) _this.l = aabb.l;
			if(aabb.r > _this.r) _this.r = aabb.r;
			if(aabb.t < _this.t) _this.t = aabb.t;
			if(aabb.b > _this.b) _this.b = aabb.b;
		}
		var _this = this.aabb;
		var c = this.averageCenterOffset;
		c.x = (_this.r + _this.l) / 2;
		c.y = (_this.b + _this.t) / 2;
		var rX = this.averageCenterOffset.x - this.aabb.r;
		var rY = this.averageCenterOffset.y - this.aabb.t;
		this.radiusSqrd = rX * rX + rY * rY;
		this.radius = Math.sqrt(this.radiusSqrd);
		if(this.relativePoints != null) this.relativePoints.Update(this.rotation,false);
	}
	,AddConstraint: function(constraint) {
		var _this = this.constraints;
		_this.head = new haxe.ds.GenericCell(constraint,_this.head);
	}
	,RemoveConstraint: function(constraint) {
		this.constraints.remove(constraint);
	}
	,OnAddedToEngine: function(engine) {
		this.engine = engine;
		this.createdMS = engine.currTime;
	}
	,OnStartCollision: function(contact) {
		console.log("Start " + contact.hash);
	}
	,OnCollision: function(contact) {
	}
	,OnEndCollision: function(contact) {
	}
	,Destroy: function() {
		this.engine.RemoveBody(this);
		var $it0 = this.constraints.iterator();
		while( $it0.hasNext() ) {
			var constraint = $it0.next();
			constraint.Destroy();
		}
		if(this.transient) ds.IDManager.ReleaseTransientID(this.id);
	}
	,__class__: physics.dynamics.Body
};
physics.dynamics.BodyContact = function() {
};
physics.dynamics.BodyContact.__name__ = true;
physics.dynamics.BodyContact.prototype = {
	__class__: physics.dynamics.BodyContact
};
physics.dynamics.BodyContactManager = function(engine) {
	this.engine = engine;
	this.contacts = new haxe.ds.IntMap();
};
physics.dynamics.BodyContactManager.__name__ = true;
physics.dynamics.BodyContactManager.prototype = {
	UpdateContacts: function(body1,body2) {
		if(body1.collisionProcessingMask == 0 && body2.collisionProcessingMask == 0) return false;
		var bodyHash;
		var body1ID = body1.id;
		var body2ID = body2.id;
		if(body1ID < body2ID) bodyHash = body1ID << 16 | body2ID; else bodyHash = body2ID << 16 | body1ID;
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
physics.dynamics.Contact.__name__ = true;
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
physics.dynamics.Feature.__name__ = true;
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
physics.dynamics.Material.__name__ = true;
physics.dynamics.Material.prototype = {
	__class__: physics.dynamics.Material
};
physics.geometry = {};
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
physics.geometry.AABB.__name__ = true;
physics.geometry.AABB.intersects = function(aabb1,position1,aabb2,position2) {
	if(aabb1.l + position1.x > aabb2.r + position2.x) return false; else if(aabb1.r + position1.x < aabb2.l + position2.x) return false; else if(aabb1.t + position1.y > aabb2.b + position2.y) return false; else if(aabb1.b + position1.y < aabb2.t + position2.y) return false; else return true;
};
physics.geometry.AABB.prototype = {
	expand: function(aabb) {
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
	,__class__: physics.geometry.AABB
};
physics.geometry.GeometricShape = function(typeID,offsetX,offsetY) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.typeID = typeID;
	this.offset = new physics.geometry.Vector2D(offsetX,offsetY);
	this.aabb = new physics.geometry.AABB();
	this.UID = physics.geometry.GeometricShape.nextUID++;
};
physics.geometry.GeometricShape.__name__ = true;
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
physics.geometry.AABBShape = function(halfWidths,offsetX,offsetY) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	physics.geometry.GeometricShape.call(this,0,offsetX,offsetY);
	this.halfWidths = halfWidths;
	this.InitShape();
};
physics.geometry.AABBShape.__name__ = true;
physics.geometry.AABBShape.__super__ = physics.geometry.GeometricShape;
physics.geometry.AABBShape.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	InitShape: function() {
		this.centre = this.offset.clone();
		this.transformedCentre = this.centre.clone();
		this.area = this.halfWidths.x * this.halfWidths.y * 4;
	}
	,Update: function(rotation) {
		this.transformedCentre.x = this.centre.x * rotation.x - this.centre.y * rotation.y;
		this.transformedCentre.y = this.centre.x * rotation.y + this.centre.y * rotation.x;
		this.aabb.l = this.transformedCentre.x - this.halfWidths.x;
		this.aabb.r = this.transformedCentre.x + this.halfWidths.x;
		this.aabb.t = this.transformedCentre.y - this.halfWidths.y;
		this.aabb.b = this.transformedCentre.y + this.halfWidths.y;
	}
	,ContainsPoint: function(point,shapePosition) {
		var x = this.transformedCentre.x + shapePosition.x - point.x;
		var y = this.transformedCentre.y + shapePosition.y - point.y;
		return false;
	}
	,IntersectRay: function(ray,feature) {
		return false;
	}
	,IntersectSegment: function(a,b,feature) {
	}
	,__class__: physics.geometry.AABBShape
});
physics.geometry.Axis = function(n,d) {
	this.n = n;
	this.d = d;
};
physics.geometry.Axis.__name__ = true;
physics.geometry.Axis.prototype = {
	clone: function() {
		return new physics.geometry.Axis(this.n.clone(),this.d);
	}
	,__class__: physics.geometry.Axis
};
physics.geometry.Circle = function(radius,offsetX,offsetY) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	physics.geometry.GeometricShape.call(this,1,offsetX,offsetY);
	this.radius = radius;
	this.InitShape();
};
physics.geometry.Circle.__name__ = true;
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
		return ray.ReportResult(feature,d,ray.returnNormal?(function($this) {
			var $r;
			var _this = new physics.geometry.Vector2D(ray.origin.x + ray.direction.x * d - ($this.transformedCentre.x + feature.position.x),ray.origin.y + ray.direction.y * d - ($this.transformedCentre.y + feature.position.y));
			var t = Math.sqrt(_this.x * _this.x + _this.y * _this.y) + 1e-08;
			_this.x /= t;
			_this.y /= t;
			$r = _this;
			return $r;
		}(this)):null);
	}
	,IntersectSegment: function(a,b,feature) {
		var tA;
		var _this;
		var v = this.transformedCentre;
		_this = new physics.geometry.Vector2D(a.x - v.x,a.y - v.y);
		var v = feature.position;
		tA = new physics.geometry.Vector2D(_this.x - v.x,_this.y - v.y);
		var tB;
		var _this;
		var v = this.transformedCentre;
		_this = new physics.geometry.Vector2D(b.x - v.x,b.y - v.y);
		var v = feature.position;
		tB = new physics.geometry.Vector2D(_this.x - v.x,_this.y - v.y);
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
physics.geometry.Polygon = function(vertices,offsetX,offsetY) {
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	physics.geometry.GeometricShape.call(this,4,offsetX,offsetY);
	this.InitShape(vertices);
};
physics.geometry.Polygon.__name__ = true;
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
			var _this;
			var _this1 = new physics.geometry.Vector2D(b.x - a.x,b.y - a.y);
			_this = new physics.geometry.Vector2D(-_this1.y,_this1.x);
			var t = Math.sqrt(_this.x * _this.x + _this.y * _this.y) + 1e-08;
			n = new physics.geometry.Vector2D(_this.x / t,_this.y / t);
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
		var _g1 = 0;
		var _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			a = this.axes[i];
			ta = this.transformedAxes[i];
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
			var an;
			var v = ta.n;
			an = a.x * v.x + a.y * v.y;
			var ad = feature.position.x * ta.n.x + feature.position.y * ta.n.y + ta.d;
			if(ad > an) continue;
			var bn;
			var v = ta.n;
			bn = b.x * v.x + b.y * v.y;
			var t = (ad - an) / (bn - an);
			if(t < 0.0 || 1.0 < t) continue;
			var point = a.interpolate(b,t);
			var dt = -(function($this) {
				var $r;
				var _this = ta.n;
				$r = _this.x * point.y - _this.y * point.x;
				return $r;
			}(this));
			var dtMin = -(function($this) {
				var $r;
				var _this = ta.n;
				var v = $this.transformedVertices[i];
				$r = _this.x * v.y - _this.y * v.x;
				return $r;
			}(this));
			var dtMax = -(function($this) {
				var $r;
				var _this = ta.n;
				var v = $this.transformedVertices[(i + 1) % $this.vertexCount];
				$r = _this.x * v.y - _this.y * v.x;
				return $r;
			}(this));
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
physics.geometry.Ray.__name__ = true;
physics.geometry.Ray.prototype = {
	SetParams: function(origin,target,range) {
		this.origin = origin;
		this.target = target;
		this.delta = new physics.geometry.Vector2D(target.x - origin.x,target.y - origin.y);
		var m;
		var _this = this.delta;
		m = Math.sqrt(_this.x * _this.x + _this.y * _this.y);
		if(m == 0) m = 0.0000001;
		var _this = this.delta;
		var s = 1 / m;
		this.direction = new physics.geometry.Vector2D(_this.x * s,_this.y * s);
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
physics.geometry.Segment.__name__ = true;
physics.geometry.Segment.__super__ = physics.geometry.GeometricShape;
physics.geometry.Segment.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	InitShape: function() {
		var _this = this.b;
		var v = this.a;
		this.delta = new physics.geometry.Vector2D(_this.x - v.x,_this.y - v.y);
		var _this;
		var _this1 = this.delta;
		var t = Math.sqrt(_this1.x * _this1.x + _this1.y * _this1.y) + 1e-08;
		_this = new physics.geometry.Vector2D(_this1.x / t,_this1.y / t);
		this.n = new physics.geometry.Vector2D(-_this.y,_this.x);
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
physics.geometry.Shapes.__name__ = true;
physics.geometry.Vector2D = function(x,y) {
	if(y == null) y = .0;
	if(x == null) x = .0;
	this.x = x;
	this.y = y;
};
physics.geometry.Vector2D.__name__ = true;
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
		if(l > max) {
			var s = max / l;
			this.x *= s;
			this.y *= s;
			this;
		}
		return this;
	}
	,interpolate: function(v,t) {
		var _this;
		var s = 1 - t;
		_this = new physics.geometry.Vector2D(this.x * s,this.y * s);
		var v1 = new physics.geometry.Vector2D(v.x * t,v.y * t);
		return new physics.geometry.Vector2D(_this.x + v1.x,_this.y + v1.y);
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
	,reverse: function() {
		return new physics.geometry.Vector2D(-this.x,-this.y);
	}
	,majorAxis: function() {
		if(Math.abs(this.x) > Math.abs(this.y)) return new physics.geometry.Vector2D(this.x >= 0?1:-1,0); else return new physics.geometry.Vector2D(0,this.y >= 0?1:-1);
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
physics.geometry.VertexList = function() {
	this.vertices = new Array();
	this.transformedVertices = new Array();
};
physics.geometry.VertexList.__name__ = true;
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
utils.EventTarget.__name__ = true;
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
utils.AssetLoader.__name__ = true;
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
utils.ILoader.__name__ = true;
utils.ILoader.prototype = {
	__class__: utils.ILoader
};
utils.ImageAsset = function(mgr) {
	this.mgr = mgr;
};
utils.ImageAsset.__name__ = true;
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
utils.BlobAsset.__name__ = true;
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
utils.Base64.__name__ = true;
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
utils.Maths.__name__ = true;
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
wgr.display.DisplayObject.__name__ = true;
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
wgr.display.DisplayObjectContainer.__name__ = true;
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
			} else {
				var node = this.head;
				child.prev = node.prev;
				child.next = node;
				if(node.prev == null) this.head = child; else node.prev.next = child;
				node.prev = child;
			}
		} else {
			var node = this.tail;
			child.prev = node;
			child.next = node.next;
			if(node.next == null) this.tail = child; else node.next.prev = child;
			node.next = child;
		}
		this.childCount++;
		child.parent = this;
		child.applySlot(function(target,p) {
			target.stage = p;
			return true;
		},this.stage);
		if(this.stage != null) this.stage.dirty = true;
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
			} else {
				var node = this.head;
				child.prev = node.prev;
				child.next = node;
				if(node.prev == null) this.head = child; else node.prev.next = child;
				node.prev = child;
			}
		} else {
			var node = this.findChildByIndex(index);
			child.prev = node.prev;
			child.next = node;
			if(node.prev == null) this.head = child; else node.prev.next = child;
			node.prev = child;
		}
		this.childCount++;
		child.parent = this;
		child.applySlot(function(target,p) {
			target.stage = p;
			return true;
		},this.stage);
		if(this.stage != null) this.stage.dirty = true;
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
			this.childCount--;
			if(this.stage != null) this.stage.dirty = true;
			child.parent = null;
			child.applySlot(function(target,p) {
				target.stage = null;
				return true;
			},null);
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
		var _this = this.aabb;
		_this.t = _this.l = Math.POSITIVE_INFINITY;
		_this.r = _this.b = Math.NEGATIVE_INFINITY;
		wgr.display.DisplayObject.prototype.updateTransform.call(this);
		this.calcExtents();
		var _this = this.subTreeAABB;
		_this.t = _this.l = Math.POSITIVE_INFINITY;
		_this.r = _this.b = Math.NEGATIVE_INFINITY;
		var _this = this.subTreeAABB;
		var aabb = this.aabb;
		if(aabb.t < _this.t) _this.t = aabb.t;
		if(aabb.r > _this.r) _this.r = aabb.r;
		if(aabb.b > _this.b) _this.b = aabb.b;
		if(aabb.l < _this.l) _this.l = aabb.l;
		var child = this.head;
		while(child != null) {
			child.updateTransform();
			var _this = this.subTreeAABB;
			var aabb = child.aabb;
			if(aabb.t < _this.t) _this.t = aabb.t;
			if(aabb.r > _this.r) _this.r = aabb.r;
			if(aabb.b > _this.b) _this.b = aabb.b;
			if(aabb.l < _this.l) _this.l = aabb.l;
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
		} else {
			var node = this.head;
			newNode.prev = node.prev;
			newNode.next = node;
			if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
			node.prev = newNode;
		}
	}
	,insertEnd: function(newNode) {
		if(this.tail == null) {
			if(this.head == null) {
				this.head = newNode;
				this.tail = newNode;
				newNode.prev = null;
				newNode.next = null;
			} else {
				var node = this.head;
				newNode.prev = node.prev;
				newNode.next = node;
				if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
				node.prev = newNode;
			}
		} else {
			var node = this.tail;
			newNode.prev = node;
			newNode.next = node.next;
			if(node.next == null) this.tail = newNode; else node.next.prev = newNode;
			node.next = newNode;
		}
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
wgr.display.Camera.__name__ = true;
wgr.display.Camera.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Camera.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	Focus: function(x,y) {
		this.realPosition.x = x;
		this.realPosition.y = y;
		var _this = this.cameraExtentsAABB;
		var point = this.realPosition;
		if(point.x < _this.l) point.x = _this.l;
		if(point.x > _this.r) point.x = _this.r;
		if(point.y < _this.t) point.y = _this.t;
		if(point.y > _this.b) point.y = _this.b;
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
		var _this = this.cameraExtentsAABB;
		_this.l += width / 2;
		_this.r -= width / 2;
		_this.t += height / 2;
		_this.b -= height / 2;
	}
	,__class__: wgr.display.Camera
});
wgr.display.DisplayListIter = function(root) {
	this.node = root;
	this.stack = new Array();
	this.reset();
};
wgr.display.DisplayListIter.__name__ = true;
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
wgr.display.Sprite.__name__ = true;
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
			var _this = this.aabb;
			var x = this.transformedVerts[i * 2];
			var y = this.transformedVerts[i * 2 + 1];
			if(y < _this.t) _this.t = y;
			if(x > _this.r) _this.r = x;
			if(y > _this.b) _this.b = y;
			if(x < _this.l) _this.l = x;
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
wgr.display.Stage.__name__ = true;
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
wgr.geom.AABB.__name__ = true;
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
wgr.geom.Matrix3.__name__ = true;
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
wgr.geom.Matrix4.__name__ = true;
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
wgr.geom.Point.__name__ = true;
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
wgr.geom.Rectangle.__name__ = true;
wgr.geom.Rectangle.prototype = {
	__class__: wgr.geom.Rectangle
};
wgr.lighting = {};
wgr.lighting.ILight = function() { };
wgr.lighting.ILight.__name__ = true;
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
wgr.lighting.FloodFillLight.__name__ = true;
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
wgr.lighting.ParticleLightGrid.__name__ = true;
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
				var _this = this.map;
				_this.data32[y * _this.w + x] = tileType;
			}
		}
		var _this = this.map;
		_this.data32[10 * _this.w + 25] = 80;
		var _this = this.map;
		_this.data32[10 * _this.w + 26] = 80;
		var _this = this.map;
		_this.data32[11 * _this.w + 25] = 80;
		var _this = this.map;
		_this.data32[11 * _this.w + 26] = 80;
		this.tileOpacities = new Uint8Array(256);
		var _g1 = 0;
		var _g = this.tileOpacities.length;
		while(_g1 < _g) {
			var i = _g1++;
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
				var _this = this.lightMap;
				_this.data32[y * _this.w + x] = 0;
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
				var light;
				var _this = this.lightMap;
				light = _this.data32[y * _this.w + x];
				this.renderer.AddSpriteToBatch(x * this.tileSize + this.halfTileSize,y * this.tileSize + this.halfTileSize,255 - light,0,0,0);
			}
		}
	}
	,__class__: wgr.lighting.ParticleLightGrid
};
wgr.particle = {};
wgr.particle.IParticleEngine = function() { };
wgr.particle.IParticleEngine.__name__ = true;
wgr.particle.IParticleEngine.prototype = {
	__class__: wgr.particle.IParticleEngine
};
wgr.particle.PointSpriteParticle = function() {
};
wgr.particle.PointSpriteParticle.__name__ = true;
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
wgr.particle.PointSpriteParticleEngine.__name__ = true;
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
		while(particle != null) if(!(function($this) {
			var $r;
			var invDeltaTime = $this.invDeltaTime;
			particle.vX += particle.fX + particle.externalForce.x;
			particle.vY += particle.fY + particle.externalForce.y;
			particle.vX *= particle.damping;
			particle.vY *= particle.damping;
			particle.pX += particle.vX * invDeltaTime;
			particle.pY += particle.vY * invDeltaTime;
			particle.age -= $this.deltaTime;
			particle.alpha -= particle.decay;
			$r = particle.age > 0;
			return $r;
		}(this))) {
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
wgr.renderers.canvas.CanvasDebugView = function(view,width,height) {
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.view = view;
	this.ctx = view.getContext("2d");
	this.Resize(width,height);
};
wgr.renderers.canvas.CanvasDebugView.__name__ = true;
wgr.renderers.canvas.CanvasDebugView.prototype = {
	Resize: function(width,height) {
		this.width = width;
		this.height = height;
		this.view.width = width;
		this.view.height = height;
	}
	,Clear: function(camera) {
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0,0,this.width,this.height);
		this.ctx.strokeStyle = "rgba(255,255,255,1)";
	}
	,DrawRect: function(x,y,w,h) {
		this.ctx.strokeRect(x,y,w,h);
	}
	,DrawAABB: function(aabb) {
		this.ctx.strokeRect(aabb.l,aabb.t,aabb.r - aabb.l,aabb.b - aabb.t);
	}
	,__class__: wgr.renderers.canvas.CanvasDebugView
};
wgr.renderers.webgl = {};
wgr.renderers.webgl.IRenderer = function() { };
wgr.renderers.webgl.IRenderer.__name__ = true;
wgr.renderers.webgl.IRenderer.prototype = {
	__class__: wgr.renderers.webgl.IRenderer
};
wgr.renderers.webgl.PointSpriteLightMapRenderer = function() {
};
wgr.renderers.webgl.PointSpriteLightMapRenderer.__name__ = true;
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
wgr.renderers.webgl.PointSpriteRenderer.__name__ = true;
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
		var attrib = gl.getActiveUniform(program,i);
		this.uniform[attrib.name] = gl.getUniformLocation(program,attrib.name);
		i++;
	}
};
wgr.renderers.webgl.ShaderWrapper.__name__ = true;
wgr.renderers.webgl.ShaderWrapper.prototype = {
	__class__: wgr.renderers.webgl.ShaderWrapper
};
wgr.renderers.webgl.SpriteRenderer = function() {
};
wgr.renderers.webgl.SpriteRenderer.__name__ = true;
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
wgr.renderers.webgl.TileLayer.__name__ = true;
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
wgr.renderers.webgl.TileMap.__name__ = true;
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
wgr.renderers.webgl.WebGLBatch.__name__ = true;
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
				if(clip == null || (function($this) {
					var $r;
					var _this = sprite.aabb;
					$r = _this.l > clip.r?false:_this.r < clip.l?false:_this.t > clip.b?false:_this.b < clip.t?false:true;
					return $r;
				}(this))) {
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
			if(clip == null || (function($this) {
				var $r;
				var _this = sprite.aabb;
				$r = _this.l > clip.r?false:_this.r < clip.l?false:_this.t > clip.b?false:_this.b < clip.t?false:true;
				return $r;
			}(this))) {
				var index = indexRun * 20;
				var frame = sprite.texture.frame;
				var tw = sprite.texture.baseTexture.width;
				var th = sprite.texture.baseTexture.height;
				_g.data[index] = sprite.transformedVerts[0];
				_g.data[index + 1] = sprite.transformedVerts[1];
				_g.data[index + 2] = frame.x / tw;
				_g.data[index + 3] = frame.y / th;
				_g.data[index + 4] = sprite.worldAlpha;
				_g.data[index + 5] = sprite.transformedVerts[2];
				_g.data[index + 6] = sprite.transformedVerts[3];
				_g.data[index + 7] = (frame.x + frame.width) / tw;
				_g.data[index + 8] = frame.y / th;
				_g.data[index + 9] = sprite.worldAlpha;
				_g.data[index + 10] = sprite.transformedVerts[4];
				_g.data[index + 11] = sprite.transformedVerts[5];
				_g.data[index + 12] = (frame.x + frame.width) / tw;
				_g.data[index + 13] = (frame.y + frame.height) / th;
				_g.data[index + 14] = sprite.worldAlpha;
				_g.data[index + 15] = sprite.transformedVerts[6];
				_g.data[index + 16] = sprite.transformedVerts[7];
				_g.data[index + 17] = frame.x / tw;
				_g.data[index + 18] = (frame.y + frame.height) / th;
				_g.data[index + 19] = sprite.worldAlpha;
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
			if(clip == null || (function($this) {
				var $r;
				var _this = sprite.aabb;
				$r = _this.l > clip.r?false:_this.r < clip.l?false:_this.t > clip.b?false:_this.b < clip.t?false:true;
				return $r;
			}(this))) {
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
wgr.renderers.webgl.WebGLRenderer.__name__ = true;
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
wgr.renderers.webgl.WebGLShaders.__name__ = true;
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
wgr.texture.BaseTexture.__name__ = true;
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
wgr.texture.Texture.__name__ = true;
wgr.texture.Texture.prototype = {
	__class__: wgr.texture.Texture
};
wgr.texture.TextureManager = function(gl) {
	this.gl = gl;
	this.baseTextures = new haxe.ds.StringMap();
	this.textures = new haxe.ds.StringMap();
};
wgr.texture.TextureManager.__name__ = true;
wgr.texture.TextureManager.prototype = {
	AddTexture: function(id,image) {
		var baseTexture = new wgr.texture.BaseTexture(image);
		baseTexture.RegisterTexture(this.gl);
		this.baseTextures.set(id,baseTexture);
		return baseTexture;
	}
	,AddTexturesFromConfig: function(textureConfig,assets) {
		if(!js.Boot.__instanceof(textureConfig,String)) return;
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
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
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
engine.components.KeyboardControls.NAME = "Keyboard";
engine.components.ParticleEmitter.NAME = "Particle";
engine.components.Physics.NAME = "Physics";
engine.components.Sprite.NAME = "Sprite";
engine.map.tmx.TmxLayer.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
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
physics.collision.broadphase.managedgrid.Cell.LEFT = 1;
physics.collision.broadphase.managedgrid.Cell.LEFTUP = 2;
physics.collision.broadphase.managedgrid.Cell.UP = 4;
physics.collision.broadphase.managedgrid.Cell.UPRIGHT = 8;
physics.collision.broadphase.managedgrid.Cell.RIGHT = 16;
physics.collision.broadphase.managedgrid.Cell.RIGHTDOWN = 32;
physics.collision.broadphase.managedgrid.Cell.DOWN = 64;
physics.collision.broadphase.managedgrid.Cell.DOWNLEFT = 128;
physics.dynamics.Body.nextBodyID = 0;
physics.geometry.GeometricShape.nextUID = 0;
physics.geometry.Shapes.AXIS_ALIGNED_BOX_SHAPE = 0;
physics.geometry.Shapes.CIRCLE_SHAPE = 1;
physics.geometry.Shapes.SEGMENT_SHAPE = 2;
physics.geometry.Shapes.POLYGON_SHAPE = 4;
physics.geometry.Shapes.AABB_AABB = 0;
physics.geometry.Shapes.POLYGON_POLYGON = 4;
physics.geometry.Shapes.CIRCLE_POLYGON = 5;
physics.geometry.Shapes.CIRCLE_CIRCLE = 1;
physics.geometry.Shapes.CIRCLE_SEGMENT = 3;
physics.geometry.Shapes.SEGMENT_POLYGON = 6;
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