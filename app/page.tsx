"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppleReceiptForm } from "@/components/receipts/AppleReceiptForm";
import { BalenciagaReceiptForm } from "@/components/receipts/BalenciagaReceiptForm";
import { BapeReceiptForm } from "@/components/receipts/BapeReceiptForm";
import { DiorReceiptForm } from "@/components/receipts/DiorReceiptForm";
import { NikeReceiptForm } from "@/components/receipts/NikeReceiptForm";
import { GoatReceiptForm } from "@/components/receipts/GoatReceiptForm";
import FarfetchReceiptForm from "@/components/receipts/FarfetchReceiptForm";
import GalleryDeptReceiptForm from "@/components/receipts/GalleryDeptReceiptForm";
import { GrailedReceiptForm } from "@/components/receipts/GrailedReceiptForm";
import { LVReceiptForm } from "@/components/receipts/LVReceiptForm";
import { MonclerReceiptForm } from "@/components/receipts/MonclerReceiptForm";
import { NorthFaceReceiptForm } from "@/components/receipts/NorthFaceReceiptForm";
import { SupremeReceiptForm } from "@/components/receipts/SupremeReceiptForm";
import { TrapstarReceiptForm } from "@/components/receipts/TrapstarReceiptForm";
import { StussyReceiptForm } from "@/components/receipts/StussyReceiptForm";
import { YzyGapReceiptForm } from "@/components/receipts/YzyGapReceiptForm";
import { StockXReceiptForm } from "@/components/receipts/StockXReceiptForm";
import {
  AppleReceiptData,
  BalenciagaReceiptData,
  BapeReceiptData,
  DiorReceiptData,
  NikeReceiptData,
  GoatReceiptData,
  FarfetchReceiptData,
  GalleryDeptReceiptData,
  GrailedReceiptData,
  LVReceiptData,
  MonclerReceiptData,
  NorthFaceReceiptData,
  SupremeReceiptData,
  TrapstarReceiptData,
  StussyReceiptData,
  YzyGapReceiptData,
  StockXReceiptData,
  ReceiptType,
} from "@/types/receipt-types";

