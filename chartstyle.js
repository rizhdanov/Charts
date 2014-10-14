/* .orange-dark { color: #EE6C00 }	// Main Primary color 
.orange-light { color: #FFC391 }
.orange { color: #FF9238 }
.brown { color: #8E4000 }
.brown-black { color: #060300 }

.green { color: #00AE3B }	// Main Secondary color (1) 
.green-light { color: #8EF9B2 }
.green-middle { color: #2FD567 }
.green-dark { color: #006823 }
.green-black { color: #000502 }

.red { color: #EE2500 }	// Main Secondary color (2) 
.red-light { color: #FFA291 }
.red-middle { color: #FF5738 }
.red-dark { color: #8E1600 }
.red-black { color: #060100 }

.navy { color: #008F8F }	// Main Complement color 
.navy-light { color: #8CF6F6 }
.navy-middle { color: #2BC1C1 }
.navy-dark { color: #005555 }
.navy-black { color: #000404 }
*/


//thin line for background objects, such as grid, unit circle 

ncolor = 0;

var nextColor = function(){
	var colors = ['#FF9238', '#2BC1C1', '#2FD567', '#FF5738', '#8E4000','#8CF6F6','#006823', '#FFA291'];
	return colors[ncolor++];
}

	
var	thinst = { 
    		highlight:false,
    		fillOpacity: 0,
            strokeColor: '#005555',
            strokeWidth: 0.5,
            fixed:true,

	},
	
	normst = {
    		highlight:false,
			strokeColor: '#005555',
			fillColor: '#005555',
			strokeWidth:2,
			fixed:true,
            size: 1,
    },
    
    highlightst = {
    		highlight:false,
    		strokeColor: '#FF9238',
    		fillColor: '#FF9238',
			strokeWidth:2,
    		fixed: true,
    		size: 2
    },
        
    palest = {
    		highlight:false,
    		strokeColor:'#CCCCCC',
    	    strokeWidth:1,
    	    size: 0
    },
    
    graphst = {
    		highlight:false,
			strokeColor: nextColor(),
			fillOpacity: 0,
			strokeWidth:2,
			fixed:true,
            size: 1,
    },
    
    axst = {
    		highlight:false,
    		strokeColor:'#CCCCCC',
    		strokeWidth:1,
	    	lastArrow:true,
    },
    
    dashst = {
    		highlight:false,
    		strokeColor:'#999999',
    		strokeWidth:1,
			dash:2
    },
    
    invst = {
    		visible:false
    },
    
    anglest = {
    		highlight:false,
    		fillOpacity: 0,
    		strokeOpacity:1,
    		strokeColor: '#005555',
    		firstArrow:true,
    		strokeWidth:0.5,
    		radius: 0.1,
    		withLabel:false
    },
    
    anglehighlightst = {
    		highlight:false,
    		fillOpacity: 0,
    		strokeOpacity:1,
    		strokeColor: '#FF9238',
    		firstArrow:true,
    		strokeWidth:0.5,
    		radius: 0.1,
    },

	dynam = {
			strokeColor: '#FF9238',
			fillColor: '#FF9238',
            size: 3,
    };


//shortcuts for label anchors

var _sw = {
		anchorX:'right',anchorY:'top',offset:[-3,-3]
	},
	_ne = {
		anchorX:'left',anchorY:'bottom',offset:[3,3]
	},
	_nw = {
		anchorX:'right',anchorY:'bottom',offset:[-3,3]
	},
	_se = {
		anchorX:'left',anchorY:'top',offset:[3,-3]
	},
	_w = {
		anchorX:'right',anchorY:'middle',offset:[-3,0]
	},
	_e = {
		anchorX:'left',anchorY:'middle',offset:[3,0]
	},
	_n = {
		anchorX:'middle',anchorY:'bottom',offset:[0,3]
	},
	_s = {
		anchorX:'middle',anchorY:'top',offset:[0,-3]
	};







