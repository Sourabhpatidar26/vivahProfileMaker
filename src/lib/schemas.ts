import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

export const PersonalDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.date({ required_error: 'Date of Birth is required' }),
  tob: z.string().min(1, 'Time of Birth is required').regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  pob: z.string().min(1, 'Place of Birth is required'),
  age: z.number().min(18, 'Age must be at least 18').max(100).optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  currentAddress: addressSchema,
  permanentAddress: addressSchema,
  sameAsCurrentAddress: z.boolean().optional(),
});

export const FamilyDetailsSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  siblings: z.array(z.object({
    relation: z.string().min(1, 'Relation is required (e.g., Brother, Sister)'),
    name: z.string().min(1, 'Sibling name is required'),
    maritalStatus: z.string().min(1, 'Marital status is required'),
    occupation: z.string().optional(),
  })).optional(),
  familyValues: z.string().optional(),
});

export const JobDetailsSchema = z.object({
  companyName: z.string().optional(),
  designation: z.string().optional(),
  income: z.string().optional(), // Using string for flexibility (e.g., "5-7 LPA", "$70,000 per annum")
  location: z.string().optional(),
}).optional();

export const PropertyDetailsSchema = z.object({
  description: z.string().optional(),
  type: z.string().optional(), // e.g., Apartment, House, Land
  value: z.string().optional(), // Using string for flexibility
}).optional();

export const BiodataSchema = z.object({
  template: z.enum(['template1', 'template2'], { required_error: 'Please select a template.' }),
  personalDetails: PersonalDetailsSchema,
  familyDetails: FamilyDetailsSchema,
  jobDetails: JobDetailsSchema,
  propertyDetails: PropertyDetailsSchema,
});

export type Biodata = z.infer<typeof BiodataSchema>;
export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;
export type FamilyDetails = z.infer<typeof FamilyDetailsSchema>;
export type JobDetails = z.infer<typeof JobDetailsSchema>;
export type PropertyDetails = z.infer<typeof PropertyDetailsSchema>;

export const defaultBiodata: Biodata = {
  template: 'template1',
  personalDetails: {
    name: '',
    dob: new Date(new Date().setFullYear(new Date().getFullYear() - 18)), // Default to 18 years ago
    tob: '',
    pob: '',
    phone: '',
    email: '',
    currentAddress: { street: '', city: '', state: '', zip: '', country: '' },
    permanentAddress: { street: '', city: '', state: '', zip: '', country: '' },
    sameAsCurrentAddress: false,
  },
  familyDetails: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: [],
    familyValues: '',
  },
  jobDetails: {
    companyName: '',
    designation: '',
    income: '',
    location: '',
  },
  propertyDetails: {
    description: '',
    type: '',
    value: '',
  },
};
