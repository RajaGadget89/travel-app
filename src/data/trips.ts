export const trips = [
  {
    id: "satingphra-yinyang",
    name: "สงขลา-สทิงพระ: ตามรอยหลวงปู่ทวด & Lunch Table Course",
    category: "OneDay",
    price: 1490,
    duration: "1 Day",
    description: "ตามรอยหลวงปู่ทวดในแดนใต้ พร้อมสัมผัสอาหารท้องถิ่นในรูปแบบ Lunch Table Course และกิจกรรมทำไข่ครอบแบบ workshop ณ ฟาร์มท้องถิ่น",
    timeline: [
      "09:30 รวมตัวที่จุดนัดพบ",
      "10:15 ออกเดินทางจากหาดใหญ่",
      "10:45 รับกาแฟยามเช้า Boot Energy",
      "11:30 กิจกรรมไข่ครอบ & Workshop",
      "12:30 Lunch Table Course (2 ชั่วโมง)",
      "14:30 สักการะวัดสำคัญ วัดดีหลวง / วัดจะโหนง",
      "17:30 เดินทางกลับ"
    ],
    formRequirements: [
      { name: "citizenId", label: "เลขบัตรประชาชน", required: true }
    ],
    image: "satingphra-yinyang.png"
  },

  {
    id: "lipe-3d2n",
    name: "เที่ยวหลีเป๊ะ Chill @ มัลดีฟเมืองไทย",
    category: "MultiDay",
    price: 6500,
    duration: "3 Days",
    description: "ดำน้ำ ชมปะการังที่เกาะหินงาม เกาะราวี เกาะยาง เกาะอาดัง พร้อมพักรีสอร์ท 2 คืน และล่องเรือไปเกาะไข่, อุทยานตะรุเตา, ชิมปลาระยำ",
    timeline: [
      "Day 1: สนามบินหาดใหญ่ → ท่าเรือ → หลีเป๊ะ",
      "Day 2: ดำน้ำเกาะไข่ / เกาะหินงาม / อ่าวลิง",
      "Day 3: เดินทางกลับ"
    ],
    formRequirements: [
      { name: "passportNumber", label: "หมายเลขพาสปอร์ต", required: true },
      { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", required: true },
      { name: "roomType", label: "ประเภทห้องพัก", required: true }
    ],
    image: "lipe-3d2n.png"
  },

  {
    id: "penang-2d1n",
    name: "เที่ยวปีนัง 2 วัน 1 คืน",
    category: "MultiDay",
    price: 3990,
    duration: "2 Days",
    description: "Street Art ปีนัง, Penang Hill, Gurney Plaza, วัดไทย วัดพม่า พร้อมพักโรงแรมมาตรฐาน 1 คืนที่ปีนัง",
    timeline: [
      "Day 1: ด่านสะเดา → Street Art → Penang Hill",
      "Day 2: วัดไทย วัดพม่า → เดินทางกลับ"
    ],
    formRequirements: [
      { name: "passportNumber", label: "หมายเลขพาสปอร์ต", required: true },
      { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", required: true }
    ],
    image: "penang-2d1n.png"
  },

  {
    id: "genting-penang-3d2n",
    name: "เก็นติ้ง - ปีนัง 3 วัน 2 คืน",
    category: "MultiDay",
    price: 6500,
    duration: "3 Days",
    description: "เยือน Genting Highlands, ถ้ำบาตู, คาเมรอนไฮแลนด์, ปีนัง, ช้อปตลาด, วัดไทย วัดพม่า, พักโรงแรม 2 คืน เที่ยวเต็มอิ่มกับธรรมชาติและเมือง",
    timeline: [
      "Day 1: ด่านสะเดา → Genting Highlands",
      "Day 2: คาเมรอนฯ → ปีนัง",
      "Day 3: ปีนังวัดไทย → วัดพม่า → เดินทางกลับ"
    ],
    formRequirements: [
      { name: "passportNumber", label: "หมายเลขพาสปอร์ต", required: true },
      { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", required: true }
    ],
    image: "genting-penang-3d2n.png"
  },

  {
    id: "songkhla-oldtown",
    name: "สงขลาเมืองเก่า Old Town",
    category: "OneDay",
    price: 899,
    duration: "1 Day",
    description: "ทัวร์รอบเมืองสงขลา และ Street Art เมืองเก่า พร้อมอาหารท้องถิ่น",
    timeline: [
      "09:00 รวมตัวหน้าศาลากลาง",
      "10:00 เดินชม Street Art",
      "12:00 รับประทานอาหารกลางวัน",
      "14:00 อิสระเดินชมเมือง",
      "16:00 เดินทางกลับ"
    ],
    formRequirements: [
      { name: "citizenId", label: "เลขบัตรประชาชน", required: true }
    ],
    image: "songkhla-oldtown.png"
  },

  {
    id: "hadyai-fat",
    name: "ทัวร์ตัวแตกหาดใหญ่",
    category: "OneDay",
    price: 850,
    duration: "1 Day",
    description: "ตะลุยกินร้านเด็ดหาดใหญ่แบบจัดเต็มใน 1 วันเต็ม",
    timeline: [
      "09:00 รวมตัว",
      "10:00 ร้าน A",
      "12:00 ร้าน B",
      "14:00 ร้าน C",
      "17:00 ร้าน D",
      "18:30 จบการเดินทาง"
    ],
    formRequirements: [
      { name: "citizenId", label: "เลขบัตรประชาชน", required: true }
    ]
    // No image property - will use default fallback
  },

  {
    id: "bigbelly-hatyai",
    name: "Big Belly Hatyai Food Tour",
    category: "OneDay",
    price: 1200,
    duration: "1 Day",
    description: "Explore the best local food spots in Hatyai with our expert food guide",
    timeline: [
      "09:00 Meet at central location",
      "10:00 Local breakfast spot",
      "12:00 Traditional lunch",
      "14:00 Street food tour",
      "16:00 Dessert tasting",
      "18:00 End of tour"
    ],
    formRequirements: [
      { name: "citizenId", label: "เลขบัตรประชาชน", required: true }
    ],
    image: "bigbelly-hatyai.png"
  }
];
