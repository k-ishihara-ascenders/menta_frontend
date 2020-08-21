'use strict';

$(function() {

	// 名前のコピー
	const copyText = function() {
		const name = $('#name').val();
		$('#name2').val(name);
	}

	// チェックボックス（OK）のコピー
	const copyChck = function() {
		const chck = $('#chck').prop('checked');

		$('#chck2').prop('checked', chck);
	}

	// チェックボックス（趣味）のコピー
	var dumpCheckbox = function() {
		$('.checkHobby input').each(function() {
			const chck = $(this).prop('checked');
			const hobbyName = $(this).attr('name');

			$(".checkHobby2 input[name=" + hobbyName + "2]").prop('checked', chck);
		});
	};

	// ラジオボタン（性別）のコピー
	const copyRadio = function() {
		const sexVal = $('input[name="sex"]:checked').val();
		console.log(sexVal);
		$('input[name="sex2"]').val([sexVal]);
	}

	// セレクトボックス（リスト）のコピー
	const copySelect = function() {
		const lstVal = $('#lst').val();
		$('#lst2').val(lstVal);
	}

	// テキストエリア（自由記入）のコピー
	const copyPal = function() {
		const freeVal = $('#free').val();
		$('#free2').val(freeVal);
	}

	const copyAll =  () =>  {
		copyText();
		copyChck();
		dumpCheckbox();
		copyRadio();
		copySelect();
		copyPal();
	};

	$('#btnCopy').click(copyAll);


	// === バリデートの処理 ==
	const checkBlank = () => {
		// 名前のバリデート
		if($('#name').val() == '') {
			alert('名前が空です');
			return true;
		}

		// チェックボックスのバリデート
		if($('input[id=chck]:checked').val() === undefined) {
			alert('チェックボックスが選択されてません');
			return true;
		}

		// ラジオボタンのバリデート
		if($('input[name=sex]:checked').val() === undefined) {
			alert('ラジオボタンが選択されてません');
			return true;
		}

		// セレクトボックスのバリデート
		if($('#lst').val() === null) {
			alert('セレクトボックスが選択されてません');
			return true;
		}

		// 自由欄のバリデート
		if($('#free').val() == '') {
			alert('自由欄が空です');
			return true;
		}

	}

	$('#f').submit(function() {
		checkBlank();
		if(checkBlank) {
			console.log('stop');
			return false;
		}
	});
});