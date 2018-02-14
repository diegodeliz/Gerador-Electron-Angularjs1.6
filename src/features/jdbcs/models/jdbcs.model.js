function Jdbc() {
    this._id = '';
    this.nome = '';
    this.host = 'localhost';
    this.usuario = 'root';
    this.senha = 'vertrigo';
    this.banco = 'nfce';
    this.entrada = 'nfceinput';
    this.saida = 'nfceoutput';
    this.destino = '';
    this.captura_retorno = '';
    this.apaga_saida = '';
}

module.exports = Jdbc;