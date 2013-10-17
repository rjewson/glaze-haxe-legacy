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
	var assets = new utils.ImageLoader();
	assets.addEventListener("loaded",function(event) {
		var map = new engine.map.Map(42,34,utils.Base64.Decode(dd));
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
		var renderer = new wgr.renderers.webgl.WebGLRenderer(stage,canvasView,800,600);
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
		var pengine = new wgr.particle.ParticleEngine(2000,60);
		camera.addChild(pengine.canvas);
		var spr1 = createSprite("spr1",128,128,128,128,texture1up);
		spr1.alpha = 1;
		itemContainer.addChild(spr1);
		var spr2 = createSprite("spr2",228,228,128,128,texture1up);
		itemContainer.addChild(spr2);
		var spr21 = createSprite("spr21",328,328,128,128,texture1up);
		spr21.alpha = 0.9;
		spr2.addChild(spr21);
		var spr3 = createSprite("character",400,380,0,0,texturechar1);
		spr3.scale.x = -1;
		itemContainer.addChild(spr3);
		var sprArray = new Array();
		var xpos = 0, ypos = 0;
		var _g = 0;
		while(_g < 10000) {
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
		var tileMap = new wgr.tilemap.TileMap(renderer.gl);
		tileMap.SetSpriteSheet(assets.assets[1]);
		tileMap.SetTileLayerFromData(mapData,"base",1,1);
		tileMap.SetTileLayer(assets.assets[3],"bg",0.6,0.6);
		tileMap.tileSize = 16;
		tileMap.TileScale(2);
		tileMap.SetCamera(camera);
		renderer.AddRenderer(tileMap);
		var spriteRender = new wgr.renderers.webgl.SpriteRenderer();
		spriteRender.AddStage(stage);
		renderer.AddRenderer(spriteRender);
		var startTime = new Date().getTime();
		var stop = false;
		var debugSwitch = false;
		var tick = (function($this) {
			var $r;
			var tick1 = null;
			tick1 = function() {
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
				var elapsed = new Date().getTime() - startTime;
				var xp = (Math.sin(elapsed / 2000) * 0.5 + 0.5) * 528;
				var yp = (Math.sin(elapsed / 5000) * 0.5 + 0.5) * 570;
				xp = yp = 0;
				camera.Focus(xp,yp);
				renderer.Render(camera.viewPortAABB);
				if(debugSwitch) {
					debug.Clear(camera);
					debug.DrawAABB(spr1.subTreeAABB);
					debug.DrawAABB(spr2.subTreeAABB);
				}
				if(!stop) js.Browser.window.requestAnimationFrame(tick1);
			};
			$r = tick1;
			return $r;
		}(this));
		js.Browser.document.getElementById("stopbutton").addEventListener("click",function(event1) {
			stop = true;
		});
		js.Browser.document.getElementById("startbutton").addEventListener("click",function(event1) {
			if(stop == true) {
				stop = false;
				tick();
			}
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
		tick();
	});
	assets.SetImagesToLoad(["1up.png","data/spelunky-tiles.png","data/spelunky0.png","data/spelunky1.png","characters.png"]);
}
var IMap = function() { }
IMap.__name__ = true;
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
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
var engine = {}
engine.map = {}
engine.map.Map = function(w,h,data) {
	this.mapData = new ds.Array2D(w,h,data);
	this.tiles = new haxe.ds.IntMap();
};
engine.map.Map.__name__ = true;
engine.map.Map.prototype = {
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
	,__class__: engine.map.Map
}
var haxe = {}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	get: function(key) {
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
		this.position.x = Math.ceil(this.position.x);
		this.position.y = Math.ceil(this.position.y);
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
		var a02 = this.position.x - this.localTransform[0] * px - py * this.localTransform[1];
		var a10 = this.localTransform[3];
		var a11 = this.localTransform[4];
		var a12 = this.position.y - this.localTransform[4] * py - px * this.localTransform[3];
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
wgr.particle.Particle = function() {
	wgr.display.Sprite.call(this);
};
wgr.particle.Particle.__name__ = true;
wgr.particle.Particle.__super__ = wgr.display.Sprite;
wgr.particle.Particle.prototype = $extend(wgr.display.Sprite.prototype,{
	Update: function(deltaTime,invDeltaTime) {
		this.vX += this.fX + this.externalForce.x;
		this.vY += this.fY + this.externalForce.y;
		this.vX *= this.damping;
		this.vY *= this.damping;
		this.position.x += this.vX * invDeltaTime;
		this.position.y += this.vY * invDeltaTime;
		this.age -= deltaTime;
		this.alpha -= this.decay;
		return this.age > 0;
	}
	,Initalize: function(x,y,vX,vY,fX,fY,ttl,damping,decay,top,externalForce,type,data1,data2) {
		this.position.x = x;
		this.position.y = y;
		this.vX = vX;
		this.vY = vY;
		this.fX = fX;
		this.fY = fY;
		this.ttl = ttl;
		this.age = ttl;
		this.damping = damping;
		this.decay = decay;
		this.externalForce = externalForce != null?externalForce:wgr.particle.Particle.ZERO_FORCE;
		this.alpha = 1;
	}
	,__class__: wgr.particle.Particle
});
wgr.particle.ParticleEngine = function(particleCount,deltaTime) {
	this.particleCount = particleCount;
	this.deltaTime = deltaTime;
	this.invDeltaTime = deltaTime / 1000;
	this.canvas = new wgr.display.DisplayObjectContainer();
	this.canvas.id = "ParticleEngine";
	var _g = 0;
	while(_g < particleCount) {
		var i = _g++;
		var p = new wgr.particle.Particle();
		p.next = this.cachedParticles;
		this.cachedParticles = p;
	}
};
wgr.particle.ParticleEngine.__name__ = true;
wgr.particle.ParticleEngine.prototype = {
	Update: function() {
		var particle = this.activeParticles;
		while(particle != null) if(!(js.Boot.__cast(particle , wgr.particle.Particle)).Update(this.deltaTime,this.invDeltaTime)) {
			var next = particle.nextSprite;
			if(particle.prevSprite == null) this.activeParticles = particle.nextSprite; else particle.prevSprite.nextSprite = particle.nextSprite;
			if(particle.nextSprite != null) particle.nextSprite.prevSprite = particle.prevSprite;
			particle.nextSprite = this.cachedParticles;
			this.cachedParticles = particle;
			this.canvas.removeChild(particle);
			particle = next;
		} else particle = particle.nextSprite;
	}
	,EmitParticle: function(x,y,vX,vY,fX,fY,ttl,damping,decayable,top,externalForce,type,data1,data2) {
		if(this.cachedParticles == null) return false;
		var particle = this.cachedParticles;
		this.cachedParticles = this.cachedParticles.nextSprite;
		if(this.activeParticles == null) {
			this.activeParticles = particle;
			particle.nextSprite = particle.prevSprite = null;
		} else {
			particle.nextSprite = this.activeParticles;
			particle.prevSprite = null;
			this.activeParticles.prevSprite = particle;
			this.activeParticles = particle;
		}
		(js.Boot.__cast(particle , wgr.particle.Particle)).Initalize(x,y,vX,vY,fX,fY,ttl,damping,decayable?this.deltaTime / ttl:0,top,externalForce,type,data1,data2);
		this.canvas.addChild(particle);
		return true;
	}
	,__class__: wgr.particle.ParticleEngine
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
		this.gl.uniform2f(this.spriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.spriteBatch.Render(this.spriteShader,this.stage,clip);
	}
	,AddStage: function(stage) {
		this.stage = stage;
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,Init: function(gl) {
		this.gl = gl;
		this.projection = new wgr.geom.Point();
		this.spriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER));
		this.spriteBatch = new wgr.renderers.webgl.WebGLBatch(gl);
		this.spriteBatch.GrowBatch(1000);
	}
	,__class__: wgr.renderers.webgl.SpriteRenderer
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
	,Render: function(shader,stage,clip) {
		var _g = this;
		this.gl.useProgram(shader.program);
		var indexRun = 0;
		var currentTexture = null;
		var renderDisplayObject = function(target,p) {
			if(!target._visible) return false;
			var sprite = target;
			if(sprite.texture == null) return true;
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
	,GrowBatch: function(size) {
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
wgr.renderers.webgl.WebGLRenderer = function(stage,view,width,height,transparent,antialias) {
	if(antialias == null) antialias = true;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	this.stage = stage;
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
		renderer.Init(this.gl);
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
wgr.tilemap = {}
wgr.tilemap.TileLayer = function() {
	this.scrollScale = new wgr.geom.Point(1,1);
	this.inverseTextureSize = new Float32Array(2);
};
wgr.tilemap.TileLayer.__name__ = true;
wgr.tilemap.TileLayer.prototype = {
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
	,__class__: wgr.tilemap.TileLayer
}
wgr.tilemap.TileMap = function(gl) {
	this.gl = gl;
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
	this.tilemapShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.tilemap.TileMap.TILEMAP_VERTEX_SHADER,wgr.tilemap.TileMap.TILEMAP_FRAGMENT_SHADER));
};
wgr.tilemap.TileMap.__name__ = true;
wgr.tilemap.TileMap.__interfaces__ = [wgr.renderers.webgl.IRenderer];
wgr.tilemap.TileMap.prototype = {
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
		return Math.round(v * 10) / 10;
	}
	,SetCamera: function(camera) {
		this.camera = camera;
	}
	,SetTileLayerFromData: function(data,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.tilemap.TileLayer();
		layer.setTextureFromMap(this.gl,data);
		layer.scrollScale.x = scrollScaleX;
		layer.scrollScale.y = scrollScaleY;
		this.layers.push(layer);
	}
	,SetTileLayer: function(image,layerId,scrollScaleX,scrollScaleY) {
		var layer = new wgr.tilemap.TileLayer();
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
	,Init: function(gl) {
	}
	,__class__: wgr.tilemap.TileMap
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
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
utils.Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
wgr.particle.Particle.ZERO_FORCE = new wgr.geom.Point();
wgr.renderers.webgl.SpriteRenderer.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * vColor;","}"];
wgr.renderers.webgl.SpriteRenderer.SPRITE_VERTEX_SHADER = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"];
wgr.tilemap.TileMap.TILEMAP_VERTEX_SHADER = ["attribute vec2 position;","attribute vec2 texture;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform vec2 viewOffset;","uniform vec2 viewportSize;","uniform vec2 inverseTileTextureSize;","uniform float inverseTileSize;","void main(void) {","   pixelCoord = (texture * viewportSize) + viewOffset;","   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;","   gl_Position = vec4(position, 0.0, 1.0);","}"];
wgr.tilemap.TileMap.TILEMAP_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform sampler2D tiles;","uniform sampler2D sprites;","uniform vec2 inverseTileTextureSize;","uniform vec2 inverseSpriteTextureSize;","uniform float tileSize;","void main(void) {","   vec4 tile = texture2D(tiles, texCoord);","   if(tile.x == 1.0 && tile.y == 1.0) { discard; }","   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;","   vec2 spriteCoord = mod(pixelCoord, tileSize);","   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);","}"];
Main.main();
})();

//@ sourceMappingURL=script.js.map