export class cardMatch {

    constructor(element) {
        this.element = element
        this.container1 = document.createElement('div');
        this.container1_1 = document.createElement('div');
        this.container1_2 = document.createElement('div');
        this.container1_3 = document.createElement('div');

        this.imgTeamA = document.createElement('img');
        this.nameTeamA = document.createElement('h3');

        this.groupeTeam = document.createElement('h2');
        this.stade = document.createElement('h2');
        this.imgTeamB = document.createElement('img');
        this.nameTeamB = document.createElement('h3');

        this.btnModif = document.createElement('button');
        this.btnSupprime = document.createElement('button');

        return this.initCard()

    }

    initCard() {
        this.container1.setAttribute('class', 'container1');

        this.imgTeamA.src = this.element.imgA;
        this.nameTeamA.innerText = this.element.teamA

        this.groupeTeam.innerText = this.element.groupe;
        this.stade.innerText = this.element.stade;


        this.imgTeamB.src = this.element.imgB;
        this.nameTeamB.innerText = this.element.teamB

        this.container1_1.append(this.nameTeamA, this.imgTeamA),
            this.container1_2.append(this.groupeTeam, this.stade),
            this.container1_3.append(this.nameTeamB, this.imgTeamB),

            this.container1.append(this.container1_1, this.container1_2, this.container1_3)

        this.btnModif.innerText = "Modifier";

        this.btnSupprime.innerText = "Supprimer";


        this.container1.append(this.btnModif, this.btnSupprime);


        this.btnModif.addEventListener('click', (event) => {
            window.dispatchEvent(new CustomEvent("openModal", {
                detail: {
                    element: this.element
                },
            })
            );
        });


        this.btnSupprime.addEventListener('click', (event) => {

            window.dispatchEvent(new CustomEvent("deleteCard", {
                detail: {
                    _id: this.element._id
                },
            })
            );
        })
        return this.container1
    }
}