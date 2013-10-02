(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
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
}
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
	var assets = new utils.ImageLoader();
	assets.addEventListener("loaded",function(event) {
		var stage = new wgr.display.Stage();
		var camera = new wgr.display.Camera();
		stage.addChild(camera);
		var canvasView = js.Boot.__cast(js.Browser.document.getElementById("view") , HTMLCanvasElement);
		var renderer = new wgr.renderers.webgl.WebGLRenderer(stage,canvasView);
		var tm = new wgr.texture.TextureManager(renderer.gl);
		var basetexture1up = tm.AddTexture("mushroom",assets.assets[0]);
		var texture1up = new wgr.texture.Texture(basetexture1up,new wgr.geom.Rectangle(0,0,256,256));
		camera.Resize(renderer.width,renderer.height);
		var spr1 = new wgr.display.Sprite();
		spr1.id = "spr1";
		spr1.texture = texture1up;
		spr1.position.x = 128;
		spr1.position.y = 128;
		spr1.pivot.x = 128;
		spr1.pivot.y = 128;
		camera.addChild(spr1);
		var spr2 = new wgr.display.Sprite();
		spr2.id = "spr2";
		spr2.texture = texture1up;
		spr2.position.x = 228;
		spr2.position.y = 228;
		spr2.pivot.x = 128;
		spr2.pivot.y = 128;
		camera.addChild(spr2);
		var spr21 = new wgr.display.Sprite();
		spr21.id = "spr21";
		spr21.texture = texture1up;
		spr21.position.x = 328;
		spr21.position.y = 328;
		spr21.pivot.x = 128;
		spr21.pivot.y = 128;
		spr2.addChild(spr21);
		stage.Flatten();
		var tileMap = new wgr.tilemap.TileMap(renderer.gl);
		tileMap.SetSpriteSheet(assets.assets[1]);
		tileMap.SetTileLayer(assets.assets[2],"base",1,1);
		tileMap.tileSize = 16;
		tileMap.TileScale(2);
		tileMap.SetCamera(camera);
		renderer.AddRenderer(tileMap);
		var spriteRender = new wgr.renderers.webgl.SpriteRenderer();
		renderer.AddRenderer(spriteRender);
		spriteRender.spriteBatch.spriteHead = stage.head;
		var startTime = new Date().getTime();
		var tick = (function($this) {
			var $r;
			var tick1 = null;
			tick1 = function() {
				spr1.rotation += 0.01;
				var elapsed = new Date().getTime() - startTime;
				var xp = (Math.sin(elapsed / 2000) * 0.5 + 0.5) * 328;
				var yp = (Math.sin(elapsed / 5000) * 0.5 + 0.5) * 370;
				camera.Focus(xp,yp);
				renderer.Render();
				js.Browser.window.requestAnimationFrame(tick1);
			};
			$r = tick1;
			return $r;
		}(this));
		tick();
	});
	assets.SetImagesToLoad(["1up.png","spelunky-tiles.png","spelunky0.png"]);
}
var IMap = function() { }
IMap.__name__ = true;
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var haxe = {}
haxe.ds = {}
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
	this.rotation = 0;
	this.alpha = 1;
	this.visible = true;
	this.renderable = true;
	this.parent = null;
	this.worldTransform = wgr.geom.Matrix3.Create();
	this.localTransform = wgr.geom.Matrix3.Create();
};
wgr.display.DisplayObject.__name__ = true;
wgr.display.DisplayObject.prototype = {
	updateTransform: function() {
		this.position.x = Math.floor(this.position.x);
		this.position.y = Math.floor(this.position.y);
		var sinR = Math.sin(this.rotation);
		var cosR = Math.cos(this.rotation);
		this.localTransform[0] = cosR * this.scale.x;
		this.localTransform[1] = -sinR * this.scale.y;
		this.localTransform[3] = sinR * this.scale.x;
		this.localTransform[4] = cosR * this.scale.y;
		var px = this.pivot.x;
		var py = this.pivot.y;
		var parentTransform = this.parent.worldTransform;
		var a00 = this.localTransform[0], a01 = this.localTransform[1], a02 = this.position.x - this.localTransform[0] * px - py * this.localTransform[1], a10 = this.localTransform[3], a11 = this.localTransform[4], a12 = this.position.y - this.localTransform[4] * py - px * this.localTransform[3], b00 = parentTransform[0], b01 = parentTransform[1], b02 = parentTransform[2], b10 = parentTransform[3], b11 = parentTransform[4], b12 = parentTransform[5];
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
	,__class__: wgr.display.DisplayObject
}
wgr.display.DisplayObjectContainer = function() {
	wgr.display.DisplayObject.call(this);
	this.children = new Array();
};
wgr.display.DisplayObjectContainer.__name__ = true;
wgr.display.DisplayObjectContainer.__super__ = wgr.display.DisplayObject;
wgr.display.DisplayObjectContainer.prototype = $extend(wgr.display.DisplayObject.prototype,{
	updateTransform: function() {
		wgr.display.DisplayObject.prototype.updateTransform.call(this);
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.updateTransform();
		}
	}
	,removeChild: function(child) {
		var index = Lambda.indexOf(this.children,child);
		if(index > 0) HxOverrides.remove(this.children,child);
		child.parent = null;
	}
	,addChild: function(child) {
		if(child.parent != null) child.parent.removeChild(child);
		this.children.push(child);
		child.parent = this;
	}
	,__class__: wgr.display.DisplayObjectContainer
});
wgr.display.Camera = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.id = "Camera";
	this.viewportSize = new wgr.geom.Point();
	this.halfViewportSize = new wgr.geom.Point();
};
wgr.display.Camera.__name__ = true;
wgr.display.Camera.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Camera.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	Resize: function(width,height) {
		this.viewportSize.x = width;
		this.viewportSize.y = height;
		this.halfViewportSize.x = width / 2;
		this.halfViewportSize.y = height / 2;
	}
	,Focus: function(x,y) {
		this.position.x = -x + this.halfViewportSize.x;
		this.position.y = -y + this.halfViewportSize.y;
	}
	,__class__: wgr.display.Camera
});
wgr.display.Sprite = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.anchor = new wgr.geom.Point();
};
wgr.display.Sprite.__name__ = true;
wgr.display.Sprite.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Sprite.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	__class__: wgr.display.Sprite
});
wgr.display.Stage = function() {
	wgr.display.DisplayObjectContainer.call(this);
	this.id = "Stage";
};
wgr.display.Stage.__name__ = true;
wgr.display.Stage.__super__ = wgr.display.DisplayObjectContainer;
wgr.display.Stage.prototype = $extend(wgr.display.DisplayObjectContainer.prototype,{
	Traverse: function(node) {
		console.log(node.id);
		if(js.Boot.__instanceof(node,wgr.display.Sprite)) {
			this.count++;
			if(this.head == null) {
				this.head = node;
				this.head.prev = this.head.next = null;
			} else {
				var sprite = node;
				if(this.tail == null) {
					this.tail = sprite;
					this.head.next = this.tail;
					this.tail.prev = this.head;
				} else {
					this.tail.next = sprite;
					sprite.prev = this.tail;
					this.tail = sprite;
				}
			}
		}
		if(js.Boot.__instanceof(node,wgr.display.DisplayObjectContainer)) {
			var doc = node;
			var _g = 0, _g1 = doc.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				this.Traverse(child);
			}
		}
	}
	,Flatten: function() {
		this.head = null;
		this.tail = null;
		this.count = 0;
		this.Traverse(this);
		var sprite = this.head;
		while(sprite != null) sprite = sprite.next;
		console.log("Total Sprites:" + this.count);
	}
	,updateTransform: function() {
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.updateTransform();
		}
	}
	,__class__: wgr.display.Stage
});
wgr.geom = {}
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
wgr.renderers = {}
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
	Render: function(x,y) {
		this.gl.useProgram(this.spriteShader.program);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aVertexPosition);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aTextureCoord);
		this.gl.enableVertexAttribArray(this.spriteShader.attribute.aColor);
		this.gl.uniform2f(this.spriteShader.uniform.projectionVector,this.projection.x,this.projection.y);
		this.spriteBatch.Render(0,3,this.spriteShader);
	}
	,Resize: function(width,height) {
		this.projection.x = width / 2;
		this.projection.y = height / 2;
	}
	,Init: function(gl) {
		this.gl = gl;
		this.projection = new wgr.geom.Point();
		this.spriteShader = new wgr.renderers.webgl.ShaderWrapper(gl,wgr.renderers.webgl.WebGLShaders.CompileProgram(gl,wgr.renderers.webgl.WebGLShaders.SPRITE_VERTEX_SHADER,wgr.renderers.webgl.WebGLShaders.SPRITE_FRAGMENT_SHADER));
		this.spriteBatch = new wgr.renderers.webgl.WebGLBatch(gl);
		this.spriteBatch.GrowBatch(3);
	}
	,__class__: wgr.renderers.webgl.SpriteRenderer
}
wgr.renderers.webgl.WebGLBatch = function(gl) {
	this.gl = gl;
	this.size = 1;
	this.vertexBuffer = gl.createBuffer();
	this.indexBuffer = gl.createBuffer();
	this.uvBuffer = gl.createBuffer();
	this.colorBuffer = gl.createBuffer();
	this.blendMode = 0;
	this.dynamicSize = 1;
};
wgr.renderers.webgl.WebGLBatch.__name__ = true;
wgr.renderers.webgl.WebGLBatch.prototype = {
	Render: function(start,end,shader) {
		this.Refresh();
		this.Update();
		this.gl.useProgram(shader.program);
		this.gl.bindBuffer(34962,this.vertexBuffer);
		this.gl.bufferSubData(34962,0,this.verticies);
		this.gl.vertexAttribPointer(shader.attribute.aVertexPosition,2,5126,false,0,0);
		this.gl.bindBuffer(34962,this.uvBuffer);
		this.gl.bufferSubData(34962,0,this.uvs);
		this.gl.vertexAttribPointer(shader.attribute.aTextureCoord,2,5126,false,0,0);
		this.gl.activeTexture(33984);
		this.gl.bindTexture(3553,this.spriteHead.texture.baseTexture.texture);
		this.gl.bindBuffer(34962,this.colorBuffer);
		this.gl.bufferSubData(34962,0,this.colors);
		this.gl.vertexAttribPointer(shader.attribute.aColor,1,5126,false,0,0);
		this.gl.bindBuffer(34963,this.indexBuffer);
		var len = end - start;
		this.gl.drawElements(4,len * 6,5123,start * 2 * 6);
	}
	,Update: function() {
		var indexRun = 0;
		var sprite = this.spriteHead;
		while(sprite != null) {
			var width = sprite.texture.frame.width;
			var height = sprite.texture.frame.height;
			var aX = sprite.anchor.x;
			var aY = sprite.anchor.y;
			var w0 = width * (1 - aX);
			var w1 = width * -aX;
			var h0 = height * (1 - aY);
			var h1 = height * -aY;
			var index = indexRun * 8;
			var worldTransform = sprite.worldTransform;
			var a = worldTransform[0];
			var b = worldTransform[3];
			var c = worldTransform[1];
			var d = worldTransform[4];
			var tx = worldTransform[2];
			var ty = worldTransform[5];
			this.verticies[index] = a * w1 + c * h1 + tx;
			this.verticies[index + 1] = d * h1 + b * w1 + ty;
			this.verticies[index + 2] = a * w0 + c * h1 + tx;
			this.verticies[index + 3] = d * h1 + b * w0 + ty;
			this.verticies[index + 4] = a * w0 + c * h0 + tx;
			this.verticies[index + 5] = d * h0 + b * w0 + ty;
			this.verticies[index + 6] = a * w1 + c * h0 + tx;
			this.verticies[index + 7] = d * h0 + b * w1 + ty;
			indexRun++;
			sprite = sprite.next;
		}
	}
	,Refresh: function() {
		var indexRun = 0;
		var sprite = this.spriteHead;
		while(sprite != null) {
			var index = indexRun * 8;
			var texture = sprite.texture.baseTexture.texture;
			var frame = sprite.texture.frame;
			var tw = sprite.texture.baseTexture.width;
			var th = sprite.texture.baseTexture.height;
			this.uvs[index] = frame.x / tw;
			this.uvs[index + 1] = frame.y / th;
			this.uvs[index + 2] = (frame.x + frame.width) / tw;
			this.uvs[index + 3] = frame.y / th;
			this.uvs[index + 4] = (frame.x + frame.width) / tw;
			this.uvs[index + 5] = (frame.y + frame.height) / th;
			this.uvs[index + 6] = frame.x / tw;
			this.uvs[index + 7] = (frame.y + frame.height) / th;
			var colorIndex = indexRun * 4;
			this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = 1;
			indexRun++;
			sprite = sprite.next;
		}
	}
	,GrowBatch: function(size) {
		this.size = size;
		this.dynamicSize = size;
		this.verticies = new Float32Array(this.dynamicSize * 8);
		this.gl.bindBuffer(34962,this.vertexBuffer);
		this.gl.bufferData(34962,this.verticies,35048);
		this.uvs = new Float32Array(this.dynamicSize * 8);
		this.gl.bindBuffer(34962,this.uvBuffer);
		this.gl.bufferData(34962,this.uvs,35048);
		this.colors = new Float32Array(this.dynamicSize * 4);
		this.gl.bindBuffer(34962,this.colorBuffer);
		this.gl.bufferData(34962,this.colors,35048);
		this.indices = new Uint16Array(this.dynamicSize * 6);
		var length = this.indices.length / 6 | 0;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
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
	,Render: function() {
		if(this.contextLost) return;
		this.stage.updateTransform();
		this.gl.clear(16384);
		var _g = 0, _g1 = this.renderers;
		while(_g < _g1.length) {
			var renderer = _g1[_g];
			++_g;
			renderer.Render(0,0);
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
	Render: function(x,y) {
		x = -this.camera.position.x / (this.tileScale * 2);
		y = -this.camera.position.y / (this.tileScale * 2);
		x += this.tileSize / 2;
		y += this.tileSize / 2;
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
			var pX = x * this.tileScale * layer.scrollScale.x;
			var pY = y * this.tileScale * layer.scrollScale.y;
			this.gl.uniform2f(this.tilemapShader.uniform.viewOffset,pX,pY);
			this.gl.uniform2fv(this.tilemapShader.uniform.inverseTileTextureSize,layer.inverseTextureSize);
			this.gl.bindTexture(3553,layer.tileTexture);
			this.gl.drawArrays(4,0,6);
		}
	}
	,SetCamera: function(camera) {
		this.camera = camera;
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
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
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
wgr.renderers.webgl.WebGLShaders.SPRITE_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * vColor;","}"];
wgr.renderers.webgl.WebGLShaders.SPRITE_VERTEX_SHADER = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"];
wgr.tilemap.TileMap.TILEMAP_VERTEX_SHADER = ["attribute vec2 position;","attribute vec2 texture;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform vec2 viewOffset;","uniform vec2 viewportSize;","uniform vec2 inverseTileTextureSize;","uniform float inverseTileSize;","void main(void) {","   pixelCoord = (texture * viewportSize) + viewOffset;","   texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;","   gl_Position = vec4(position, 0.0, 1.0);","}"];
wgr.tilemap.TileMap.TILEMAP_FRAGMENT_SHADER = ["precision mediump float;","varying vec2 pixelCoord;","varying vec2 texCoord;","uniform sampler2D tiles;","uniform sampler2D sprites;","uniform vec2 inverseTileTextureSize;","uniform vec2 inverseSpriteTextureSize;","uniform float tileSize;","void main(void) {","   vec4 tile = texture2D(tiles, texCoord);","   if(tile.x == 1.0 && tile.y == 1.0) { discard; }","   vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;","   vec2 spriteCoord = mod(pixelCoord, tileSize);","   gl_FragColor = texture2D(sprites, (spriteOffset + spriteCoord) * inverseSpriteTextureSize);","}"];
Main.main();
})();

//@ sourceMappingURL=script.js.map