var app = angular.module("blog", ["ngRoute"]);

//Criação de suas controllers
app.controller("home", function ($scope) {
    $scope.nome = "artigos";
});

app.controller("leitura", function ($scope, $http, $route) {
    //Variaveis importantes
    $scope.ArtigoAtual = $route.current.params.art;
    $scope.ArtigoCarregado = "";
    $scope.Sugeridos = [];

    //Lendo o arquivo para carregar o Artigo
    var Artigo_Carregdo = $http
        .get("../data/artigos.json")
        .then(function (response) {
            response.data.forEach((element) => {
                if (element.id == $scope.ArtigoAtual) {
                    $scope.ArtigoCarregado = element;
                }
            });
        });

    //Lendo o Arquivo para carregar Artigos Sugeridos
    var Artigo_Carregdo = $http
        .get("../data/artigos.json")
        .then(function (response) {
            response.data.forEach((element) => {
                //Identificar quais artigos tem assuntos semelhantes e fazer o seu retorno
                if ($scope.ArtigoCarregado.Assunto == element.Assunto) {
                    $scope.Sugeridos.push(element);
                }
            });
        });
});

app.controller("artigo", function ($scope, $http) {
    //Funcao de clique
    $scope.teste = function (TituloArtigo) {
        alert(TituloArtigo);
    };

    // Lista para armazenar o Json
    $scope.Lista_Add = [];
    // Ler o Json criado
    var Lista_ler = $http.get("../data/artigos.json").then(function (response) {
        response.data.forEach((element) => {
            //Adicionando os elementos do Json para a Lista
            $scope.Lista_Add.push(element);
        });
    });
});

//Criação de suas controllers
app.controller("artigos_base", function ($scope, $http) {
    $scope.ListaArtigos = [];

    var Artigo_Carregdo = $http
        .get("../data/artigos.json")
        .then(function (response) {
            response.data.forEach((element) => {
                $scope.ListaArtigos.push(element);
            });
        });

    //Remover o Anuncio inicial no Blog
    $scope.CloseFunc = function () {
        document.getElementsByClassName("mini_screen")[0].remove();
        document.getElementsByClassName("Black_screen")[0].remove();
    };
});

//Configuração de criação de Rotas
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./templates/main.html",
            controller: "artigos_base",
        })
        .when("/artigos", {
            templateUrl: "./templates/artigos.html",
            controller: "artigo",
        })
        .when("/leitura/:art", {
            templateUrl: "./templates/leitura.html",
            controller: "leitura",
        })
        .when("/sobre", {
            templateUrl: "./templates/sobre.html"
        });
});

const nome = document.getElementById('nome');

nome.addEventListener('mouseenter', ()=> {
nome.textContent = 'LFootball';
});

nome.addEventListener('mouseleave',()=>{
    nome.textContent = 'LF';
});