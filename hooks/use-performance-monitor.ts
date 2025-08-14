"use client";

import { useEffect, useCallback } from "react";

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
}

interface PerformanceMonitorOptions {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export const usePerformanceMonitor = (options: PerformanceMonitorOptions = {}) => {
  const { onMetrics, onError, enabled = true } = options;

  const reportWebVitals = useCallback((metric: any) => {
    if (!enabled) return;

    try {
      const metrics: Partial<PerformanceMetrics> = {};

      switch (metric.name) {
        case 'FCP':
          metrics.fcp = metric.value;
          break;
        case 'LCP':
          metrics.lcp = metric.value;
          break;
        case 'FID':
          metrics.fid = metric.value;
          break;
        case 'CLS':
          metrics.cls = metric.value;
          break;
        case 'TTFB':
          metrics.ttfb = metric.value;
          break;
        case 'FMP':
          metrics.fmp = metric.value;
          break;
      }

      if (Object.keys(metrics).length > 0) {
        onMetrics?.(metrics as PerformanceMetrics);
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 Performance Metric - ${metric.name}:`, metric.value);
        }
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMetrics, onError, enabled]);

  const measurePageLoad = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics: Partial<PerformanceMetrics> = {
        ttfb: navigation.responseStart - navigation.requestStart,
      };

      paint.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        if (entry.name === 'first-paint') {
          metrics.fmp = entry.startTime;
        }
      });

      if (Object.keys(metrics).length > 0) {
        onMetrics?.(metrics as PerformanceMetrics);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMetrics, onError, enabled]);

  const measureInteraction = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      // Measure first input delay
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fid = (entry as any).processingStart - entry.startTime;
            onMetrics?.({ fid } as PerformanceMetrics);
          }
        }
      });

      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMetrics, onError, enabled]);

  const measureLCP = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        onMetrics?.({ lcp } as PerformanceMetrics);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMetrics, onError, enabled]);

  const measureCLS = useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        onMetrics?.({ cls: clsValue } as PerformanceMetrics);
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onMetrics, onError, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Measure page load performance
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    // Measure interaction performance
    measureInteraction();

    // Measure LCP
    measureLCP();

    // Measure CLS
    measureCLS();

    return () => {
      window.removeEventListener('load', measurePageLoad);
    };
  }, [enabled, measurePageLoad, measureInteraction, measureLCP, measureCLS]);

  return {
    reportWebVitals,
    measurePageLoad,
    measureInteraction,
    measureLCP,
    measureCLS,
  };
};

// Utility function to check if metrics meet performance standards
export const checkPerformanceStandards = (metrics: PerformanceMetrics) => {
  const standards = {
    fcp: { good: 1800, needsImprovement: 3000 },
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    ttfb: { good: 800, needsImprovement: 1800 },
  };

  const results: Record<string, 'good' | 'needs-improvement' | 'poor'> = {};

  Object.entries(metrics).forEach(([key, value]) => {
    const standard = standards[key as keyof typeof standards];
    if (standard) {
      if (value <= standard.good) {
        results[key] = 'good';
      } else if (value <= standard.needsImprovement) {
        results[key] = 'needs-improvement';
      } else {
        results[key] = 'poor';
      }
    }
  });

  return results;
};
