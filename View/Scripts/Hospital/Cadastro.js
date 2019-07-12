$(function () {
    function obterTodos() {
        $.ajax({
            url: '/hospital/obtertodos',
            method: 'get',
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    var dado = data[i];


                    var linha = document.createElement("tr");
                    var colunaCodigo = document.createElement("td");
                    colunaCodigo.innerHTML = dado.Id;

                    var colunaRazaoSocial = document.createElement("td");
                    colunaRazaoSocial.innerHTML = dado.RazaoSocial;

                    var colunaCNPJ = document.createElement("td");
                    colunaCNPJ.innerHTML = dado.Cnpj;

                    var colunaAcao = document.createElement("td");
                    var botaoEditar = document.createElement("button");
                    botaoEditar.innerHTML = "<i class=\"fas fa-pen\"></i> Editar";
                    botaoEditar.classList.add("btn", "btn-primary", "mr-3");

                    var botaApagar = document.createElement("button");
                    botaApagar.innerHTML = "<i class=\"fas fa-trash\"></i> Apagar";
                    botaApagar.classList.add("btn", "btn-danger");

                    colunaAcao.appendChild(botaoEditar);
                    colunaAcao.appendChild(botaApagar);

                    linha.appendChild(colunaCodigo);
                    linha.appendChild(colunaRazaoSocial);
                    linha.appendChild(colunaCNPJ);
                    linha.appendChild(colunaAcao);
                    document.getElementById("lista-hospitais").appendChild(linha);
                }

            },
            error: function (data) {
                alert("DEU RUIM");
            }
        })
    }

    $("#hospital-botao-salvar").on("click", function () {
        $nome = $("#campo-razao-social").val();
        $faturamento = $("#campo-faturamento").val();
        $cnpj = $("#campo-cnpj").val();
        $particular = $("#campo-privado").prop("checked");

        $.ajax({
            method: "post",
            url: "/Hospital/store",
            data: {
                RazaoSocial: $nome,
                Faturamento: $faturamento,
                Cnpj: $cnpj,
                Particular: $particular
            },
            success: function (data) {
                $("#modalCadastroHospital").modal("hide");
                obterTodos();
            },
            error: function (data) {
                console.log("ERRO");
            }
        })
    });

    $("#modalCadastroHospital").on("show.bs.modal", function () {
        $("#campo-razao-social").val("");
        $("#campo-cnpj").val("");
        $("#campo-faturamento").val("");
        $("#campo-privado").prop("checked", false)
    });

    obterTodos();
});