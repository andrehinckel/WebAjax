$(function () {

    $id = -1;

    $(".table").on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/hospital/obterpeloid/' + $id,
            method: 'get',
            success: function (data) {
                $id = data.Id;
                $("#campo-razao-social").val(data.RazaoSocial);
                $("#campo-faturamento").val(data.Faturamento);
                $("#campo-cnpj").val(data.Cnpj);
                $("#modalCadastroHospital").modal("show");
            }
        })
    });

    $("#campo-pesquisa").on("keyup", function (e) {
        if (e.keyCode == 13) {
            obterTodos();
        }
    });
    function obterTodos() {
        $busca = $("#campo-pesquisa").val();
        $("#lista-hospitais").empty();
        $.ajax({
            url: '/hospital/obtertodos',
            method: 'get',
            data: {
                busca: $busca
            },
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
                    botaoEditar.classList.add("btn", "btn-primary", "mr-3", "botao-editar");
                    botaoEditar.innerHTML = "<i class=\"fas fa-pen\"></i> Editar";
                    botaoEditar.setAttribute("data-id", dado.Id);

                    var botaApagar = document.createElement("button");
                    botaApagar.innerHTML = "<i class=\"fas fa-trash\"></i> Apagar";
                    botaApagar.classList.add("btn", "btn-danger", "botao-apagar");
                    botaApagar.setAttribute("data-id", dado.Id);

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
        if ($id == -1) {
            inserir();
        } else {
            alterar();
        }
    });

    function alterar() {
        $nome = $("#campo-razao-social").val();
        $faturamento = $("#campo-faturamento").val();
        $cnpj = $("#campo-cnpj").val();
        $particular = $("#campo-privado").prop("checked");

        $.ajax({
            method: "post",
            url: "/Hospital/update",
            data: {
                RazaoSocial: $nome,
                Faturamento: $faturamento,
                Cnpj: $cnpj,
                Particular: $particular,
                Id: $id
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroHospital").modal("hide");
                obterTodos();
            },
            error: function (data) {
                console.log("ERRO");
            }
        })
    }

    function inserir() {
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
                $id = -1;
                $("#modalCadastroHospital").modal("hide");
                obterTodos();
            },
            error: function (data) {
                console.log("ERRO");
            }
        })
    }

    function limparCampos() {
            $("#campo-razao-social").val("");
            $("#campo-cnpj").val("");
            $("#campo-faturamento").val("");
            $("#campo-privado").prop("checked", false);
    }

    $(".table").on("click", ".botao-apagar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/hospital/apagar/' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            },
            error: function (data) {
                console.log('Deu ruim filhão');
            }
        });
    });

    obterTodos();
});