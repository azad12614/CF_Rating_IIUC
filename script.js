fetch(
  "https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=true"
)
  .then((data) => {
    return data.json();
  })
  .then((list) => {
    console.log(list.result[0]);
    let Table0 = "";
    let Table = "";
    let i = 1;
    list.result.map((coder) => {
      if (coder.organization == "International Islamic University Chittagong") {
        Table0 += `<tr><td scope="row">${i}</th></tr>`;

        Table += `<tr>
        <td scope="row">${i}</th>
        <td><a href="https://codeforces.com/profile/${coder.handle}" target="_blank">${coder.handle}</a></td>
        <td>${coder.firstName}</td>
        <td>${coder.maxRating}</td>
        <td>${coder.maxRank}</td>
        <td>${coder.rating}</td>
        <td>${coder.rank}</td>
        </tr>`;
        i = i + 1;
      }
    });
    document.getElementById("body0").innerHTML = Table0;
    document.getElementById("body").innerHTML = Table;
  });

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
      if (n == 0 || n == 3) {
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
