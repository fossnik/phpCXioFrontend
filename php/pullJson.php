<?php

	if (isset($_POST['market']))
		$MarketID = $_POST['market'];
	else
		$MarketID = 18;

	$url = 'https://www.coinexchange.io/api/v1/getorderbook?market_id=' . $MarketID;
//	$url = '../json/.Sample-ltc-orderbook.json';

	// pull down json
	$htmlStr = file_get_contents($url);

	// output api results as a file (not working)
//	$fileName = './json/' . $MarketID . '-' . time() . '.json';
//	echo file_put_contents($filename, $htmlStr);

	echo $htmlStr;
?>
