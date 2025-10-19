"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDelete } from "@/hooks/UseDelete";
import { UsePut } from "@/hooks/UsePut";
import { useCart } from "@/store/cartStore";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CartPage() {
  const { items, total, toggleFetch } = useCart();
  const { putData } = UsePut();
  const { deleteData } = useDelete();
  console.log(items);
  // تخزين الكميات لكل منتج بالـ id
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    items.reduce((acc: Record<number, number>, item) => {
      acc[item.id as any] = item.quantity;
      return acc;
    }, {})
  );

  // اجعل الـ useEffect فوق أي return عشان يفضل ثابت
  useEffect(() => {
    toggleFetch();
  }, [toggleFetch]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-lg w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            عربة التسوق الخاصة بك
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            عربة التسوق فارغة حالياً.
          </p>
          <Link href="/products" passHref>
            <button className="bg-[#F15D22] hover:bg-[#F15D22] text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
              متابعة التسوق
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const updateCart = async (data: {
    id: number;
    quantity?: number;
    is_gift?: 1 | 0;
  }) => {
    putData(`/cart/${data.id}`, data).then(() => {
      toast.success("تم تحديث السلة بنجاح");
      setTimeout(() => {
        toggleFetch();
      }, 1000);
    });
  };

  const deleteCart = async (id: number) => {
    deleteData(`/cart?product_id=${id}`).then(() => {
      toast.success("تم حذف المنتج من السلة بنجاح");
      setTimeout(() => {
        toggleFetch();
      }, 1000);
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">السلة</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-4 border pb-4 px-2"
            >
              <Image
                src={item.product?.images[0]}
                alt={item.product.name_ar}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow pt-2">
                <h2 className="text-lg font-semibold">
                  {item.product.name_ar}
                </h2>
                <div className="md:space-y-2 grid md:grid-cols-2 text-sm">
                  <p className="text-gray-600">الحجم : {item?.option?.size}</p>
                  <p className="text-gray-600">السعر : {item?.option?.sale_price || item?.option?.price} جنيه</p>
                  <p className="text-gray-600">الكمية : {item?.quantity}</p>
                  <p className="text-gray-600">اجمالي : {item?.price} جنيه</p>
                </div>
                <div className="flex items-center gap-x-2 mt-2">
                  <Checkbox
                    id={`gift-${item.id}`}
                    defaultChecked={item.is_gift === 1}
                    onCheckedChange={(e) =>
                      updateCart({ id: item.id, is_gift: e ? 1 : 0 })
                    }
                  />
                  <Label htmlFor={`gift-${item.id}`}>تحب/ي يكون هدية</Label>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newQuantity = Math.max(
                        1,
                        (quantities[item.id] || 1) - 1
                      );
                      setQuantities((prev) => ({
                        ...prev,
                        [item.id]: newQuantity,
                      }));
                      updateCart({ id: item.id, quantity: newQuantity });
                    }}
                  >
                    -
                  </Button>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      setQuantities((prev) => ({
                        ...prev,
                        [item.id]: newQuantity,
                      }));
                    }}
                    onBlur={() => {
                      updateCart({
                        id: item.id,
                        quantity: quantities[item.id],
                      });
                    }}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newQuantity = (quantities[item.id] || 1) + 1;
                      setQuantities((prev) => ({
                        ...prev,
                        [item.id]: newQuantity,
                      }));
                      updateCart({ id: item.id, quantity: newQuantity });
                    }}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteCart(item?.product?.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">ملخص السلة</h2>
            <div className="flex justify-between mb-2">
              <span>السعر</span>
              <span>{total.toFixed(2)} جنيه</span>
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>الشحن</span>
              <span>مجاني</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>السعر النهائي</span>
              <span>{total.toFixed(2)} جنيه</span>
            </div> */}
            <Link href="/checkout">
              <Button className="w-full mt-6">اكمال الطلب</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
