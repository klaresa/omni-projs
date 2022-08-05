repos = [];

class App {
    constructor(){
        // pq nao funciona???
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');
        this.inputEl = document.querySelector('input[name=repository]');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async request(repo){
        let promise = function () {
            return new Promise(function (resolve) {
               let xhr = new XMLHttpRequest();
               let base_URL = `https://api.github.com/users/${repo}`;
               xhr.open('GET', base_URL);
               xhr.send();
               xhr.onreadystatechange = function () {
                   if (xhr.readyState === 4 ){
                       if (xhr.status === 200){
                           resolve(JSON.parse(xhr.responseText));
                       } else {
                           alert('n existe');
                       }
                   }
               }
            });
        };

        await promise().then(function (response) {

            let {avatar_url, login, bio,html_url} = response;
            repos.push({
                avatar_url, login, bio, html_url
            });

        }).catch(function (error) {
            alert(error)
        });

        this.setLoading(false);
        this.render();
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEL = document.createElement('span');
            loadingEL.appendChild(document.createTextNode('Carregando...'));
            loadingEL.setAttribute('id', 'loading');
            this.formEl.appendChild(loadingEL);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();
        this.setLoading();

        let repo = this.inputEl.value;
        if (repo.length === 0){
            return;
        }

       this.request(repo);
    }

    render(){
        this.listEl.innerHTML = '';

        repos.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.login));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();


oioioi = "allan";