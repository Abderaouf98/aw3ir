function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function calcNbChar(id) {


    const input = document.getElementById(id);
    const span = document.getElementById(`span-${id}`);
    span.textContent = input.value.length + " car.";
}

function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = '';

    for (const contact of contactList) {
        document.querySelector("table tbody").innerHTML +=
            `<tr>
    <td>${contact.name}</td>
    <td> ${contact.firstname} </td>
    <td> ${contact.date} </td>
    <td><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}" target="_blank">${contact.adress}</a></td>
    <td><a href="mailto:${contact.mail}?subject=Good Morning!&body=How are you doing?">${contact.mail}</a></td>
    <tr>`;
    }
    document.getElementById('List').textContent = `Liste des contacts (${contactList.length})`;
}
window.onload = function () {
    displayContactList();
    console.log("DOM ready!");

    // Récupérer le formulaire et le champ texte
    const formulaire = document.getElementById("MyForm");
    const champNom = document.getElementById("nom");
    const champPrenom = document.getElementById("prénom");
    const champDate = document.getElementById("date");
    const champAdresse = document.getElementById("adresse");
    const champEmail = document.getElementById("mail");



    //const messageErreur = document.getElementById("messageErreur");
    var modalBody = document.querySelector(".modal-body");
    var modalBodyGlobal = document.querySelector(".modal-body-global");
    var modalTitleDisplay = document.querySelector(".modal-title-Display");
    var modalBodyeDisplay = document.querySelector(".modal-body-Display");
    // Fonction de validation
    function validerFormulaire(event) {
        // Empêcher la soumission par défaut
        event.preventDefault();

        // Vérifier la longueur du champ texte
        var Total = "";
        var ErrorNom = "";
        var ErrorPrenom = "";
        var ErrorAdresse = "";
        var DateVide = "";
        var ErrorDate = "";
        var ErrorMail = "";
        var ErrorGlobal = "";
        const birthday = champDate.value
        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (champNom.value === "" && champPrenom.value === "" && champAdresse.value === "" && champEmail.value === "" && champDate.value === "") {
            ErrorGlobal = "Tous les champs sont obligatoires";
            modalBodyGlobal.textContent = ErrorGlobal;
            var myModalGlobal = new bootstrap.Modal(document.getElementById('myModalGlobal'));
            myModalGlobal.show();
        } else if (ErrorGlobal === "") {

            if (champNom.value.length < 5) ErrorNom = "Nom doit avoir au moins 5 caractères <br>";
            if (champPrenom.value.length < 5) ErrorPrenom = "Prénom doit avoir au moins 5 caractères <br>";
            if (champAdresse.value.length < 5) ErrorAdresse = "Adresse doit avoir au moins 5 caractères <br>";
            if (!validateEmail(champEmail.value)) ErrorMail = "Mail n'est pas valide <br>";
            if (champDate.value === "") DateVide = "La date de la naissance est necessaire <br>";
            if (birthdayTimestamp > nowTimestamp) ErrorDate = "La date de la naissance n'est pas encore venu";

            Total = ErrorNom + ErrorPrenom + DateVide + ErrorDate + ErrorAdresse + ErrorMail;

            if (Total !== "") {
                modalBody.innerHTML = Total;
                var myModal = new bootstrap.Modal(document.getElementById('myModal'));
                myModal.show();
            } else {
                const message = document.getElementById('message');
                message.textContent = "Contact ajouté avec succès.";
                message.style.display = 'block';
                contactStore.add(champNom.value, champPrenom.value, champDate.value, champAdresse.value, champEmail.value);
                displayContactList();
            }
        }
    }

    // Écouter l'événement "submit" du formulaire
    formulaire.addEventListener("submit", validerFormulaire);
    document.getElementById('buttonGPS').addEventListener('click', function () {
        getLocation();
    });
    document.getElementById('btnReset').addEventListener('click', function () {
        contactStore.reset();
        message.textContent = "La liste a été réinitialisée";
        message.style.display = 'block';
        displayContactList();
    });
};










