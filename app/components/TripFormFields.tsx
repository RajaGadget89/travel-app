'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  minDate?: string;
  helperText?: string;
}

export interface FormData {
  [key: string]: string | File | null;
}

export interface FormErrors {
  [key: string]: string;
}

interface TripFormFieldsProps {
  formSchema: FormField[];
  formData: FormData;
  errors: FormErrors;
  onInputChange: (fieldName: string, value: string) => void;
  onFileChange: (fieldName: string, file: File | null) => void;
}

export default function TripFormFields({
  formSchema,
  formData,
  errors,
  onInputChange,
  onFileChange
}: TripFormFieldsProps) {
  // Searchable Select Component
  const SearchableSelect = ({ field, value, onChange }: { 
    field: FormField; 
    value: string; 
    onChange: (value: string) => void; 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = field.options?.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleSelect = (option: string) => {
      onChange(option);
      setIsOpen(false);
      setSearchTerm('');
      setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
            handleSelect(filteredOptions[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setSelectedIndex(-1);
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
          setSelectedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? searchTerm : value}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => {
              setIsOpen(true);
              setSearchTerm('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="-- กรุณาเลือกจังหวัด --"
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              errors[field.name] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    index === selectedIndex ? 'bg-blue-100' : ''
                  } ${option === value ? 'bg-blue-50 font-medium' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">ไม่พบจังหวัดที่ค้นหา</div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render form field based on type
  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = errors[field.name];

    switch (field.type) {
      case 'citizenId':
        // Thai National ID validation algorithm
        const validateThaiNationalID = (id: string): boolean => {
          if (id.length !== 13) return false;
          
          // Check if all characters are digits
          if (!/^\d{13}$/.test(id)) return false;
          
          // Thai National ID algorithm
          let sum = 0;
          for (let i = 0; i < 12; i++) {
            sum += parseInt(id[i]) * (13 - i);
          }
          const checkDigit = (11 - (sum % 11)) % 10;
          
          return checkDigit === parseInt(id[12]);
        };

        // Format citizen ID for display (X-XXXX-XXXXX-XX-X)
        const formatCitizenId = (digits: string): string => {
          if (digits.length <= 1) return digits;
          if (digits.length <= 5) return `${digits.slice(0, 1)}-${digits.slice(1)}`;
          if (digits.length <= 10) return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5)}`;
          if (digits.length <= 12) return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10)}`;
          return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits.slice(12)}`;
        };

        // Handle citizen ID input change
        const handleCitizenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          // Remove all non-digits and limit to 13 characters
          const digits = input.replace(/\D/g, '').slice(0, 13);
          
          // Store raw digits in form data
          onInputChange(field.name, digits);
          
          // Auto-focus next field when valid (optional)
          if (digits.length === 13 && validateThaiNationalID(digits)) {
            // Find next input field and focus it
            const currentInput = e.target;
            const form = currentInput.closest('form');
            if (form) {
              const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
              const currentIndex = inputs.indexOf(currentInput);
              const nextInput = inputs[currentIndex + 1] as HTMLElement;
              if (nextInput && nextInput.focus) {
                setTimeout(() => nextInput.focus(), 100);
              }
            }
          }
        };

        const citizenIdValue = typeof value === 'string' ? value : '';
        const displayValue = formatCitizenId(citizenIdValue);
        const isValidLength = citizenIdValue.length === 13;
        const isValidFormat = /^\d{13}$/.test(citizenIdValue);
        const isValidAlgorithm = isValidFormat && validateThaiNationalID(citizenIdValue);
        
        let helperText = '';
        let isValid = false;
        
        if (citizenIdValue.length > 0) {
          if (!isValidLength) {
            helperText = 'เลขบัตรประชาชนต้องมี 13 หลัก';
          } else if (!isValidFormat) {
            helperText = 'เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น';
          } else if (!isValidAlgorithm) {
            helperText = 'เลขบัตรประชาชนไม่ถูกต้อง';
          } else {
            helperText = '✓ เลขบัตรประชาชนถูกต้อง';
            isValid = true;
          }
        }

        return (
          <div>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={displayValue}
              onChange={handleCitizenIdChange}
              maxLength={17} // Account for dashes: 13 digits + 4 dashes
              inputMode="numeric"
              pattern="[0-9\-]*"
              autoComplete="off"
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : helperText ? `${field.name}-helper` : undefined}
              className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                error ? 'border-red-500' : isValid ? 'border-green-500' : citizenIdValue.length > 0 ? 'border-yellow-500' : 'border-gray-300'
              }`}
              placeholder="1-2345-67890-12-3"
            />
            {helperText && (
              <p id={`${field.name}-helper`} className={`mt-1 text-sm ${
                isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {helperText}
              </p>
            )}
          </div>
        );

      case 'date':
        return (
          <div>
            <input
              type="date"
              id={field.name}
              name={field.name}
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => onInputChange(field.name, e.target.value)}
              min={field.minDate}
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : field.helperText ? `${field.name}-helper` : undefined}
              className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {field.helperText && (
              <p id={`${field.name}-helper`} className="mt-1 text-sm text-gray-500">
                {field.helperText}
              </p>
            )}
          </div>
        );

      case 'passport':
        // Handle passport input change with auto-uppercase
        const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          // Convert to uppercase and remove special characters/spaces
          const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
          // Limit to 15 characters
          const limited = cleaned.slice(0, 15);
          onInputChange(field.name, limited);
        };

        return (
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={handlePassportChange}
            minLength={6}
            maxLength={15}
            autoComplete="off"
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="A12345678"
            style={{ textTransform: 'uppercase' }}
          />
        );

      case 'email':
        // Handle email input change with English-only restriction
        const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          // Allow only English letters, numbers, and common email symbols
          const englishOnly = input.replace(/[^a-zA-Z0-9@._-]/g, '');
          onInputChange(field.name, englishOnly);
        };

        return (
          <input
            type="email"
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={handleEmailChange}
            autoComplete="email"
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="example@email.com"
            style={{ textTransform: 'lowercase' }}
          />
        );

      case 'tel':
        // Thai phone number validation
        const validateThaiPhoneNumber = (digits: string): { isValid: boolean; errorMessage: string } => {
          if (digits.length === 0) {
            return { isValid: false, errorMessage: '' };
          }
          
          // Check if starts with '0'
          if (!digits.startsWith('0')) {
            return { isValid: false, errorMessage: 'เบอร์โทรศัพท์ไทยต้องขึ้นต้นด้วยเลข 0' };
          }
          
          // Check if exactly 10 digits
          if (digits.length !== 10) {
            return { isValid: false, errorMessage: 'เบอร์โทรศัพท์ต้องมี 10 หลัก' };
          }
          
          // Check if all characters are digits
          if (!/^\d{10}$/.test(digits)) {
            return { isValid: false, errorMessage: 'เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น' };
          }
          
          return { isValid: true, errorMessage: '' };
        };

        // Format phone number for display (XXX-XXX-XXXX)
        const formatPhoneNumber = (digits: string): string => {
          if (digits.length <= 3) return digits;
          if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
          return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        };

        // Handle phone input change
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target.value;
          // Remove all non-digits and limit to 10 characters
          const digits = input.replace(/\D/g, '').slice(0, 10);
          
          // Store raw digits in form data
          onInputChange(field.name, digits);
        };

        const phoneValue = typeof value === 'string' ? value : '';
        const phoneDisplayValue = formatPhoneNumber(phoneValue);
        const phoneValidation = validateThaiPhoneNumber(phoneValue);
        
        // Determine border color and helper text
        let phoneBorderColor = 'border-gray-300';
        let phoneHelperText = '';
        let phoneHelperTextColor = 'text-gray-500';
        
        if (phoneValue.length > 0) {
          if (phoneValidation.isValid) {
            phoneBorderColor = 'border-green-500';
            phoneHelperText = '✓ เบอร์โทรศัพท์ถูกต้อง';
            phoneHelperTextColor = 'text-green-600';
          } else if (phoneValue.length < 10) {
            phoneBorderColor = 'border-yellow-500';
            phoneHelperText = phoneValidation.errorMessage;
            phoneHelperTextColor = 'text-yellow-600';
          } else {
            phoneBorderColor = 'border-red-500';
            phoneHelperText = phoneValidation.errorMessage;
            phoneHelperTextColor = 'text-red-600';
          }
        }

        return (
          <div>
            <input
              type="tel"
              id={field.name}
              name={field.name}
              value={phoneDisplayValue}
              onChange={handlePhoneChange}
              inputMode="numeric"
              pattern="[0-9\-]*"
              autoComplete="tel"
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : phoneHelperText ? `${field.name}-helper` : undefined}
              className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${phoneBorderColor}`}
              placeholder="081-234-5678"
              maxLength={12} // Account for dashes: 10 digits + 2 dashes
            />
            {phoneHelperText && (
              <p id={`${field.name}-helper`} className={`mt-1 text-sm ${phoneHelperTextColor}`}>
                {phoneHelperText}
              </p>
            )}
          </div>
        );

      case 'select':
        // Use searchable select for ccProvince field due to long list
        if (field.name === 'ccProvince') {
          return (
            <SearchableSelect
              field={field}
              value={typeof value === 'string' ? value : ''}
              onChange={(selectedValue) => onInputChange(field.name, selectedValue)}
            />
          );
        }
        
        // Regular select for other fields
        return (
          <select
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onInputChange(field.name, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            required={field.required}
          >
            <option value="">-- กรุณาเลือก --</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onInputChange(field.name, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base resize-vertical min-h-[100px] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'file':
        return (
          <div 
            className={`mt-1 flex justify-center px-4 md:px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors cursor-pointer ${
              error ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-gray-400'
            }`}
            role="button"
            tabIndex={0}
            onClick={() => document.getElementById(field.name)?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById(field.name)?.click();
              }
            }}
            aria-labelledby={`${field.name}-label`}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-gray-600">
                <span id={`${field.name}-label`} className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                  Upload a file
                </span>
                <p className="pl-0 sm:pl-1 mt-1 sm:mt-0">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              id={field.name}
              name={field.name}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onFileChange(field.name, e.target.files?.[0] || null)}
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : undefined}
            />
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onInputChange(field.name, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <>
      {formSchema.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label} {field.required && <span className="text-red-500" aria-label="required">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
              {errors[field.name]}
            </p>
          )}
          {field.type === 'file' && formData[field.name] instanceof File && (
            <div className="mt-2">
              <p className="text-sm text-gray-600" aria-live="polite">
                Selected file: {(formData[field.name] as File).name}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
} 