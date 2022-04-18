
import { cardMatch } from "./cardMatch.js";

export class listeMatchs {
    _container = document.querySelector('#M');

    constructor() {
        this.listMatchs = [];
        this.fetchListMatch();
        this.addBtnMatch = document.querySelector('.AddMatch');
        this.addBtnMatch.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent("openModal")
            );
        })

        window.addEventListener("deleteCard", this.supprimMatch)


    }


    // Fonction pour afficher tous les matchs stockés dans la bdd
    fetchListMatch() {

        const optionsGET =
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        };


        fetch("/listMatch/", optionsGET)
            .then((res) => {

                if (res.ok) return res.json()
                return Promise.reject(res);
            }).then((response) => {

                this.listMatchs = response
                this.listMatchs.forEach(element => {

                    this._container.append(new cardMatch(element))
                })
            })
    }


    // Action pour supprimer le match
    supprimMatch = (e) => {

        let indexMatch = this.listMatchs.findIndex((match) => match._id === e.detail._id)
        const optionsDELETE =
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(e.detail)
        };


        fetch("/listMatch/delete", optionsDELETE)
            .then((res) => {
                if (res.ok) {

                    this._container.removeChild(this._container.children[indexMatch])
                    return res
                };
                return Promise.reject(res);
            }).then((response) => {
                // console.log(response);
            }).catch((error) => {
                console.log('Error fetch /delete', error);
            });



    }

}
