import axiosApp from "@/lib/axios"
import { FullApiResponse, ProcessedProductsResponse, Product, ProductSales } from '@/types/product'

export const getProducts = async (url?: string) : Promise<Product[]> => {
  try {
    const res = await axiosApp.get(`${url || "/products"}`)

    return res?.data
  }
  catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductsSearch = async (searchParams: { [key: string]: string | undefined } = {}): Promise<Product[]> => {
  try {
    // تحويل searchParams إلى query string
    
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })

    // إرسال طلب GET مع المعايير
    const res = await axiosApp.get('/products/search', { params })
    
    return res?.data?.data?.products?.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}



export const getProductByID = async (id: number|string) : Promise<Product|null> => {
  try {
    const res = await axiosApp.get(`/products/get/${id}`)
    return res?.data?.data
  }
  catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const getProductsSales = async () : Promise<ProductSales> => {
  try {
    const res = await axiosApp.get(`/products/sales`)
    return res?.data
  }
  catch (error) {
    console.error('Error fetching product:', error)
    return {
      message: 'Error fetching product',
      data: []
    }
  }
}
// الـ type للـ response لو الـ API بيرجع pagination metadata


const API_BASE_URL = 'https://test.behiryperfume.com/api/products/search';
interface FetchProductsOptions {
  page?: number;
  limit?: number;
  category_id?: string; // مثلاً اسم الكاتيجوري
  gender?: 'men' | 'women' | 'unisex';
  min_price?: number;
  max_price?: number;
  sort?: string;
  type?: string;
  search?: string;
}
export async function getProductNew(
  options: FetchProductsOptions = {}
): Promise<ProcessedProductsResponse> { // 🚨 هنا بترجع ProcessedProductsResponse
  const { page = 1, limit = 12, category_id, gender, min_price, max_price, sort, type, search } = options;

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  if (category_id) params.append('category_id', category_id);
  if (gender) params.append('gender', gender);
  if (min_price !== undefined) params.append('min_price', min_price.toString());
  if (max_price !== undefined) params.append('max_price', max_price.toString());
  if (sort) params.append('sort', sort);
  if (type) params.append('type', type);
  if (search) params.append('search', search);

  const url = `${API_BASE_URL}?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate:  0 },
  });

  if (!res.ok) {
    // console.log(res); // ممكن تسجل الـ response عشان تشوف الـ error بالتفصيل
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  const result: FullApiResponse = await res.json(); // 🚨 الـ type الصحيح هنا

  if (!result.success) {
    throw new Error('API returned an unsuccessful status.');
  }

  // 🚨 هنا بنعمل parse للداتا اللي راجعة وبنرجعها بالـ structure اللي الـ component بيحتاجه
  const productsMeta = result.data.products;
  return {
    products: productsMeta.data,
    currentPage: productsMeta.current_page,
    totalPages: productsMeta.last_page, // 🚨 last_page هو عدد الصفحات
    totalItems: productsMeta.total, // 🚨 total هو إجمالي عدد المنتجات
  };
}

export const getMostSold = async () : Promise<Product[]> => {
  try {
    const res = await axiosApp.get(`/products/best-seller`)
    return res?.data
  }
  catch (error) {
    console.error('Error fetching product:', error)
    return []
  }
}