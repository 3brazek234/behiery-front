"use client";

import useUserStore from "@/store/user";
import React from "react";

const ProfilePage: React.FC = () => {
  const { user, logout } = useUserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-lg w-full">
          <p className="text-lg text-gray-700">لم يتم العثور على بيانات المستخدم.</p>
          <button
            onClick={logout}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            العودة لصفحة تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className=" overflow-hidden">
        {/* الهيدر */}
        <div className="bg-primary text-white py-10 px-8 text-center">
          <h1 className="text-3xl font-bold">بيانات المستخدم</h1>
          <p className="mt-2 text-sm opacity-90">{user.email}</p>
        </div>

        {/* المحتوى */}
        <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">المعلومات الشخصية</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">الاسم:</span>
                <span>{user.name}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">البريد الإلكتروني:</span>
                <span>{user.email}</span>
              </li>
              {user.phone && (
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-500">رقم الهاتف:</span>
                  <span>{user.phone}</span>
                </li>
              )}
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">نوع المستخدم:</span>
                <span>{user.user_type}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">طريقة التسجيل:</span>
                <span>{user.joined_with}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">الحالة:</span>
                <span>{user.status === 1 ? "نشط" : "غير نشط"}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">النشاط والدعوات</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">النقاط:</span>
                <span>{user.points}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">الدعوات:</span>
                <span>{user.invites}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">رابط الإحالة:</span>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {user.referral_link}
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">تاريخ الإنشاء:</span>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-500">آخر تحديث:</span>
                <span>{new Date(user.updated_at).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* زر الخروج */}
        <div className="max-w-4xl mx-auto p-6 border-t flex justify-end">
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
