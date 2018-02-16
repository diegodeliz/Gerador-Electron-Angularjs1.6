function Generator() {
    this._id = '';
    this.destino = 'C:\\Program Files\\NDDigital\\eForms_NFCe\\Agent Service_';
    this.tipoEmissao = '1';
    this.tipoEnvio = '1';
    this.agentes = 1;
    this.serie = 500;
    this.numero = 10;
    this.quantidade = 10;
    this.nomenclatura = 'NDDDDL1000001001#';
    this.fuso = -2;
    this.sleep = 3000;
    this.cancelamento = '';
    this.ped_ajuste = '';
    this.nota = [];
    this.jdbc = [];
    this.socket = [];
}

module.exports = Generator;