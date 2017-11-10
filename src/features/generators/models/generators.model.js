function Generator() {
    this._id = '';
    this.origem = '';
    this.origemName = '';    
    this.destino = 'C:\Program Files\NDDigital\eForms_NFCe\Agent Service_';
    this.tipoEmissao = '1';
    this.agentes = 1;
    this.serie = 500;
    this.numero = 10;
    this.quantidade = 10;
    this.nomenclatura = 'NDDDDL1000001001#';
    this.fuso = -2;
    this.sleep = 3000;
    this.cnpj = '06255692000103';
    this.ie = '111111111111';
}

module.exports = Generator;