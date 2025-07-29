interface Trip {
  id: string;
  title: string;
  description: string;
  days: number;
  price: number;
  category: 'OneDay' | 'MultiDay';
  image: string;
  timeline?: { time: string; activity: string }[];
}

export const trips: Trip[] = [
  {
    id: "bigbelly-hatyai",
    title: "ทัวร์ตัวแตกหาดใหญ่",
    description: "ตะลุยกินร้านเด็ดหาดใหญ่แบบจัดเต็ม 1 วันเต็ม เดินทางด้วยรถเหมาหรือเช่ารถเอง เที่ยวครบทั้งวัด คาเฟ่ และร้านในตำนาน เช่น ข้าวมันไก่โกตี๋, กุ๊กชัยติ่มซำ, Foreseen ชาชัก, วัดฉื่อฉาง, ซุ้มประตูไชน่าทาวน์ ฯลฯ",
    days: 1,
    price: 0,
    category: "OneDay",
    image: "/images/trips/bigbelly-hatyai.jpg",
    timeline: [
      { time: "09:00", activity: "อาหารเช้า: ข้าวมันไก่โกตี๋ / กุ๊กชัยติ่มซำ / หมี่เบตง" },
      { time: "10:30", activity: "คาเฟ่: The Company Coffee / Realm Songkhla" },
      { time: "11:00", activity: "ขึ้นเขาคอหงส์ ไหว้พระบรมรูป ร.5 / เจ้าแม่กวนอิม / พระพรหม" },
      { time: "12:00", activity: "อาหารเที่ยง: ร้านกันเอง / ในรู / ไก่ทอดเดชา / อ้า" },
      { time: "13:30", activity: "ขนมหวาน: มันเดือยถั่ว (สถานีรถไฟ)" },
      { time: "14:30", activity: "คาเฟ่: Lucas.HDY / Local.hdy / Away Coffee" },
      { time: "15:00", activity: "ไหว้พระ: วัดฉื่อฉาง / ศาลเจ้าท่งเซียเซี่ยงตึ๊ง / China Town" },
      { time: "21:00", activity: "ปิดท้ายสายหวาน: ป้าแอ๊ะ / โกอ้วน / Zystem / Drop" }
    ]
  },
  {
    id: "satingphra-yinyang",
    title: "สงขลา-สทิงพระ: ตามรอยหลวงปู่ทวด & Lunch Table Course",
    description: "ตามรอยหลวงปู่ทวดในแดนใต้ พร้อมดื่มด่ำอาหารท้องถิ่นในรูปแบบ Lunch Table Course และกิจกรรมทำไข่ครอบแบบ workshop ณ ฟาร์มท้องถิ่น",
    days: 1,
    price: 1490,
    category: "OneDay",
    image: "/images/trips/satingphra-yinyang.jpg",
    timeline: [
      { time: "09:30", activity: "รวมตัวผู้ร่วมทริป" },
      { time: "10:15", activity: "ออกเดินทางจากหาดใหญ่" },
      { time: "10:45", activity: "จิบกาแฟยามเช้า Boot Energy" },
      { time: "11:30", activity: "กิจกรรมไข่ครอบ & Workshop ณ ฟาร์มสุรารวยสุข" },
      { time: "12:30", activity: "Lunch Table Course สไตล์ท้องถิ่น (2 ชั่วโมง)" },
      { time: "14:30", activity: "สักการะวัดสำคัญ: วัดต้นเลียบ / วัดดีหลวง / วัดพะโคะ" },
      { time: "17:30", activity: "เดินทางกลับ" }
    ]
  },
  {
    id: "lipe-3d2n",
    title: "เที่ยวหลีเป๊ะ Chill @ มัลดีฟเมืองไทย",
    description: "ดำน้ำ ชมปะการังที่เกาะหินงาม เกาะราวี เกาะยาง เกาะอาดัง พร้อมพักรีสอร์ท 2 คืน และล่องเรือไปเกาะไข่, อุทยานตะรุเตา, ซุ้มประตูหิน",
    days: 3,
    price: 6500,
    category: "MultiDay",
    image: "/images/trips/lipe-3d2n.jpg",
    timeline: [
      { time: "Day 1", activity: "เดินทางจากสนามบินหาดใหญ่ → ท่าเรือปากบารา → หลีเป๊ะ" },
      { time: "Day 2", activity: "ดำน้ำเกาะหินงาม / เกาะอาดัง / เกาะราวี / เกาะยาง / เกาะยิบัง" },
      { time: "Day 3", activity: "เดินทางกลับขึ้นฝั่ง → สนามบินหาดใหญ่" }
    ]
  },
  {
    id: "penang-2d1n",
    title: "เที่ยวปีนัง 2 วัน 1 คืน",
    description: "ชม Street Art ปีนัง, Penang Hill, Gurney Plaza, วัดเขาเต่า พร้อมพักโรงแรมระดับมาตรฐาน 1 คืน พร้อมไกด์",
    days: 2,
    price: 3990,
    category: "MultiDay",
    image: "/images/trips/penang-2d1n.jpg",
    timeline: [
      { time: "Day 1", activity: "เดินทางจากหาดใหญ่ → Penang Hill / Street Art / Gurney Plaza" },
      { time: "Day 2", activity: "วัดเขาเต่า / เช็คเอาท์ / เดินทางกลับ" }
    ]
  },
  {
    id: "genting-penang-3d2n",
    title: "เก็นติ้ง - ปีนัง 3 วัน 2 คืน",
    description: "เยือน Genting Highlands, ถ้ำเปรัค, กัวลาลัมเปอร์, ตึกแฝด, วัดเขาเต่า, พักโรงแรม 2 คืน เที่ยวเต็มอิ่มทั้งธรรมชาติและเมือง",
    days: 3,
    price: 6500,
    category: "MultiDay",
    image: "/images/trips/genting-penang-3d2n.jpg",
    timeline: [
      { time: "Day 1", activity: "หาดใหญ่ → ถ้ำเปรัค → เก็นติ้ง ไฮแลนด์" },
      { time: "Day 2", activity: "City tour KL → ตึกแฝด → ปีนัง → Chew Jetty → Gurney Plaza" },
      { time: "Day 3", activity: "Street Art / Penang Hill / วัดเขาเต่า / กลับหาดใหญ่" }
    ]
  },
  {
    id: "songkhla-oldtown",
    title: "สงขลาเมืองเก่า Old Town",
    description: "นั่งรถชมเมืองสงขลา แวะ Street Art เมืองเก่าสงขลา จุดถ่ายรูปคลาสสิก บ้านนายท้าย, ศาลากลาง, ประตูเมือง, บ้านพระไตรฯ และคาเฟ่ FENZI Bakery",
    days: 1,
    price: 999,
    category: "OneDay",
    image: "/images/trips/songkhla-oldtown.jpg",
    timeline: [
      { time: "08:00", activity: "รับคณะจากที่พัก เดินทางสู่สวนสาธารณะหาดใหญ่" },
      { time: "08:30", activity: "แวะไหว้พระ, เยี่ยมชม Street Art เมืองเก่าสงขลา" },
      { time: "11:30", activity: "เดินทางไปบ้านน่าถ่ายรูป เช่น บ้านประไพ, บ้านสองรส, บ้านเสนาะฯ" },
      { time: "13:00", activity: "นั่งรถชมเมืองสงขลา & ถ่ายรูป" },
      { time: "14:00", activity: "แวะ FENZI Inspired Bakery & Songkhla Station" },
      { time: "15:00", activity: "เดินทางกลับ" }
    ]
  }
];

