/**
 * 問題：
 * 四則演算を行うメソッドを持ったオブジェクトを
 * クロージャーを用いて作成してみてください。
 *
 * 四則演算を行うメソッド（plus, minus, multiply, divide）
 * を実行すると以下のようにコンソールに出力されます。
 *
 * const calc = calcFactory(10); // 初期値を10として設定
 * calc.plus(5);      // 出力結果 "10 + 5 = 15"
 * calc.minus(3);     // 出力結果 "15 - 3 = 12"
 * calc.multiply(3);  // 出力結果 "12 x 3 = 36"
 * calc.divide(2);    // 出力結果 "36 / 2 = 18"
 *
 * ※前に行った計算結果をもとに四則演算を行います。
 * ※四則演算は"+","-","*","/"を数値ではさんで計算を行います。
 */


const calc = calcFactory(10);

calc.plus(5);
calc.minus(3);
calc.multiply(3);
calc.divide(2);

function calcFactory(num){
	function plus(value) {
		num = num + value;
		console.log(num);
	}
	function minus(value) {
		num = num - value;
		console.log(num);
	}
	function multiply(value) {
		num = num * value;
		console.log(num);
	}
	function divide(value) {
		num = num / value;
		console.log(num);
	}
	return {
		plus: plus,
		minus: minus,
		multiply: multiply,
		divide: divide
	}
}

