"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/UsePost";
import toast from "react-hot-toast";
import { useCart } from "@/store/cartStore";
import CitySelect from "@/components/selects/CitySelect";
import { useGet } from "@/hooks/useGet";
import Link from "next/link";

export default function CheckoutAddressPage() {
  const { postData, loading } = usePost<any>();
  const { clearCart, items } = useCart();
  const [summary, setSummary] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      address_id: null,
      first_name: "",
      last_name: "",
      phone: "",
      district_id: "",
      address: "",
      address_name: "",
      email: "",
      main_instructions: "",
      floor: "",
      apartment: "",
      remember: "0",
    },
  });

  const onSubmit = async (values: any) => {
    const valuesNew = form.getValues();

  if (
    valuesNew.district_id === "" ||
    valuesNew.first_name.trim() === "" ||
    valuesNew.last_name.trim() === "" ||
    valuesNew.phone.trim() === "" ||
    valuesNew.address.trim() === "" ||
    valuesNew.address_name.trim() === ""
  ) {
  toast.error("الرجاء اكمال جميع الحقول");
  return;
}
    try {
          const res = await postData("/orders/checkout", values);
          if (!res?.response?.data?.message || res?.status === 200) {
            toast.success("تم ارسال الطلب");
            console.log(res); // دايماً ده الأحدث
          }else {
            toast.error(res?.response?.data?.message);
          }
    } catch (e: any) {
      const err = e?.response?.data?.message || e.message;
      toast.error(err);
    }
  };

  useEffect(() => {
    if(form.watch("district_id") && items?.length <= 0) {
      toast.error("لا يوجد منتجات في السلة")
    } else {
      if (form.watch("district_id")) {
        postData("/orders/receipt", {
          type: "cart",
          is_gift: items.some((item) => item.is_gift === 1) ? 1 : 0,
          address_id: null,
          district_id: form.watch("district_id"),
        }).then((res: any) => {
          setTimeout(() => {
            setSummary(res?.data);
          }, 500);
          // toast.success('تم ارسال الطلب بنجاح')
        });
      }
    }
  }, [form.watch("district_id")]);
  return (
    <div
      dir="rtl"
      className="container mx-auto py-8 px-4 flex flex-col md:flex-row-reverse gap-4"
    >
    
        <div className="w-full max-w-md">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>

          {items?.length > 0 && summary &&  <>
            {Object.entries(summary?.items_price).map(([name, price]) => (
              <div key={name} className="flex justify-between mb-2">
                <span>{name}</span>
                <span>{price as any} جنيه</span> {/* هنا لازم يكون price */}
              </div>
            ))}

            {/* السعر الأساسي */}
            <div className="flex justify-between mb-2">
              <span>إجمالي المنتجات</span>
              <span>{summary.price} جنيه</span>
            </div>

            {/* الهدايا */}
            {summary.gift_count > 0 && (
              <div className="flex justify-between mb-2">
                <span>هدايا ({summary.gift_count})</span>
                <span>{summary.gift_price} جنيه</span>
              </div>
            )}

            {/* الشحن */}
            <div className="flex justify-between mb-2">
              <span>الشحن</span>
              <span>
                {summary.free_shipping
                  ? "مجاني"
                  : `${summary.shipping_rate} جنيه`}
              </span>
            </div>

            {/* الضريبة */}
            <div className="flex justify-between mb-2">
              <span>الضريبة</span>
              <span>{summary.tax} جنيه</span>
            </div>

            {/* السعر النهائي */}
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>السعر النهائي</span>
              <span>{summary.total} جنيه</span>
            </div>
           </>}
          </div>
        </div>
      
      <div className=" mx-auto ">
        <h1 className="text-3xl font-bold text-primary mb-6">بيانات التوصيل</h1>
        <p className="text-muted-foreground mb-8">
          {
            items?.length <= 0 ? <div className="h-[50vh]">
              لا يوجد منتجات ف السلة يرجي الاضافة اولا
              <Link className="text-primary ps-2" href="/products">عرض المنتجات</Link>
            </div> : "من فضلك أدخل بيانات الشحن بدقة لإتمام الطلب."
          }
        </p>

       {items?.length > 0 && <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* الصف الأول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأول</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الاخير</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* الصف الثاني */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} disabled={loading} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={loading} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* المنطقة والعنوان */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="district_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المنطقة</FormLabel>
                    <CitySelect onSelect={(id) => field?.onChange(id)} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الشارع</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان التفصيلي</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} disabled={loading} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* تعليمات، الدور، الشقة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="main_instructions"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>تعليمات للمندوب</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={1}
                        className="min-h-10"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدور</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الشقة</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تذكر العنوان</FormLabel>
                  <div className='flex items-center gap-2'>
                    <FormControl>
                      <Input className='!size-4' type="checkbox"
            {...field} disabled={loading} />
                    </FormControl>
                      <span>تذكر العنوان</span>
                  </div>
                </FormItem>
              )}
            /> */}

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={loading}
              >
                إعادة تعيين
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "جارٍ الحفظ..." : "حفظ العنوان"}
              </Button>
            </div>
          </form>
        </Form>}
      </div>
    </div>
  );
}
