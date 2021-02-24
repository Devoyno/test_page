// click event handler
$(".dog-button").click(function (event) {
  event.preventDefault();
  var queryURL = "https://dog.ceo/api/breeds/image/random";
  getRandomDog(queryURL);
});

// clear dogs
$(".dog-clear").click(function (event) {
  event.preventDefault();
  document.getElementById("dog-pic").innerHTML = "";
});

// function to display img
function getRandomDog(queryURL) {
  $(".dog-pic").empty();

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var dogImg = response.message;
    $(".dog-pic").prepend("<div><img src=" + dogImg + "></img></div>");
    $("img").addClass("image-line");
  });
}

// Stock Search

$("#stock-button").click(function (event) {
  event.preventDefault();
  var stockInput = $(".stock-search").val().trim();
  var queryURL = `https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/${stockInput}?comparisons=MSFT%2C%5EVIX&events=div%2Csplit`;
  getStock(queryURL);
});

function getStock(queryURL) {
  $(".stock").empty();

  const settings = {
    async: true,
    crossDomain: true,
    url: queryURL,
    method: "GET",
    headers: {
      "x-rapidapi-key": "2f7924fb01msh4fbdfa9b15e7833p14f96cjsn630ddff5cada",
      "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var stockQuote = response.chart.result[0].meta.regularMarketPrice;
    console.log(stockQuote);
    $(".stock").html(`<div><h2>Currently $${stockQuote}</h2></div>`);
  });
}

// mortgage calculator

$("#calc-sub").click(function (event) {
  event.preventDefault();
  var loanAmount = $("#loan-amount").val().trim();
  var rate = $("#interest-rate").val();
  var term = $("#term").val();
  var queryURL = `https://realtor.p.rapidapi.com/mortgage/calculate?hoi=0.1&tax_rate=0.1&downpayment=0&price=${loanAmount}&term=${term}&rate=${rate}`
  getPayment(queryURL);
})

function getPayment(queryURL) {
$(".payment").empty()

const settings = {
	"async": true,
	"crossDomain": true,
	"url": queryURL,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2f7924fb01msh4fbdfa9b15e7833p14f96cjsn630ddff5cada",
		"x-rapidapi-host": "realtor.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
  console.log(response);
  var monthly = response.mortgage.principal_and_interest;
  $(".payment").html(`<div><h2>$${monthly}</h2></div>`)
});
}