'use client';

import React from 'react';

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
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
  // Render form field based on type
  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = errors[field.name];

    switch (field.type) {
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