JXG.Board.prototype.rect = function(A,B,C,params)
{
	if(!params) params = thinst;
	params.fillOpacity = 0;

	params.label = _s;
	var p = this.create('polygon',[A,B,C], {fillColor:'#FFFFFF', borders:params});
	//расставляем метки
	p.borders[0].label.setAttribute(_s);
	p.borders[1].label.setAttribute(_n);
	p.borders[2].label.setAttribute(_nw);

	//p.setAttribute(params);
	return p;
}







//Creates labels at midpoints renders them to KaTeX and anchors them so that they don't intersect with the polygon
//Parameters: polygon p, array of polygon sides names in TeX, array of vertices names in TeX
//returns polygon it was given

JXG.Board.prototype.correctLabels = function(p,labelb, labelv)
{
	//создаем объект, который будем потом передавать в качестве параметра
	var params = {size:0, strokeWidth:0};
	var M = [];
	var N = [];
	//задаем отображение меток сторон
	if(labelb) params.withLabel = true;	
 
 //создаем midpoints с правильным label:{anchorX:'middle',anchorY:'middle',offset:offset}
	var offsetb = [0,0];
	var i;
	
	for (i = 0; i < p.borders.length; i++)
	{
		M.push( board.create('midpoint',[p.borders[i]],params) );
		N.push( board.create('normal',[M[i],p.borders[i]], invst) );
	}

	M.push(M[0]);
	var av = [N[i-1].X(3), N[i-1].Y(3)];
	var bv = [N[i-1].X(0), N[i-1].Y(0)];
	var side = nvec([M[i-1].X(),M[i-1].Y()],[M[0].X(),M[0].Y()],20);
	
	for (i = 0; i < p.borders.length; i++)
	{
		var a = [N[i].X(3), N[i].Y(3)];
		var b = [N[i].X(0), N[i].Y(0)];
		var offsetb = b;//nvec(a,b,20);
		
		if (isNaN(norm2(offsetb,side))) {offsetb[0] = -offsetb[0]; offsetb[1] = -offsetb[1];}
		var offsetv = bv;//nvec(av,bv,20);
		offsetv = add(offsetb,offsetv);
		offsetv = nvec([0,0],offsetv,20);
		
		//ставим метки
		if (labelb) M[i].name = katex.renderToString(labelb[i]);
		if (labelv) p.vertices[i].name = katex.renderToString(labelv[i]);
		//параметры midpoints
		
		//console.log(chooseAttribute(offsetb));
		M[i].label.setAttribute(chooseAttribute(offsetb));//{anchorX:'middle',anchorY:'middle',offset:offsetb});
		//параметры вершин
		p.vertices[i].label.setAttribute(chooseAttribute(offsetv));//({anchorX:'middle',anchorY:'middle',offset:offsetv})

		side = nvec([M[i].X(),M[i].Y()],[M[i+1].X(),M[i+1].Y()],20);
		av = a;
		bv = b;
	}

	return p;

	function chooseAttribute(v)
	{
		var x = v[0], y = v[1];
		//console.log(y,x);
		var r = Math.abs(y/x);
		if (r > 2 && y > 0) return _n;
		if (r > 2 && y < 0) return _s;
		if (r < 0.5 && x > 0) return _e;
		if (r < 0.5 && x < 0) return _w;
		if (x < 0 && y < 0) return _sw;
		if (x < 0 && y > 0) return _nw;
		if (x > 0 && y < 0) return _se;
		if (x > 0 && y > 0) return _ne;
	}
	
	function norm2(a,b)
	{
		if (b == undefined) b = a;
		return Math.sqrt(a[0]*b[0]+a[1]*b[1]);
	}
	
	function nvec(a,b,n)
	{
		var c = [];
		c[0] = b[0]-a[0];
		c[1] = b[1]-a[1];
		c[0] *= n/norm2(c);
		c[1] *= n/norm2(c);
		return c;
	}
	
	function add(v1,v2)
	{
		var r = [];
		r[0] = v1[0]+v2[0];
		r[1] = v1[1]+v2[1];
		return r;
	}
	
}










