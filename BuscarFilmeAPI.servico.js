(function(){

	angular
		.module('Locadora')
		.service('BuscarFilmeAPI', BuscarFilmeAPI)

	BuscarFilmeAPI.$inject = ['$http', '$q'];

	function BuscarFilmeAPI($http, $q){
		var servico = this;

		servico.Buscar = function(sNome) {
			var resultado = $q.defer();

			var urlAPI = 'http://essearch.allocine.net/br/autocomplete?q=' + sNome;

			$http.get(urlAPI).then(function(resposta) {

				var lista = resposta.data.map(function(filmeAPI) {

						return {
							tipo: filmeAPI.entitytype,
							titulo: (filmeAPI.title1) ? filmeAPI.title1 : filmeAPI.title2,
							urlCapa: (filmeAPI.thumbnail) ? filmeAPI.thumbnail : filmeAPI.thumbnail="http://br.web.img1.acsta.net/c_160_214/commons/emptymedia/empty_photo_small.jpg",
							infoAdicional: (filmeAPI.metadata) ? filmeAPI.metadata.map(function(metadataAPI) {
								return {
									legenda: (metadataAPI.property=="director") ? metadataAPI.property="Diretor" : (metadataAPI.property=="productionyear") ? metadataAPI.property="Ano de Produção" : metadataAPI.property,
									descricao: metadataAPI.value
								}
							}) : null
						}
				});

				resultado.resolve(lista);
			}, function() {
				resultado.reject()
			});

			return resultado.promise;
		}
	}
})();
