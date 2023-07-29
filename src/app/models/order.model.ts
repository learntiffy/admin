import { Address } from "./address.model";
import { Feedback } from "./feedback.model";
import { Item } from "./item.model";
import { User } from "./user.model";

export interface Order {
    _id: string,
    user: User,
    address: Address,
    feedback: Feedback,
    items: Item[],
    comment: string,
    amount: number,
    paymentMode: string,
    txnId: string,
    status: string,
    meal: string,
    mealDate: Date,
    orderDate: Date,
}
