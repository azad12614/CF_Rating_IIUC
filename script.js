function displayLoader() {
  const loader = document.getElementById("loader");
  loader.style.visibility = "visible";
  //loader.style.border = "black";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.visibility = "collapse";
}

function fetching(handle) {
  let Ratings = ["0", "0", "0", "0", "0", "0", "0", "0"];
  fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    .then((data) => {
      return data.json();
    })
    .then((list1) => {
      list1.result.map((problem) => {
        if (problem.verdict == "OK" && problem.problem.rating <= 1500) {
          let Rating = problem.problem.rating;
          Rating = (Rating - 800) / 100;
          Ratings[Rating] = Number(Ratings[Rating]) + 1;
        }
      });
    });
  return Ratings;
}

fetch("https://codeforces.com/api/user.ratedList")
  .then((data) => {
    return data.json();
  })
  .then((list) => {
    let Table0 = "";
    let Table = "";
    let i = 1;
    list.result.map((coder) => {
      if (
        coder.organization == "IIUC" ||
        coder.organization == "Internation islamic university chittagong" ||
        coder.organization ==
        "International Islamic University Chittagong,71" ||
        coder.organization == "International Islamic University Chittagong"
      ) {
        let Ratings = ["0", "0", "0", "0", "0", "0", "0", "0"];
        Ratings = fetching(coder.handle);

        console.log(Ratings);

        Table0 += `<tr><td scope="row" style="padding: 10px;">${i}</th></tr>`;

        Table += `<tr>
        <td scope="row">${i}</th>
        <td><a href="https://codeforces.com/profile/${coder.handle}" target="_blank">${coder.handle}</a></td>
        <td>${coder.firstName}</td>
        <td>${coder.maxRating}</td>
        <td>${coder.maxRank}</td>
        <td>${coder.rating}</td>
        <td>${coder.rank}</td>
        <td>${Ratings[0]}</td>
        <td>${Ratings[1]}</td>
        <td>${Ratings[2]}</td>
        <td>${Ratings[3]}</td>
        <td>${Ratings[4]}</td>
        <td>${Ratings[5]}</td>
        <td>${Ratings[6]}</td>
        <td>${Ratings[7]}</td>
        </tr>`;
        i = i + 1;
      }
    });
    document.getElementById("body0").innerHTML = Table0;
    document.getElementById("body1").innerHTML = Table;
    hideLoader();
  });

function sortTable(n) {
  displayLoader();
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
      if (n == 0 || n == 3 || n == 5) {
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
  setTimeout(hideLoader(), 2000);
}
