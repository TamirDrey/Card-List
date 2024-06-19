export interface ICard {
    cardNumber: string,
    dateOfIssue: Date,
    cardImage: string,
    isBlocked: boolean,
    isDigital: boolean,
    creditLimit: number,
    bankCode: number
}