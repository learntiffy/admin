export class AppConstants {
    static readonly USER_STATUSES = ["ACTIVE", "PENDING"];
    static readonly AREA_STATUSES = ["ACTIVE", "INACTIVE"];
    static readonly SUBAREA_STATUSES = ["ACTIVE", "INACTIVE"];
    static readonly ITEM_STATUSES = ["ACTIVE", "INACTIVE"];
    static readonly ORDER_STATUSES = ["ORDERED", "DELIVERED"];
    static readonly ITEM_TYPES = ["SABJI", "ROTI", "DAL", "RICE", "SPECIAL"];
    static readonly MEAL_TYPES = ["LUNCH", "DINNER"];

    static readonly DAYS_OPS = [
        { name: "3 days", value: 3 },
        { name: "7 days", value: 7 },
        { name: "15 days", value: 15 },
        { name: "20 days", value: 20 },
        { name: "30 days", value: 30 },
        { name: "45 days", value: 45 },
    ]
};

export enum MenuDay {
    TODAY_LUNCH = "Today's Lunch",
    TODAY_DINNER = "Today's Dinner",
    TOMO_LUNCH = "Tomorrow's Lunch",
    TOMO_DINNER = "Tomorrow's Dinner",
}