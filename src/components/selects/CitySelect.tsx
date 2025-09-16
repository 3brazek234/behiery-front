"use client";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import axiosApp from "@/lib/axios";

interface City {
  id: number;
  district: {
    en: string;
    ar: string;
  };
}

interface Option {
  value: number;
  label: string;
}

interface Props {
  onSelect: (id: number | null) => void; // هنا نمرر id للـ parent
}

export default function CitySelect({ onSelect }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);

  useEffect(() => {
    axiosApp.get<City[]>("/dropdowns/districts").then((res) => {
      const opts = res.data.map((city) => ({
        value: city.id,
        label: city.district.ar, // أو en حسب اللغة
      }));
      setOptions(opts);
    });
  }, []);

  const handleChange = (option: SingleValue<Option>) => {
    setSelectedCity(option);
    onSelect(option ? option.value : null); // رجّع الـ id للـ parent
  };

  return (
    <Select
      options={options}
      value={selectedCity}
      onChange={handleChange}
      placeholder="اختر المنطقة"
      isClearable
    />
  );
}
