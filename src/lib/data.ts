import { Product } from "@/types/product"

export const products: Product[] = [
  {
    "id": 1,
    "name": {
      "en": "BJK",
      "ar": "بي چي كي"
    },
    "description": {
      "en": "\u003Ch3\u003E&nbsp;Notes:\u003C/h3\u003E\u003Cul\u003E\u003Cli\u003ETop: Green Apple\u003C/li\u003E\u003Cli\u003EHeart: Green Mint\u003C/li\u003E\u003Cli\u003EBase: Vanilla\u003C/li\u003E\u003C/ul\u003E\u003Ch3\u003EWho is it for?\u003C/h3\u003E\u003Cul\u003E\u003Cli\u003EBGK For men who love to leave a strong impression from the very first moment.\u003C/li\u003E\u003Cli\u003EPerfect for outings, events, and important appointments.\u003C/li\u003E\u003C/ul\u003E\u003Ch3\u003EDescribed as:\u003C/h3\u003E\u003Cp\u003ESeductive – Modern – Long-lasting – Trendy – Youthful – With a bold signature, especially at events.\u003C/p\u003E",
      "ar": "\u003Ch3 dir=\"rtl\"\u003Eالمكونات:\u003C/h3\u003E\u003Cul dir=\"rtl\"\u003E\u003Cli\u003Eالمقدمة: تفاح أخضر\u003C/li\u003E\u003Cli\u003Eالوسط: نعناع أخضر\u003C/li\u003E\u003Cli\u003Eالقاعدة: فانيلا\u003C/li\u003E\u003C/ul\u003E\u003Cp dir=\"rtl\"\u003Eمناسب لمين؟\u003C/p\u003E\u003Cul dir=\"rtl\"\u003E\u003Cli\u003Eعطر بي جي كي للرجال اللي بيحبوا يسيبوا انطباع قوي من أول لحظة.\u003C/li\u003E\u003Cli\u003Eمثالي للخروجات، المناسبات، والمواعيد المهمة.\u003C/li\u003E\u003C/ul\u003E\u003Cp dir=\"rtl\"\u003Eيوصف بأنه:\u003C/p\u003E\u003Cul dir=\"rtl\"\u003E\u003Cli\u003Eمغري – عصري – ثابت – تريندي – شبابي – له طابع خاص وأوضح في المناسبات.\u003C/li\u003E\u003C/ul\u003E"
    },
    "is_active": 1,
    "images": [
      "https://test.behiryperfume.com/storage/products/01K07ZFZ32KW60PMRHD71Y9JA6.jpg"
    ],
    "price_gm": "18.00",
    "gm_ml": "1.00",
    "qr_code": "https://test.behiryperfume.com/storage/qr_codes/product_1.png",
    "video": null,
    "gender": "men",
    "age_group": "youth",
    "rate": "4.93",
    "brand": 1,
    "free_shipping": 0,
    "created_at": "2025-07-15T21:22:47.000000Z",
    "updated_at": "2025-08-14T00:07:05.000000Z",
    "in_wishlist": false,
    "reviews_count": 3,
    "in_cart": false,
    "types": [
      {
        "id": 1,
        "type": {
          "en": "Morning",
          "ar": "صباحي"
        },
        "created_at": "2025-06-08T14:43:26.000000Z",
        "updated_at": "2025-06-08T14:43:26.000000Z",
        "pivot": {
          "product_id": 1,
          "type_id": 1
        }
      },
      {
        "id": 2,
        "type": {
          "en": "Evening",
          "ar": "مسائي"
        },
        "created_at": "2025-06-08T14:43:39.000000Z",
        "updated_at": "2025-06-08T14:43:39.000000Z",
        "pivot": {
          "product_id": 1,
          "type_id": 2
        }
      },
      {
        "id": 3,
        "type": {
          "en": "Citrus",
          "ar": "حمضي"
        },
        "created_at": "2025-06-08T14:43:52.000000Z",
        "updated_at": "2025-06-08T14:43:52.000000Z",
        "pivot": {
          "product_id": 1,
          "type_id": 3
        }
      }
    ],
    "jobs": [],
    "options": [
      {
        "id": 1,
        "product_id": 1,
        "mix_id": null,
        "size": "100",
        "price": "550.00",
        "quantity": null,
        "sale_price": null,
        "sale_percentage": null,
        "wholesale_price": null,
        "created_at": "2025-07-15T21:22:47.000000Z",
        "updated_at": "2025-08-13T14:46:35.000000Z"
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": {
          "en": "Summer",
          "ar": "صيفي"
        },
        "description": null,
        "picture": "https://test.behiryperfume.com/storage",
        "created_at": "2025-06-08T14:40:05.000000Z",
        "updated_at": "2025-06-08T14:40:05.000000Z",
        "pivot": {
          "product_id": 1,
          "category_id": 1
        }
      },
      {
        "id": 2,
        "name": {
          "en": "Winter",
          "ar": "شتوي"
        },
        "description": null,
        "picture": "https://test.behiryperfume.com/storage",
        "created_at": "2025-06-08T14:40:24.000000Z",
        "updated_at": "2025-06-08T14:40:24.000000Z",
        "pivot": {
          "product_id": 1,
          "category_id": 2
        }
      },
      {
        "id": 4,
        "name": {
          "en": "Western and French",
          "ar": "غربي و فرنسي"
        },
        "description": null,
        "picture": "https://test.behiryperfume.com/storage",
        "created_at": "2025-06-08T14:41:20.000000Z",
        "updated_at": "2025-06-08T14:41:20.000000Z",
        "pivot": {
          "product_id": 1,
          "category_id": 4
        }
      }
    ],
    "reviews": [
      {
        "id": 23,
        "user_id": 4,
        "product_id": 1,
        "package_id": null,
        "book_id": null,
        "mix_id": null,
        "rate": "5.00",
        "review": "جميل جدا وثابت❤️",
        "created_at": "2025-08-13T10:14:22.000000Z",
        "updated_at": "2025-08-13T10:14:22.000000Z",
        "user_name": "Pierre Sameh",
        "user": {
          "id": 4,
          "name": "Pierre Sameh",
          "email": "pierresameh0@icloud.com",
          "phone": null,
          "user_type": "user",
          "joined_with": "email",
          "status": 1,
          "email_verified_at": "2025-07-18T13:04:41.000000Z",
          "phone_verified_at": null,
          "referral_link": "FJASJXGEIY",
          "referred_by": null,
          "points": 0,
          "invites": 0,
          "created_at": "2025-07-18T13:00:17.000000Z",
          "updated_at": "2025-08-10T09:36:43.000000Z"
        }
      },
      {
        "id": 27,
        "user_id": 82,
        "product_id": 1,
        "package_id": null,
        "book_id": null,
        "mix_id": null,
        "rate": "4.90",
        "review": "ريحته فى منتهى الروعة وفواحة جدا",
        "created_at": "2025-08-13T13:56:33.000000Z",
        "updated_at": "2025-08-13T13:56:33.000000Z",
        "user_name": "ماجد وليم",
        "user": {
          "id": 82,
          "name": "ماجد وليم",
          "email": "megoosmba4@gmail.com",
          "phone": null,
          "user_type": "user",
          "joined_with": "email",
          "status": 1,
          "email_verified_at": "2025-08-12T12:04:05.000000Z",
          "phone_verified_at": null,
          "referral_link": "H1EFHTBZQD",
          "referred_by": null,
          "points": 0,
          "invites": 0,
          "created_at": "2025-08-12T12:03:11.000000Z",
          "updated_at": "2025-08-12T12:04:05.000000Z"
        }
      },
      {
        "id": 28,
        "user_id": 99,
        "product_id": 1,
        "package_id": null,
        "book_id": null,
        "mix_id": null,
        "rate": "4.90",
        "review": "بصراحه انا احب اشكر استاذي ومعلمي استاذ محمد البحيري علي التطبيق دة أكثر من رائع بصراحه انا جربت عطر bgkبصراحة قنبله فوحان وثابت وفواح استاذمحمد البحيري احسن مصمم برفانات في الواطن العربي وعطر bgkعطر جامد وفواح👍👍👍👍👍👍👍👍",
        "created_at": "2025-08-13T22:33:53.000000Z",
        "updated_at": "2025-08-14T00:07:05.000000Z",
        "user_name": "شادي عبد الغني",
        "user": {
          "id": 99,
          "name": "شادي عبد الغني",
          "email": "shadylovez67@gmail.com",
          "phone": null,
          "user_type": "user",
          "joined_with": "email",
          "status": 1,
          "email_verified_at": "2025-08-13T22:33:02.000000Z",
          "phone_verified_at": null,
          "referral_link": "WAAIC3EKA3",
          "referred_by": null,
          "points": 0,
          "invites": 0,
          "created_at": "2025-08-13T16:20:34.000000Z",
          "updated_at": "2025-08-13T22:33:02.000000Z"
        }
      }
    ]
  },
];