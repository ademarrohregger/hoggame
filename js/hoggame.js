HTMLElement.prototype.toggleFullScreen = function () {
  fullscreenElement = (document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement)
  if (!fullscreenElement ) {
    this.requestFullscreen = (this.requestFullscreen||this.msRequestFullscreen||this.mozRequestFullScreen||this.webkitRequestFullscreen);
    this.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    document.exitFullscreen = (document.exitFullscreen||document.msExitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen)
    document.exitFullscreen();
  }
}

String.prototype.MD5 = function () {
  var string = this;
  function RotateLeft(lValue, iShiftBits) {
	  return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
  function AddUnsigned(lX,lY) {
	  var lX4,lY4,lX8,lY8,lResult;
	  lX8 = (lX & 0x80000000);
	  lY8 = (lY & 0x80000000);
	  lX4 = (lX & 0x40000000);
	  lY4 = (lY & 0x40000000);
	  lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
	  if (lX4 & lY4) {
		  return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	  }
	  if (lX4 | lY4) {
		  if (lResult & 0x40000000) {
			  return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		  } else {
			  return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		  }
	  } else {
		  return (lResult ^ lX8 ^ lY8);
	  }
 	}
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }
  function FF(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
  };
  function GG(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
  };
  function HH(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
  };
  function II(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
  };
  function ConvertToWordArray(string) {
	  var lWordCount;
	  var lMessageLength = string.length;
	  var lNumberOfWords_temp1=lMessageLength + 8;
	  var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	  var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	  var lWordArray=Array(lNumberOfWords-1);
	  var lBytePosition = 0;
	  var lByteCount = 0;
	  while ( lByteCount < lMessageLength ) {
		  lWordCount = (lByteCount-(lByteCount % 4))/4;
		  lBytePosition = (lByteCount % 4)*8;
		  lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
		  lByteCount++;
	  }
	  lWordCount = (lByteCount-(lByteCount % 4))/4;
	  lBytePosition = (lByteCount % 4)*8;
	  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	  lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	  lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	  return lWordArray;
  };
  function WordToHex(lValue) {
	  var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
	  for (lCount = 0;lCount<=3;lCount++) {
		  lByte = (lValue>>>(lCount*8)) & 255;
		  WordToHexValue_temp = "0" + lByte.toString(16);
		  WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
	  }
	  return WordToHexValue;
  };
  function Utf8Encode(string) {
	  string = string.replace(/\r\n/g,"\n");
	  var utftext = "";
	  for (var n = 0; n < string.length; n++) {
		  var c = string.charCodeAt(n);
		  if (c < 128) {
			  utftext += String.fromCharCode(c);
		  }
		  else if((c > 127) && (c < 2048)) {
			  utftext += String.fromCharCode((c >> 6) | 192);
			  utftext += String.fromCharCode((c & 63) | 128);
		  }
		  else {
			  utftext += String.fromCharCode((c >> 12) | 224);
			  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			  utftext += String.fromCharCode((c & 63) | 128);
		  }
	  }
	  return utftext;
  };
  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;
  string = Utf8Encode(string);
  x = ConvertToWordArray(string);
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  for (k=0;k<x.length;k+=16) {
	  AA=a; BB=b; CC=c; DD=d;
	  a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
	  d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
	  c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
	  b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
	  a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
	  d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
	  c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
	  b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
	  a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
	  d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
	  c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
	  b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
	  a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
	  d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
	  c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
	  b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
	  a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
	  d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
	  c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
	  b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
	  a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
	  d=GG(d,a,b,c,x[k+10],S22,0x2441453);
	  c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
	  b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
	  a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
	  d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
	  c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
	  b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
	  a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
	  d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
	  c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
	  b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
	  a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
	  d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
	  c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
	  b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
	  a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
	  d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
	  c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
	  b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
	  a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
	  d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
	  c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
	  b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
	  a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
	  d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
	  c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
	  b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
	  a=II(a,b,c,d,x[k+0], S41,0xF4292244);
	  d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
	  c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
	  b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
	  a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
	  d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
	  c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
	  b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
	  a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
	  d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
	  c=II(c,d,a,b,x[k+6], S43,0xA3014314);
	  b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
	  a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
	  d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
	  c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
	  b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
	  a=AddUnsigned(a,AA);
	  b=AddUnsigned(b,BB);
	  c=AddUnsigned(c,CC);
	  d=AddUnsigned(d,DD);
  }
  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  return temp.toLowerCase();
}
window.onload = function() {
  var hogwarts = new hog_gameClass(document.getElementById('cHog'));
};
function hog_gameClass(canvas) {
  var ctx = canvas.getContext("2d"),
  keys = [],
  gameStatus;
  document.body.style['margin'] = '0';
  document.body.style['border'] = '0';
  document.body.style['overflow'] = 'hidden';
  canvas.width =  1000;
  canvas.height = 600;
//  canvas.width =  window.innerWidth;
//  canvas.height = window.innerHeight;
//  canvas.width =  window.screen.width;
//  canvas.height = window.screen.height;
  
  this.load = function (bg, callback) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='#000';
    ctx.fillRect(0, 0,canvas.width, canvas.height);
    var bgimg = document.createElement('img');
    bgimg.addEventListener('load', function () {
      ctx.drawImage(bgimg,0,(canvas.height*(0.25/2)),canvas.width,canvas.height-(canvas.height*0.25));
    });
    bgimg.src = bg;
    bgimg.onload = function () {
      var ldimg = document.createElement('img');
      ldimg.src = 'img/shield.png';
      ldimg.onload = function () {
        ctx.drawImage(ldimg, canvas.width-(canvas.width*0.05)-64, canvas.height-(canvas.height*0.01)-64, 64, 64);
        var imgs = new Array();
        imgs = textures.loaded.concat(objs.loaded);
        x = 0;
        for (i in imgs) {
          imgs[i].getCanvas(function () {
            x += 1;
            var z = (x*100)/imgs.length;
            ctx.clearRect((canvas.width/2)-(200/2), (canvas.height-(canvas.height*(0.25/4)))-(16/2), 200, 16);
            ctx.fillStyle='#cc9900';
            ctx.fillRect((canvas.width/2)-(200/2), (canvas.height-(canvas.height*(0.25/4)))-(16/2),200*(z/100),16);
            if ((z == 100) && (callback !== undefined)) {
              setTimeout(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                callback();
              },1000);
            }
          });
        }
      }
    }
  };
  this.constructor = function () {
    gameStatus = 'loading';
    map.preload(null,function () {
      (new hog_gameObject('009',500,400,180,'rect',false)).load();
      game.gameInit();
      gameStatus = 'playing';
    });
  }
  this.gameInit = function() {
    window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
//          case 17: // Ctrl
        case 37: // Left
        case 38: // Up
        case 87: // Up
        case 39: // Right
        case 40: // Down
        case 83: // Down
        case 68: // Side Right
        case 65: // Side Left
          keys[event.keyCode] = true;
          event.preventDefault();
        break;
        case 70: // L to load new test Map
          canvas.toggleFullScreen();
        break;
        case 76: // L to load new test Map
    map.preload('broomcupboard',function () {
      (new hog_gameObject('009',64,64,132,'rect',false)).load();
    });
        break;
        case 75: // K to load new test Map
    map.preload('entrencehall',function () {
      (new hog_gameObject('009',500,400,0,'rect',false)).load();
    });
        break;
        default:
          console.log('key pressed number: '+event.keyCode);
      }
    }, false);
    window.addEventListener('keyup', function(event) {
      switch (event.keyCode) {
//          case 17: // Ctrl
        case 37: // Left
        case 38: // Up
        case 87: // Up
        case 39: // Right
        case 40: // Down
        case 83: // Down
        case 68: // Side Right
        case 65: // Side Left
          keys[event.keyCode] = false;
        break;
      }
    }, false);
  }
  
  var readkeys = setInterval(function() {
    try {
      if (keys[37]) player.moveRotate('l');
      else if (keys[39]) player.moveRotate('r');
      if (keys[65]) {
        if (keys[87]) player.moveSideways('lf');
        else if (keys[83])player.moveSideways('lb');
        else player.moveSideways('l');
      }
      else if (keys[68]) {
        if (keys[87]) player.moveSideways('rf');
        else if (keys[83])player.moveSideways('rb');
        else player.moveSideways('r');
      }
      else if (keys[87]) player.moveFront();
      else if (keys[83]) player.moveBack();
    } catch (e) {
//      console.debug(e);
    }
  },40);

  function hog_gameMap() {
    var level = 0,
    self = this,
    sMap = 'fffffffff';
    this.posx = 0;
    this.posy = 0;
    this.canvasMap = '';
    this.show = function () {
      this.x = player.x - ((canvas.width/2));
      this.y = player.y - (((canvas.height-50)/2));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.canvasMap, this.x-this.posx, this.y-this.posy, canvas.width, canvas.height-50, 0,0, canvas.width, canvas.height-50);
      objs.show();
      player.show();
      try { bar.show();} catch(e){};
    };
    this.setArray = function (mapArr) {
      sMap = mapArr;
      this.canvasMap = this.load();
    }
    this.load = function () {
      var tempCanvas = document.createElement('canvas'),
      tempCtx = tempCanvas.getContext('2d');
      this.size = this.getSize();
      tempCanvas.width = this.size[0];
      tempCanvas.height = this.size[1];
      for (i in textures.loaded) {
        textures.loaded[i].show(tempCtx);
      }
      for (i in objs.loaded) {
        if (objs.getType(objs.loaded[i].id) == 'scene') objs.loaded[i].show(tempCtx);
      }
      return tempCanvas;
    };
    this.preload = function (fmap, callback) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.posx = 0;
      this.posy = 0;
      ctx.fillStyle='#000';
      ctx.fillRect(0, 0,canvas.width, canvas.height);
      gameStatus = 'loading';
      fmap = fmap || "greathall";
      var xhr = new XMLHttpRequest();
      objs.loaded = [];
      textures.loaded = [];
      xhr.onload = function() {
        var retorno = JSON.parse(xhr.responseText),
        aMap = retorno.map.content.split('#');
        self.posx = (retorno.map.posx !== undefined?retorno.map.posx:0);
        self.posy = (retorno.map.posy !== undefined?retorno.map.posy:0);
        for (i in aMap) {
          aMap[i] = aMap[i].split(",");
          for (j in aMap[i]) {
            if (aMap[i][j].substring(0,3).toUpperCase() != 'FFF') (new hog_gameTexture(aMap[i][j].substring(0,3),j*32,i*32)).load();
            if (aMap[i][j].substring(3,6).toUpperCase() != 'FFF') (new hog_gameObject(aMap[i][j].substring(3,6),j*32,i*32,0,'rect',(aMap[i][j].substring(9,10)==1?true:false))).load();
          }
        }
        for (i in retorno.map.objects) {
          objLoad = new hog_gameObject(retorno.map.objects[i].hex,retorno.map.objects[i].x,retorno.map.objects[i].y,retorno.map.objects[i].direction,retorno.map.objects[i].format,retorno.map.objects[i].penetrable);
          if (retorno.map.objects[i].target) objLoad.target = retorno.map.objects[i].target;
          objLoad.width = retorno.map.objects[i].width;
          objLoad.height = retorno.map.objects[i].height;
          objLoad.load();
        }
        game.load((retorno.map.preloadImg || "img/hogwarts.png"),function() {
          map.setArray(retorno.map.content);
          map.show();
          gameStatus = 'playing';
        });
        if (callback !== undefined) {
          callback();
        }
      };
      xhr.open("GET", "maps/"+fmap+".map", true);
      xhr.send();
    }

    this.getFrame = function (x,y) {
      var aMap = sMap.split('#');
      for (i in aMap) {
        aMap[i] = aMap[i].split(",");
      }
      if (x>0) x=Math.floor(x/32);
      if (y>0) y=Math.floor(y/32);
      if ((y<0) || (y>=aMap.length)) {
        return false;
      } else if ((x<0) || (x>=aMap[y].length)) { 
        return false;
      }
      if (aMap[y][x]) return aMap[y][x];        
    };
    this.getSize = function () {
      var aMap = sMap.split('#'),
      maxx=0,
      maxy=0;
      for (i in aMap) {
        aMap[i] = aMap[i].split(",");
        maxx = (aMap[i].length*32)>maxx?aMap[i].length*32:maxx;
      }
      maxy = aMap.length*32;
      return [maxx,maxy];        
    };
  }
  function hog_gameBar() {
    this.show = function () {
      ctx.fillStyle='#aaa';
      ctx.fillRect(0, canvas.height-50,canvas.width, 2);
      ctx.fillStyle='#888';
      ctx.fillRect(0, canvas.height-48,canvas.width, 48);
      ctx.drawImage(player.avatar, 21, canvas.height-((50/2)+(33/2)),33,33);
    };
  }
  
  function hog_gameTexture(hex,x,y) {
    this.id = hex;
    this.x = x;
    this.y = y;

    this.show = function(context) {
      context = (context === undefined?ctx:context);
      if (this.canvas) {
        context.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, (ctx === context?this.x-player.x+(canvas.width/2):this.x), (ctx === context?this.y-player.y+((canvas.height-50)/2):this.y), this.canvas.width, this.canvas.height);
      } else {
        this.getCanvas(function () {
          context.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, (ctx === context?this.x-player.x+(canvas.width/2):this.x), (ctx === context?this.y-player.y+((canvas.height-50)/2):this.y), this.canvas.width, this.canvas.height);
        }.bind(this));
      }
    };

    this.getObjectLoaded = function (object) {
      for (i in textures.loaded) {
        if (textures.loaded[i] === object) {
          return textures.loaded[i];
        }
      }
      return undefined;
    };

    this.load = function () {
      textures.loaded.push(this);
      return this;
    };

    this.getCanvas = function (callback) {
      var loadimg = document.createElement('img'),
      tempcanvas = document.createElement('canvas'),
      ctxtempcanvas;
      if (textures.getSrc(hex) !== '') {
        loadimg.src = textures.getSrc(hex);
        loadimg.addEventListener('load',function () {
          ctxtempcanvas = tempcanvas.getContext("2d");
          tempcanvas.width = this.width || loadimg.width;
          tempcanvas.height = this.height || loadimg.height;
          if ((this.width > 0) && (this.height > 0)) {
            ctxtempcanvas.drawImage(loadimg, 0,0,loadimg.width,loadimg.height,0,0,this.width,this.height);
          } else {
            ctxtempcanvas.drawImage(loadimg, 0,0,loadimg.width,loadimg.height);
          }
          this.canvas = tempcanvas;
          if (callback !== undefined) callback();
        }.bind(this));
        return tempcanvas;
      } else {
        this.canvas = tempcanvas;
        if (callback !== undefined) callback();
        return false;
      }
    };
  }
  
  function hog_gameTextures() {
    var textures = [];
    textures[0] = "img/floorstone.png";
    textures[1] = "img/floorwood.png";
    this.loaded = [];
    this.getSrc = function (hex) {
      var idTex = parseInt(hex,16);
      return textures[idTex]!==undefined?textures[idTex]:'';
    }
  }

  function hog_gamePlayer() {
    this.x = 550;
    this.y = 1000;
    this.width = 32;
    this.height = 32;
    this.loadAvatar = function (id) {
      var avatars = [],
      id = (typeof(id) !== "number"?0:id),
      photo = document.createElement('img');
      avatars[0] = "http://www.gravatar.com/avatar/"+"@gmail.com".toLowerCase().MD5()+".jpg";
      photo.addEventListener('load', function () {
        player.avatar = photo;
      });
      photo.src = avatars[id];
    }
    this.loadAvatar();
    this.loadChar = function (id) {
      var characters = [],
      id = (typeof(id) !== "number"?0:id),
      photo = document.createElement('img');
      characters[0] = "img/player.png";
      photo.addEventListener('load', function () {
        player.pointer = photo;
      });
      photo.src = characters[id];
    }
    this.loadChar();
    var lastx = 0,
    lasty = 0;
    this.direction = 0;
    this.show = function () {
        var tempcanvas = document.createElement('canvas'),
        ctxtempcanvas = tempcanvas.getContext("2d");
        tempcanvas.width = player.width;
        tempcanvas.height = player.height;
        ctxtempcanvas.translate(tempcanvas.width/2,tempcanvas.height/2);
        ctxtempcanvas.rotate(player.direction*Math.PI/180);
        ctxtempcanvas.translate(-tempcanvas.width/2,-tempcanvas.height/2);
        ctxtempcanvas.drawImage(player.pointer, 0,0,player.width,player.height);
        ctx.drawImage(tempcanvas, (canvas.width/2)-(player.width/2), ((canvas.height-50)/2)-(player.height/2));
    };
    this.permitedMove = function (x,y,lastX,lastY) {
      for (i in objs.loaded) {
        if (objs.loaded[i].inside(x,y) === true) {
          if ((!objs.loaded[i].penetrable)) {
            if ((lastX === undefined) && (lastY === undefined)) {
              return false;
            } else {
              return objs.loaded[i].escapedCoords(x,y,lastX,lastY);
            }
          } else{
            try {
              if (!objs.loaded[i].inside(lastX,lastY) && objs.loaded[i].target) {
                objs.loaded[i].actions.enter(objs.loaded[i]);
              }
            } catch (e) {}
          }
        }
      }
      return true
    };
    this.moveFront = function () {
      if (gameStatus !== 'playing') { throw 'You don\'t playing'; }
      lastx = this.x;
      lasty = this.y;

      this.x += Math.sin(this.direction/180*Math.PI)*5;
      this.y -= Math.cos(this.direction/180*Math.PI)*5;

      if(this.x < 0+map.posx+(this.width/2)) this.x=0+map.posx+(this.width/2);
      if(this.y < 0+map.posy+(this.height/2)) this.y=0+map.posy+(this.height/2);

      if(this.x > map.size[0]+map.posx-(this.width/2)) this.x=map.size[0]+map.posx-(this.width/2);
      if(this.y > map.size[1]+map.posy-(this.height/2)) this.y=map.size[1]+map.posy-(this.height/2);
      var permitedMove = this.permitedMove(this.x,this.y,lastx,lasty);
      if (permitedMove === false) {
        this.x = lastx;
        this.y = lasty;
      } else if (Array.isArray(permitedMove)) {
        if (this.permitedMove(permitedMove[0],permitedMove[1]) === false) {
          this.x = lastx;
          this.y = lasty;
        } else {  
          this.x = permitedMove[0];
          this.y = permitedMove[1];
          if ((this.x == lastx)&&(this.y == lasty)) {
            this.x += this.permitedMove(this.x+Math.sin(this.direction/180*Math.PI)*5,this.y)?Math.sin(this.direction/180*Math.PI)*5:0;
            this.y -= this.permitedMove(this.x,this.y-Math.cos(this.direction/180*Math.PI)*5)?Math.cos(this.direction/180*Math.PI)*5:0;
          }
        }
      }
      
      if ((lastx !== this.x)||(lasty !== this.y)) {
        map.show();
      }

    };
    this.moveSideways = function (direction) {
      if (gameStatus !== 'playing') { throw 'You don\'t playing'; }
      lastx = this.x;
      lasty = this.y;

      switch (direction) {
        case 'L':
        case 'l':
          var side = -90;
        break;
        case 'LF':
        case 'lf':
          var side = -45;
        break;
        case 'LB':
        case 'lb':
          var side = -135;
        break;
        case 'R':
        case 'r':
          var side = 90;
        break;
        case 'RF':
        case 'rf':
          var side = 45;
        break;
        case 'RB':
        case 'rb':
          var side = 135;
        break;
        default:
          var side = 0;
      }

      this.x += Math.sin((this.direction+side)/180*Math.PI)*5;
      this.y -= Math.cos((this.direction+side)/180*Math.PI)*5;

      if(this.x < 0+map.posx+(this.width/2)) this.x=0+map.posx+(this.width/2);
      if(this.y < 0+map.posy+(this.height/2)) this.y=0+map.posy+(this.height/2);

      if(this.x > map.size[0]+map.posx-(this.width/2)) this.x=map.size[0]+map.posx-(this.width/2);
      if(this.y > map.size[1]+map.posy-(this.height/2)) this.y=map.size[1]+map.posy-(this.height/2);

      var permitedMove = this.permitedMove(this.x,this.y,lastx,lasty);
      if (permitedMove === false) {
        this.x = lastx;
        this.y = lasty;
      } else if (Array.isArray(permitedMove)) {
        if (this.permitedMove(permitedMove[0],permitedMove[1]) === false) {
          this.x = lastx;
          this.y = lasty;
        } else {  
          this.x = permitedMove[0];
          this.y = permitedMove[1];
          if ((this.x == lastx)&&(this.y == lasty)) {
            this.x += this.permitedMove(this.x+Math.sin((this.direction+side)/180*Math.PI)*5,this.y)?Math.sin((this.direction+side)/180*Math.PI)*5:0;
            this.y -= this.permitedMove(this.x,this.y-Math.cos((this.direction+side)/180*Math.PI)*5)?Math.cos((this.direction+side)/180*Math.PI)*5:0;
          }
        }
      }
      
      if ((lastx !== this.x)||(lasty !== this.y)) {
        map.show();
      }

    };
    this.moveBack = function () {
      if (gameStatus !== 'playing') { throw 'You don\'t playing'; }
      lastx = this.x;
      lasty = this.y;

      this.x -= Math.sin(this.direction/180*Math.PI)*5;
      this.y += Math.cos(this.direction/180*Math.PI)*5;

      if(this.x < 0+map.posx+(this.width/2)) this.x=0+map.posx+(this.width/2);
      if(this.y < 0+map.posy+(this.height/2)) this.y=0+map.posy+(this.height/2);

      if(this.x > map.size[0]+map.posx-(this.width/2)) this.x=map.size[0]+map.posx-(this.width/2);
      if(this.y > map.size[1]+map.posy-(this.height/2)) this.y=map.size[1]+map.posy-(this.height/2);

      var permitedMove = this.permitedMove(this.x,this.y,lastx,lasty);
      if (permitedMove === false) {
        this.x = lastx;
        this.y = lasty;
      } else if (Array.isArray(permitedMove)) {
        if (this.permitedMove(permitedMove[0],permitedMove[1]) === false) {
          this.x = lastx;
          this.y = lasty;
        } else {
          this.x = permitedMove[0];
          this.y = permitedMove[1];
          if ((this.x == lastx)&&(this.y == lasty)) {
            this.x -= this.permitedMove(this.x-Math.sin(this.direction/180*Math.PI)*5,this.y)?Math.sin(this.direction/180*Math.PI)*5:0;
            this.y += this.permitedMove(this.x,this.y+Math.cos(this.direction/180*Math.PI)*5)?Math.cos(this.direction/180*Math.PI)*5:0;
          }
        }
      }

      if ((lastx !== this.x)||(lasty !== this.y)) {
        map.show();
      }

    };
    this.moveRotate = function (direction) {
      if (gameStatus !== 'playing') { throw 'You don\'t playing'; }
      switch (direction) {
        case "l":
        case "L": // Left
          this.direction -= 5;
          map.show();
        break;
        case "r":
        case "R": // Right
          this.direction += 5;
          map.show();
        break;
      }
      if (this.direction >= 360) { this.direction = (0 + (this.direction-360)); }
      else if (this.direction < 0) { this.direction = 359 + (this.direction); }
    };
  }
  
  function hog_gameObject(hex,x,y,direction,format,penetrable) {
    this.id = hex;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.format = format;
    this.penetrable = penetrable;
    this.actions = new objs.getActions(this.id);
    this.inside = function(x,y) {
      switch (this.format) {
        case 'rect':
          if ((x+(player.width/2) > this.x+map.posx-(this.canvas.width/2)) && (x-(player.width/2) < this.x+map.posx+(this.canvas.width/2)) && (y+(player.height/2) > this.y+map.posy-(this.canvas.height/2)) && (y-(player.height/2) < this.y+map.posy+(this.canvas.height/2))) return true;
          else return false;
        break;
      }
    };
    this.permitedMove = function (x,y,lastX,lastY) {
      for (i in objs.loaded) {
        if ((objs.loaded[i].inside(x,y) === true) && (!objs.loaded[i].penetrable)) {
          if ((lastX === undefined) && (lastY === undefined)) {
            return false;
          } else {
            return objs.loaded[i].escapedCoords(x,y,lastX,lastY);
          }
        }
      }
      return true
    };
    this.escapedCoords = function (x,y,lastX,lastY) {
      var escX,escY;

      switch (this.format) {
        case 'rect':
          if ((x+(player.width/2) > this.x+map.posx-(this.canvas.width/2)) && (x-(player.width/2) < this.x+map.posx+(this.canvas.width/2)) && (y+(player.height/2) > this.y+map.posy-(this.canvas.height/2)) && (y-(player.height/2) < this.y+map.posy+(this.canvas.height/2))) {
            escX = (lastX+(player.width/2) <= this.x+map.posx-(this.canvas.width/2)?this.x+map.posx-(this.canvas.width/2)-(player.width/2):x);
            escY = (lastY+(player.height/2) <= this.y+map.posy-(this.canvas.height/2)?this.y+map.posy-(this.canvas.height/2)-(player.height/2):y);

            escX = (lastX-(player.width/2) >= this.x+map.posx+(this.canvas.width/2)?this.x+map.posx+(this.canvas.width/2)+(player.width/2):escX);
            escY = (lastY-(player.height/2) >= this.y+map.posy+(this.canvas.height/2)?this.y+map.posy+(this.canvas.height/2)+(player.height/2):escY);

            escX = (lastX-(player.width/2) >= this.x+map.posx+(this.canvas.width/2)?this.x+map.posx+(this.canvas.width/2)+(player.width/2):escX);
            escY = (lastY-(player.height/2) >= this.y+map.posy+(this.canvas.height/2)?this.y+map.posy+(this.canvas.height/2)+(player.height/2):escY);

          } else return [x,y];
        break;
      }
      return [escX,escY];
    };
    this.show = function(context) {
      context = (context === undefined?ctx:context);
      var x,y;
      if (ctx === context) {
        x = this.x-player.x+(canvas.width/2)-(this.canvas.width/2)+map.posx
        y = this.y-player.y+((canvas.height-50)/2)-(this.canvas.height/2)+map.posy;
      } else {
        x = this.x-(this.canvas.width/2);
        y = this.y-(this.canvas.height/2)
      }
      if (this.canvas) {
        context.drawImage(rotate(this.canvas,this.direction), 0, 0, this.canvas.width, this.canvas.height, x, y, this.canvas.width, this.canvas.height);
      } else {
        this.getCanvas(function () {
          context.drawImage(rotate(this.canvas,this.direction), 0, 0, this.canvas.width, this.canvas.height, x, y, this.canvas.width, this.canvas.height);
        }.bind(this));
      }
    };
    
    this.load = function () {
      objs.loaded.push(this);
      return this;
    };

    this.getCanvas = function (callback) {
      var loadimg = document.createElement('img'),
      tempcanvas = document.createElement('canvas'),
      ctxtempcanvas;
      if (objs.getSrc(hex) !== '') {
        loadimg.src = objs.getSrc(hex);
        loadimg.addEventListener('load',function () {
          ctxtempcanvas = tempcanvas.getContext("2d");
          tempcanvas.width = this.width || loadimg.width;
          tempcanvas.height = this.height || loadimg.height;
          if ((this.width > 0) && (this.height > 0)) {
            ctxtempcanvas.drawImage(loadimg, 0,0,loadimg.width,loadimg.height,0,0,this.width,this.height);
          } else {
            ctxtempcanvas.drawImage(loadimg, 0,0,loadimg.width,loadimg.height);
          }
          this.canvas = tempcanvas;
          if (callback !== undefined) callback();
        }.bind(this));
        return tempcanvas;
      } else {
        this.canvas = tempcanvas;
        if (callback !== undefined) callback();
        return false;
      }
    };
    
    function rotate(canvas,direction) {
      var tempcanvas = document.createElement('canvas'),
      ctxtempcanvas = tempcanvas.getContext("2d");
      tempcanvas.width = canvas.width;
      tempcanvas.height = canvas.height;
      ctxtempcanvas.save();
      ctxtempcanvas.translate(tempcanvas.width/2,tempcanvas.height/2);
      ctxtempcanvas.rotate(direction*Math.PI/180);
      ctxtempcanvas.translate(-tempcanvas.width/2,-tempcanvas.height/2);
      ctxtempcanvas.drawImage(canvas, 0,0,canvas.width,canvas.height);
      ctxtempcanvas.restore();
      return tempcanvas;
    }
  }
  function hog_gameObjects() {
    var object = [],
    self = this;
    object[0] = ["img/wallstone.png","scene"];
    object[1] = ["img/tablewood.png","scene"];
    object[2] = ["img/tablewood_horizon.png","scene"];
    object[3] = ["img/bigchair.png","scene"];
    object[4] = ["img/stair.png","scene"];
    object[5] = ["img/stairdouble.png","scene"];
    object[6] = ["img/directorchair.png","scene"];
    object[7] = ["img/teacherchair.png","scene"];
    object[8] = ["img/flatware.png","scene"];
    object[9] = ["img/player.png","student"];
    object[10] = ["img/door.png","scene"];
    object[11] = ["img/bigcloseddoor.png","door"];
    object[12] = ["img/opendoor.png","door"];
    object[13] = ["img/counter.png","scene"];
    this.loaded = [];
    this.getObjectLoaded = function (object) {
      for (i in this.loaded) {
        if (this.loaded[i] === object) {
          return this.loaded[i];
        }
      }
      return undefined;
    };
    this.getSrc = function (hex) {
      var id = parseInt(hex,16);
      return object[id]!==undefined?object[id][0]:'';
    };
    this.getType = function (hex) {
      var id = parseInt(hex,16);
      return object[id]!==undefined?object[id][1]:'';
    };
    this.getActions = function (hex) {
      switch (self.getType(hex)) {
        case "student":
          return {
            'move': function (object,direction) { 
              var lastx = object.x,
              lasty = object.y;

              switch (direction) {
                case 'F':
                case 'f':
                default:
                  object.x += Math.sin(object.direction/180*Math.PI)*5;
                  object.y -= Math.cos(object.direction/180*Math.PI)*5;
                break;
                case 'B':
                case 'b':
                  object.x += Math.sin((object.direction+180)/180*Math.PI)*5;
                  object.y -= Math.cos((object.direction+180)/180*Math.PI)*5;
                break;
                case 'R':
                case 'r':
                  object.x += Math.sin((object.direction+90)/180*Math.PI)*5;
                  object.y -= Math.cos((object.direction+90)/180*Math.PI)*5;
                break;
                case 'L':
                case 'l':
                  object.x += Math.sin((object.direction-90)/180*Math.PI)*5;
                  object.y -= Math.cos((object.direction-90)/180*Math.PI)*5;
                break;
              }

              if(object.x < 0+(object.width/2)) object.x=0+(object.width/2);
              if(object.y < 0+(object.height/2)) object.y=0+(object.height/2);

              if(object.x > map.size[0]-(object.width/2)) object.x=map.size[0]-(object.width/2);
              if(object.y > map.size[1]-(object.height/2)) object.y=map.size[1]-(object.height/2);

              var permitedMove = object.permitedMove(object.x,object.y,lastx,lasty);
              if (permitedMove === false) {
                object.x = lastx;
                object.y = lasty;
              } else if (Array.isArray(permitedMove)) {
                if (object.permitedMove(permitedMove[0],permitedMove[1]) === false) {
                  object.x = lastx;
                  object.y = lasty;
                } else {  
                  object.x = permitedMove[0];
                  object.y = permitedMove[1];
                  if ((object.x == lastx)&&(object.y == lasty)) {
                    switch (direction) {
                      case 'F':
                      case 'f':
                      default:
                        object.x += object.permitedMove(object.x+Math.sin(object.direction/180*Math.PI)*5,object.y)?Math.sin(object.direction/180*Math.PI)*5:0;
                        object.y -= object.permitedMove(object.x,object.y-Math.cos(object.direction/180*Math.PI)*5)?Math.cos(object.direction/180*Math.PI)*5:0;
                      break;
                      case 'B':
                      case 'b':
                        object.x += object.permitedMove(object.x+Math.sin((object.direction+180)/180*Math.PI)*5,object.y)?Math.sin((object.direction+180)/180*Math.PI)*5:0;
                        object.y -= object.permitedMove(object.x,object.y-Math.cos((object.direction+180)/180*Math.PI)*5)?Math.cos((object.direction+180)/180*Math.PI)*5:0;
                      break;
                      case 'R':
                      case 'r':
                        object.x += object.permitedMove(object.x+Math.sin((object.direction+90)/180*Math.PI)*5,object.y)?Math.sin((object.direction+90)/180*Math.PI)*5:0;
                        object.y -= object.permitedMove(object.x,object.y-Math.cos((object.direction+90)/180*Math.PI)*5)?Math.cos((object.direction+90)/180*Math.PI)*5:0;
                      break;
                      case 'L':
                      case 'l':
                        object.x += object.permitedMove(object.x+Math.sin((object.direction-90)/180*Math.PI)*5,object.y)?Math.sin((object.direction-90)/180*Math.PI)*5:0;
                        object.y -= object.permitedMove(object.x,object.y-Math.cos((object.direction-90)/180*Math.PI)*5)?Math.cos((object.direction-90)/180*Math.PI)*5:0;
                      break;
                    }
                  }
                }
              }
              
              if ((lastx !== object.x)||(lasty !== object.y)) {
                map.show();
              }
            }
          };
        break;
        case "door":
         return {
            'enter': function (object) {
              map.preload(object.target);
            }
          };
        break;
        case "scene":
        default:
          return undefined;
        break;
      }
    };
    this.show = function (context) {
      context = (context === undefined?ctx:context);
      for (i in this.loaded) {
        if (this.getType(this.loaded[i].id) != 'scene') {
          this.loaded[i].show(context);
        }
      }
    };
  }
  var player = new hog_gamePlayer();
  var bar = new hog_gameBar();
  var textures = new hog_gameTextures();
  var objs = new hog_gameObjects();
  var map = new hog_gameMap();
  var game = this;
  this.constructor();
}
