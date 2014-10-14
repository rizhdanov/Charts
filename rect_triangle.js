JXG.Board.prototype.rectTriangle = function(sides) {

var brd = this;

//standard shape and size of a box
//JXG.Options.text.useMathJax = true;
 
//attributes that we get from external code
//sides = [x,y]
//sidelabels = [la, lb, lc]
//alpha = 0 or 1 depending on which sharp angle is alpha

//calculate coordinates of points A,B and C

x = sides[0].value();
y = sides[1].value();
la = sides[0].simplify().toTeX();
lb = sides[1].simplify().toTeX();
lc = sides[2].simplify().toTeX();

var maxx = 3, maxy = 2.5, w, h;
if ( x / y > maxx / maxy ) { w = maxx; h = y / x * w; }
else { h = maxy; w = x / y * h; }

var A = brd.create('point', [w,h], normst),
	B = brd.create('point', [-w,-h], normst),
	C = brd.create('point', [w,-h], normst),
	a = brd.create('segment', [B,C], normst),
	b = brd.create('segment', [A,C], normst),
	c = brd.create('segment', [A,B], normst);


//set labels to sides	
	a.name = katex.renderToString(la+'');
	b.name = katex.renderToString(lb+'');
	c.name = function() { return katex.renderToString(lc+''); }


//angle
if (alpha) { angle = brd.create('angle',[C,B,A], normst); }
else { angle = brd.create('angle', [B,A,C], normst); }
brd.update();

//set attributes of objects in chart	
	a.setAttribute({withLabel :true});
	b.setAttribute({withLabel :true});
	c.setAttribute({withLabel :true});
	
	a.label.setAttribute(_s);
	b.label.setAttribute(_e);
	c.label.setAttribute(_nw);
	B.label.setAttribute(_sw);
	C.label.setAttribute(_se);
	
return;
}
