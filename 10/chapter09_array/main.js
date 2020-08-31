'use strict';

$(function() {
	const arrId = [];
	const arrDom = [];
	const arrName = [];
	const arrArea = [];

	$('#lstBdy tr').each(function(index) {
		// それぞれ配列に格納
		arrId.push(index);
		arrDom.push($(this));
		arrName.push($(this).eq(0).text());
		arrArea.push($(this).eq(1).text());
	});

	const sortName = function(a, b) {
		const nameA = arrName[a];
		const nameB = arrName[b];
		return nameA > nameB ? 1 : -1;
	}

	const sortArea = function(a, b) {
		const areaA = arrArea[a];
		const areaB = arrArea[b];
		return areaA > areaB ? 1 : -1;
	}

	const reflect = function() {
		$('#lstBdy').empty();
		$.each(arrId, function(i, id){
			$('#lstBdy').append(arrDom[id]);
		});
	}

	$('#btnSortName').click(function() {
		arrId.sort(sortName);
		reflect();
	});

	$('#btnSortArea').click(function() {
		arrId.sort(sortArea);
		reflect();
	});

});

