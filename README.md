#  Consultar Estados e Municípios do Brasil - API IBGE 
Preenchimento do select do ESTADOS diretamente pelos dados oferecidos pelo IBGE
Popula de forma automática baseado no ESTADO selecionado, filtrando as cidades.

## Utilizando
Basta fazer o download do `CidadeEstado.js` e adicionar no seu projeto.

`` <script type="text/javascript" defer src="CidadeEstado.js" ></script> ``

`` <script type="text/javascript" defer src="CidadeEstado.min.js" ></script> ``  

<br/><br/>

O código utiliza dos selects seguindo do padrão abaixo: 

`` <select name="uf" required></select> ``

`` <select name="city" required></select> ``


## Código 
```
$(function() {

    //Busca na API do IBGE os estados e adiciona as opções com o ID referente ao seu estado (data-id)
    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (uf) {
        var options = '<option value="" selected disabled>– Selecione seu estado –</option>'; 
        
        //Ordem alfabetica dos estados
        var features = uf.sort((a,b) => {
            return (
              (a.nome < b.nome && -1) ||
              (a.nome > b.nome && 1) ||
              0
            ); 
        });


        for (var i = 0; i < features.length; i++) { 
            options += '<option data-id="' + features[i].id + '" value="' + features[i].nome + '" >' + features[i].nome + '</option>'; 
        }

        $("select[name='uf']").html(options);

    });
    
    // Assim que houver mudança no select do estado, executa o script populando com a cidade referente ao ID (data-id) da opção selecionada.
    // Fazendo assim uma busca dos municipios/cidades oferecida diretamente pela API do IBGE.
    
    $("select[name='uf']").change(function () {
        if ($(this).val()) {
            const ufSelect = $(this).find("option:selected").attr('data-id');

            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ufSelect+'/municipios', {id: $(this).find("option:selected").attr('data-id')}, function (city) {            
                var options = '<option value="" disabled selected>– Selecione sua cidade –</option>';

                for (var i = 0; i < city.length; i++) {
                    options += '<option value="' + city[i].nome + '" >' + city[i].nome + '</option>';
                }

                $("select[name='city']").html(options);

            });

        } else {
            $("select[name='city']").html('<option value="" disabled selected>– Selecione sua cidade –</option>');
        }

    });

});
```
