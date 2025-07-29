export const tripFormSchema = {
  "penang-2d1n": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "passportNumber", label: "เลขที่พาสปอร์ต", type: "text", required: true },
    { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", type: "date", required: true },
    { name: "roomType", label: "ประเภทห้องพัก (พักเดี่ยว/พักคู่)", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ],
  "genting-penang-3d2n": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "passportNumber", label: "เลขที่พาสปอร์ต", type: "text", required: true },
    { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", type: "date", required: true },
    { name: "roomType", label: "ประเภทห้องพัก", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ],
  "lipe-3d2n": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "citizenId", label: "เลขที่บัตรประชาชน", type: "text", required: true },
    { name: "roomType", label: "ประเภทห้องพัก", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ],
  "bigbelly-hatyai": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "citizenId", label: "เลขที่บัตรประชาชน", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ],
  "satingphra-yinyang": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "citizenId", label: "เลขที่บัตรประชาชน", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ],
  "songkhla-oldtown": [
    { name: "title", label: "คำนำหน้า", type: "text", required: true },
    { name: "firstName", label: "ชื่อ", type: "text", required: true },
    { name: "lastName", label: "นามสกุล", type: "text", required: true },
    { name: "citizenId", label: "เลขที่บัตรประชาชน", type: "text", required: true },
    { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
    { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
  ]
};

