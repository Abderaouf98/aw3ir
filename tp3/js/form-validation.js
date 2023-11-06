function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

window.onload = function () {

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
                // Réinitialiser le message d'erreur
                //messageErreur.textContent = "";
                // Soumettre le formulaire si la validation est réussie
                //formulaire.submit();
                modalTitleDisplay.textContent = "Bienvenu, " + champNom.value + " " + champPrenom.value;
                modalBodyeDisplay.textContent = "Vous êtes nés le " + champDate.value + " et vous habitez";
                var mapImage = document.createElement('img');
                var mapURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(champAdresse.value)
                    + "&markers=color:red%7Clabel:C%7C" + encodeURIComponent(champAdresse.value)
                    + "&zoom=13&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
                mapImage.src = mapURL;
                modalBodyeDisplay.appendChild(mapImage);

                var additionalMessage = document.createElement('p');
                var linkToGoogleMaps = document.createElement('a');

                linkToGoogleMaps.href = "https://www.google.com/maps/search/" + encodeURIComponent(champAdresse.value);
                linkToGoogleMaps.innerHTML = champAdresse.value;
                additionalMessage.appendChild(linkToGoogleMaps);

                modalBodyeDisplay.appendChild(additionalMessage);

                var myModalDisplay = new bootstrap.Modal(document.getElementById('myModal-Display'));
                myModalDisplay.show();
            }

            /*if (ErrorMSG.length !== 0 || ErrorMail.length !== 0 || ErrorDate.length !== 0) {
                if (champNom.value !== "" && champPrenom.value !== "" && champAdresse.value !== "")
                    modalBody.innerHTML = ErrorMSG + ErrorMail;
                else {
                    if (ErrorMSG === "") {
                        if (ErrorDate !== "") modalBody.innerHTML = ErrorDate + ErrorMail;
                        else modalBody.innerHTML = ErrorMail;
                    }
                    else modalBody.innerHTML = ErrorMSG + "doit avoir au moins 5 caractères<br>" + ErrorDate + ErrorMail;
                }

                var myModal = new bootstrap.Modal(document.getElementById('myModal'));
                myModal.show();
            }*/
        }
    }

    // Écouter l'événement "submit" du formulaire
    formulaire.addEventListener("submit", validerFormulaire);

};