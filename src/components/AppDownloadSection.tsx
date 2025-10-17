// src/components/app-download-section.tsx
import Image from "next/image";
import Link from "next/link";
import img1 from "../../public/google-play-badge-logo.svg"
import img2 from "../../public/images.png"
export function AppDownloadSection() {
  return (
    <section className="bg-gradient-to-br from-orange-500 to-orange-700 dark:from-gray-800 dark:to-gray-900 text-white py-16 md:py-24 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            حمل تطبيق بحيري للعطور الآن
          </h2>
          <p className="text-lg md:text-xl font-light mb-10 opacity-90">
            اكتشف أحدث العطور الفاخرة، استمتع بعروض حصرية، وتسوق بكل سهولة من هاتفك.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Google Play Button */}
            <Link 
              href="https://play.google.com/store/apps/details?id=com.yourcompany.app" // 🚨 غيّر الرابط ده لرابط تطبيقك على Google Play
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 transition-colors duration-300 rounded-xl py-3 px-6 shadow-xl w-full md:w-auto max-w-sm"
              aria-label="تحميل من متجر Google Play"
            >
              <Image 
                src={img1} // 🚨 تأكد من وجود الصورة دي في مجلد public/images
                alt="Google Play" 
                width={30} 
                height={30} 
                className="mr-3" 
              />
              <div className="text-left">
                <p className="text-xs opacity-80 group-hover:opacity-100 transition-opacity">متاح على</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </Link>

            {/* App Store Button */}
            <Link 
              href="https://apps.apple.com/us/app/your-app-id" // 🚨 غيّر الرابط ده لرابط تطبيقك على App Store
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 transition-colors duration-300 rounded-xl py-3 px-6 shadow-xl w-full md:w-auto max-w-sm"
              aria-label="تحميل من متجر App Store"
            >
              <Image 
                src={img2} // 🚨 تأكد من وجود الصورة دي في مجلد public/images
                alt="App Store" 
                width={30} 
                height={30} 
                className="mr-3" 
              />
              <div className="text-left">
                <p className="text-xs opacity-80 group-hover:opacity-100 transition-opacity">تحميل من</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </Link>
          </div>

          {/* Optional: QR Code (لو عايز تضيفه) */}
          {/* <div className="mt-12">
            <p className="text-lg md:text-xl font-light mb-6 opacity-90">أو امسح الكود لتحميل التطبيق مباشرة:</p>
            <div className="flex justify-center">
              <Image 
                src="/images/qr-code.png" // 🚨 تأكد من وجود صورة الـ QR Code هنا
                alt="QR Code لتحميل التطبيق" 
                width={150} 
                height={150} 
                className="rounded-lg shadow-xl bg-white p-2" 
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}