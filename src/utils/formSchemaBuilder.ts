import { FormField } from '../../app/components/TripFormFields';

// Standard form fields that are always required
const STANDARD_FIELDS: FormField[] = [
  { name: "title", label: "คำนำหน้า", type: "text", required: true },
  { name: "firstName", label: "ชื่อ", type: "text", required: true },
  { name: "lastName", label: "นามสกุล", type: "text", required: true },
  { name: "phone", label: "เบอร์โทรศัพท์", type: "text", required: true },
  { name: "email", label: "อีเมล", type: "email", required: true },
  { name: "note", label: "หมายเหตุเพิ่มเติม", type: "textarea", required: false },
  { name: "paymentProof", label: "แนบหลักฐานการชำระเงิน", type: "file", required: true }
];

// Map form requirement names to their field configurations
const FORM_REQUIREMENT_MAP: { [key: string]: FormField } = {
  citizenId: { name: "citizenId", label: "เลขบัตรประชาชน", type: "text", required: true },
  passportNumber: { name: "passportNumber", label: "หมายเลขพาสปอร์ต", type: "text", required: true },
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
 * @returns Complete form schema with all required fields
 */
export function buildFormSchema(formRequirements: TripFormRequirement[]): FormField[] {
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