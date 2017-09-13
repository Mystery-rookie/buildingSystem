var width = document.documentElement.clientWidth;
	if(width>500){
		width=500;
	}
	console.log(document.body)
	document.body.style.width=width+"px";
	document.documentElement.style.fontSize = width/7.5 + 'px';