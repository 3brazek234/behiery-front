// src/components/footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section: Logo, Description, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <Link
              href="/"
              className="mb-4 flex items-center justify-center md:justify-start gap-2"
              aria-label="الصفحة الرئيسية"
            >
              <Image
                src="https://behiryperfume.com/images/logo.svg"
                alt="شعار بحيري للعطور"
                width={50}
                height={50}
                className="size-10"
              />
              <span className="font-extrabold text-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                بحيري للعطور
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs text-sm mt-2">
              ولدت Behiry Perfume من إرث عائلي من الشغف والدقة. أسسها الاستاذ
              محمد بحيري في مصر، بدأنا برؤية صغيرة: جلب عطور عالمية عالية
              الجودة. على مر السنين، نمى اسمنا ليمثل الثقة والحرفية والروائح
              الخالدة التي يحبها العملاء في جميع أنحاء البلاد.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  منتجاتنا
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  الأكثر مبيعاً
                </Link>
              </li>
              <li>
                <Link
                     href="https://behiryperfume.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                       href="https://behiryperfume.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              تواصل معنا
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="size-4 text-orange-500" />
                <span>شارع 45، العصافرة بحري الإسكندرية، مصر</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="size-4 text-orange-500" />
                <span>+20 11 14450300</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="size-4 text-orange-500" />
                <span>behiryperfume@gmail.com</span>
              </li>
            </ul>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://tr.ee/6zfmhUhpwY"
                aria-label="فيسبوك"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Facebook className="size-6" />
              </a>
              <a
                href="https://tr.ee/JmGDe7ktO0"
                aria-label="انستغرام"
                className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                <Instagram className="size-6" />
              </a>

              <a
                href="https://tr.ee/V0V8dz4PKP"
                target="_blank"
                aria-label="يوتيوب"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              >
                <Youtube className="size-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section (Optional - لو عايز تضيفه) */}
        {/* <div className="py-8 text-center border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">اشترك في قائمتنا البريدية</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">احصل على آخر العروض والأخبار مباشرة في بريدك الوارد.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-2 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="أدخل بريدك الإلكتروني" 
              className="flex-1 px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-orange-500 focus:border-orange-500"
            />
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              اشترك
            </Button>
          </form>
        </div> */}

        {/* Bottom Section: Copyright */}
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
          <p>  جميع الحقوق محفوظة ©{new Date().getFullYear()} Behiry Tech.</p>
          <p>الإصدار 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
