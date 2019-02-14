document.getElementById("cardSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("cardInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = 'https://api.magicthegathering.io/v1/cards?name=' + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      let name = "";
      let same = true;
      for (let i=0; i<json.cards.length; i++) {
         if (name === "")
          name = json.cards[i].name;
        else {
          if (json.cards[i].name === name)
            continue;
          else {
            same = false;
          }
        }
      }
      if (same) {
        results += '<h2>CMC: ' + json.cards[0].cmc + "</h2>";
        if (json.cards[0].colors.length>1)
          results += '<h2>Colors: ';
        else {
          results += '<h2>Color: ';
        }
        for (let i=0; i<json.cards[0].colors.length; i++) {
           results += "<span class=" + json.cards[0].colors[i] + "Text>" + json.cards[0].colors[i] + "</span>";
           if (i!==json.cards[0].colors.length-1)
              results += "<span class=BlackText>,</span>";
        }
        results += "</h2>";
      }
      results += "<div class=grid>"
      for (let j = 0; j < json.cards.length; j++) {
        if (json.cards[j].imageUrl != null) {
          results += "<div class=card>";
          results += "<img src='" + json.cards[j].imageUrl + "' width='204' height='285'>";
          results += "</div>";
        }
      }
      results += "</div>"
      document.getElementById("cardResults").innerHTML = results;
    });
});
