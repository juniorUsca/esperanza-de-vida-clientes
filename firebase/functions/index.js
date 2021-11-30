const functions = require("firebase-functions");

const {DateTime, Settings} = require("luxon");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

Settings.defaultZone = "America/Lima";

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.makeKpis = functions.firestore.document("/clientes/{clientId}")
    .onCreate( async (snap, context) => {
      // Grab the current value of what was written to Firestore.
      const data = snap.data();

      // Access the parameter `{clientId}` with `context.params`
      functions.logger.log("makingKpis", context.params.clientId, data);

      // You must return a Promise when performing asynchronous tasks inside a
      // Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      // return snap.ref.set({uppercase}, {merge: true});

      const db = getFirestore();

      const ref = db.collection("kpis").doc("valores");

      const clientesDocument = await db.collection("clientes").get();
      const clientes = clientesDocument.docs.map((doc) => ({
        ...doc.data(),
      }));

      const edades = clientes.map((client) => ({
        fechaNacimiento: DateTime.fromJSDate(client.fechaNacimiento.toDate()),
      })).map((client) =>
        DateTime.now().diff(client.fechaNacimiento, "years").years,
      );

      const sumaEdades = edades.reduce(
          (acc, curr) =>
            acc + curr, 0);
      const cantidadEdades = edades.length;
      const promedioEdades = sumaEdades / cantidadEdades;

      let sumaErrores = 0;
      for (let i=0; i<cantidadEdades; i++) {
        sumaErrores +=
          (edades[i] - promedioEdades) * (edades[i] - promedioEdades);
      }
      const desviacionEstandarEdades = Math.sqrt(sumaErrores / cantidadEdades);

      await ref.set({
        sumaEdades,
        cantidadEdades,
        promedioEdades,
        desviacionEstandarEdades,
      }, {merge: true});
    });
