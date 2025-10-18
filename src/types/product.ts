export interface  Name {
  en: string;
  ar: string;
}

export interface  Description {
  en: string;
  ar: string;
}

export interface  Type {
  id: number;
  type: Name;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    type_id: number;
  };
}

export interface  Category {
  id: number;
  name: Name;
  description: string | null;
  picture: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    category_id: number;
  };
}

export interface  Option {
  id: number;
  product_id: number;
  mix_id: number | null;
  size: string;
  price: string;
  quantity: number | null;
  sale_price: string | null;
  sale_percentage: string | null;
  discount_percentage: Number | null;
  wholesale_price: string | null;
  original_price: string | null;
  created_at: string;
  updated_at: string;
}

export interface  User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_type: string;
  joined_with: string;
  status: number;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  referral_link: string;
  referred_by: string | null;
  points: number;
  invites: number;
  created_at: string;
  updated_at: string;
}

export interface  Review {
  id: number;
  user_id: number;
  product_id: number;
  package_id: number | null;
  book_id: number | null;
  mix_id: number | null;
  rate: string;
  review: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user: User;
}

export interface  Product {
  id: number;
  name: Name;
  description: Description;
  is_active: number;
  images: string[];
  price_gm: string;
  gm_ml: string;
  qr_code: string;
  video: string | null;
  gender: string;
  age_group: string;
  rate: string;
  brand: number;
  free_shipping: number;
  created_at: string;
  updated_at: string;
  in_wishlist: boolean;
  reviews_count: number;
  in_cart: boolean;
  types: Type[];
  jobs: any[]; // يمكن تحديده لاحقًا إذا كانت هناك بيانات
  options: Option[];
  categories: Category[];
  reviews: Review[];
}

export interface  ProductSales {
  message: string;
  data: Product[];
}
