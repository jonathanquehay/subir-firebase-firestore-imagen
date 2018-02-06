var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    projectId: ''
};
firebase.initializeApp(config);
var db = firebase.firestore();





// var storage = firebase.app().storage("gs://orgacadem2018.appspot.com").ref('imagenes');
//var store = firebase.storage().ref('imagenes');

var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref()

var subida = document.getElementById("subir");
var archivo = document.getElementById("archivo").addEventListener("change", subir);
var URL;
var file;


function subir (e) {
    
    console.log("entrando");
    file = e.target.files[0]; // use the Blob or File API
    var spaceRef = storageRef.child('imagenes/' + file.name).put(file);
    var referencia = storageRef.child('imagenes/' + file.name);
    spaceRef.on('state_changed', function(snapshot){
        var progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        subida.style.width = progreso + '%';
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        URL = spaceRef.snapshot.downloadURL;
        console.log(URL);
        console.log(file.name);
    });
    
}



function borrarimagen(x) {
    // var aborrar = storageRef.child('imagenes/'+ x);
    console.log(x);
    /* x.delete().then(function() {
        console.log("Borrrado");
    }).catch(function(error) {
        // Uh-oh, an error occurred!
    });*/
    
}


btnGuardar = document.getElementById("guardar").addEventListener("click", guardar);
function guardar() {
    var primerNombre = document.getElementById('pnombre').value;
    var segundoNombre = document.getElementById('snombre').value;
    var edad = document.getElementById('e').value;
    
    db.collection("imagenes").add({
        primerNombre: primerNombre,
        segundoNombre: segundoNombre,
        edad: edad,
        url:URL,
        nombre:file.name
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('pnombre').value = '';
        document.getElementById('snombre').value = '';
        document.getElementById('e').value = '';
    })
    .catch(function(error) {
    });
    
}

var tabla = document.getElementById('tabla');
db.collection("imagenes").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().primerNombre}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.id}</td>
        <td>${doc.data().primerNombre}</td>
        <td>${doc.data().segundoNombre}</td>
        <td>${doc.data().edad}</td>
        <td><img width=80% src=${doc.data().url} alt=""></td>
        <td>
        <button onclick="borrar('${doc.id}', '${doc.data().nombre}')"><i class="material-icons blue-text">delete</i></button>
        </td>
        </tr>
        `;
    });
});

function borrar(id, key) {
    db.collection("imagenes").doc(id).delete().then(function() {
        var desertRef = storageRef.child('imagenes/'+key);
    
    // Delete the file
    desertRef.delete().then(function() {
        console.log('Archivo borrado');
    }).catch(function(error) {
        // Uh-oh, an error occurred!
    });
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
}