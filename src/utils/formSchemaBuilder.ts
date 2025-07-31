import { FormField } from '../../app/components/TripFormFields';
import { THAI_PROVINCES } from '../data/provinces';

// Utility function to parse trip date and extract the last travel day
function parseTripDate(tripDate: string): Date {
  // Handle different date formats
  if (tripDate.includes('–')) {
    // Range format like "18–20/11/2568"
    const parts = tripDate.split('–');
    const lastDay = parts[1].split('/');
    const day = parseInt(lastDay[0]);
    const month = parseInt(lastDay[1]) - 1; // Month is 0-indexed
    const year = parseInt(lastDay[2]) - 543; // Convert Thai year to Gregorian
    return new Date(year, month, day);
  } else if (tripDate.includes(',')) {
    // Multiple options format like "20,21/11/2568"
    const parts = tripDate.split(',');
    const lastOption = parts[parts.length - 1];
    const dateParts = lastOption.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]) - 543;
    return new Date(year, month, day);
  } else {
    // Single date format like "20/11/11"
    const parts = tripDate.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]) + 2000; // Assume 20xx for short years
    return new Date(year, month, day);
  }
}

// Utility function to calculate minimum passport expiry date
function calculateMinPassportExpiry(tripDate: string): { minDate: string; helperText: string } {
  const lastTravelDay = parseTripDate(tripDate);
  
  // Add 6 months + 1 day
  const minExpiryDate = new Date(lastTravelDay);
  minExpiryDate.setMonth(minExpiryDate.getMonth() + 6);
  minExpiryDate.setDate(minExpiryDate.getDate() + 1);
  
  // Format date for input min attribute (YYYY-MM-DD)
  const minDate = minExpiryDate.toISOString().split('T')[0];
  
  // Format date for display (DD/MM/YYYY)
  const displayDate = minExpiryDate.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const helperText = `วันหมดอายุพาสปอร์ตต้องมากกว่า 6 เดือนหลังจากวันเดินทาง (อย่างน้อย ${displayDate})`;
  
  return { minDate, helperText };
}

// Standard form fields that are always required
const STANDARD_FIELDS: FormField[] = [
  { 
    name: "ccProvince", 
    label: "สมาชิกหอการค้า / YEC จังหวัด?", 
    type: "select", 
    required: true,
    options: THAI_PROVINCES
  },
  { 
    name: "title", 
    label: "คำนำหน้า", 
    type: "select", 
    required: true,
    options: ['นาย', 'นางสาว', 'นาง', 'Mr.', 'Ms.', 'Mrs.']
  },
  { name: "firstName", label: "ชื่อ", type: "text", required: true },
  { name: "lastName", label: "นามสกุล", type: "text", required: true },
  { name: "phone", label: "เบอร์โทรศัพท์", type: "tel", required: true },
  { name: "email", label: "อีเมล", type: "email", required: true },
  { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
  { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
];

// Map form requirement names to their field configurations
const FORM_REQUIREMENT_MAP: { [key: string]: FormField } = {
  citizenId: { name: "citizenId", label: "เลขบัตรประชาชน", type: "citizenId", required: true },
  passportNumber: { name: "passportNumber", label: "หมายเลขพาสปอร์ต", type: "passport", required: true },
  passportExpiry: { name: "passportExpiry", label: "วันหมดอายุพาสปอร์ต", type: "date", required: true },
  roomType: { name: "roomType", label: "ประเภทห้องพัก", type: "text", required: true }
};

export interface TripFormRequirement {
  name: string;
  label: string;
  required: boolean;
}

/**
 * Builds a complete form schema by combining standard fields with trip-specific requirements
 * @param formRequirements - Array of form requirements from the trip data
 * @param tripDate - Optional trip date for dynamic field configuration
 * @returns Complete form schema with all required fields
 */
export function buildFormSchema(formRequirements: TripFormRequirement[], tripDate?: string): FormField[] {
  // Start with standard fields
  const schema: FormField[] = [...STANDARD_FIELDS];
  
  // Add trip-specific fields based on formRequirements
  formRequirements.forEach(requirement => {
    const fieldConfig = FORM_REQUIREMENT_MAP[requirement.name];
    if (fieldConfig) {
      // Use the requirement's label if provided, otherwise use the default
      const field: FormField = {
        ...fieldConfig,
        label: requirement.label || fieldConfig.label,
        required: requirement.required
      };
      
      // Add dynamic date logic for passport expiry
      if (field.name === 'passportExpiry' && tripDate) {
        const { minDate, helperText } = calculateMinPassportExpiry(tripDate);
        field.minDate = minDate;
        field.helperText = helperText;
      }
      
      schema.push(field);
    }
  });
  
  return schema;
}

/**
 * Creates initial form data object with empty values for all fields in the schema
 * @param schema - Form schema to create initial data for
 * @returns Object with empty values for all form fields
 */
export function createInitialFormData(schema: FormField[]): { [key: string]: string | File | null } {
  const initialData: { [key: string]: string | File | null } = {};
  schema.forEach(field => {
    initialData[field.name] = '';
  });
  return initialData;
} 