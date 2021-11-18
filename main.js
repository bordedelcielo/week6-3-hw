const getF1Data = async (year, round) =>{
    try{
        let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`);
        return response.data
    }
    catch{
        throw Error("Invalid API Call for some reason")
    }
}

const driverTable = document.querySelector("#driverTable");
let driverTableBody = document.querySelector("#driverTableBody");
// const queryWarning = document.getElementById("invalidQueryWarning")
console.log(driverTableBody)

function addDriverRow(pos, name, nation, sponsor, points, page, sponsorPage){
    let html = `<tr><td>${pos}</td>
    <td><a href=${page} target="_blank" rel="noopener noreferrer">${name}</a></td>
    <td>${nation}</td><td><a href=${sponsorPage} target="_blank" rel="noopener noreferrer">${sponsor}</td>
    <td>${points}</td></tr>` 
    driverTableBody.innerHTML += html;
}

function clearDriverTable(){
    // queryWarning.style.display = 'none'
    driverTable.style.display = 'table'
    driverTable.innerHTML = `<thead class="thead-dark"><tr>
    <th scope="col">Position</th>
    <th scope="col">Name</th>
    <th scope="col">Nationality</th>
    <th scope="col">Sponsor</th>
    <th scope="col">Points</th>
    </tr>
    </thead>
    <tbody id="driverTableBody"></tbody>`
    driverTableBody = document.querySelector("#driverTableBody")
    driverTableBody.innerHTML = ""
}

function hideDriverTable(){
    // queryWarning.style.display = 'block'
    driverTable.style.display = 'none'
    alert("Invalid Query")
}

const form = document.querySelector('#raceDataForm')

// Add event listener for submit event
form.addEventListener('submit', async ( event ) => {
    event.preventDefault();
    let year = event.path[0][0].value;
    let round = event.path[0][1].value;
    try{
    let f1data = await getF1Data(year, round);
    console.log("retrieved:", f1data);
    console.log("test");
    top7drivers = f1data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 7)
    // console.log(top7drivers)
    clearDriverTable();
    
        top7drivers.forEach( driver =>{
            addDriverRow(driver.position,
                `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                driver.Driver.nationality, 
                driver.Constructors[0].name,    
                driver.points, 
                driver.Driver.url,
                driver.Constructors[0].url)
        })
    }
    catch{
        hideDriverTable();
    }
})

