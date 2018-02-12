function Generator() {
    this._id = '';
    this._idNota = '';
    this.origem = '';
    this.nota = '';
    this.origemName = '';    
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
    this.empresa = 'NDD';
    this.cnpj = '06255692000103';
    this.ie = '111111111111';
    this.host = "localhost";
    this.user = 'root';
    this.password = 'vertrigo';
    this.database = 'nfce';
    this.table = 'nfceinput';
    this.ipSocket = 'localhost';
    this.porta = '8081';
    this.out = 'C:\Users\diego.liz\Desktop\Aplicação TCP-IP\out';
}

module.exports = Generator;