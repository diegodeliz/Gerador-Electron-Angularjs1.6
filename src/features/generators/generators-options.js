module.exports = {
    data: [
        {
            description: 'Nome',
            property: 'name',
            type: 'text',
            placeholder: 'Digite o nome'
        },
        {
            description: 'Código Fiscal',
            property: 'ficalCode',
            type: 'number'
        },
        {
            description: 'E-mail',
            property: 'email',
            type: 'text'
        },
        {
            description: 'Status',
            property: 'isActivated',
            type: 'radio'
        },
         {
            description: 'Tipo Fical',
            property: 'ficalType',
            type: 'select',
            options: [
                {
                    value: 1,
                    description: 'Individual'
                },
                {
                    value: 2,
                    description: 'Empresarial'
                }
            ]
        },
        {
            description: 'Status',
            property: 'isActivated',
            type: 'radio'
        }
    ],
    type: 'Cliente'
};
