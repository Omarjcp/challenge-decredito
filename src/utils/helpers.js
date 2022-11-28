import { preRequest } from "../DB/preRequest";
import { dictionaryTeams } from "./dictionary";

export const filterForKey = (arrayToFilter, keyToFilter, valueToFilter) => {
  return arrayToFilter.filter(
    (element) => element[keyToFilter] === valueToFilter
  );
};

let arrayFinal = [];

export const resultData = [
  {
    name: "Zona",
    subRows: arrayFinal,
  },
];

preRequest.forEach((data) => {
  let indexZona = 0;
  let objectZone = arrayFinal.find((el, i) => {
    indexZona = i;
    return el.name === data.NombreZona;
  });

  if (!objectZone) {
    let objectZonaToPush = {
      name: data.NombreZona,
      subRows: [
        {
          subRows: [
            {
              name: `${data.NomGerente}`,
              subRows: [{ name: data.NomVendedor, ...data }],
            },
          ],
          name: dictionaryTeams[data.EsMiniEmprendedor],
        },
      ],
    };

    arrayFinal.push(objectZonaToPush);
    return;
  } else {
    let indexBus = 0;
    let existBus = arrayFinal[indexZona].subRows.find((el, i) => {
      indexBus = i;
      return el.name === dictionaryTeams[data.EsMiniEmprendedor];
    });

    if (existBus) {
      let indexGerent = 0;

      let existGenerent = arrayFinal[indexZona].subRows[indexBus].subRows.find(
        (gerent, i) => {
          indexGerent = i;
          return gerent.name === data.NomGerente;
        }
      );

      if (existGenerent) {
        arrayFinal[indexZona].subRows[indexBus].subRows[
          indexGerent
        ].subRows.push({ name: data.NomVendedor, ...data });
        return;
      }

      arrayFinal[indexZona].subRows[indexBus].subRows.push({
        name: data.NomGerente,
        subRows: [{ name: data.NomVendedor, ...data }],
      });
      return;
    } else {
      arrayFinal[indexZona].subRows.push({
        name: dictionaryTeams[data.EsMiniEmprendedor],
        subRows: [
          {
            name: `${data.NomGerente}`,
            subRows: [{ name: data.NomVendedor, ...data }],
          },
        ],
      });
      return;
    }
  }
});

export const sumTotal = (arrayPrincipal, keyToSum) => {
  return arrayPrincipal
    .map((el) =>
      el.subRows.map((el) =>
        el.subRows.map((el) => sumElements(el.subRows, keyToSum))
      )
    )
    .flat(Infinity)
    .reduce((acc, curr) => acc + curr, 0);
};

export const sumElements = (arrayOfElemets, keyToSum) => {
  return arrayOfElemets.reduce(
    (acc, curr) => Number(acc) + Number(curr[keyToSum]),
    0
  );
};

export const sumForZone = (array, zone, keyToSum) => {
  return array[0].subRows
    .map((el) => {
      if (el.name === zone) {
        return el.subRows.map((el) =>
          el.subRows.map((el) =>
            el.subRows.reduce((total, row) => {
              return Number(total) + Number(row[keyToSum]);
            }, 0)
          )
        );
      }
      return 0;
    })
    .flat(Infinity)
    .reduce((acc, curr) => acc + curr, 0);
};

export const sumForTypeTeam = (array, team, keyToSum) => {
  return array
    .map((el) => {
      if (el.name === team) {
        return el.subRows.map((el) =>
          el.subRows.reduce((total, row) => {
            return Number(total) + Number(row[keyToSum]);
          }, 0)
        );
      }
      return 0;
    })
    .flat(Infinity)
    .reduce((acc, curr) => acc + curr, 0);
};

export const sumForSupervisor = (array, supervisor, keyToSum) => {
  return array
    .map((el) => {
      if (el.name === supervisor) {
        return el.subRows.reduce((total, row) => {
          return Number(total) + Number(row[keyToSum]);
        }, 0);
      }
      return 0;
    })
    .flat(Infinity)
    .reduce((acc, curr) => acc + curr, 0);
};

export const sumSubTotalZone = (el, sumForZone, data) => {
  //Next depth
  el = {
    ...el,
    subRows: el.subRows.map((element) => {
      return sumSubtotalTeams(el.subRows, element, sumForTypeTeam);
    }),
  };

  return objectParse(el, data, sumForZone);
};

const sumSubtotalTeams = (array, element, sumForTypeTeam) => {
  //Next depth
  element = {
    ...element,
    subRows: element.subRows.map((el) => {
      return sumSubtotalSupervisor(element.subRows, el, sumForSupervisor);
    }),
  };

  return objectParse(element, array, sumForTypeTeam);
};

const sumSubtotalSupervisor = (array, element, sumForSupervisor) => {
  //it don't have more depth
  return objectParse(element, array, sumForSupervisor);
};

const objectParse = (element, array, functionSum) => {
  return {
    ...element,
    Ingresadas: functionSum(array, element.name, "Ingresadas"),
    VentasMP: functionSum(array, element.name, "VentasMP"),
    Crucescoring: functionSum(array, element.name, "Crucescoring"),
    Objetivo: functionSum(array, element.name, "Objetivo"),
    Produccion: functionSum(array, element.name, "Produccion"),
    C2: functionSum(array, element.name, "C2"),
    C4: functionSum(array, element.name, "C4"),
    C5: functionSum(array, element.name, "C5"),
    C6: functionSum(array, element.name, "C6"),
    C7: functionSum(array, element.name, "C7"),
    C3: functionSum(array, element.name, "C3"),
    C8: functionSum(array, element.name, "C8"),
    C9: functionSum(array, element.name, "C9"),
    AnuladaTresYSiete: functionSum(array, element.name, "AnuladaTresYSiete"),
    AnuladaRechazada: functionSum(array, element.name, "AnuladaRechazada"),
    MesAnt: functionSum(array, element.name, "MesAnt"),
    MesAnt2: functionSum(array, element.name, "MesAnt2"),
    MesAnt3: functionSum(array, element.name, "MesAnt3"),
  };
};
