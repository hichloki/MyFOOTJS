
export class MatchForm {


    constructor() {
        this.closeBtn = document.querySelector('.btnFermer');
        this.addBtn = document.querySelector('.btnForm')
        this.form = document.querySelector('#formulaireMatch');
        this.formD = document.querySelector('.formd');
        this.teamAInput = document.querySelector('#TeamA');
        this.imgAInput = document.querySelector('#imageA');
        this.teamBInput = document.querySelector('#TeamB');
        this.imgBInput = document.querySelector('#imageB');
        this.groupeInput = document.querySelector('#groupe');
        this.stadeInput = document.querySelector('#stade');

        this.matchstocker = null;

        window.addEventListener('openModal', this.open)
        this.closeBtn.addEventListener('click', this.close)

        this.addBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this.submitMatch(this.teamAInput.value, this.imgAInput.value, this.teamBInput.value, this.imgBInput.value, this.groupeInput.value, this.stadeInput.value);

        })
    }

    open = (e) => {

        this.formD.style.display = "block"
        if (e.detail) {
            this.matchstocker = e.detail.element;
            this.teamAInput.value = this.matchstocker.teamA;
            this.imgAInput.value = this.matchstocker.imgA;
            this.teamBInput.value = this.matchstocker.teamB
            this.imgBInput.value = this.matchstocker.imgB;
            this.groupeInput.value = this.matchstocker.groupe;
            this.stadeInput.value = this.matchstocker.stade;
        }
    }

    close = (event = null) => {
        if (event) {
            event.preventDefault();
        }
        this.matchstocker = null;
        this.formD.style.display = "none";
        this.teamAInput.value = "";
        this.imgAInput.value = "";
        this.teamBInput.value = "";
        this.imgBInput.value = "";
        this.groupeInput.value = "";
        this.stadeInput.value = "";
    };



    submitMatch(teamA, imgA, teamB, imgB, groupe, stade) {
        const objMatch = { teamA, imgA, teamB, imgB, groupe, stade }

        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',

        };
        if (!this.matchstocker) {
            options.method = 'POST';
            options.body = JSON.stringify(objMatch)
            fetch("/ajoutMatch", options)
                .then((res) => {
                    if (res.ok) {

                        return res
                    };
                    return Promise.reject(res);
                })
                .catch((error) => {
                    console.log('Error fetch ajout match', error);
                });
        } else {
            options.method = 'PUT';
            options.body = JSON.stringify({ ...objMatch, id: this.matchstocker._id })

            fetch("/updateMatch", options)
                .then((res) => {

                    if (res.ok) {

                        return res
                    };
                    return Promise.reject(res);
                })
                .catch((error) => {
                    console.log('Error fetch ajout match', error);
                });


        }

        this.close();
    }


};