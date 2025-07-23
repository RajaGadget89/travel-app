export interface Trip {
  id: string;
  title: string;
  description: string;
  days: number;
  price: number;
  category: 'OneDay' | 'MultiDay';
  image: string;
}

export const trips: Trip[] = [
  {
    id: 'hatyai-breakaway',
    title: 'ทริปตัวแตกหาดใหญ่',
    description: 'One Day Trip วันที่ 20, 21 พ.ย. 2568',
    days: 1,
    price: 15000,
    category: 'OneDay',
    image: '/images/trips/Khiadee-DeliveryWar-1.png',
  },
  {
    id: 'songkhla-oldtown',
    title: 'ทริปสงขลา Old Town',
    description: 'One Day Trip วันที่ 20 พ.ย. 2568',
    days: 1,
    price: 11500,
    category: 'OneDay',
    image: '/images/trips/Khaidee-DeliveryWar-2.png',
  },
  {
    id: 'mutelu-lunch',
    title: 'Mutelu & Exclusive Lunch in Ruay-Suk Garden',
    description: 'One Day Trip วันที่ 20 พ.ย. 2568',
    days: 1,
    price: 13500,
    category: 'OneDay',
    image: '/images/trips/Khiadee-DeliveryWar-3.png',
  },
  {
    id: 'innovation-pretrip',
    title: 'Pre Trip งาน Panel Plus & อุทยานวิทยาศาสตร์ ม.อ.',
    description: 'One Day Trip วันที่ 21 พ.ย. 2568',
    days: 1,
    price: 12500,
    category: 'OneDay',
    image: '/images/trips/Khiadee-DeliveryWar-4.png',
  },
  {
    id: 'lipe-island',
    title: 'ทริปเกาะหลีเป๊ะ',
    description: '3 Days 2 Nights วันที่ 18–20 พ.ย. 2568',
    days: 3,
    price: 18500,
    category: 'MultiDay',
    image: '/images/trips/Khiadee-DeliveryWar-5.png',
  },
  {
    id: 'phnang-trip',
    title: 'ทริปปีนัง',
    description: '2 Days 1 Night วันที่ 19–20 พ.ย. 2568',
    days: 2,
    price: 14500,
    category: 'MultiDay',
    image: '/images/trips/Khiadee-DeliveryWar-6.png',
  },
  {
    id: 'kl-penang-trip',
    title: 'ทริปเกนติ้ง-ปีนัง',
    description: '3 Days 2 Nights วันที่ 18–20 พ.ย. 2568',
    days: 3,
    price: 16500,
    category: 'MultiDay',
    image: '/images/trips/Khiadee-DeliveryWar-5.png',
  },
];
