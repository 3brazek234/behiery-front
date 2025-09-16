'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Category, Type } from '@/types/product'

interface FilterProps {
  categories: Category[]
  types: Type[]
}

export function Filter({ categories, types }: FilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categoryId, setCategoryId] = useState<string>(searchParams.get('category_id') || '')
  const [bestSeller] = useState<string>(searchParams.get('best') || '')
  const [sales] = useState<string>(searchParams.get('sales') || '')
  const [gender, setGender] = useState<string>(searchParams.get('gender') || '')
  const [typeId, setTypeId] = useState<string>(searchParams.get('type') || '')
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [priceRange, setPriceRange] = useState<number[]>([
    parseFloat(searchParams.get('min_price') || '300'),
    parseFloat(searchParams.get('max_price') || '2000'),
  ])

  const updateFilters = () => {
    const params = new URLSearchParams()

    if (categoryId) params.set('category_id', categoryId)
    if (bestSeller) params.set('best', bestSeller)
    if (sales) params.set('sales', sales)
    if (gender) params.set('gender', gender)
    if (typeId) params.set('type', typeId)
    if (search) params.set('search', search)
    if (priceRange[0] > 300) params.set('min_price', priceRange[0].toString())
    if (priceRange[1] < 1999) params.set('max_price', priceRange[1].toString())

    router.push(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    updateFilters()
  }, [categoryId, gender, typeId, search, priceRange])

  return (!bestSeller || !sales) && (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">الفلاتر</h2>

      {/* البحث */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium">البحث</Label>
        <Input
          id="search"
          placeholder="ابحث عن المنتجات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* الفئة */}
      {categories && categories?.length > 0 && (
        <div>
          <Label htmlFor="category" className="text-sm font-medium">الفئة</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger id="category" className="mt-1">
              <SelectValue placeholder="اختر فئة" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">كل الفئات</SelectItem> */}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name.ar ?? category.name.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* الجنس */}
      <div>
        <Label htmlFor="gender" className="text-sm font-medium">الجنس</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger id="gender" className="mt-1">
            <SelectValue placeholder="اختر الجنس" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unisex">للجنسين</SelectItem>
            <SelectItem value="men">رجالي</SelectItem>
            <SelectItem value="women">حريمي</SelectItem>
            {/* <SelectItem value="unisex">للجنسين</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      {/* النوع */}
      {types && types?.length > 0 && (
        <div>
          <Label htmlFor="type" className="text-sm font-medium">النوع</Label>
          <Select value={typeId} onValueChange={setTypeId}>
            <SelectTrigger id="type" className="mt-1">
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">كل الأنواع</SelectItem> */}
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.type.ar ?? type.type.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* نطاق السعر */}
      <div>
        <Label className="text-sm font-medium">نطاق السعر</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={300}
          max={2000}
          step={10}
          className="mt-2 "
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{priceRange[1]} جنيه</span>
          <span>{priceRange[0]} جنيه</span>
        </div>
      </div>

      {/* زر إعادة تعيين */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setCategoryId('')
          setGender('')
          setTypeId('')
          setSearch('')
          setPriceRange([300, 2000])
        }}
      >
        إعادة تعيين الفلاتر
      </Button>
    </div>
  )
}
