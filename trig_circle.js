/*
ch	= {
			p: {
				x: x, y: y, name:'B', withLabel:false	},
			catet: {
				sx: {withLabel:true, name:x_name},
				h: 	{withLabel:true, name:y_name}		},
			angle: {
				withLabel:true, name:'alpha'	} 
			};
*/

JXG.Board.prototype.trigCircle = function(ch) {

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
	board.correctLabels(p, [ch.catet.sx.name,ch.catet.h.name,'']); //создаем метки с нужными параметрами
	//showing rectangle
	if (Math.abs(B.coords.usrCoords[2] * B.coords.usrCoords[1]) > 1e-5)
	{
		if (JXG.Math.Geometry.angle(B,X,O)>0) 
			rect = board.create('angle',[B,X,O],anglest);
		else
			rect = board.create('angle',[O,X,B],anglest);
	}	
}
	
var	r = board.create('segment', [O,B], highlightst),
	b = board.create('segment', [O,A], highlightst),
	AOB = board.create('angle',[A,O,B],anglehighlightst);

//set attributes from chart
	//point B
	B.setAttribute(ch.p);
		
	//angle
	if(ch.angle.name){
		AOB.name = katex.renderToString(ch.angle.name);
		AOB.setAttribute({withLabel:ch.angle.withLabel}); }


	
	//board.update();
	return p;
	

}
