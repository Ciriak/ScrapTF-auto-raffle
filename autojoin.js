// ==UserScript==
// @name         Scrap.tf auto join
// @namespace    http://scrap.tf
// @version      0.1
// @description  enter something useful
// @author       CYRIAQU3
// @match        https://scrap.tf/*
// @grant        none
// ==/UserScript==

$(document).ready(function()
{
	scanHash();
});

function scanHash()
{
	var h = window.location.hash;
	var url = window.location.href;
	if(url == "https://scrap.tf/raffles")
	{
		console.log("scanning the raffles...");
		scanRaffles();
		var sri = setInterval(function(){scanRaffles();},5000);
		setTimeout(function(){location.reload();},30000);	// reload the page after 30 sec
	}

	if(h == "#join")
	{
		console.log("Joining raffle...");
		joinRaffle();
	}
	else
	{
		window.close();
	}
}

function scanRaffles()
{
	$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	$(".panel-raffle").each(function()
	{
		var o = $(this).css("opacity");
		if(o == "0.6")
		{
			$(this).hide();
		}
		else
		{
			var r = $(this).attr("id");
			var raffleId = r.replace("raffle-box-","");
			window.open(window.location.href+"/"+raffleId+"#join");
			$(this).css("opacity","0.6").hide();
		}
	});
}

function joinRaffle()
{
	window.opener.focus();
	var onclick = $("#raffle-enter").attr('onclick');
	eval("var sc = function(){"+onclick+"}");
	sc();
	window.location.hash = "#";
	setTimeout(function(){window.close();},10000);	// close the page after 10 sec
}