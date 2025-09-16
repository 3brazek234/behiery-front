'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePost } from '@/hooks/UsePost'
import toast from 'react-hot-toast'
import { useCart } from '@/store/cartStore'
import CitySelect from '@/components/selects/CitySelect'
import { Label } from '@/components/ui/label'

export default function CheckoutAddressPage() {
  const { postData, loading } = usePost<any>()
  const {clearCart} = useCart()

  const form = useForm({
    defaultValues: {
      address_id: null,
      first_name: '',
      last_name: '',
      phone: '',
      district_id: '24',
      address: '',
      address_name: '',
      email: '',
      main_instructions: '',
      floor: '',
      apartment: '',
      remember: '0',
    },
  })

  const onSubmit = async (values: any) => {
    try {
      postData('/orders/checkout', {...values, remember: values.remember === true ? 1 : 0}).then((res: any) => {
        toast.success('تم ارسال الطلب بنجاح')
        clearCart()
      })
    } catch (e:any) {
      const err = e?.response?.data?.message || e.message;
      toast.error(err)
    }
  }

  return (
    <div dir="rtl" className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">بيانات التوصيل</h1>
        <p className="text-muted-foreground mb-8">
          من فضلك أدخل بيانات الشحن بدقة لإتمام الطلب.
        </p>

        <Form {...form}>
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
                      <Input {...field} disabled={loading} />
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
                      <Input {...field} disabled={loading} />
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
                      <Textarea rows={1} className='min-h-10' {...field} disabled={loading} />
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

            <FormField
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
            />

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
                {loading ? 'جارٍ الحفظ...' : 'حفظ العنوان'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
