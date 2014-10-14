/*
ch	= {
			p: {
				x: x, y: y, name:'B', withLabel:false, h:true, v:false, arc:'top'	},
			catet: {
				sx: {withLabel:true, name:x_name},
				h: 	{withLabel:true, name:y_name}		},
			angle: {
				withLabel:true, name:'alpha'	} 
			};
*/

JXG.Board.prototype.trigCircleEq = function(ch) {

var board = this;
//board.suspendUpdate();

//axes
var	ax1 = board.create('segment', [[-1.2,0],[1.2,0]],axst),
	ax2 = board.create('segment', [[0,-1.2],[0,1.2]],axst);

//Circle, points and other objects
var A = board.create('point', [1, 0], invst),
	O = board.create('point', [0, 0], invst),
	c = board.create('circle', [O, A], palest),
	B = board.create('glider', [ch.p.x, ch.p.y, c], highlightst),
	X = board.create('point', [ch.p.x,0], invst);	//проекция точки B на ось x
	
if(!ch.catet.hidden) 
{

var	p = board.create('polygon', [O,X,B], thinst);
	p.setAttribute({withLabel:false});

	for (var i = 0; i < p.borders.length; i++)
	{
		p.borders[i].setAttribute(thinst);
		p.borders[i].setAttribute({withLabel:false});
	}
	//board.correctLabels(p,['1','\\sqrt{2}','\\sin x','','']);
	var l1 = ch.catet.sx.withLabel ? ch.catet.sx.name: '',
		l2 = ch.catet.h.withLabel ? ch.catet.h.name: '';
	board.correctLabels(p, [l1,l2,'']); //создаем метки с нужными параметрами
	//showing rectangle
	if (Math.abs(B.coords.usrCoords[2] * B.coords.usrCoords[1]) > 1e-5)
	{
		if (JXG.Math.Geometry.angle(B,X,O)>0) 
			rect = board.create('angle',[B,X,O],anglest);
		else
			rect = board.create('angle',[O,X,B],anglest);
	}	
}
	
var	r = board.create('segment', [O,B], normst),
	b = board.create('segment', [O,A], normst),
	AOB = board.create('angle',[A,O,B],anglehighlightst);

//set attributes from chart
	//point B
	B.setAttribute(ch.p);
		
	//angle
	if(ch.angle.name){
		AOB.name = katex.renderToString(ch.angle.name);
		AOB.setAttribute({withLabel:ch.angle.withLabel}); }

//line
	var arc;
	if(ch.p.h) {
		B1 = board.create('glider', [-ch.p.x, ch.p.y, c], highlightst);
		B1.setAttribute(ch.p)
		board.create('segment',[B,B1],dashst);
		if (ch.p.arc == 'top' && B.X() >= 0 || ch.p.arc == 'bottom' && B.X() <= 0)
			arc = board.create('arc', [O, B, B1],highlightst);
		if (ch.p.arc == 'bottom' && B.X() >= 0 || ch.p.arc == 'top' && B.X() <= 0)
			arc = board.create('arc', [O, B1, B],highlightst);
		if (arc) arc.setAttribute({fillOpacity:0});
		}
	if(ch.p.v) {
		B2 = board.create('glider', [ch.p.x, -ch.p.y, c], highlightst);
		
		B2.setAttribute(ch.p)
		board.create('segment',[B,B2],dashst);
		if (ch.p.arc == 'left' && B.Y() >= 0 || ch.p.arc == 'right' && B.Y() <= 0)
			arc = board.create('arc', [O, B, B2],highlightst);
		if (ch.p.arc == 'right' && B.Y() >= 0 || ch.p.arc == 'left' && B.Y() <= 0)
			arc = board.create('arc', [O, B2, B],highlightst);
		if (arc) arc.setAttribute({fillOpacity:0});
		}
	
	//board.update();
	return p;
	

}
