/*
	gr	= {
			ticks:{ //attributes for x axis
				scale: Math.PI,
    			scaleSymbol: '&pi;',	},
			f: Math.tan, //потом сделать [fun]
			points: [{
				x: -Math.PI/4,
				hidden:false,
				withLabel:true,
				name:'B', 
				xlabel: katex.renderToString('-\\pi/4'),
				ylabel: '',
				hiddenTick:false
				}],
			asymptotes: [-Math.PI/2,Math.PI/2,-3/2*Math.PI,3/2*Math.PI],
			hasymptotes: [],
			hidden: false
		};
*/

JXG.Board.prototype.graph = function(gr) {

var addPoint = function(x) {
  p.push(brd.create('point',
              [x,fun(x)],graphst));
  //p.setAttribute('');
  brd.update();
}

var brd = this;
var xs = [];

//axes
var ax = board.create('axis',[[0,0],[1,0]], { ticks:gr.ticks}),      		
    ay = board.create('axis',[[0,0],[0,1]], { ticks:gr.ticksy});

ax.setAttribute(axst);
ay.setAttribute(axst);

fun = gr.f;
for (var i = 0; i < gr.points.length; i++)
	{	xs.push(gr.points[i].x);	}

brd.suspendUpdate();

//Function
var f = brd.create('functiongraph', [fun, gr.minX, gr.maxX], graphst);


//drawing points
var p = [];
for (var i = 0; i < xs.length; i++)
{	
	p.push( addPoint(xs[i]) );
	with (gr.points[i]){
		p[i].setAttribute({ visible:!hidden,
				withLabel:withLabel,
				name:name});
	//dashed lines and labels
		if (typeof(hiddenTick) !== 'undefined'&&!hiddenTick) { //console.log(xs[i],fun(xs[i]));
			brd.create('segment', [[xs[i],fun(xs[i])],[xs[i],0]], dashst);
			brd.create('segment', [[xs[i],fun(xs[i])],[0,fun(xs[i])]], dashst); 
			if (typeof(xlabel) !== 'undefined') brd.create('text',[xs[i],0,xlabel],_n);
			if (typeof(ylabel) !== 'undefined')brd.create('text',[0,fun(xs[i]),ylabel],_e);
		}
		if (typeof(fillOpacity) != 'undefined') p[i].setAttribute({fillOpacity:fillOpacity});
	}
}

//asymptotes
if (gr.asymptotes){
	for (var i = 0; i < gr.asymptotes.length; i++) {
		l = brd.create('line', [[gr.asymptotes[i],0],[gr.asymptotes[i],1]], dashst);
		l.setStraight(true,true);
	}
}

//horizontal asymptotes
if (gr.hasymptotes){
for (var i = 0; i < gr.hasymptotes.length; i++) {
		l = brd.create('line', [[0,gr.hasymptotes[i]],[1,gr.hasymptotes[i]]], dashst);
		l.setStraight(true,true);
	}
}
brd.unsuspendUpdate();
return p;
	

}
