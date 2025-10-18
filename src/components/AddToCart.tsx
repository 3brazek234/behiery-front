"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ShoppingCart } from "lucide-react";
import { Product, Option } from "@/types/product";
import { useCart } from "@/store/cartStore";
import { usePost } from "@/hooks/UsePost";
import useUserStore from "@/store/user";
import Link from "next/link";

interface AddToCartProps {
  product: Product;
  setAdded?: any;
}

export function AddToCart({ product, setAdded }: AddToCartProps) {
  const { toggleFetch } = useCart();
  const { user } = useUserStore();
  const { postData } = usePost();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    product.options[0]?.id.toString() || ""
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (!selectedOptionId) return; // تأكد من اختيار option_id
    postData("/cart", {
      product_id: product.id,
      mix_id: null,
      package_id: null,
      option_id: parseInt(selectedOptionId),
      book_id: null,
      ebook: 0,
      is_gift: 0,
      quantity: Math.max(1, quantity), // التأكد من أن الكمية لا تقل عن 1
    }).then((e) => toggleFetch());
    setIsAdded(true);

    setTimeout(() => {
      setAdded((prev: any) => !prev);
      setIsAdded(false);
    }, 2000);
  };
  const salePrice = product.options[0]?.sale_price

  return (
    <div className="space-y-4">
      {/* اختيار الخيار (مثل الحجم) */}
      {product.options.length > 0 && (
        <div>
          <label htmlFor="option" className="text-sm font-medium text-gray-700">
            أختر الحجم الذي يناسبك{" "}
          </label>
          <Select value={selectedOptionId} onValueChange={setSelectedOptionId}>
            <SelectTrigger id="option" className="mt-1">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.options.map((option: Option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.size} ml ({salePrice ? parseFloat(salePrice) : parseFloat(option.price)} EGP)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
          العدد
        </label>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </Button>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* زر إضافة إلى السلة */}
      {user ? (
        <Button
          className="w-full font-semibold mt-2 transition-all duration-300"
          size="lg"
          onClick={handleAddToCart}
          // disabled={isAdded || !selectedOptionId}
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" /> تم اضافته
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> اضافة الى السلة
            </>
          )}
        </Button>
      ) : (
        <Link href="/login">
          <Button
            className="w-full font-semibold mt-2 transition-all duration-300"
            size="lg"
          >
            تسجيل الدخول اولا
          </Button>
        </Link>
      )}
    </div>
  );
}
