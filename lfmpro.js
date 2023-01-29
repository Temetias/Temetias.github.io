const SEASON = 96; // LFM PRO Season 9
const DROP_ROUNDS = 2;

document.addEventListener("DOMContentLoaded", async () => {
  buildHTML(buildDriverData(await fetchApiData()));
});

async function fetchApiData() {
  const seasonRaceIds = (
    await fetch(
      `https://api2.lowfuelmotorsport.com/api/v2/seasons/getRecentSessions/${SEASON}`
    ).then((res) => res.json())
  ).data.map((r) => r.race_id);

  return Promise.all(
    seasonRaceIds.map(async (rid) =>
      (
        await fetch(`https://api2.lowfuelmotorsport.com/api/race/${rid}`).then(
          (res) => res.json()
        )
      ).race_results_splits
        .map((rrs) => rrs.GT3.OVERALL)
        .flat()
    )
  );
}

function buildDriverData(seasonRaces) {
  const driversBundle = {};
  for (const raceResults of seasonRaces) {
    raceResults.forEach((result) => {
      const { vorname, nachname } = JSON.parse(result.driver_data);
      driversBundle[result.steamid] = {
        name: `${vorname} ${nachname}`,
        points: [
          ...(driversBundle[result.steamid]?.points || []),
          Number(result.points),
        ],
        car: result.car_name,
      };
    });
  }
  for (const key in driversBundle) {
    driversBundle[key].correctedPoints = getCorrectedPoints(
      driversBundle[key].points
    );
  }
  return driversBundle;
}

function getCorrectedPoints(pointsArr, iterations = 0) {
  if (iterations >= DROP_ROUNDS || pointsArr.length <= DROP_ROUNDS)
    return pointsArr.reduce((acc, cur) => acc + cur, 0);
  const [, ...nextPointsArr] = pointsArr.sort((a, b) => a - b);
  return getCorrectedPoints(nextPointsArr, iterations + 1);
}

function buildHTML(driversBundle) {
  const standingsEntryRow =
    document.getElementsByClassName("standings-entry")[0];
  standingsEntryRow.remove();
  const standingsBody = document.getElementsByClassName("standings-body")[0];
  Object.entries(driversBundle)
    .sort(
      ([, driver1], [, driver2]) =>
        driver2.correctedPoints - driver1.correctedPoints
    )
    .forEach(([, driver]) => {
      const newEntryRow = standingsEntryRow.cloneNode(true);
      newEntryRow.querySelector(".standings-entry-name").innerHTML =
        driver.name;
      newEntryRow.querySelector(".standings-entry-car").innerHTML = carImage(
        driver.car
      );
      newEntryRow.querySelector(".standings-entry-races-driven").innerHTML =
        driver.points.length;
      newEntryRow.querySelector(".standings-entry-points").innerHTML =
        Math.round(driver.points.reduce((acc, cur) => acc + cur, 0));
      newEntryRow.querySelector(".standings-entry-points-corrected").innerHTML =
        Math.round(driver.correctedPoints);
      standingsBody.append(newEntryRow);
    });
}

function carImage(car) {
  let carUrl = car.replace(/ .*/, "").toLowerCase();
  switch (carUrl) {
    case "mercedes-amg":
      carUrl = "mercedes";
    case "amr":
      carUrl = "aston_martin";
  }
  const url = `https://lowfuelmotorsport.com/assets/img/manufacturers/thumbnails/dark/${carUrl}.png`;
  return /* html */ `<img src="${url}" alt="${car}" >`;
}