export default function Home() {
  const router = useRouter();
  const monclerx = "data:image/jpeg;base64,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"
  const supremex = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX4AAACECAMAAACgerAFAAAAkFBMVEXtHCT////sAADtCxfzhYjsAAztDxztFyD4v8DsABD719jsAAjtERvsAAXsAAvsCBX83d76ycr95uf4tLb97Oz3rrD4ubv2oKL/+vr+9fXvRUr5xcbzf4L0i476z9DwWFzxYWX1mpzwUVbydXjuLDP1lJb3p6nyam7zeXzvQkf1l5nxXGDuJCzvOT/xZWn84eImsKJpAAAQi0lEQVR4nO1daXuqOhDWQY0IiK1LcanWvbba/v9/dwE35p0QsPdon+ecvB+LhMlkZjJb0krFwsLCwsLCwsLCwsLCwsLCwuLfRSOsUwzPddRvk/KvQYVEo9qm+TR9Gny8r4hCuwQPgyJVm1YzGI4nPvm/Tda/AUW7ZlViPCPnt0n7B+CtdMxP0Pkia4LuC0XrHOYnmB7av03gXw1n3zJwP0aNfpvEvxjuaGjmfrU6sPy/F9xZEfNjjC3/74NS3K9W+/XfJvSvhL8rxf3qlw0A7gClCu1+Crv53gU0LWZ9Ynos9+8Bt6Zj9vD5mevE1HL/HlCVSPC+U1uFQdtZ1a6xQM+1ce89QF1kfu/tlOZUIc16x79FK7vt3gPqgNxvZhNsDj2lf5yFv0fi34wAhb/LbbxK+W+dnjvBBe63kNGKetbpuRecCbD/IHZYf2GdnnsBfX5dXs23xZZ7gUD436yD80A0MNdmk2qPhIsVLmvlH4lgYNn/ixDZNmv7Hwl6BvZbH/ORoB6wv7p+EP+V4wZpI+NN6pa+FOjeicfzks7IoB7eMuKRirq2la8Rtin3IfwyHSam7LaeQJKFlvUDWnqUS/72YzB+Gg/W25BK5pN8Crfz5tO4uf4klw0XEu3eP7rjp/jhpjajkiOG5CzjAZ/G/cmOjxhzNKBFrR+P2NxMDqbx4rnQYjIfJB8fvExGdENPmjA+if2pePkL0GAQpLCnKucNRY11J/PB1gTnDgOlb/n0dd2oovn1DZ/82hNPmk9rLs5BDhjSe6a3pjcPM0Q4tBhkhnx+zWu0dGi15h060XgpppMHfaHrJcxbAI97Sk2PT3HBx0nsGHHGLJ1KsEJ3qxq9El9Kh7/15Vdo8c1IPM/Qp9lYN4e+YjwANZ84iiao+ZOz3VX09Q3PhjNdm5lDW1131HDtldMATyT7j+x42etNECzXB1/mkNfNvikp5vCRD473ovvi9yE7lFrxpyufNvwvI3Vi1CKvOyyaZHexEMiorzTvNY9vuCudUC4F/xVtNcYjRe+z1BbqvOe8X+0eSNgWIUTQ+lDnPEr6gkAhovYuj+JtcB3I/+RvkQMMGR5n54RCkTIYXEVI6OWn9o20k4mW+uFmYH/0q3TGRyn+h/kDjBdiAVAqIT16Ks2ckdhnWN/vt/zvLa+WLOTBeIvQFhzl1FsIx43h6kU7nKXfeu7HNo0qpNXOGD1uaWkpi7RZbMrwn/KamlPyF2CCIEU0BAMFG/m7IxTCyK7ZxWB6ffagK8RsmfyUMFku0DyzwOU87eVybkT9vEfV16z/g9ZQoowLr8wdVuMVs3hQHXiGD0D6NNEN0u6LekSV83JSQbtvdZ8MberIPqFWLyFlWUwNg2anSyard8KiRABiWO0ULAxo8x83oS4JS5lKaJ6p1+HpPJ5nNirVDpXjfrxpH6kX1utH2F1YUWo5e6XMTwGDWpXrIoJxf+HpaTCwqbAos4EEfB3Nj1IFv4t3lXau08BwdmZuIiMPtbP1KbY8KdYl/H+1KmgxHB4uNhlyFEvu3bpz9jTZ+NTolumd1Rv9FIFFw5cDT9fbt+0chSn1DgpMbFl0T5tvXW4649r2bbkBpR3yzVoP/1Cg6tHhJP9qz4VowT0j0MhNrBvO9rYJHhOuobbvLjOtuvJQZsYHch3fqeN+nFBR8b80o/SemtNcpeg0x9IqnIxjQ/TmbCoUxh/3aM7/viwTffmqoMlzeNoTQZajPfidHfY4UVVQiOuIvZ5W544TrOfodvxWKilNEjvf8rJFeVx1ekk4IapK8ZcWSY7M139pvk8eCrf2m3TzjCPiy8dh8Z9KOf/mY13ViwMNxh23FpK6Ico56SzWu4bnqdFGI3up9GtTIZ3XnfKovV+2qu8e+u2zjJoHXHcS6yPJWNMp/aTxPKLdkZ0hRDmnCddf+V+Hh4xDynsGo5LJV+9gVoD39At17j1DbQD75VLnEAQlmcMXHdtFG54v/Ydljrt0bXx0aHnAH/CEAN+hEm9dkPFySe/4UgZ2Z5OBO2zKftETO8paGEiyzDSZAx0UfUpOZT6cShcY9z7PgoCB7SVGNxQmZpDJxyrpQaS7G7ZfxCudzWE5Lth3aMxzmXgOYuvTBjIyvWQyMJlcptWA/T31DALQlxoEw0zRyvg+J+7Rp0EDdFJZ41nwkCtlMkVMUohQEDzZU5pObG1THn0DHUOocah99mkcI4gBR1ehFLtT50ohCnpLk0PsgAXmzka3jO9zWYBdP88VSDeRBheiT27ZIHvaj7/sYx8LJqKUAz+IPE0ecMiv9oAtqLrG7hhmfWKLge00WaspPrbN6Fmbb75JRg4MsCiOc4m7rXarAv9VH4UNHSmVK3B8uPKsQ6EQGCbHEOnneKcUArnlagYpiUhhbpz/gAQZWQ6ja9wLsgNx9ieyDDlfzLuA5ZSPCxbApaU2DBgpNO5DdHykbkCSQnNEQ5ineLNCc9wyb/FdEmCC4CIZw+xeiaq0yW5oIP2xJcfVqsmPZ9lQKu/AEWoLIrHxdz+MXNEko0EhvjRRCGZjYmVGPwWMHCrHc6vTAjBBaCAZ7HwyagbLk4G1jbUGReO7gx9noVzvBtt/ZYkmSPxw0XseBOwln4c7w8RgcOkRvesJILec1hX5X0R4YXLRNGiogAsxSxyDLR9mJ4USFVsA6ZQZ8SP2V9qyKvLi4rzBqQq5N6ipNGpbuDAg/fJx0pDY435NCbTxDZYrAZlicSpG+U7FN5SLdPiB8UkgHfKY/a5QxSwgU5DoBidfTwra3k8fzeuoYXyhEATue8Q2cjB+czf/U/E+mpcOycP3z9iP3m1CFwoRVhrH8HtUiI32ShrBbMWjJrHD53QH5KJHjtTLKyAw3GY1FHaZeM+41fD9tGlQxEO1EL1nNMncY010g9tV/ZUEYLOqsfNrMAeV201/h8C8M+9X9FRkZQoo2dRvNf24P5YGRhex4QYfAfQKI8SkE4SvoT75ChIWyzq49XOI2+s3cuCJNB0AF4Axj9ikYKXfwxvLF2LfKg2Roj0o8J7hehmoaESJwWZ2NdLrIeSRYm01N7PIjEQBNnXQS5aEd7GnIvstMEwzP78vJwfvRQn/nOfoXA8Ves8glWDD03DPy/4lxwmAwHJTxy0GYutbCzix1XSkXl4AO0mT+Z1AiVJ55YtcLAoynrTUd4+iO94hZNSEvwjWaiwSbvr4G8uAXz6YgyHQh2HSC9XN8FFfeHKaWzrmTEPGKraLWDfYFn28oFuZXjQnSdMHsMH121yWZaWRG9i00sj8NvRgjsD0bRsrjZhRRAGsFTYzG4tEnqF6DSud2EWIeUcl0/l6qKCZk5IWsU0cDYGcVviy1eU8IEmhdQLafNB4irDFoO+APkGhddV1AFznCT0VTBaBkq4n/EG96JaEs09EXGsUsNgdKYXhjjkPlrTEBHxX1VV+AmBmLMvmLUYEPsXV7EB2AFyg68m+AAzTq6AN96WbcL68cKtLhEHaOXa+0ReCChN/mro5YMA0TpjId7piL0bqbpd+TQfABZqe7MyLnJIkG/XnpJ/OLoRG/LGal8gYih2Urfgcp5rWfo3rg82EcUSE8cMOZohSIG2/gnvXgQymhDApHuJB+/FeieY26dgov9yK0HVfeUG+iJRDkgeEkxXc9mNVNNlQRK+aUDORWYq3MjAH2MUrzGIfUxlqtVwR0eXye5wMz/hwa8IUFGOsmEttSHiItW+MtnuiICxYBMUaIpZ4hwx2RM7rwoTycAiNYiKzIjsoMscY2iVBj65TkU1wJt/hoyYa1Wl+bNNFUEgGd8DAyE4MhilxwdDr7YJfoJKsZNQavL5VklODeWugHK71jP+OK/qLG5pemewlMy7EQinTkFbMtshG+uQAg+aIBie9AS9hyfM6atRpzj+VpgMg82s+FovIgJKEeJQoUfC77g3DTvcDDed5CiusJ26C81I1ZHNX9SVRcHDDqlHjMniIiYDUmdWkJruXLhMV7EVfxXHD4K71RuzX6BXwYwzYY/jmAxms9wD9NT4U32fTg1S49jxoxZ6tPMdIXtzZe91T4HlEC9n6dFxjkQWannjZoBn2R6RE6XrVvj/JC52wTStN4jz1IzRHNDjEqu6yjUOytm+Ka40RmS5VJPoL2yrzceD+R96l73VdU2Fn0O+OdWX245YpyxzfX+lZYrlg/dQkas4Mx3ju15a1je74xDzQSIb0LeSWcjidw1SeAlKSLlRTBg8Cw6nJMKXCAS/Etsw9yX+DDjApQ5dDvdy9tSlOFltX5Is6046mM+jYeuuX/0SCY3YBE6d7qb91FJFo7actBocXpOXd1bmPGQ4b2va0hkkyofd+7G8YCVNryEiE5TOnvXMPmbyAIAdHpfOLmvQBR0MJCU1dmrSOEhijNR4/SfKS5kMgw5jQZzV4vQumOSwVtcbNqRTnmqnKXvLi4Bi7s7a2S9Y5T6EjlrEK8HacuilBcxZLv6Tqpk6OpgMgwwX+AovI9IapdLnBfPugLObm4O2yVZX98uE4iduq0ucz0ODednW7l4jJ9XhOnTmN+3hlAuQ8KgbDdHbBis7CnVD0vw7Cci0T24wKlTseuD2t1y1nGq+dt6YEzZWQMqr7fXSMjZVGaNvjlYAcSsTWo0Pxf5pAH02LL+Yl70scULsc5b/lTOP1llao7+lvd1KqmAXT05ZlOo4GEVnHZJguLliZf3ZQ5t5TPIgk0dtBJ1Vxoe8aP4dwl4bhpe3lJWPjwRWNouOAcTB2ehOuiWWBKIQQA1OH27WP1807En9BuTt/i+S/KS4mCgqsbm90CVIhYTXMPavPbtOA+l5OeT7+3d6oW8O3y+kVyJvxcwKG0oIPLlgm+nYXRivwvSv5P7bozTBOb6u51CT4Mn15E1zXS5Te8/asj+zNEcYETRbKdKx8U7+YGHQfWY6MDG17JkocmTC5IMq9+kfCcfImMXzVX8oUqtxpN1dZEsGDTKJ/3XHRQYWJStvQeACgWc5J9f4+85ZrOI4mLrthhon7GfyYiqKl3vpFc7f0caJ0nBG2syXoyPulrm8cuppPP3/ADUCQn04y6e4elq63wWuD3Jdx84qxsZLo05ukvfUaBtkhwzUbsMaOwe2yz5oDTsncSInDrsI6L+6Sbm2ratBhzlys4fT1YLyOTHn0+fJ0uRQkGra6kwNhchv8tpR8RfvXU3wYDacvC5KNGC47qVBQSPRJLbuXrEdMx/tK3LoWGgZUQfYZRKlFlIS0qjWfozMTpv1t40f/WVS5VPmsbbqDQbf/ut2V+Q+9fkxb4zBazBajg4oJ17wBWaVTAiS59G61mM1GeyL3f3VpnGh3PPJWKSH7gLzH/ntnFQbkrkaz2WJXIWr//OOqEda9IPDqRVUy9lJy3504V3V+yEPkbOrM9NqPYCTk3vjVj+cC0sI/PGZg8UPIDjGLB8JU4rO4O6DEV9yJafEnAa2r9mL0h6LgHJjFfYG9aj884mTxM8BhQmzSt7gvsMRnpf+hMJX4LO4O02FCi7tDGQ4TWtwb2JNibc9DUdSkb3FXQKWx3G2iFn8KOR1iFo8BVBonNuH2UMAF12XvcrX4I8CEm+X+Q2E8TGhxb5TuVbO4B0ytqxZ3BxzLLn+Nt8WfgWL4bWosLCwsLCwsLCwsLCwsLCws/mI4Fr+ISs3iF/EfOv0VAb58vdIAAAAASUVORK5CYII=";
  const [selectedReceiptType, setSelectedReceiptType] =
    useState<ReceiptType>("apple");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Receipt type options with labels and categories
  const receiptTypes = [
    { value: "apple", label: "Apple", category: "Tech", icon: "🍎" },
    { value: "nike", label: "Nike", category: "Sneakers", icon: "✓" },
    { value: "goat", label: "GOAT", category: "Sneakers", icon: "🐐" },
    { value: "stockx", label: "StockX", category: "Sneakers", icon: "📈" },
    {
      value: "balenciaga",
      label: "Balenciaga",
      category: "Luxury",
      icon: "👑",
    },
    { value: "dior", label: "Dior", category: "Luxury", icon: "💎" },
    { value: "lv", label: "Louis Vuitton", category: "Luxury", icon: "🛍️" },
    { value: "moncler", label: "Moncler", category: "Luxury", icon: "🧥" },
    { value: "farfetch", label: "Farfetch", category: "Fashion", icon: "🌟" },
    { value: "bape", label: "BAPE", category: "Streetwear", icon: "🦍" },
    { value: "supreme", label: "Supreme", category: "Streetwear", icon: "🔴" },
    {
      value: "trapstar",
      label: "Trapstar",
      category: "Streetwear",
      icon: "⭐",
    },
    { value: "stussy", label: "Stüssy", category: "Streetwear", icon: "🌊" },
    { value: "yzygap", label: "YZY GAP", category: "Streetwear", icon: "🎨" },
    {
      value: "gallery_dept",
      label: "Gallery Dept",
      category: "Streetwear",
      icon: "🎭",
    },
    {
      value: "northface",
      label: "North Face",
      category: "Outdoor",
      icon: "⛰️",
    },
    { value: "grailed", label: "Grailed", category: "Marketplace", icon: "🔥" },
  ] as const;

  const [appleReceiptData, setAppleReceiptData] = useState<AppleReceiptData>({
    ORDER_NUMBER: "W1234567890",
    ORDER_DATE: "30 November 2024",
    PRODUCT_IMAGE: "/apple/apple_files/product-image.png",
    PRODUCT_NAME: "iPhone 15 Pro Max 256GB Natural Titanium",
    PRODUCT_PRICE: "£1,199.00",
    SHIPPING_COST: "Free",
    ORDER_TOTAL: "£1,199.00",
    ADDRESS_LINE_1: "John Smith",
    ADDRESS_LINE_2: "123 Main Street",
    ADDRESS_LINE_3: "London",
    ADDRESS_LINE_4: "SW1A 1AA",
    ADDRESS_LINE_5: "United Kingdom",
    BILLING_NAME: "John Smith",
    BILLING_EMAIL: "john.smith@example.com",
    BILLING_ADDRESS_1: "John Smith",
    BILLING_ADDRESS_2: "123 Main Street",
    BILLING_ADDRESS_3: "London",
    BILLING_ADDRESS_4: "SW1A 1AA United Kingdom",
  });

  const [balenciagaReceiptData, setBalenciagaReceiptData] =
    useState<BalenciagaReceiptData>({
      FIRSTNAME: "John",
      ORDER_NUMBER: "BAL123456789",
      PRODUCT_IMAGE: "/balenciaga/balenciaga_files/product-image.jpg",
      PRODUCT_NAME: "Triple S Sneakers",
      PRODUCT_PRICE: "€ 1,050",
      PRODUCT_COLOUR: "White/Black",
      ADDRESS1: "John Smith",
      ADDRESS2: "123 Fashion Street",
      ADDRESS3: "London W1K 5AB",
      ADDRESS4: "United Kingdom",
      BILLING1: "John Smith",
      BILLING2: "123 Fashion Street",
      BILLING3: "London W1K 5AB",
      BILLING4: "United Kingdom",
    });

  const [bapeReceiptData, setBapeReceiptData] = useState<BapeReceiptData>({
    ORDER_NUMBER: "BAPEUK0012345",
    PRODUCT_IMAGE: "/bape/Thank you for your purchase!_files/IMAGE",
    PRODUCT_NAME: "ABC CAMO COLLEGE TEE",
    PRODUCT_STYLE_SIZE: "BLACK / M",
    PRODUCT_PRICE: "£95.00",
    SUBTOTAL: "£95.00",
    SHIPPING_COST: "£10.00",
    TAXES_INCLUDED: "£17.50",
    ORDER_TOTAL_CURRENCY: "£105.00 GBP",
    ADDRESS1: "Ape Enthusiast",
    ADDRESS2: "1 Camo Street",
    ADDRESS3: "London",
    ADDRESS4: "WC2H 7L",
    BILLING1: "Ape Enthusiast",
    BILLING2: "1 Camo Street",
    BILLING3: "London",
    BILLING4: "WC2H 7L",
    CARD_ENDING: "1234",
  });

  const [diorReceiptData, setDiorReceiptData] = useState<DiorReceiptData>({
    ORDER_NUMBER: "469216300",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "./dior/dior_files/PRODUCT_IMAGE",
    PRODUCT_NAME: "B23 High-Top Sneaker",
    PRODUCT_REFERENCE: "3SN272ZIR_H069",
    PRODUCT_PRICE: "€ 1,200.00",
    QUANTITY: "1",
    SUBTOTAL: "€ 1,200.00",
    SHIPPING_COST: "Free",
    TAX_AMOUNT: "€ 200.00",
    TOTAL_AMOUNT: "€ 1,200.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Luxury Avenue",
    SHIPPING_ADDRESS_3: "Paris 75001",
    SHIPPING_ADDRESS_4: "France",
    BILLING_ADDRESS_1: "John Doe",
    BILLING_ADDRESS_2: "123 Luxury Avenue",
    BILLING_ADDRESS_3: "Paris 75001",
    BILLING_ADDRESS_4: "France",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234",
  });

  const [nikeReceiptData, setNikeReceiptData] = useState<NikeReceiptData>({
    WHOLE_NAME: "John Smith",
    ADDRESS1: "123 Main Street",
    ADDRESS2: "London",
    ADDRESS3: "SW1A 1AA, United Kingdom",
    FIRSTNAME: "John",
    DELIVERY_DATE: "Monday, December 2, 2024",
    PRODUCT_IMAGE: "/nike/nike_files/product-image.jpg",
    PRODUCT_NAME: "Air Max 270 React",
    PRICE: "£120.00",
    SIZE: "UK 9",
    ORDER_NUMBER: "N123456789",
    ORDER_DATE: "November 30, 2024",
    CARD_END: "1234",
    CURRENCY: "£",
    TOTAL: "£120.00",
  });

  const [goatReceiptData, setGoatReceiptData] = useState<GoatReceiptData>({
    ORDER_NUMBER: "GOAT123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "/goat/goat_files/product-image.jpg",
    PRODUCT_NAME: "Air Jordan 1 Mid SE 'Elephant Toe'",
    PRODUCT_SIZE: "US 10",
    PRODUCT_PRICE: "$150.00",
    SHIPPING_COST: "$13.95",
    TAX_AMOUNT: "$11.23",
    TOTAL_AMOUNT: "$175.18",
    TRACKING_NUMBER: "1Z999AA1234567890",
    ESTIMATED_DELIVERY: "December 5, 2024",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Main Street",
    SHIPPING_ADDRESS_3: "New York, NY 10001",
    SHIPPING_ADDRESS_4: "United States",
  });

  const [farfetchReceiptData, setFarfetchReceiptData] =
    useState<FarfetchReceiptData>({
      FIRSTNAME: "John",
      ORDERNUMBER: "FF123456789",
      DELIVERY: "December 5, 2024",
      PRODUCT_IMAGE: "/farfetch/farfetch_files/PRODUCT_IMAGE",
      BRAND: "Balenciaga",
      FULLNAME: "Triple S Sneakers",
      PRODUCT_PRICE: "€ 1,050",
      SHIPPING_COST: "Free",
      TAX_AMOUNT: "€ 200.00",
      TOTAL_AMOUNT: "€ 1,050.00",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Luxury Avenue",
      SHIPPING_ADDRESS_3: "Paris 75001",
      SHIPPING_ADDRESS_4: "France",
      BILLING_ADDRESS_1: "John Doe",
      BILLING_ADDRESS_2: "123 Luxury Avenue",
      BILLING_ADDRESS_3: "Paris 75001",
      BILLING_ADDRESS_4: "France",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
    });

  const [galleryDeptReceiptData, setGalleryDeptReceiptData] =
    useState<GalleryDeptReceiptData>({
      ORDER_NUMBER: "GD123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/gallery_dept/gallery_dept_files/product-image.jpg",
      PRODUCT_NAME: "Gallery Dept. T-Shirt",
      PRODUCT_SIZE: "M",
      PRODUCT_PRICE: "$75.00",
      SHIPPING_COST: "$10.00",
      TAX_AMOUNT: "$6.25",
      TOTAL_AMOUNT: "$91.25",
      TRACKING_NUMBER: "1Z999AA1234567890",
      ESTIMATED_DELIVERY: "December 5, 2024",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "New York, NY 10001",
      SHIPPING_ADDRESS_4: "United States",
    });

  const [grailedReceiptData, setGrailedReceiptData] =
    useState<GrailedReceiptData>({
      ORDER_ID: "GR123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/grailed/grailed_files/product-image.jpg",
      PRODUCT_NAME: "Vintage Nike Sneakers",
      BRAND: "NIKE",
      SIZE: "US 10",
      SOLD_PRICE: "€1000.00",
      TAX_AMOUNT: "€10.00",
      TOTAL_AMOUNT: "€1010.00",
      SHIPPING_NAME: "John Doe",
      SHIPPING_ADDRESS: "123 Main Street",
      SHIPPING_CITY: "London",
      SHIPPING_COUNTRY: "United Kingdom",
      SELLER_LOCATION: "New York",
      SELLER_NAME: "Seller123",
    });

  const [lvReceiptData, setLVReceiptData] = useState<LVReceiptData>({
    FIRSTNAME: "John",
    ORDER_NUMBER: "LV123456789",
    ORDER_DATE: "December 1, 2024",
    PRODUCT_IMAGE: "/lv/lv_files/PRODUCT_IMAGE",
    PRODUCT_NAME: "Neverfull MM Monogram Canvas",
    REFERENCE: "M40156",
    PRODUCT_PRICE: "€1,350.00",
    CURRENCY: "€",
    PHONE_NUMBER: "+44 20 1234 5678",
    SHIPPING_ADDRESS1: "John Doe",
    SHIPPING_ADDRESS2: "123 Luxury Avenue",
    SHIPPING_ADDRESS3: "London W1K 5AB",
    SHIPPING_ADDRESS4: "United Kingdom",
    BILLING_ADDRESS1: "John Doe",
    BILLING_ADDRESS2: "123 Luxury Avenue",
    BILLING_ADDRESS3: "London W1K 5AB",
    BILLING_ADDRESS4: "United Kingdom",
    COUNTRY: "uk",
  });

  const [monclerReceiptData, setMonclerReceiptData] =
    useState<MonclerReceiptData>({
      FIRST_NAME: "John",
      ORDER_NUMBER: "MCL123456789",
      DATE: "December 1, 2024",
      PRODUCT_IMAGE: "/moncler/moncler_files/product-image.jpg",
      PRODUCT_NAME: "Maya Down Jacket",
      PRODUCT_PRICE: "€1,395.00",
      SIZE: "L",
      COLOR: "Black",
      QUANTITY: "1",
      SUBTOTAL: "€1,395.00",
      SHIPPING_COST: "Free",
      TAX_AMOUNT: "€232.50",
      TOTAL_AMOUNT: "€1,395.00",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Luxury Avenue",
      SHIPPING_ADDRESS_3: "Paris 75001",
      SHIPPING_ADDRESS_4: "France",
      BILLING_ADDRESS_1: "John Doe",
      BILLING_ADDRESS_2: "123 Luxury Avenue",
      BILLING_ADDRESS_3: "Paris 75001",
      BILLING_ADDRESS_4: "France",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
    });

  const [northFaceReceiptData, setNorthFaceReceiptData] =
    useState<NorthFaceReceiptData>({
      CUSTOMER_NAME: "Paul Harris",
      ORDER_NUMBER: "73442336",
      ORDER_DATE: "15/9/2023",
      PRODUCT_IMAGE: "/northface/northface_files/product-image.jpg",
      PRODUCT_NAME: "Men's 1996 Retro Nuptse Jacket",
      PRODUCT_COLOR: "Lunar Slate-TNF Black",
      PRODUCT_SIZE: "L",
      PRODUCT_PRICE: "£300.00",
      QUANTITY: "1",
      SUBTOTAL: "£300.00",
      SHIPPING_COST: "£0.00",
      TOTAL_AMOUNT: "£300.00",
      SHIPPING_ADDRESS_1: "Paul Harris",
      SHIPPING_ADDRESS_2: "56465 Block Rue North Felicitamouth",
      SHIPPING_ADDRESS_3: "JC2 2SR, Great Britain",
      SHIPPING_ADDRESS_4: "",
      PAYMENT_METHOD: "Credit Card",
      SHIPPING_METHOD: "DHL - Standard delivery",
    });

  const [supremeReceiptData, setSupremeReceiptData] =
    useState<SupremeReceiptData>({
      ORDER_NUMBER: "SUP123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/supreme/supreme_files/product-image.jpg",
      PRODUCT_NAME: "Supreme Box Logo Hoodie",
      PRODUCT_SIZE: "Large",
      PRODUCT_COLOR: "Red",
      PRODUCT_PRICE: "$158.00",
      QUANTITY: "1",
      SUBTOTAL: "$158.00",
      SHIPPING_COST: "$10.00",
      TAX_AMOUNT: "$15.80",
      TOTAL_AMOUNT: "$183.80",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "New York, NY 10001",
      SHIPPING_ADDRESS_4: "United States",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
    });

  const [trapstarReceiptData, setTrapstarReceiptData] =
    useState<TrapstarReceiptData>({
      ORDER_NUMBER: "TS123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/trapstar/trapstar_files/product-image.jpg",
      PRODUCT_NAME: "Trapstar Hoodie",
      PRODUCT_SIZE: "Large",
      PRODUCT_COLOR: "Black",
      PRODUCT_PRICE: "£120.00",
      QUANTITY: "1",
      SUBTOTAL: "£120.00",
      SHIPPING_COST: "£5.00",
      TAX_AMOUNT: "£20.00",
      TOTAL_AMOUNT: "£125.00",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "London W1K 5AB",
      SHIPPING_ADDRESS_4: "United Kingdom",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
    });

  const [stussyReceiptData, setStussyReceiptData] = useState<StussyReceiptData>(
    {
      ORDER_NUMBER: "STU123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/stussy/stussy_files/product-image.jpg",
      PRODUCT_NAME: "Stussy 8 Ball Tee",
      PRODUCT_SIZE: "L",
      PRODUCT_COLOR: "Black",
      PRODUCT_PRICE: "$50.00",
      QUANTITY: "1",
      SUBTOTAL: "$50.00",
      SHIPPING_COST: "$10.00",
      TAX_AMOUNT: "$5.00",
      TOTAL_AMOUNT: "$65.00",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "Los Angeles, CA 90001",
      SHIPPING_ADDRESS_4: "United States",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
    }
  );

  const [yzygapReceiptData, setYzyGapReceiptData] = useState<YzyGapReceiptData>(
    {
      ORDER_NUMBER: "YZY123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/yzygap/yzygap_files/product-image.jpg",
      PRODUCT_NAME: "YZY GAP Hoodie",
      PRODUCT_SIZE: "M",
      PRODUCT_COLOR: "Blue",
      PRODUCT_PRICE: "$120.00",
      QUANTITY: "1",
      SUBTOTAL: "$120.00",
      SHIPPING_COST: "$15.00",
      TAX_AMOUNT: "$10.00",
      TOTAL_AMOUNT: "$145.00",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "Chicago, IL 60601",
      SHIPPING_ADDRESS_4: "United States",
      PAYMENT_METHOD: "Mastercard",
      CARD_ENDING: "5678",
    }
  );

  const [stockxReceiptData, setStockxReceiptData] = useState<StockXReceiptData>(
    {
      ORDER_NUMBER: "STX123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "/stockx/stockx_files/product-image.jpg",
      PRODUCT_NAME: "Air Jordan 1 Retro High OG",
      PRODUCT_SIZE: "US 10",
      PRODUCT_PRICE: "$285.00",
      SHIPPING_COST: "$13.95",
      TAX_AMOUNT: "$25.00",
      TOTAL_AMOUNT: "$323.95",
      TRACKING_NUMBER: "1Z999AA1234567890",
      ESTIMATED_DELIVERY: "December 5, 2024",
      SHIPPING_ADDRESS_1: "John Doe",
      SHIPPING_ADDRESS_2: "123 Main Street",
      SHIPPING_ADDRESS_3: "New York, NY 10001",
      SHIPPING_ADDRESS_4: "United States",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
      ORDER_STATUS: "ordered",
    }
  );

  // Utility functions for quick actions
  const generateOrderNumber = (prefix: string) => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDeliveryDate = (daysAhead: number = 3) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generateTrackingNumber = () => {
    const prefix = "1Z999AA";
    const numbers = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
    return `${prefix}${numbers}`;
  };

  const generateRandomCard = () => {
    return Math.floor(Math.random() * 9000 + 1000).toString();
  };

  // Input change handlers
  const handleAppleInputChange = (
    field: keyof AppleReceiptData,
    value: string
  ) => {
    setAppleReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBalenciagaInputChange = (
    field: keyof BalenciagaReceiptData,
    value: string
  ) => {
    setBalenciagaReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBapeInputChange = (
    field: keyof BapeReceiptData,
    value: string
  ) => {
    setBapeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiorInputChange = (
    field: keyof DiorReceiptData,
    value: string
  ) => {
    setDiorReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNikeInputChange = (
    field: keyof NikeReceiptData,
    value: string
  ) => {
    setNikeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoatInputChange = (
    field: keyof GoatReceiptData,
    value: string
  ) => {
    setGoatReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFarfetchInputChange = (
    field: keyof FarfetchReceiptData,
    value: string
  ) => {
    setFarfetchReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGalleryDeptInputChange = (
    field: keyof GalleryDeptReceiptData,
    value: string
  ) => {
    setGalleryDeptReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGrailedInputChange = (
    field: keyof GrailedReceiptData,
    value: string
  ) => {
    setGrailedReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLVInputChange = (field: keyof LVReceiptData, value: string) => {
    setLVReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMonclerInputChange = (
    field: keyof MonclerReceiptData,
    value: string
  ) => {
    setMonclerReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNorthFaceInputChange = (
    field: keyof NorthFaceReceiptData,
    value: string
  ) => {
    setNorthFaceReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSupremeInputChange = (
    field: keyof SupremeReceiptData,
    value: string
  ) => {
    setSupremeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrapstarInputChange = (
    field: keyof TrapstarReceiptData,
    value: string
  ) => {
    setTrapstarReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStussyInputChange = (
    field: keyof StussyReceiptData,
    value: string
  ) => {
    setStussyReceiptData((prev) => ({ ...prev, [field]: value }));
  };
  const handleYzyGapInputChange = (
    field: keyof YzyGapReceiptData,
    value: string
  ) => {
    setYzyGapReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAppleTotal = () => {
    const price = parseFloat(
      appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
    );
    const shipping =
      appleReceiptData.SHIPPING_COST.toLowerCase() === "free"
        ? 0
        : parseFloat(appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ""));
    const total = price + shipping;
    return `£${total.toFixed(2)}`;
  };

  const updateAppleTotal = () => {
    const newTotal = calculateAppleTotal();
    setAppleReceiptData((prev) => ({ ...prev, ORDER_TOTAL: newTotal }));
  };

  const generateReceipt = () => {
    if (selectedReceiptType === "apple") {
      localStorage.setItem(
        "appleReceiptData",
        JSON.stringify(appleReceiptData)
      );
      router.push("/apple-receipt");
    } else if (selectedReceiptType === "balenciaga") {
      localStorage.setItem(
        "balenciagaReceiptData",
        JSON.stringify(balenciagaReceiptData)
      );
      router.push("/balenciaga-receipt");
    } else if (selectedReceiptType === "bape") {
      localStorage.setItem("bapeReceiptData", JSON.stringify(bapeReceiptData));
      router.push("/bape-receipt");
    } else if (selectedReceiptType === "dior") {
      localStorage.setItem("diorReceiptData", JSON.stringify(diorReceiptData));
      router.push("/dior-receipt");
    } else if (selectedReceiptType === "nike") {
      localStorage.setItem("nikeReceiptData", JSON.stringify(nikeReceiptData));
      router.push("/nike-receipt");
    } else if (selectedReceiptType === "goat") {
      localStorage.setItem("goatReceiptData", JSON.stringify(goatReceiptData));
      router.push("/goat-receipt");
    } else if (selectedReceiptType === "farfetch") {
      localStorage.setItem(
        "farfetchReceiptData",
        JSON.stringify(farfetchReceiptData)
      );
      router.push("/farfetch-receipt");
    } else if (selectedReceiptType === "gallery_dept") {
      localStorage.setItem(
        "galleryDeptReceiptData",
        JSON.stringify(galleryDeptReceiptData)
      );
      router.push("/gallery-dept-receipt");
    } else if (selectedReceiptType === "grailed") {
      localStorage.setItem(
        "grailedReceiptData",
        JSON.stringify(grailedReceiptData)
      );
      router.push("/grailed-receipt");
    } else if (selectedReceiptType === "lv") {
      localStorage.setItem("lvReceiptData", JSON.stringify(lvReceiptData));
      router.push("/lv-receipt");
    } else if (selectedReceiptType === "moncler") {
      localStorage.setItem(
        "monclerReceiptData",
        JSON.stringify(monclerReceiptData)
      );
      router.push("/moncler-receipt");
    } else if (selectedReceiptType === "northface") {
      localStorage.setItem(
        "northfaceReceiptData",
        JSON.stringify(northFaceReceiptData)
      );
      router.push("/northface-receipt");
    } else if (selectedReceiptType === "supreme") {
      localStorage.setItem(
        "supremeReceiptData",
        JSON.stringify(supremeReceiptData)
      );
      router.push("/supreme-receipt");
    } else if (selectedReceiptType === "trapstar") {
      localStorage.setItem(
        "trapstarReceiptData",
        JSON.stringify(trapstarReceiptData)
      );
      router.push("/trapstar-receipt");
    } else if (selectedReceiptType === "stussy") {
      localStorage.setItem(
        "stussyReceiptData",
        JSON.stringify(stussyReceiptData)
      );
      router.push("/stussy-receipt");
    } else if (selectedReceiptType === "yzygap") {
      localStorage.setItem(
        "yzygapReceiptData",
        JSON.stringify(yzygapReceiptData)
      );
      router.push("/yzygap-receipt");
    } else if (selectedReceiptType === "stockx") {
      localStorage.setItem(
        "stockxReceiptData",
        JSON.stringify(stockxReceiptData)
      );
      router.push("/stockx-receipt");
    }
  };

  // Get the appropriate icon for each brand (using actual logos from their folders)
  const getBrandIcon = (brand: ReceiptType) => {
    switch (brand) {
      case "apple":
        return (
          <img
            src="/apple/apple_files/apple_icon_2x.png"
            alt="Apple"
            className="w-12 h-12 object-contain"
          />
        );
      case "balenciaga":
        return (
          <img
            src="/balenciaga/balenciaga_files/73c19a3b-e950-4a7b-92a3-3b6c9767e6c7.png"
            alt="Balenciaga"
            className="w-12 h-12 object-contain"
          />
        );
      //public/bape/Thank you for your purchase!_files/ukbapecomlogo01.png
      case "bape":
        return (
          <img
            src="/bape/Thank you for your purchase!_files/ukbapecomlogo01.png"
            alt="BAPE"
            className="w-24 h-24 object-contain"
          />
        );
      case "dior":
        return (
          <img
            src="/dior/dior_files/cart.png"
            alt="Dior"
            className="w-12 h-12 object-contain"
          />
        );
      case "nike":
        return (
          <img
            src="/nike/nike_files/Swoosh2x.png"
            alt="Nike"
            className="w-12 h-12 object-contain"
          />
        );
      case "goat":
        return (
          <img
            src="/goat/goat_files/GOATLogo2022.png"
            alt="GOAT"
            className="w-12 h-12 object-contain"
          />
        );
        //public/farfetch/farfetch_files/.png
      case "farfetch":
        return (
          <img
            src="/farfetch/farfetch_files/farfetch_logo_global_dark@4x.png"
            alt="Farfetch"
            className="w-24 h-24 object-contain"
          />
        );
      case "gallery_dept":
        return (
          <img
            src="/gallerydept/gallery_dept_files/unnamed.png"
            alt="Gallery Dept"
            className="w-12 h-12 object-contain"
          />
        );
      case "grailed":
        return (
          <img
            src="/grailed/grailed_files/logo-no-whitespace.jpg"
            alt="Grailed"
            className="w-12 h-12 object-contain"
          />
        );
        //public/lv/lv_files/louis-vuitton--tpl_rs_lv.png
      case "lv":
        return (
          <img
            src="/lv/lv_files/louis-vuitton--tpl_rs_lv.png"
            alt="Louis Vuitton"
            className="w-12 h-12 object-contain"
          />
        );
      case "moncler":
        return (
          <img
            src={monclerx}
            alt="Moncler"
            className="w-12 h-12 object-contain"
          />
        );
      case "northface":
        return (
          <img
            src="/northface/Great! Order 73442336 has been placed NORTHFACE_files/0ec5ac62-677e-40f8-9b7d-5c501058bf9c.jpg"
            alt="The North Face"
            className="w-12 h-12 object-contain"
          />
        );
        //public/stockx_verified/stockx_new_verified_files/StockX_Vertical_Gray_Digital_RGB.png
      case "stockx":
        return (
          <img
            src="/stockx_verified/stockx_new_verified_files/StockX_Vertical_Gray_Digital_RGB.png"
            alt="StockX"
            className="w-12 h-12 object-contain"
          />
        );
      case "supreme":
        return  <img
            src={supremex}
            alt="Supreme"
            className="w-12 h-12 object-contain"
          />;
      case "trapstar":
        return <img
            src="/trapstar/trapstar_files/unnamed.png"
            alt="trapstar"
            className="w-12 h-12 object-contain"
          />;
      case "stussy":
        return <img
            src="/stussy/stussy_files/282540.webp"
            alt="stussy"
            className="w-12 h-12 object-contain"
          />;   
      case "yzygap":
        return <img
            src="/yzygap/yzygap_files/unnamed.png"
            alt="yzygap"
            className="w-24 h-24 object-contain"
          />;
      default:
        return (
          <svg
            className="w-12 h-12 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
    }
  };

  const selectedReceiptInfo = receiptTypes.find(
    (type) => type.value === selectedReceiptType
  );

  const renderMobileDropdown = () => (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between shadow-sm hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{selectedReceiptInfo?.icon}</span>
          <div>
            <div className="font-medium text-gray-900">
              {selectedReceiptInfo?.label}
            </div>
            <div className="text-xs text-gray-500">
              {selectedReceiptInfo?.category}
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {Object.entries(
            receiptTypes.reduce((acc, type) => {
              if (!acc[type.category]) acc[type.category] = [];
              acc[type.category].push(type);
              return acc;
            }, {} as Record<string, typeof receiptTypes>)
          ).map(([category, types]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                {category}
              </div>
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedReceiptType(type.value as ReceiptType);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedReceiptType === type.value
                      ? "bg-blue-50 border-r-2 border-blue-500"
                      : ""
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium text-gray-900">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDesktopTabs = () => (
    <div className="bg-white rounded-lg p-2 shadow-md overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        {receiptTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedReceiptType(type.value as ReceiptType)}
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-md font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex items-center space-x-2 ${
              selectedReceiptType === type.value
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className="text-sm">{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Enhanced quick actions for different receipt types
  const getQuickActions = () => {
    const commonActions = [
      {
        label: "Use Today's Date",
        icon: "📅",
        action: () => {
          const today = getTodayDate();
          switch (selectedReceiptType) {
            case "apple":
              setAppleReceiptData((prev) => ({ ...prev, ORDER_DATE: today }));
              break;
            case "nike":
              setNikeReceiptData((prev) => ({ ...prev, ORDER_DATE: today }));
              break;
            case "dior":
              setDiorReceiptData((prev) => ({ ...prev, ORDER_DATE: today }));
              break;
            case "goat":
              setGoatReceiptData((prev) => ({ ...prev, ORDER_DATE: today }));
              break;
            case "stockx":
              setStockxReceiptData((prev) => ({ ...prev, ORDER_DATE: today }));
              break;
            // Add more cases as needed
          }
        },
      },
      {
        label: "Generate Order Number",
        icon: "🔢",
        action: () => {
          const prefixMap: Record<string, string> = {
            apple: "W",
            nike: "N",
            dior: "",
            goat: "GOAT",
            stockx: "STX",
            balenciaga: "BAL",
            bape: "BAPEUK",
            supreme: "SUP",
            trapstar: "TS",
            stussy: "STU",
            yzygap: "YZY",
            lv: "LV",
            moncler: "MCL",
            northface: "",
            farfetch: "FF",
            gallery_dept: "GD",
            grailed: "GR",
          };

          const prefix = prefixMap[selectedReceiptType] || "";
          const orderNumber = generateOrderNumber(prefix);

          switch (selectedReceiptType) {
            case "apple":
              setAppleReceiptData((prev) => ({
                ...prev,
                ORDER_NUMBER: orderNumber,
              }));
              break;
            case "nike":
              setNikeReceiptData((prev) => ({
                ...prev,
                ORDER_NUMBER: orderNumber,
              }));
              break;
            case "dior":
              setDiorReceiptData((prev) => ({
                ...prev,
                ORDER_NUMBER: orderNumber,
              }));
              break;
            case "goat":
              setGoatReceiptData((prev) => ({
                ...prev,
                ORDER_NUMBER: orderNumber,
              }));
              break;
            case "stockx":
              setStockxReceiptData((prev) => ({
                ...prev,
                ORDER_NUMBER: orderNumber,
              }));
              break;
            // Add more cases
          }
        },
      },
      {
        label: "Generate Tracking",
        icon: "📦",
        action: () => {
          const tracking = generateTrackingNumber();
          switch (selectedReceiptType) {
            case "goat":
              setGoatReceiptData((prev) => ({
                ...prev,
                TRACKING_NUMBER: tracking,
              }));
              break;
            case "stockx":
              setStockxReceiptData((prev) => ({
                ...prev,
                TRACKING_NUMBER: tracking,
              }));
              break;
            case "gallery_dept":
              setGalleryDeptReceiptData((prev) => ({
                ...prev,
                TRACKING_NUMBER: tracking,
              }));
              break;
          }
        },
      },
      {
        label: "Set Delivery Date",
        icon: "🚚",
        action: () => {
          const deliveryDate = getDeliveryDate();
          switch (selectedReceiptType) {
            case "nike":
              setNikeReceiptData((prev) => ({
                ...prev,
                DELIVERY_DATE: deliveryDate,
              }));
              break;
            case "goat":
              setGoatReceiptData((prev) => ({
                ...prev,
                ESTIMATED_DELIVERY: deliveryDate,
              }));
              break;
            case "stockx":
              setStockxReceiptData((prev) => ({
                ...prev,
                ESTIMATED_DELIVERY: deliveryDate,
              }));
              break;
            case "farfetch":
              setFarfetchReceiptData((prev) => ({
                ...prev,
                DELIVERY: deliveryDate,
              }));
              break;
          }
        },
      },
      {
        label: "Random Card Ending",
        icon: "💳",
        action: () => {
          const cardEnding = generateRandomCard();
          switch (selectedReceiptType) {
            case "bape":
              setBapeReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "dior":
              setDiorReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "nike":
              setNikeReceiptData((prev) => ({ ...prev, CARD_END: cardEnding }));
              break;
            case "stockx":
              setStockxReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "moncler":
              setMonclerReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "supreme":
              setSupremeReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "trapstar":
              setTrapstarReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "stussy":
              setStussyReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "yzygap":
              setYzyGapReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
            case "farfetch":
              setFarfetchReceiptData((prev) => ({
                ...prev,
                CARD_ENDING: cardEnding,
              }));
              break;
          }
        },
      },
    ];

    const specificActions = [];

    // Add specific actions based on receipt type
    switch (selectedReceiptType) {
      case "apple":
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const price = parseFloat(
              appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
            );
            const shipping =
              appleReceiptData.SHIPPING_COST.toLowerCase() === "free"
                ? 0
                : parseFloat(
                    appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, "")
                  );
            const total = price + shipping;
            setAppleReceiptData((prev) => ({
              ...prev,
              ORDER_TOTAL: `£${total.toFixed(2)}`,
            }));
          },
        });
        break;

      case "stockx":
        specificActions.push(
          {
            label: "Calculate Total",
            icon: "🧮",
            action: () => {
              const price = parseFloat(
                stockxReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
              );
              const shipping = parseFloat(
                stockxReceiptData.SHIPPING_COST.replace(/[£$,€]/g, "")
              );
              const tax = parseFloat(
                stockxReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, "")
              );
              const total = price + shipping + tax;
              setStockxReceiptData((prev) => ({
                ...prev,
                TOTAL_AMOUNT: `$${total.toFixed(2)}`,
              }));
            },
          },
          {
            label: "Toggle Status",
            icon: "🔄",
            action: () => {
              setStockxReceiptData((prev) => ({
                ...prev,
                ORDER_STATUS:
                  prev.ORDER_STATUS === "ordered" ? "verified" : "ordered",
              }));
            },
          }
        );
        break;

      case "nike":
        specificActions.push({
          label: "Sync Price & Total",
          icon: "💰",
          action: () => {
            setNikeReceiptData((prev) => ({ ...prev, TOTAL: prev.PRICE }));
          },
        });
        break;

      case "goat":
      case "gallery_dept":
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            if (selectedReceiptType === "goat") {
              const price = parseFloat(
                goatReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
              );
              const shipping = parseFloat(
                goatReceiptData.SHIPPING_COST.replace(/[£$,€]/g, "")
              );
              const tax = parseFloat(
                goatReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, "")
              );
              const total = price + shipping + tax;
              setGoatReceiptData((prev) => ({
                ...prev,
                TOTAL_AMOUNT: `$${total.toFixed(2)}`,
              }));
            }
          },
        });
        break;

      case "bape":
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const price = parseFloat(
              bapeReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
            );
            const shipping = parseFloat(
              bapeReceiptData.SHIPPING_COST.replace(/[£$,€]/g, "")
            );
            const total = price + shipping;
            setBapeReceiptData((prev) => ({
              ...prev,
              ORDER_TOTAL_CURRENCY: `£${total.toFixed(2)} GBP`,
            }));
          },
        });
        break;

      case "grailed":
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const soldPrice = parseFloat(
              grailedReceiptData.SOLD_PRICE.replace(/[£$,€]/g, "")
            );
            const tax = parseFloat(
              grailedReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, "")
            );
            const total = soldPrice + tax;
            setGrailedReceiptData((prev) => ({
              ...prev,
              TOTAL_AMOUNT: `€${total.toFixed(2)}`,
            }));
          },
        });
        break;
    }

    return [...commonActions, ...specificActions];
  };

  const renderReceiptForm = () => {
    switch (selectedReceiptType) {
      case "apple":
        return (
          <AppleReceiptForm
            data={appleReceiptData}
            onInputChange={handleAppleInputChange}
          />
        );
      case "balenciaga":
        return (
          <BalenciagaReceiptForm
            data={balenciagaReceiptData}
            onInputChange={handleBalenciagaInputChange}
          />
        );
      case "bape":
        return (
          <BapeReceiptForm
            data={bapeReceiptData}
            onInputChange={handleBapeInputChange}
          />
        );
      case "dior":
        return (
          <DiorReceiptForm
            data={diorReceiptData}
            onInputChange={handleDiorInputChange}
          />
        );
      case "nike":
        return (
          <NikeReceiptForm
            data={nikeReceiptData}
            onInputChange={handleNikeInputChange}
          />
        );
      case "goat":
        return (
          <GoatReceiptForm
            data={goatReceiptData}
            onInputChange={handleGoatInputChange}
          />
        );
      case "farfetch":
        return (
          <FarfetchReceiptForm
            data={farfetchReceiptData}
            onInputChange={handleFarfetchInputChange}
          />
        );
      case "gallery_dept":
        return (
          <GalleryDeptReceiptForm
            data={galleryDeptReceiptData}
            onInputChange={handleGalleryDeptInputChange}
          />
        );
      case "grailed":
        return (
          <GrailedReceiptForm
            data={grailedReceiptData}
            onInputChange={handleGrailedInputChange}
          />
        );
      case "lv":
        return (
          <LVReceiptForm
            data={lvReceiptData}
            onInputChange={handleLVInputChange}
          />
        );
      case "moncler":
        return (
          <MonclerReceiptForm
            data={monclerReceiptData}
            onInputChange={handleMonclerInputChange}
          />
        );
      case "northface":
        return (
          <NorthFaceReceiptForm
            data={northFaceReceiptData}
            onInputChange={handleNorthFaceInputChange}
          />
        );
      case "supreme":
        return (
          <SupremeReceiptForm
            data={supremeReceiptData}
            onInputChange={handleSupremeInputChange}
          />
        );
      case "trapstar":
        return (
          <TrapstarReceiptForm
            data={trapstarReceiptData}
            onInputChange={handleTrapstarInputChange}
          />
        );
      case "stussy":
        return (
          <StussyReceiptForm
            data={stussyReceiptData}
            onInputChange={handleStussyInputChange}
          />
        );
      case "yzygap":
        return (
          <YzyGapReceiptForm
            data={yzygapReceiptData}
            onInputChange={handleYzyGapInputChange}
          />
        );
      case "stockx":
        return (
          <StockXReceiptForm
            data={stockxReceiptData}
            onInputChange={(field, value) => {
              setStockxReceiptData((prev) => ({ ...prev, [field]: value }));
            }}
          />
        );
      default:
        return <div>Select a receipt type</div>;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden">
              <img
                src="/natetube.jpg"
                alt="NateTube"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            NateTube Receipt Generator
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            Generate receipts to match your wins
          </p>
        </div>

        {/* Receipt Type Selector */}
        <div className="flex justify-center mb-6 sm:mb-8">
          {/* Mobile Dropdown (visible on small screens) */}
          <div className="block sm:hidden w-full max-w-md px-4">
            {renderMobileDropdown()}
          </div>

          {/* Desktop Tabs (visible on larger screens) */}
          <div className="hidden sm:block w-full">{renderDesktopTabs()}</div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm sm:text-xl">
                {selectedReceiptInfo?.label} Receipt Details
              </span>
            </h2>

            {renderReceiptForm()}
          </div>

          {/* Preview/Action Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-700 to-gray-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl">
                    {getBrandIcon(selectedReceiptInfo?.value?.toLowerCase())}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {selectedReceiptInfo?.label} Receipt
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Generate a {selectedReceiptInfo?.label} order confirmation.
                </p>

                <Button
                  onClick={generateReceipt}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transform transition hover:scale-105 text-sm sm:text-base"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Generate {selectedReceiptInfo?.label} Receipt
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {getQuickActions().map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant="outline"
                    className="justify-start h-auto py-2 sm:py-3 px-3 sm:px-4 text-left group hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      {action.label}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Category badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {selectedReceiptInfo?.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
