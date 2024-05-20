export const getCellTextColor = (columnId: string) => {
    switch (columnId) {
        case 'id':
            return 'text-body-light'
        default:
            return 'text-base'
    }
}

export const getCellAlignment = (columnId: string) =>
    columnId === 'actions' ? 'text-end' : ''
