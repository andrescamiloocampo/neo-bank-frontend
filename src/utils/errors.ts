interface LogModel {
    id: string;
    message: string;
}

export const errorLogs:LogModel[] = [
    {
        id: '1',
        message: 'Try catch execption'
    },
    {
        id: '2',
        message: 'Fetch exception'
    }    
]

export const infoLogs:LogModel[] = [
    {
        id: '1',
        message: 'Error: Unable to create a pocket with a value greater than that of the account'
    }
];