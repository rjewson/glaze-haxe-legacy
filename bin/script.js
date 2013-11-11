(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
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
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	var dd = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhAAAAAQAAAAEAAAAxAAAAAQAAAAEAAAAhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAADEAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAkAAAAJAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAEAAAAJAAAACQAAAAkAAAAJAAAAEwAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABMAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAEAAAABAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAABAAAACQAAAAkAAAAJAAAACQAAAAkAAAASAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAABAAAACQAAAAkAAAATAAAACQAAAAkAAAAJAAAACQAAAAkAAAATAAAACQAAAAkAAAAJAAAACQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAATAAAACQAAAAAAAAAAAAAAAAAAAAAAAAABAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABMAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAABAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAABAAAACQAAABIAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAJAAAACQAAAAkAAAASAAAACQAAAAkAAAAJAAAACQAAAAkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAkAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAkAAAAJAAAACQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
	var validTiles = [0,1,5,6,7,8,9,16,17,18];
	var assets = new utils.ImageLoader();
	assets.addEventListener("loaded",function(event) {
		var map = new engine.map.TileMapMap(42,34,utils.Base64.Decode(dd));
		var tileIndex = 1;
		var _g = 0;
		while(_g < 8) {
			var tileY = _g++;
			var _g1 = 0;
			while(_g1 < 8) {
				var tileX = _g1++;
				map.addTileType(tileIndex++,tileX,tileY);
			}
		}
		var mapData = map.toTexture();
		var stage = new wgr.display.Stage();
		var camera = new wgr.display.Camera();
		camera.worldExtentsAABB = new wgr.geom.AABB(0,2000,2000,0);
		stage.addChild(camera);
		var canvasView = js.Boot.__cast(js.Browser.document.getElementById("view") , HTMLCanvasElement);
		var renderer = new wgr.renderers.webgl.WebGLRenderer(stage,camera,canvasView,800,600);
		var debugView = js.Boot.__cast(js.Browser.document.getElementById("viewDebug") , HTMLCanvasElement);
		var debug = new wgr.renderers.canvas.CanvasDebugView(debugView,800,600);
		var tm = new wgr.texture.TextureManager(renderer.gl);
		var basetexture1up = tm.AddTexture("mushroom",assets.assets[0]);
		var texture1up = new wgr.texture.Texture(basetexture1up,new wgr.geom.Rectangle(0,0,256,256));
		var basetexturechar = tm.AddTexture("char",assets.assets[4]);
		var texturechar1 = new wgr.texture.Texture(basetexturechar,new wgr.geom.Rectangle(0,0,50,75));
		camera.Resize(renderer.width,renderer.height);
		var createSprite = function(id,x,y,px,py,t) {
			var s = new wgr.display.Sprite();
			s.id = id;
			s.texture = t;
			s.position.x = x;
			s.position.y = y;
			s.pivot.x = px;
			s.pivot.y = py;
			return s;
		};
		var itemContainer = new wgr.display.DisplayObjectContainer();
		itemContainer.id = "itemContainer";
		camera.addChild(itemContainer);
		var shrooms = false;
		var spr1 = createSprite("spr1",128,128,128,128,texture1up);
		spr1.alpha = 1;
		if(shrooms) itemContainer.addChild(spr1);
		var spr2 = createSprite("spr2",228,228,128,128,texture1up);
		if(shrooms) itemContainer.addChild(spr2);
		var spr21 = createSprite("spr21",328,328,128,128,texture1up);
		spr21.alpha = 0.9;
		if(shrooms) spr2.addChild(spr21);
		var spr3 = createSprite("character",400,380,0,0,texturechar1);
		spr3.scale.x = -1;
		itemContainer.addChild(spr3);
		var sprArray = new Array();
		var xpos = 0, ypos = 0;
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			var newSpr = new wgr.display.Sprite();
			newSpr.id = "newSpr" + i;
			newSpr.texture = texturechar1;
			xpos++;
			if(xpos > 99) {
				xpos = 0;
				ypos++;
			}
			newSpr.position.x = 100 + xpos * 20;
			newSpr.position.y = 100 + ypos * 20;
			newSpr.pivot.x = 25.;
			newSpr.pivot.y = 37.5;
			itemContainer.addChild(newSpr);
			sprArray.push(newSpr);
		}
		var itr = new wgr.display.DisplayListIter(stage);
		var _g = itr;
		while(_g.top > 0) {
			var item = _g.next();
			console.log(item.id);
		}
		var tileMap = new wgr.renderers.webgl.TileMap();
		renderer.AddRenderer(tileMap);
		tileMap.SetSpriteSheet(assets.assets[1]);
		tileMap.SetTileLayerFromData(mapData,"base",1,1);
		tileMap.SetTileLayer(assets.assets[3],"bg",0.6,0.6);
		tileMap.tileSize = 16;
		tileMap.TileScale(2);
		var spriteRender = new wgr.renderers.webgl.SpriteRenderer();
		spriteRender.AddStage(stage);
		renderer.AddRenderer(spriteRender);
		var pointParticleEngine = new wgr.particle.PointSpriteParticleEngine(3000,1000 / 60);
		pointParticleEngine.renderer.SetSpriteSheet(tileMap.spriteSheet,16,8,8);
		renderer.AddRenderer(pointParticleEngine.renderer);
		var startTime = new Date().getTime();
		var stop = false;
		var debugSwitch = false;
		var tick = function() {
			var _g = spr1;
			_g._rotation = _g._rotation + 0.01;
			_g._rotationComponents.x = Math.cos(_g._rotation);
			_g._rotationComponents.y = Math.sin(_g._rotation);
			_g._rotation;
			var _g = spr2;
			_g._rotation = _g._rotation - 0.02;
			_g._rotationComponents.x = Math.cos(_g._rotation);
			_g._rotationComponents.y = Math.sin(_g._rotation);
			_g._rotation;
			var _g = spr21;
			_g._rotation = _g._rotation + 0.04;
			_g._rotationComponents.x = Math.cos(_g._rotation);
			_g._rotationComponents.y = Math.sin(_g._rotation);
			_g._rotation;
			var _g = 0;
			while(_g < sprArray.length) {
				var spr = sprArray[_g];
				++_g;
				var _g1 = spr;
				_g1._rotation = _g1._rotation + 0.04;
				_g1._rotationComponents.x = Math.cos(_g1._rotation);
				_g1._rotationComponents.y = Math.sin(_g1._rotation);
				_g1._rotation;
			}
			var _g = 0;
			while(_g < 1000) {
				var pCount = _g++;
				var vX = Std.random(600) - 300;
				var vY = Std.random(600) - 300;
				var ttl = Std.random(3000) + 500;
				var type = 2;
				pointParticleEngine.EmitParticle(400,300,vX,vY,0,0,ttl,0.99,false,true,null,type,32,-1);
			}
			pointParticleEngine.Update();
			var elapsed = new Date().getTime() - startTime;
			var xp = (Math.sin(elapsed / 2000) * 0.5 + 0.5) * 528;
			var yp = (Math.sin(elapsed / 5000) * 0.5 + 0.5) * 570;
			camera.Focus(xp,yp);
			renderer.Render(camera.viewPortAABB);
			if(debugSwitch) {
				debug.Clear(camera);
				debug.DrawAABB(spr1.subTreeAABB);
				debug.DrawAABB(spr2.subTreeAABB);
			}
		};
		var engine1 = new engine.Engine();
		engine1.updateFunc = tick;
		engine1.start();
		js.Browser.document.getElementById("stopbutton").addEventListener("click",function(event1) {
			engine1.stop();
		});
		js.Browser.document.getElementById("startbutton").addEventListener("click",function(event1) {
			engine1.start();
		});
		js.Browser.document.getElementById("debugbutton").addEventListener("click",function(event1) {
			debugSwitch = !debugSwitch;
			debug.Clear(camera);
		});
		js.Browser.document.getElementById("action1").addEventListener("click",function(event1) {
			var child = itemContainer.removeChildAt(3);
			itemContainer.addChildAt(child,4);
		});
		js.Browser.document.getElementById("action2").addEventListener("click",function(event1) {
			spr2._visible = !spr2._visible;
			if(spr2.stage != null) spr2.stage.dirty = true;
			spr2._visible;
		});
	});
	assets.SetImagesToLoad(["data/1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","data/characters.png"]);
	var pengine = new physics.collision.broadphase.managedgrid.ManagedGrid(60,60,new physics.collision.narrowphase.sat.SAT(),16,16,16);
}
var IMap = function() { }
IMap.__name__ = true;
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
}
var ds = {}
ds.Array2D = function(width,height,buffer) {
	this.w = width;
	this.h = height;
	if(buffer == null) this.buffer = new ArrayBuffer(this.w * this.h * 4); else this.buffer = buffer;
	this.data32 = new Uint32Array(this.buffer);
	this.data8 = new Uint8Array(this.buffer);
};
ds.Array2D.__name__ = true;
ds.Array2D.prototype = {
	getIndex: function(x,y) {
		return y * this.w + x;
	}
	,set: function(x,y,v) {
		this.data32[y * this.w + x] = v;
	}
	,get: function(x,y) {
		return this.data32[y * this.w + x];
	}
	,__class__: ds.Array2D
}
ds.Grid2D = function(gridWidth,gridHeight,cellSize) {
	this.initalize(gridWidth,gridHeight,cellSize);
};
ds.Grid2D.__name__ = true;
ds.Grid2D.prototype = {
	Height: function() {
		return this.gridHeight * this.cellSize;
	}
	,Width: function() {
		return this.gridWidth * this.cellSize;
	}
	,Index: function(value) {
		return value * this.invCellSize | 0;
	}
	,SetGrid: function(x,y,value) {
		this.data[y * this.gridWidth + x] = value;
	}
	,GetGridSafe: function(x,y) {
		return x >= this.gridWidth || y >= this.gridHeight || x < 0 || y < 0?null:this.data[y * this.gridWidth + x];
	}
	,GetGrid: function(x,y) {
		return this.data[y * this.gridWidth + x];
	}
	,initalize: function(gridWidth,gridHeight,cellSize) {
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
		this.cellSize = cellSize;
		this.invCellSize = 1 / cellSize;
		this.data = new Array();
	}
	,__class__: ds.Grid2D
}
ds.Grid2DIterator = function() {
};
ds.Grid2DIterator.__name__ = true;
ds.Grid2DIterator.prototype = {
	__class__: ds.Grid2DIterator
}
ds.IDManager = function() { }
ds.IDManager.__name__ = true;
ds.IDManager.GetPersistentID = function() {
	return ds.IDManager.NEXT_PERSISTENT_ID++;
}
ds.IDManager.GetTransientID = function() {
	var id = ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER];
	ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER] = 0;
	ds.IDManager.TRANSIENT_POINTER++;
	return id;
}
ds.IDManager.ReleaseTransientID = function(id) {
	ds.IDManager.TRANSIENT_POINTER--;
	ds.IDManager.TRANSIENT_CACHE[ds.IDManager.TRANSIENT_POINTER] = id;
}
var engine = {}
engine.Engine = function() {
	this.isRunning = false;
};
engine.Engine.__name__ = true;
engine.Engine.prototype = {
	stop: function() {
		if(this.isRunning == false) return;
		this.isRunning = false;
		js.Browser.window.cancelAnimationFrame(this.rafID);
	}
	,start: function() {
		if(this.isRunning == true) return;
		this.isRunning = true;
		this.prevAnimationTime = this.animationStartTimestamp = js.Browser.window.performance.now();
		this.rafID = js.Browser.window.requestAnimationFrame($bind(this,this.update));
	}
	,update: function(timestamp) {
		this.delta = timestamp - this.prevAnimationTime;
		this.prevAnimationTime = timestamp;
		if(this.updateFunc != null) this.updateFunc();
		this.rafID = js.Browser.window.requestAnimationFrame($bind(this,this.update));
		return false;
	}
	,__class__: engine.Engine
}
engine.map = {}
engine.map.TileMapMap = function(w,h,data) {
	this.mapData = new ds.Array2D(w,h,data);
	this.tiles = new haxe.ds.IntMap();
};
engine.map.TileMapMap.__name__ = true;
engine.map.TileMapMap.prototype = {
	toTexture: function() {
		var textureData = new ds.Array2D(this.mapData.w,this.mapData.h);
		var _g1 = 0, _g = this.mapData.w;
		while(_g1 < _g) {
			var xp = _g1++;
			var _g3 = 0, _g2 = this.mapData.h;
			while(_g3 < _g2) {
				var yp = _g3++;
				var source = this.mapData.get(xp,yp);
				if(source > 0) textureData.data32[yp * textureData.w + xp] = this.tiles.get(source); else textureData.data32[yp * textureData.w + xp] = -1;
			}
		}
		return textureData;
	}
	,addTileType: function(index,x,y) {
		var v = -16777216 | y << 8 | x;
		this.tiles.set(index,v);
	}
	,__class__: engine.map.TileMapMap
}
var haxe = {}
haxe.ds = {}
haxe.ds.GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe.ds.GenericCell.__name__ = true;
haxe.ds.GenericCell.prototype = {
	__class__: haxe.ds.GenericCell
}
haxe.ds.GenericStack = function() {
};
haxe.ds.GenericStack.__name__ = true;
haxe.ds.GenericStack.prototype = {
	iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,remove: function(v) {
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
	,add: function(item) {
		this.head = new haxe.ds.GenericCell(item,this.head);
	}
	,__class__: haxe.ds.GenericStack
}
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
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
				var _g1 = 2, _g = o.length;
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
		for( var k in o ) { ;
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
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
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
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
js.Browser.__name__ = true;
js.Lib = function() { }
js.Lib.__name__ = true;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.html = {}
js.html._CanvasElement = {}
js.html._CanvasElement.CanvasUtil = function() { }
js.html._CanvasElement.CanvasUtil.__name__ = true;
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0, _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
}
var physics = {}
physics.Constants = function() { }
physics.Constants.__name__ = true;
physics.PhysicsEngine = function(fps,pps,narrowphase) {
	this.fps = fps;
	this.pps = pps;
	this.narrowphase = narrowphase;
	this.Initalize();
};
physics.PhysicsEngine.__name__ = true;
physics.PhysicsEngine.prototype = {
	ProcessShapes: function(position,range,action) {
	}
	,ProcessAction: function(action) {
	}
	,CastRay: function(ray) {
		return null;
	}
	,WakeItem: function(body) {
		return true;
	}
	,SleepItem: function(body) {
		return true;
	}
	,RemoveBody: function(body) {
	}
	,AddBody: function(body) {
		body.OnAddedToEngine(this);
	}
	,RenderItems: function(timeStamp,aabb) {
	}
	,ProcessOnStep: function(step) {
	}
	,EndStaticUpdate: function(body) {
	}
	,StartStaticUpdate: function(body) {
	}
	,Collide: function() {
	}
	,Update: function() {
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
	,Initalize: function() {
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
	,__class__: physics.PhysicsEngine
}
physics.collision = {}
physics.collision.broadphase = {}
physics.collision.broadphase.action = {}
physics.collision.broadphase.action.ActionParams = function() {
};
physics.collision.broadphase.action.ActionParams.__name__ = true;
physics.collision.broadphase.action.ActionParams.prototype = {
	PreProcess: function() {
		this.radiusSqrd = this.radius * this.radius;
	}
	,__class__: physics.collision.broadphase.action.ActionParams
}
physics.collision.broadphase.action.ActionResult = function() {
};
physics.collision.broadphase.action.ActionResult.__name__ = true;
physics.collision.broadphase.action.ActionResult.prototype = {
	Reset: function() {
		this.body = null;
		this.distanceSqrd = 0;
	}
	,__class__: physics.collision.broadphase.action.ActionResult
}
physics.collision.broadphase.action.ActionResultCollection = function() {
	this.results = new Array();
	this.opaqueBodies = new Array();
};
physics.collision.broadphase.action.ActionResultCollection.__name__ = true;
physics.collision.broadphase.action.ActionResultCollection.prototype = {
	quicksort: function(arrayInput,left,right) {
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
	,Sort: function() {
		this.quicksort(this.results,0,this.resultCount - 1);
		this.quicksort(this.opaqueBodies,0,this.opaqueBodyCount - 1);
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
	,Reset: function() {
		var _g1 = 0, _g = this.resultCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.results[i].Reset();
		}
		this.resultCount = 0;
		var _g1 = 0, _g = this.opaqueBodyCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.opaqueBodies[i].Reset();
		}
		this.opaqueBodyCount = 0;
		this.furthestDistSqrd = 0;
	}
	,__class__: physics.collision.broadphase.action.ActionResultCollection
}
physics.collision.broadphase.action.IBroadphaseAction = function() { }
physics.collision.broadphase.action.IBroadphaseAction.__name__ = true;
physics.collision.broadphase.action.IBroadphaseAction.prototype = {
	__class__: physics.collision.broadphase.action.IBroadphaseAction
}
physics.collision.broadphase.managedgrid = {}
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
	SearchCell: function(action,actionResultCollection) {
		this.SearchList(this.dynamicItems,action,actionResultCollection);
		this.SearchList(this.sleepingItems,action,actionResultCollection);
		this.SearchList(this.staticItems,action,actionResultCollection);
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
	,WakeAll: function() {
		var $it0 = this.sleepingItems.iterator();
		while( $it0.hasNext() ) {
			var body = $it0.next();
			body.Wake();
		}
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
	,SleepItem: function(body) {
		console.log("Sleep " + Std.string(body));
		if(body.isSleeping || this.forceWakeLockCount > 0) return false;
		this.ClearOccupancy(body);
		this.RemoveItem(body);
		body.isSleeping = true;
		this.AddItem(body);
		return true;
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
	,Start: function() {
		if(!this.isPaused) return;
		this.isPaused = false;
		this.manager.CellStart(this);
	}
	,OnStep: function(step) {
		this.SetProcessOnStepStatus();
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
	,AdditionalCollide: function(body) {
	}
	,Collide: function() {
		var s1 = this.dynamicItems.head;
		while(s1 != null) {
			var item1 = s1.elt;
			var s2 = s1.next;
			while(s2 != null) {
				var item2 = s2.elt;
				this.manager.CheckDoubleCollisions(item1,item2);
				if(physics.geometry.AABB.intersects(item1.aabb,item1.position,item2.aabb,item2.position)) this.manager.narrowphase.CollideBodies(item1,item2);
				s2 = s2.next;
			}
			var s3 = this.staticItems.head;
			while(s3 != null) {
				var item3 = s3.elt;
				if(physics.geometry.AABB.intersects(item1.aabb,item1.position,item3.aabb,item3.position)) this.manager.narrowphase.CollideBodies(item1,item3);
				s3 = s3.next;
			}
			var s4 = this.sleepingItems.head;
			while(s4 != null) {
				var item4 = s4.elt;
				if(physics.geometry.AABB.intersects(item1.aabb,item1.position,item4.aabb,item4.position)) this.manager.narrowphase.CollideBodies(item1,item4);
				s4 = s4.next;
			}
			this.AdditionalCollide(item1);
			s1 = s1.next;
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
				this.HashCellItem(body);
				if(body.canSleep) body.Sleep();
			}
			if(body.canKeepAlive && !body.isSleeping) this.persistentActivity = true; else this.transientActivity = true;
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
	,HashCellItem: function(body) {
		if(body.broadphaseData == this.index) {
			if(body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b) {
				var newOccupany = this.CalcCellItemOccupancy(body);
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
	,IsCoreCell: function(body) {
		return body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b;
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
	,RemoveStaticItem: function(body) {
		this.staticItems.remove(body);
		this.staticCount--;
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
	,AddStaticItem: function(body) {
		this.staticItems.add(body);
		this.staticCount++;
	}
	,AddItem: function(body) {
		if(!body.isSleeping) {
			this.dynamicItems.add(body);
			this.dynamicCount++;
			this.Start();
		} else {
			this.sleepingItems.add(body);
			this.sleepingCount++;
		}
		if(body.position.x >= this.aabb.l && body.position.x < this.aabb.r && body.position.y >= this.aabb.t && body.position.y < this.aabb.b) {
			body.broadphaseData = this.index;
			body.broadphaseData2 = this.CalcCellItemOccupancy(body);
			this.SetOccupancy(body);
		}
	}
	,__class__: physics.collision.broadphase.managedgrid.Cell
}
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
	toString: function() {
		var result = "";
		var _g = 0, _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			if(cell.dynamicCount > 0) result += "(" + cell.aabb.l / 100 + ":" + cell.aabb.t / 100 + "=" + cell.dynamicCount + ")";
		}
		return result;
	}
	,CheckDoubleCollisions: function(body1,body2) {
		if(this.doubleCollisionLength == 0 || body1.broadphaseData2 == 0 && body2.broadphaseData2 == 0) return false; else {
			var hash = physics.dynamics.Body.HashBodyIDs(body1.id,body2.id);
			var _g = 0, _g1 = this.doubleCollisionList;
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
				var cell = this.grid.GetGridSafe(x,y);
				if(cell != null) cell.SearchCell(action,this.actionResultCollection);
			}
		}
		action.Execute(this.actionResultCollection);
	}
	,CastRay: function(ray) {
		return null;
	}
	,CellStart: function(cell) {
	}
	,CellPause: function(cell) {
	}
	,EndStaticUpdate: function(body) {
		if(!this.staticUpdateHash.exists(body.id)) return;
		var indexPos = this.staticUpdateHash.get(body.id);
		this.staticUpdateHash.remove(body.id);
		var _g1 = indexPos.x - 1 | 0, _g = indexPos.x + 1 | 0;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = indexPos.y - 1 | 0, _g2 = indexPos.y + 1 | 0;
			while(_g3 < _g2) {
				var y = _g3++;
				var cell = this.grid.GetGridSafe(x,y);
				if(cell != null) cell.forceWakeLockCount--;
			}
		}
	}
	,StartStaticUpdate: function(body) {
		if(this.staticUpdateHash.exists(body.id)) return;
		var indexPos = new physics.geometry.Vector2D(body.position.x * this.grid.invCellSize | 0,body.position.y * this.grid.invCellSize | 0);
		this.staticUpdateHash.set(body.id,indexPos);
		var _g1 = indexPos.x - 1 | 0, _g = indexPos.x + 1 | 0;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = indexPos.y - 1 | 0, _g2 = indexPos.y + 1 | 0;
			while(_g3 < _g2) {
				var y = _g3++;
				var cell = this.grid.GetGridSafe(x,y);
				if(cell != null) {
					cell.forceWakeLockCount++;
					cell.WakeAll();
				}
			}
		}
	}
	,WakeItem: function(body) {
		return this.grid.data[body.broadphaseData].WakeItem(body);
	}
	,SleepItem: function(body) {
		return this.grid.data[body.broadphaseData].SleepItem(body);
	}
	,RemoveDynamicBody: function(body) {
		var cell = this.grid.data[body.broadphaseData];
		cell.ClearOccupancy(body);
		cell.RemoveItem(body);
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
					var cell = this.grid.GetGridSafe(x,y);
					cell.RemoveStaticItem(body);
				}
			}
		}
		physics.PhysicsEngine.prototype.RemoveBody.call(this,body);
	}
	,AddDynamicBody: function(body) {
		var cell = this.grid.GetGridSafe(body.position.x * this.grid.invCellSize | 0,body.position.y * this.grid.invCellSize | 0);
		if(cell != null) cell.AddItem(body);
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
					var cell = this.grid.GetGridSafe(x,y);
					cell.AddStaticItem(body);
				}
			}
		}
		physics.PhysicsEngine.prototype.AddBody.call(this,body);
	}
	,ProcessOnStep: function(step) {
		var _g = 0, _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.OnStep(step);
		}
	}
	,Collide: function() {
		this.doubleCollisionLength = 0;
		var _g = 0, _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.Collide();
		}
	}
	,Update: function() {
		var _g = 0, _g1 = this.grid.data;
		while(_g < _g1.length) {
			var cell = _g1[_g];
			++_g;
			cell.Update();
		}
	}
	,CellFactory: function(i,x,y) {
		return new physics.collision.broadphase.managedgrid.Cell(this,i,x * this.grid.cellSize,y * this.grid.cellSize,this.grid.cellSize,this.grid.cellSize);
	}
	,init: function() {
		var index = 0;
		var _g1 = 0, _g = this.grid.gridWidth;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0, _g2 = this.grid.gridHeight;
			while(_g3 < _g2) {
				var x = _g3++;
				this.grid.data.push(this.CellFactory(index++,x,y));
			}
		}
		var _g1 = 0, _g = this.grid.gridWidth;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0, _g2 = this.grid.gridHeight;
			while(_g3 < _g2) {
				var x = _g3++;
				var cell = this.grid.GetGridSafe(x,y);
				cell.adjacentCells.push(this.grid.GetGridSafe(x - 1,y));
				cell.adjacentCells.push(this.grid.GetGridSafe(x - 1,y - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x,y - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x + 1,y - 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x + 1,y));
				cell.adjacentCells.push(this.grid.GetGridSafe(x + 1,y + 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x,y + 1));
				cell.adjacentCells.push(this.grid.GetGridSafe(x - 1,y + 1));
			}
		}
	}
	,__class__: physics.collision.broadphase.managedgrid.ManagedGrid
});
physics.collision.narrowphase = {}
physics.collision.narrowphase.INarrowphase = function() { }
physics.collision.narrowphase.INarrowphase.__name__ = true;
physics.collision.narrowphase.INarrowphase.prototype = {
	__class__: physics.collision.narrowphase.INarrowphase
}
physics.collision.narrowphase.sat = {}
physics.collision.narrowphase.sat.SAT = function() {
	this.result = new physics.dynamics.Arbiter();
};
physics.collision.narrowphase.sat.SAT.__name__ = true;
physics.collision.narrowphase.sat.SAT.__interfaces__ = [physics.collision.narrowphase.INarrowphase];
physics.collision.narrowphase.sat.SAT.poly2poly = function(shape1,shape1Pos,shape2,shape2Pos,arbiter) {
	var vertValOnAxis;
	var minValOnAxis;
	var minPen1 = -1e+99;
	var minAxis1 = null;
	var _g = 0, _g1 = shape1.transformedAxes;
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
	var _g = 0, _g1 = shape2.transformedAxes;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		minValOnAxis = shape1.ValueOnAxis(a,shape2Pos,shape1Pos);
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
	arbiter.AddContact(0,0,minAxis.n.x,minAxis.n.y,nCoef,dist);
	return true;
}
physics.collision.narrowphase.sat.SAT.circle2circle = function(circle1,circle1Pos,circle2,circle2Pos,arbiter) {
	return physics.collision.narrowphase.sat.SAT.circle2circleQuery(circle1.transformedCentre.x + circle1Pos.x,circle1.transformedCentre.y + circle1Pos.y,circle2.transformedCentre.x + circle2Pos.x,circle2.transformedCentre.y + circle2Pos.y,circle1.radius,circle2.radius,arbiter);
}
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
}
physics.collision.narrowphase.sat.SAT.circle2poly = function(circle,circlePos,poly,polyPos,arbiter) {
	var miniA = null;
	var min = -1e+99;
	var tCx = circle.transformedCentre.x + circlePos.x;
	var tCy = circle.transformedCentre.y + circlePos.y;
	var miniVindex = 0;
	var _g1 = 0, _g = poly.vertexCount;
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
}
physics.collision.narrowphase.sat.SAT.circle2segment = function(circle,circlePos,segment,segmentPos,arbiter) {
	var tAP = segment.tA.plus(segmentPos);
	var tCP = circle.transformedCentre.plus(circlePos);
	var closest_t = segment.delta.dot(new physics.geometry.Vector2D(tCP.x - tAP.x,tCP.y - tAP.y)) / segment.delta.lengthSqr();
	if(closest_t < 0) closest_t = 0;
	if(closest_t > 1) closest_t = 1;
	var closest = tAP.plus(segment.delta.mult(closest_t));
	return physics.collision.narrowphase.sat.SAT.circle2circleQuery(tCP.x,tCP.y,closest.x,closest.y,circle.radius,segment.radius,arbiter);
}
physics.collision.narrowphase.sat.SAT.prototype = {
	CollideFeatures: function(feature1,feature2,n) {
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
	,CollideBodies: function(body1,body2,n) {
		if(body1.features.length == 1 && body2.features.length == 1) this.CollideFeatures(body1.features[0],body2.features[0],n); else {
			var _g = 0, _g1 = body1.features;
			while(_g < _g1.length) {
				var feature1 = _g1[_g];
				++_g;
				var _g2 = 0, _g3 = body2.features;
				while(_g2 < _g3.length) {
					var feature2 = _g3[_g2];
					++_g2;
					if(physics.geometry.AABB.intersects(feature1.shape.aabb,feature1.body.position,feature2.shape.aabb,feature2.body.position)) this.CollideFeatures(feature1,feature2,n);
				}
			}
		}
	}
	,__class__: physics.collision.narrowphase.sat.SAT
}
physics.constraints = {}
physics.constraints.Constraint = function() {
};
physics.constraints.Constraint.__name__ = true;
physics.constraints.Constraint.prototype = {
	Destroy: function() {
		if(this.destroyCallback != null) this.destroyCallback(this);
		this.body1.RemoveConstraint(this);
		this.body2.RemoveConstraint(this);
	}
	,resolve: function() {
		return false;
	}
	,__class__: physics.constraints.Constraint
}
physics.dynamics = {}
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
	Resolve: function() {
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
	,OpposingBody: function(thiz) {
		return thiz.id == this.feature1.body.id?this.feature2.body:this.feature1.body;
	}
	,AddContact: function(pX,pY,nX,nY,nCoef,dist) {
		var contact = this.contacts[this.contactCount];
		contact.point.x = pX;
		contact.point.y = pY;
		contact.normal.x = nX * nCoef;
		contact.normal.y = nY * nCoef;
		contact.penDist = dist;
	}
	,Reset: function() {
		this.contactCount = 0;
	}
	,__class__: physics.dynamics.Arbiter
}
physics.dynamics.Body = function() {
	this.id = this["transient"]?ds.IDManager.GetTransientID():ds.IDManager.GetPersistentID();
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
	return body1ID < body2ID?body1ID << 16 | body2ID:body2ID << 16 | body1ID;
}
physics.dynamics.Body.prototype = {
	Destroy: function() {
		this.engine.RemoveBody(this);
		var $it0 = this.constraints.iterator();
		while( $it0.hasNext() ) {
			var constraint = $it0.next();
			constraint.Destroy();
		}
		if(this["transient"]) ds.IDManager.ReleaseTransientID(this.id);
	}
	,OnEndCollision: function(contact) {
	}
	,OnCollision: function(contact) {
	}
	,OnStartCollision: function(contact) {
		console.log("Start " + contact.hash);
	}
	,OnAddedToEngine: function(engine) {
		this.engine = engine;
		this.createdMS = engine.currTime;
	}
	,RemoveConstraint: function(constraint) {
		this.constraints.remove(constraint);
	}
	,AddConstraint: function(constraint) {
		this.constraints.add(constraint);
	}
	,UpdateFeatures: function() {
		this.aabb.reset();
		var _g = 0, _g1 = this.features;
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
	,AddFeature: function(shape,material) {
		var feature = new physics.dynamics.Feature(this,shape,material == null?new physics.dynamics.Material():material);
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
	,SetRadius: function(r) {
		this.radius = r;
		this.radiusSqrd = r * r;
	}
	,Skew: function(delta) {
		this.position.plusEquals(delta);
		this.prevPosition.plusEquals(delta);
		if(this.isSleeping) this.Wake();
	}
	,SetStaticPosition: function(position) {
		this.position.copy(position);
		this.prevPosition.copy(position);
		this.averageCenter.x = position.x + this.averageCenterOffset.x;
		this.averageCenter.y = position.y + this.averageCenterOffset.y;
		if(this.isSleeping) this.Wake();
	}
	,SetMaximumScalarVelocity: function(maxVelocity) {
		this.maxVelocityScalar = maxVelocity;
		this.maxVelocityScalarSqrd = this.maxVelocityScalar * this.maxVelocityScalar;
	}
	,MakeStatic: function() {
		this.isStatic = true;
		this.isOpaque = true;
		this.SetMass(Math.POSITIVE_INFINITY);
	}
	,SetMass: function(mass) {
		this.mass = mass;
		this.invMass = 1 / mass;
	}
	,SetAngle: function(angle) {
		this.angle = angle % 6.28318530717;
		this.rotation.x = Math.cos(this.angle);
		this.rotation.y = Math.sin(this.angle);
		this.UpdateFeatures();
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
	,AddMasslessForce: function(force) {
		this.accumulatedForces.plusEquals(force);
		if(this.isSleeping) this.Wake();
	}
	,AddForce: function(force) {
		this.accumulatedForces.plusEquals(force.mult(this.invMass));
		if(this.isSleeping) this.Wake();
	}
	,SetVelocity: function(value) {
		this.prevPosition.x = this.position.x - value.x;
		this.prevPosition.y = this.position.y - value.y;
		if(this.isSleeping) this.Wake();
	}
	,GetVelocity: function() {
		return this.position.minus(this.prevPosition);
	}
	,Wake: function() {
		if(!this.isSleeping) return false;
		if(this.engine.WakeItem(this)) {
			this.motion = 10;
			return true;
		}
		return false;
	}
	,Sleep: function() {
		if(this.isSleeping || !this.allowedToSleep) return false;
		if(this.engine.SleepItem(this)) {
			this.motion = 0;
			return true;
		}
		return false;
	}
	,OnPause: function() {
		return true;
	}
	,OnStep: function(step) {
		return true;
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
		this.motion = 0.99332805041467 * this.motion + (1 - 0.99332805041467) * (nvX * nvX + nvY * nvY);
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
	,Initalize: function() {
	}
	,__class__: physics.dynamics.Body
}
physics.dynamics.BodyContact = function() {
};
physics.dynamics.BodyContact.__name__ = true;
physics.dynamics.BodyContact.prototype = {
	__class__: physics.dynamics.BodyContact
}
physics.dynamics.BodyContactManager = function(engine) {
	this.engine = engine;
	this.contacts = new haxe.ds.IntMap();
};
physics.dynamics.BodyContactManager.__name__ = true;
physics.dynamics.BodyContactManager.prototype = {
	ProcessBodyContacts: function() {
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
	,UpdateContacts: function(body1,body2) {
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
	,__class__: physics.dynamics.BodyContactManager
}
physics.dynamics.Contact = function() {
	this.point = new physics.geometry.Vector2D();
	this.normal = new physics.geometry.Vector2D();
	this.penDist = 0;
};
physics.dynamics.Contact.__name__ = true;
physics.dynamics.Contact.prototype = {
	__class__: physics.dynamics.Contact
}
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
}
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
}
physics.geometry = {}
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
}
physics.geometry.AABB.prototype = {
	Union: function(position,aabb,aabbPosition) {
		return new physics.geometry.AABB(Math.max(this.l + position.x,aabb.l + aabbPosition.x),Math.min(this.b + position.y,aabb.b + aabbPosition.y),Math.min(this.r + position.x,aabb.r + aabbPosition.x),Math.max(this.t + position.y,aabb.t + aabbPosition.y));
	}
	,setToCenter: function(c) {
		c.x = (this.r + this.l) / 2;
		c.y = (this.b + this.t) / 2;
	}
	,area: function() {
		return (this.r - this.l) * (this.b - this.t);
	}
	,height: function() {
		return this.b - this.t;
	}
	,width: function() {
		return this.r - this.l;
	}
	,reset: function() {
		this.l = 1e99;
		this.r = -1e+99;
		this.t = 1e99;
		this.b = -1e+99;
	}
	,expand: function(aabb) {
		if(aabb.l < this.l) this.l = aabb.l;
		if(aabb.r > this.r) this.r = aabb.r;
		if(aabb.t < this.t) this.t = aabb.t;
		if(aabb.b > this.b) this.b = aabb.b;
	}
	,__class__: physics.geometry.AABB
}
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
}
physics.geometry.GeometricShape = function(typeID,offset) {
	this.typeID = typeID;
	this.offset = offset;
	this.aabb = new physics.geometry.AABB();
	this.UID = physics.geometry.GeometricShape.nextUID++;
};
physics.geometry.GeometricShape.__name__ = true;
physics.geometry.GeometricShape.prototype = {
	IntersectSegment: function(a,b,feature) {
	}
	,IntersectRay: function(ray,feature) {
		return false;
	}
	,ContainsPoint: function(point,shapePosition) {
		return false;
	}
	,Update: function(rotation) {
	}
	,__class__: physics.geometry.GeometricShape
}
physics.geometry.Circle = function(radius,offset) {
	physics.geometry.GeometricShape.call(this,1,offset);
	this.radius = radius;
	this.InitShape();
};
physics.geometry.Circle.__name__ = true;
physics.geometry.Circle.__super__ = physics.geometry.GeometricShape;
physics.geometry.Circle.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	IntersectSegment: function(a,b,feature) {
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
	,ContainsPoint: function(point,shapePosition) {
		var x = this.transformedCentre.x + shapePosition.x - point.x;
		var y = this.transformedCentre.y + shapePosition.y - point.y;
		return x * x + y * y <= this.radius * this.radius;
	}
	,Update: function(rotation) {
		this.transformedCentre.x = this.centre.x * rotation.x - this.centre.y * rotation.y;
		this.transformedCentre.y = this.centre.x * rotation.y + this.centre.y * rotation.x;
		this.aabb.l = this.transformedCentre.x - this.radius;
		this.aabb.r = this.transformedCentre.x + this.radius;
		this.aabb.t = this.transformedCentre.y - this.radius;
		this.aabb.b = this.transformedCentre.y + this.radius;
	}
	,InitShape: function() {
		this.centre = this.offset.clone();
		this.transformedCentre = this.centre.clone();
		this.area = Math.PI * (this.radius * this.radius);
	}
	,__class__: physics.geometry.Circle
});
physics.geometry.Polygon = function(vertices,offset) {
	physics.geometry.GeometricShape.call(this,4,offset);
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
}
physics.geometry.Polygon.__super__ = physics.geometry.GeometricShape;
physics.geometry.Polygon.prototype = $extend(physics.geometry.GeometricShape.prototype,{
	ValueOnAxis: function(a,axisPosition,shapePosition) {
		var min = 4294967296;
		var result;
		var _g = 0, _g1 = this.transformedVertices;
		while(_g < _g1.length) {
			var vertex = _g1[_g];
			++_g;
			result = a.n.x * (vertex.x + shapePosition.x) + a.n.y * (vertex.y + shapePosition.y) - (axisPosition.x * a.n.x + axisPosition.y * a.n.y + a.d);
			if(result < min) min = result;
		}
		return min;
	}
	,IntersectSegment: function(a,b,feature) {
		var ta;
		var _g1 = 0, _g = this.vertexCount;
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
	,IntersectRay: function(ray,feature) {
		var tfar = ray.range;
		var tnear = 0;
		var nnear = null;
		var nfar = null;
		var ta;
		var tv;
		var _g1 = 0, _g = this.vertexCount;
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
	,ContainsPoint: function(point,shapePosition) {
		var _g = 0, _g1 = this.transformedAxes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.n.x * point.x + a.n.y * point.y - (shapePosition.x * a.n.x + shapePosition.y * a.n.y + a.d) > 0) return false;
		}
		return true;
	}
	,Update: function(rotation) {
		var v;
		var tv;
		this.aabb.l = this.aabb.t = 4294967296;
		this.aabb.r = this.aabb.b = -4294967296;
		var _g1 = 0, _g = this.vertexCount;
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
		var _g1 = 0, _g = this.vertexCount;
		while(_g1 < _g) {
			var i = _g1++;
			a = this.axes[i];
			ta = this.transformedAxes[i];
			ta.n.x = a.n.x * rotation.x - a.n.y * rotation.y;
			ta.n.y = a.n.x * rotation.y + a.n.y * rotation.x;
			ta.d = a.d;
		}
	}
	,InitShape: function(originalVertices) {
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
		var _g1 = 0, _g = this.vertexCount;
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
	,__class__: physics.geometry.Polygon
});
physics.geometry.Ray = function() {
};
physics.geometry.Ray.__name__ = true;
physics.geometry.Ray.prototype = {
	IntersectBoundingCircle: function(position,radius) {
		var distX = this.origin.x - position.x;
		var distY = this.origin.y - position.y;
		var b = distX * this.direction.x + distY * this.direction.y;
		if(b > 0) return false;
		var d = radius * radius - (distX * distX + distY * distY - b * b);
		if(d < 0) return false;
		return true;
	}
	,ClosestIntersectPoint: function() {
		return new physics.geometry.Vector2D(this.origin.x + this.direction.x * this.closestIntersectDistance,this.origin.y + this.direction.y * this.closestIntersectDistance);
	}
	,LastIntersectPoint: function() {
		return new physics.geometry.Vector2D(this.origin.x + this.direction.x * this.lastIntersectDistance,this.origin.y + this.direction.y * this.lastIntersectDistance);
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
	,TestFeature: function(feature) {
		this.lastIntersectResult = false;
		return feature.shape.IntersectRay(this,feature);
	}
	,Seen2: function() {
		return this.lastIntersectDistance >= this.range;
	}
	,Seen: function() {
		return this.lastIntersectFeature == null || this.lastIntersectDistance >= this.range;
	}
	,SetParams: function(origin,target,range) {
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
		this.range = range == 0?m:range;
		this.rangeSqr = this.range * this.range;
	}
	,__class__: physics.geometry.Ray
}
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
	Update: function(rotation) {
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
	,InitShape: function() {
		this.delta = this.b.minus(this.a);
		this.n = this.delta.unit().rightHandNormal();
		this.tA = new physics.geometry.Vector2D();
		this.tB = new physics.geometry.Vector2D();
		this.tN = new physics.geometry.Vector2D();
		this.tNneg = new physics.geometry.Vector2D();
	}
	,__class__: physics.geometry.Segment
});
physics.geometry.Shapes = function() { }
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
}
physics.geometry.Vector2D.prototype = {
	toString: function() {
		return this.x + ":" + this.y;
	}
	,clone: function() {
		return new physics.geometry.Vector2D(this.x,this.y);
	}
	,equalsZero: function() {
		return this.x == 0 && this.y == 0;
	}
	,isEquals: function(v) {
		return this.x == v.x && this.y == v.y;
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
	,rotate: function(angle) {
		var a = angle * Math.PI / 180;
		var cos = Math.cos(a);
		var sin = Math.sin(a);
		return new physics.geometry.Vector2D(cos * this.x - sin * this.y,cos * this.y + sin * this.x);
	}
	,interpolate: function(v,t) {
		return this.mult(1 - t).plus(new physics.geometry.Vector2D(v.x * t,v.y * t));
	}
	,clampMax: function(max) {
		var l = Math.sqrt(this.x * this.x + this.y * this.y);
		if(l > max) this.multEquals(max / l);
		return this;
	}
	,distanceSqrd: function(v) {
		var dX = this.x - v.x;
		var dY = this.y - v.y;
		return dX * dX + dY * dY;
	}
	,distance: function(v) {
		var delta = new physics.geometry.Vector2D(v.x - this.x,v.y - this.y);
		return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
	}
	,rightHandNormalEquals: function() {
		var t = this.x;
		this.x = -this.y;
		this.y = this.x;
		return this;
	}
	,rightHandNormal: function() {
		return new physics.geometry.Vector2D(-this.y,this.x);
	}
	,leftHandNormalEquals: function() {
		var t = this.x;
		this.x = this.y;
		this.y = -t;
		return this;
	}
	,leftHandNormal: function() {
		return new physics.geometry.Vector2D(this.y,-this.x);
	}
	,unitEquals: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		this.x /= t;
		this.y /= t;
		return this;
	}
	,unit: function() {
		var t = Math.sqrt(this.x * this.x + this.y * this.y) + 1e-08;
		return new physics.geometry.Vector2D(this.x / t,this.y / t);
	}
	,lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	}
	,length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,divEquals: function(s) {
		if(s == 0) s = 0.0001;
		this.x /= s;
		this.y /= s;
		return this;
	}
	,div: function(s) {
		if(s == 0) s = 0.0001;
		return new physics.geometry.Vector2D(this.x / s,this.y / s);
	}
	,timesEquals2: function(x,y) {
		this.x *= x;
		this.y *= y;
		return this;
	}
	,timesEquals: function(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}
	,times2: function(x,y) {
		return new physics.geometry.Vector2D(this.x * x,this.y * y);
	}
	,times: function(v) {
		return new physics.geometry.Vector2D(this.x * v.x,this.y * v.y);
	}
	,multEquals: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	,mult: function(s) {
		return new physics.geometry.Vector2D(this.x * s,this.y * s);
	}
	,minusEquals2: function(x,y) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	,minusEquals: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	,minus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x - x,this.y - y);
	}
	,minus: function(v) {
		return new physics.geometry.Vector2D(this.x - v.x,this.y - v.y);
	}
	,plusEquals2: function(x,y) {
		this.x += x;
		this.y += y;
		return this;
	}
	,plusEquals: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	,plus2: function(x,y) {
		return new physics.geometry.Vector2D(this.x + x,this.y + y);
	}
	,plus: function(v) {
		return new physics.geometry.Vector2D(this.x + v.x,this.y + v.y);
	}
	,cross: function(v) {
		return this.x * v.y - this.y * v.x;
	}
	,dot: function(v) {
		return this.x * v.x + this.y * v.y;
	}
	,copy: function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	,setTo: function(x,y) {
		this.x = x;
		this.y = y;
		return this;
	}
	,__class__: physics.geometry.Vector2D
}
physics.geometry.VertexList = function() {
	this.vertices = new Array();
	this.transformedVertices = new Array();
};
physics.geometry.VertexList.__name__ = true;
physics.geometry.VertexList.prototype = {
	Update: function(rotation,flipVerticaly) {
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
	,RemoveVertex: function(v) {
		var _g1 = 0, _g = this.transformedVertices.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.transformedVertices[i] == v) {
				this.vertices.splice(i,1);
				this.transformedVertices.splice(i,1);
				return;
			}
		}
	}
	,AddVertex: function(v) {
		this.vertices.push(v);
		var tV = v.clone();
		this.transformedVertices.push(tV);
		return tV;
	}
	,__class__: physics.geometry.VertexList
}
var utils = {}
utils.Base64 = function() { }
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
	var i = 0, j = 0;
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
}
utils.EventTarget = function() {
	this.listeners = new haxe.ds.StringMap();
};
utils.EventTarget.__name__ = true;
utils.EventTarget.prototype = {
	removeEventListener: function(type,listener) {
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
	,addEventListener: function(type,listener) {
		if(!this.listeners.exists(type)) this.listeners.set(type,new Array());
		var listenerTypes = this.listeners.get(type);
		if(Lambda.indexOf(listenerTypes,listener) < 0) listenerTypes.push(listener);
	}
	,__class__: utils.EventTarget
}
utils.ImageLoader = function() {
	utils.EventTarget.call(this);
	this.assets = new Array();
};
utils.ImageLoader.__name__ = true;
utils.ImageLoader.__super__ = utils.EventTarget;
utils.ImageLoader.prototype = $extend(utils.EventTarget.prototype,{
	onLoad: function(event) {
		this.completeCount--;
		if(this.completeCount == 0) utils.EventTarget.prototype.dispatchEvent.call(this,{ type : "loaded", count : this.completeCount});
	}
	,SetImagesToLoad: function(urls) {
		this.completeCount = urls.length;
		var _g = 0;
		while(_g < urls.length) {
			var url = urls[_g];
			++_g;
			var image = new Image();
			this.assets.push(image);
			image.onload = $bind(this,this.onLoad);
			image.src = url;
			image.crossOrigin = "anonymous";
			if(image.complete == true) this.onLoad(null);
		}
	}
	,__class__: utils.ImageLoader
});
utils.Maths = function() { }
utils.Maths.__name__ = true;
utils.Maths.toRad = function(deg) {
	return deg * (3.141592653589793 / 180);
}
utils.Maths.toDeg = function(rad) {
	return rad * (180 / 3.141592653589793);
}
utils.Maths.Clamp = function(input,min,max) {
	if(input > max) return max; else if(input < min) return min; else return input;
}
utils.Maths.ScaleRectangleWithRatio = function(containerRect,itemRect) {
	var sX = containerRect.x / itemRect.x;
	var sY = containerRect.y / itemRect.y;
	var rD = containerRect.x / containerRect.y;
	var rR = itemRect.x / itemRect.y;
	return rD < rR?sX:sY;
}
var wgr = {}
wgr.display = {}
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
	applySlot: function(slot,p) {
		return slot(this,p);
	}
	,calcExtents: function() {
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
	,RoundFunction: function(v) {
		return Math.round(v * 10) / 10;
	}
	,set_visible: function(v) {
		this._visible = v;
		if(this.stage != null) this.stage.dirty = true;
		return this._visible;
	}
	,get_visible: function() {
		return this._visible;
	}
	,set_rotation: function(v) {
		this._rotation = v;
		this._rotationComponents.x = Math.cos(this._rotation);
		this._rotationComponents.y = Math.sin(this._rotation);
		return this._rotation;
	}
	,get_rotation: function() {
		return this._rotation;
	}
	,__class__: wgr.display.DisplayObject
}
wgr.display.DisplayObjectContainer = function() {
	wgr.display.DisplayObject.call(this);
	this.subTreeAABB = new wgr.geom.AABB();
	this.childCount = 0;
};
wgr.display.DisplayObjectContainer.__name__ = true;
wgr.display.DisplayObjectContainer.__super__ = wgr.display.DisplayObject;
wgr.display.DisplayObjectContainer.prototype = $extend(wgr.display.DisplayObject.prototype,{
	debug: function() {
		var child = this.head;
		while(child != null) {
			console.log(child.id);
			child = child.next;
		}
	}
	,remove: function(node) {
		if(node.prev == null) this.head = node.next; else node.prev.next = node.next;
		if(node.next == null) this.tail = node.prev; else node.next.prev = node.prev;
		node.prev = node.next = null;
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
	,insertBeginning: function(newNode) {
		if(this.head == null) {
			this.head = newNode;
			this.tail = newNode;
			newNode.prev = null;
			newNode.next = null;
		} else this.insertBefore(this.head,newNode);
	}
	,insertBefore: function(node,newNode) {
		newNode.prev = node.prev;
		newNode.next = node;
		if(node.prev == null) this.head = newNode; else node.prev.next = newNode;
		node.prev = newNode;
	}
	,insertAfter: function(node,newNode) {
		newNode.prev = node;
		newNode.next = node.next;
		if(node.next == null) this.tail = newNode; else node.next.prev = newNode;
		node.next = newNode;
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
	,apply: function(slot,p) {
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
	,childRemoved: function(child) {
		this.childCount--;
		if(this.stage != null) this.stage.dirty = true;
		child.parent = null;
		child.applySlot(function(target,p) {
			target.stage = null;
			return true;
		},null);
	}
	,removeChildAt: function(index) {
		var child = this.findChildByIndex(index);
		console.log(child);
		this.removeChild(child);
		this.debug();
		return child;
	}
	,removeChild: function(child) {
		if(child.parent == this) {
			if(child.prev == null) this.head = child.next; else child.prev.next = child.next;
			if(child.next == null) this.tail = child.prev; else child.next.prev = child.prev;
			child.prev = child.next = null;
			this.childRemoved(child);
		}
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
	,childAdded: function(child) {
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
			} else this.insertBefore(this.head,child);
		} else this.insertBefore(this.findChildByIndex(index),child);
		this.childAdded(child);
	}
	,addChild: function(child) {
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
	Resize: function(width,height) {
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
	,Focus: function(x,y) {
		this.realPosition.x = x;
		this.realPosition.y = y;
		this.cameraExtentsAABB.fitPoint(this.realPosition);
		this.position.x = -this.realPosition.x + this.halfViewportSize.x;
		this.position.y = -this.realPosition.y + this.halfViewportSize.y;
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
	next: function() {
		var thisNode = this.stack[--this.top];
		if(thisNode.next != null) this.stack[this.top++] = thisNode.next;
		if(thisNode.head != null) this.stack[this.top++] = thisNode.head;
		return thisNode;
	}
	,hasNext: function() {
		return this.top > 0;
	}
	,reset: function() {
		this.stack[0] = this.node;
		this.top = 1;
	}
	,__class__: wgr.display.DisplayListIter
}
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
wgr.display.Stage.__name__ = true;
wgr.display.Stage.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Stage.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	Traverse: function(node) {
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
	,Flatten: function() {
		console.log("Flatten");
		this.renderHead = null;
		this.renderTail = null;
		this.renderCount = 0;
	}
	,PreRender: function() {
		if(this.dirty == true) {
			this.Flatten();
			this.dirty = false;
		}
	}
	,updateTransform: function() {
		var child = this.head;
		while(child != null) {
			child.updateTransform();
			child = child.next;
		}
	}
	,__class__: wgr.display.Stage
});
wgr.geom = {}
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
	shrinkAroundCenter: function(deltaWidth,delatHeight) {
		this.l += deltaWidth / 2;
		this.r -= deltaWidth / 2;
		this.t += delatHeight / 2;
		this.b -= delatHeight / 2;
	}
	,fitPoint: function(point) {
		if(point.x < this.l) point.x = this.l;
		if(point.x > this.r) point.x = this.r;
		if(point.y < this.t) point.y = this.t;
		if(point.y > this.b) point.y = this.b;
	}
	,addPoint: function(x,y) {
		if(y < this.t) this.t = y;
		if(x > this.r) this.r = x;
		if(y > this.b) this.b = y;
		if(x < this.l) this.l = x;
	}
	,addAABB: function(aabb) {
		if(aabb.t < this.t) this.t = aabb.t;
		if(aabb.r > this.r) this.r = aabb.r;
		if(aabb.b > this.b) this.b = aabb.b;
		if(aabb.l < this.l) this.l = aabb.l;
	}
	,intersect: function(aabb) {
		if(this.l > aabb.r) return false; else if(this.r < aabb.l) return false; else if(this.t > aabb.b) return false; else if(this.b < aabb.t) return false; else return true;
	}
	,get_height: function() {
		return this.b - this.t;
	}
	,get_width: function() {
		return this.r - this.l;
	}
	,reset: function() {
		this.t = this.l = Math.POSITIVE_INFINITY;
		this.r = this.b = Math.NEGATIVE_INFINITY;
	}
	,clone: function() {
		return new wgr.geom.AABB(this.t,this.r,this.b,this.l);
	}
	,__class__: wgr.geom.AABB
}
wgr.geom.Matrix3 = function() { }
wgr.geom.Matrix3.__name__ = true;
wgr.geom.Matrix3.Create = function() {
	return wgr.geom.Matrix3.Identity(new Float32Array(9));
}
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
}
wgr.geom.Matrix3.Multiply = function(mat,mat2,dest) {
	if(dest != null) dest = mat;
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a12 = mat[5], a20 = mat[6], a21 = mat[7], a22 = mat[8], b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b10 = mat2[3], b11 = mat2[4], b12 = mat2[5], b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];
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
}
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
}
wgr.geom.Matrix3.Transpose = function(mat,dest) {
	if(dest != null || mat == dest) {
		var a01 = mat[1], a02 = mat[2], a12 = mat[5];
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
}
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
}
wgr.geom.Matrix4 = function() { }
wgr.geom.Matrix4.__name__ = true;
wgr.geom.Matrix4.Create = function() {
	return wgr.geom.Matrix4.Identity(new Float32Array(16));
}
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
}
wgr.geom.Matrix4.Transpose = function(mat,dest) {
	if(dest != null || mat == dest) {
		var a01 = mat[1], a02 = mat[2], a03 = mat[3], a12 = mat[6], a13 = mat[7], a23 = mat[11];
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
}
wgr.geom.Matrix4.Multiply = function(mat,mat2,dest) {
	if(dest != null) dest = mat;
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	var b0 = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
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
}
wgr.geom.Point = function(x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
};
wgr.geom.Point.__name__ = true;
wgr.geom.Point.prototype = {
	__class__: wgr.geom.Point
}
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
}
wgr.particle = {}
wgr.particle.PointSpriteParticle = function() {
};
wgr.particle.PointSpriteParticle.__name__ = true;
wgr.particle.PointSpriteParticle.prototype = {
	Update: function(deltaTime,invDeltaTime) {
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
	,Initalize: function(x,y,vX,vY,fX,fY,ttl,damping,decay,top,externalForce,type,data1,data2) {
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
		this.alpha = (this.colour & 255) * (1 / 255);
	}
	,__class__: wgr.particle.PointSpriteParticle
}
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
wgr.particle.PointSpriteParticleEngine.prototype = {
	Update: function() {
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
	,EmitParticle: function(x,y,vX,vY,fX,fY,ttl,damping,decayable,top,externalForce,type,data1,data2) {
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
		particle.decay = decayable?this.deltaTime / ttl:0;
		particle.externalForce = externalForce != null?externalForce:this.ZERO_FORCE;
		particle.type = type;
		particle.size = data1;
		particle.colour = data2;
		particle.alpha = (particle.colour & 255) * (1 / 255);
		return true;
	}
	,__class__: wgr.particle.PointSpriteParticleEngine
}
wgr.renderers = {}
wgr.renderers.canvas = {}
wgr.renderers.canvas.CanvasDebugView = function(view,width,height) {
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.view = view;
	this.ctx = view.getContext("2d");
	this.Resize(width,height);
};
wgr.renderers.canvas.CanvasDebugView.__name__ = true;
wgr.renderers.canvas.CanvasDebugView.prototype = {
	DrawAABB: function(aabb) {
		this.ctx.strokeRect(aabb.l,aabb.t,aabb.r - aabb.l,aabb.b - aabb.t);
	}
	,DrawRect: function(x,y,w,h) {
		this.ctx.strokeRect(x,y,w,h);
	}
	,Clear: function(camera) {
		this.ctx.setTransform(1,0,0,1,0,0);
		this.ctx.clearRect(0,0,this.width,this.height);
		this.ctx.strokeStyle = "rgba(255,255,255,1)";
	}
	,Resize: function(width,height) {
		this.width = width;
		this.height = height;
		this.view.width = width;
		this.view.height = height;
	}
	,__class__: wgr.renderers.canvas.CanvasDebugView
}
wgr.renderers.webgl = {}
wgr.renderers.webgl.IRenderer = function() { }
wgr.renderers.webgl.IRenderer.__name__ = true;
wgr.renderers.webgl.IRenderer.prototype = {
	__class__: wgr.renderers.webgl.IRenderer
}
wgr.renderers.webgl.PointSpriteRenderer = function() {
};
wgr.renderers.webgl.PointSpriteRenderer.__name__ = true;
wgr.renderers.webgl.PointSpriteRenderer.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.PointSpriteRenderer.prototype = {
	Render: function(clip) {
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
	,ResetBatch: function() {
		this.indexRun = 0;
	}
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,SetSpriteSheet: function(texture,spriteSize,spritesWide,spritesHigh) {
		this.texture = texture;
		this.tileSize = spriteSize;
		this.texTilesWide = spritesWide;
		this.texTilesHigh = spritesHigh;
		this.invTexTilesWide = 1 / this.texTilesWide;
		this.invTexTilesHigh = 1 / this.texTilesHigh;
	}
	,ResizeBatch: function(size) {
		this.arrayBuffer = new ArrayBuffer(80 * size);
		this.data = new Float32Array(this.arrayBuffer);
		this.data8 = new Uint8ClampedArray(this.arrayBuffer);
		this.ResetBatch();
	}
	,Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.projection = new wgr.geom.Point();
		this.pointSpriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.PointSpriteRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.PointSpriteRenderer.SPRITE_FRAGMENT_SHADER));
		this.dataBuffer = gl.createBuffer();
	}
	,__class__: wgr.renderers.webgl.PointSpriteRenderer
}
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
}
wgr.renderers.webgl.SpriteRenderer = function() {
};
wgr.renderers.webgl.SpriteRenderer.__name__ = true;
wgr.renderers.webgl.SpriteRenderer.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.SpriteRenderer.prototype = {
	Render: function(clip) {
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
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,Init: function(gl,camera) {
		this.gl = gl;
		this.camera = camera;
		this.projection = new wgr.geom.Point();
		this.spriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER));
		this.spriteBatch = new wgr.renderers.webgl.WebGLBatch(gl);
		this.spriteBatch.ResizeBatch(1000);
	}
	,__class__: wgr.renderers.webgl.SpriteRenderer
}
wgr.renderers.webgl.TileLayer = function() {
	this.scrollScale = new wgr.geom.Point(1,1);
	this.inverseTextureSize = new Float32Array(2);
};
wgr.renderers.webgl.TileLayer.__name__ = true;
wgr.renderers.webgl.TileLayer.prototype = {
	setTexture: function(gl,image,repeat) {
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
	,setTextureFromMap: function(gl,data) {
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
	,__class__: wgr.renderers.webgl.TileLayer
}
wgr.renderers.webgl.TileMap = function() {
};
wgr.renderers.webgl.TileMap.__name__ = true;
wgr.renderers.webgl.TileMap.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.renderers.webgl.TileMap.prototype = {
	Render: function(clip) {
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
	,RoundFunction: function(v) {
		return v;
		return Math.round(v * 10) / 10;
	}
	,SetTileLayerFromData: function(data,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.renderers.webgl.TileLayer();
		layer.setTextureFromMap(this.gl,data);
		layer.scrollScale.x = scrollScaleX;
		layer.scrollScale.y = scrollScaleY;
		this.layers.push(layer);
	}
	,SetTileLayer: function(image,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.renderers.webgl.TileLayer();
		layer.setTexture(this.gl,image,false);
		layer.scrollScale.x = scrollScaleX;
		layer.scrollScale.y = scrollScaleY;
		this.layers.push(layer);
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
	,TileScale: function(scale) {
		this.tileScale = scale;
		this.scaledViewportSize[0] = this.viewportSize.x / scale;
		this.scaledViewportSize[1] = this.viewportSize.y / scale;
	}
	,Resize: function(width,height) {
		this.viewportSize.x = width;
		this.viewportSize.y = height;
		this.scaledViewportSize[0] = width / this.tileScale;
		this.scaledViewportSize[1] = height / this.tileScale;
	}
	,Init: function(gl,camera) {
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
	,__class__: wgr.renderers.webgl.TileMap
}
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
	Render1: function(shader,spriteHead,clip) {
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
	,ResizeBatch: function(size) {
		this.size = size;
		this.dynamicSize = size;
		this.data = new Float32Array(this.dynamicSize * 20);
		this.gl.bindBuffer(34962,this.dataBuffer);
		this.gl.bufferData(34962,this.data,35048);
		this.indices = new Uint16Array(this.dynamicSize * 6);
		var _g1 = 0, _g = this.dynamicSize;
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
	,Clean: function() {
	}
	,__class__: wgr.renderers.webgl.WebGLBatch
}
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
	onContextRestored: function(event) {
		this.contextLost = false;
		console.log("webGL Context Restored");
	}
	,onContextLost: function(event) {
		this.contextLost = true;
		console.log("webGL Context Lost");
	}
	,Render: function(clip) {
		if(this.contextLost) return;
		this.stage.updateTransform();
		this.stage.PreRender();
		var _g = 0, _g1 = this.renderers;
		while(_g < _g1.length) {
			var renderer = _g1[_g];
			++_g;
			renderer.Render(clip);
		}
	}
	,AddRenderer: function(renderer) {
		renderer.Init(this.gl,this.camera);
		renderer.Resize(this.width,this.height);
		this.renderers.push(renderer);
	}
	,Resize: function(width,height) {
		this.width = width;
		this.height = height;
		this.view.width = width;
		this.view.height = height;
		this.gl.viewport(0,0,width,height);
	}
	,InitalizeWebGlContext: function() {
		this.view.addEventListener("webglcontextlost",$bind(this,this.onContextLost),false);
		this.view.addEventListener("webglcontextrestored",$bind(this,this.onContextRestored),false);
		this.gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(this.view,this.contextAttributes);
		this.gl.disable(2929);
		this.gl.disable(2884);
		this.gl.enable(3042);
		this.gl.colorMask(true,true,true,this.contextAttributes.alpha);
		this.gl.clearColor(0,0,0,1);
	}
	,__class__: wgr.renderers.webgl.WebGLRenderer
}
wgr.renderers.webgl.WebGLShaders = function() { }
wgr.renderers.webgl.WebGLShaders.__name__ = true;
wgr.renderers.webgl.WebGLShaders.CompileVertexShader = function(gl,shaderSrc) {
	return wgr.renderers.webgl.WebGLShaders.CompileShader(gl,shaderSrc,35633);
}
wgr.renderers.webgl.WebGLShaders.CompileFragmentShader = function(gl,shaderSrc) {
	return wgr.renderers.webgl.WebGLShaders.CompileShader(gl,shaderSrc,35632);
}
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
}
wgr.renderers.webgl.WebGLShaders.CompileProgram = function(gl,vertexSrc,fragmentSrc) {
	var vertexShader = wgr.renderers.webgl.WebGLShaders.CompileVertexShader(gl,vertexSrc);
	var fragmentShader = wgr.renderers.webgl.WebGLShaders.CompileFragmentShader(gl,fragmentSrc);
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);
	if(!gl.getProgramParameter(shaderProgram,35714)) js.Lib.alert("Could not initialize shaders");
	return shaderProgram;
}
wgr.texture = {}
wgr.texture.BaseTexture = function(source) {
	this.source = source;
	this.powerOfTwo = false;
	this.width = source.width;
	this.height = source.width;
};
wgr.texture.BaseTexture.__name__ = true;
wgr.texture.BaseTexture.prototype = {
	UnregisterTexture: function(gl) {
		if(this.texture != null) {
		}
	}
	,RegisterTexture: function(gl) {
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
	,__class__: wgr.texture.BaseTexture
}
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
}
wgr.texture.TextureManager = function(gl) {
	this.gl = gl;
	this.baseTextures = new haxe.ds.StringMap();
};
wgr.texture.TextureManager.__name__ = true;
wgr.texture.TextureManager.prototype = {
	AddTexture: function(id,image) {
		var baseTexture = new wgr.texture.BaseTexture(image);
		baseTexture.RegisterTexture(this.gl);
		this.baseTextures.set(id,baseTexture);
		return baseTexture;
	}
	,__class__: wgr.texture.TextureManager
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
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
ds.IDManager.NEXT_PERSISTENT_ID = 0;
ds.IDManager.TRANSIENT_START_ID = 10000;
ds.IDManager.TRANSIENT_CACHE_LENGTH = 10000;
ds.IDManager.TRANSIENT_CACHE = (function($this) {
	var $r;
	var cache = new Array();
	{
		var _g1 = 0, _g = ds.IDManager.TRANSIENT_CACHE_LENGTH;
		while(_g1 < _g) {
			var i = _g1++;
			cache.push(ds.IDManager.TRANSIENT_START_ID + i);
		}
	}
	$r = cache;
	return $r;
}(this));
ds.IDManager.TRANSIENT_POINTER = 0;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
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
physics.geometry.Shapes.POLYGON_POLYGON = 4;
physics.geometry.Shapes.CIRCLE_POLYGON = 5;
physics.geometry.Shapes.CIRCLE_CIRCLE = 1;
physics.geometry.Shapes.CIRCLE_SEGMENT = 3;
physics.geometry.Shapes.SEGMENT_POLYGON = 6;
utils.Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
utils.Maths.ZERO_TOLERANCE = 1e-08;
utils.Maths.RAD_DEG = 180 / 3.141592653589793;
utils.Maths.DEG_RAD = 3.141592653589793 / 180;
utils.Maths.LN2 = 0.6931471805599453;
utils.Maths.LN10 = 2.302585092994046;
utils.Maths.PIHALF = 1.5707963267948966;
utils.Maths.PI = 3.141592653589793;
utils.Maths.PI2 = 6.283185307179586;
utils.Maths.EPS = 1e-6;
utils.Maths.SQRT2 = 1.414213562373095;
wgr.particle.PointSpriteParticle.INV_ALPHA = 1 / 255;
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_VERTEX_SHADER = ["uniform float texTilesWide;","uniform float texTilesHigh;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 projectionVector;","uniform vec2 flip;","attribute vec2 position;","attribute float size;","attribute float tileType;","attribute vec4 colour;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","float t = floor(tileType/texTilesWide);","vTilePos = vec2(tileType-(t*texTilesWide), t);","gl_PointSize = size;","vColor = colour;","gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
wgr.renderers.webgl.PointSpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","uniform sampler2D texture;","uniform float invTexTilesWide;","uniform float invTexTilesHigh;","uniform vec2 flip;","varying vec2 vTilePos;","varying vec4 vColor;","void main() {","vec2 uv = vec2( ((-1.0+(2.0*flip.x))*(flip.x-gl_PointCoord.x))*invTexTilesWide + invTexTilesWide*vTilePos.x, ((-1.0+(2.0*flip.y))*(flip.y-gl_PointCoord.y))*invTexTilesHigh + invTexTilesHigh*vTilePos.y);","gl_FragColor = texture2D( texture, uv ) * vColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * vColor;","}"];
wgr.renderers.webgl.TileMap.TILEMAP_VERTEX_SHADER = ["attribute vec2 position;","attribute vec2 texture;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform vec2 viewOffset;","uniform vec2 viewportSize;","uniform vec2 inverseTileTextureSize;","uniform float inverseTileSize;","void main(void) {","   pixelCoord = (texture * viewportSize) + viewOffset;","   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;","   gl_Position = vec4(position, 0.0, 1.0);","}"];
wgr.renderers.webgl.TileMap.TILEMAP_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform sampler2D tiles;","uniform sampler2D sprites;","uniform vec2 inverseTileTextureSize;","uniform vec2 inverseSpriteTextureSize;","uniform float tileSize;","void main(void) {","   vec4 tile = texture2D(tiles, texCoord);","   if(tile.x == 1.0 && tile.y == 1.0) { discard; }","   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;","   vec2 spriteCoord = mod(pixelCoord, tileSize);","   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);","}"];
Main.main();
})();

//@ sourceMappingURL=script.js.map