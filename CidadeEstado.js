
/* 
    Consultar Estados e Municípios do Brasil - API IBGE 
    Preenchimento do select do ESTADOS diretamente pelos dados oferecidos pelo IBGE
    Popula de forma automática baseado no ESTADO selecionado, filtrando as cidades.

    @author Gabriel Araujo
    @date 02/09/2020

*/

$(function() {
    


    $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', function (uf) {
        var options = '<option value="" selected disabled>– Selecione seu estado –</option>'; 
        for (var i = 0; i < uf.length; i++) { 
            options += '<option data-id="' + uf[i].id + '" value="' + uf[i].nome + '" >' + uf[i].nome + '</option>'; 
        }

        $("select[name='uf']").html(options);

    });

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