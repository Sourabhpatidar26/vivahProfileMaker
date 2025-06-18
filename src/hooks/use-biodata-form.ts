'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { debounce } from 'lodash-es';

const BIODATA_STORAGE_KEY = 'vivahProfileMakerBiodata';

export function useBiodataForm<TFieldValues extends FieldValues>(
  schema: z.ZodType<TFieldValues>,
  defaultValues: TFieldValues
): UseFormReturn<TFieldValues> & { isLoaded: boolean; clearData: () => void } {
  const [isLoaded, setIsLoaded] = useState(false);

  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    let storedDataJson: string | null = null;
    try {
      storedDataJson = localStorage.getItem(BIODATA_STORAGE_KEY);
      if (storedDataJson) {
        const parsedData = JSON.parse(storedDataJson);
        
        // Convert date strings back to Date objects for specific fields
        const checkAndConvertDates = (data: any, path: string[] = []) => {
          if (data && typeof data === 'object') {
            for (const key in data) {
              const currentPath = [...path, key].join('.');
              if (currentPath === 'personalDetails.dob' && typeof data[key] === 'string') {
                const date = new Date(data[key]);
                if (!isNaN(date.getTime())) {
                  data[key] = date;
                } else {
                   data[key] = defaultValues.personalDetails.dob; // fallback to default if invalid
                }
              } else if (data[key] && typeof data[key] === 'object') {
                checkAndConvertDates(data[key], [...path, key]);
              }
            }
          }
        };
        checkAndConvertDates(parsedData);
        form.reset(parsedData);
      }
    } catch (error) {
      console.error('Failed to load or parse biodata from localStorage:', error);
      if (storedDataJson) { // If parsing failed, try to remove corrupted data
        localStorage.removeItem(BIODATA_STORAGE_KEY);
      }
      form.reset(defaultValues); // Reset to defaults if loading fails
    }
    setIsLoaded(true);
  }, [form, defaultValues]); // form.reset dependency removed as it might cause loops, defaultValues for initial safe state

  const saveBiodata = useCallback(
    debounce((data: TFieldValues) => {
      try {
        localStorage.setItem(BIODATA_STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save biodata to localStorage:', error);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (!isLoaded) return;

    const subscription = form.watch((values) => {
      saveBiodata(values as TFieldValues);
    });
    return () => subscription.unsubscribe();
  }, [form, saveBiodata, isLoaded]);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(BIODATA_STORAGE_KEY);
      form.reset(defaultValues);
    } catch (error) {
      console.error('Failed to clear biodata from localStorage:', error);
    }
  }, [form, defaultValues]);

  return { ...form, isLoaded, clearData };
}
