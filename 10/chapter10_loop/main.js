'use strict';

$(function() {
	const calc = () => {
		const text = $('#source').val();
		const textArr = text.split('\n');

		const resArr = [];
		for(let i = 0; i < textArr.length; i++ ) {
			const src = textArr[i];
			let res = '';
			if(src == "") continue;

			try{
				res = eval(src);
			} catch(e){
				res = e;
			}
			resArr.push(src + '=' + res);

			const resText = resArr.join('\n');
			$('#result').val(resText);
		}
	}

	$('#btnCalc').click(calc);
});

