import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PerformanceTester {
  constructor() {
    this.results = [];
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 Initializing performance tester...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Enable performance monitoring
    await this.page.setCacheEnabled(false);
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async measurePageLoad(url, name) {
    console.log(`📊 Testing: ${name}`);
    
    const startTime = Date.now();
    
    // Navigate to page
    await this.page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get performance metrics
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        ttfb: navigation.responseStart - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        totalTime: Date.now() - performance.timing.navigationStart
      };
    });

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    const result = {
      name,
      url,
      timestamp: new Date().toISOString(),
      metrics: {
        ...metrics,
        totalTime
      },
      performance: this.assessPerformance(metrics)
    };

    this.results.push(result);
    console.log(`✅ ${name}: ${totalTime}ms (${result.performance.overall})`);
    
    return result;
  }

  assessPerformance(metrics) {
    const scores = {
      ttfb: metrics.ttfb < 800 ? 'good' : metrics.ttfb < 1800 ? 'needs-improvement' : 'poor',
      fcp: metrics.firstContentfulPaint < 1800 ? 'good' : metrics.firstContentfulPaint < 3000 ? 'needs-improvement' : 'poor',
      total: metrics.totalTime < 3000 ? 'good' : metrics.totalTime < 5000 ? 'needs-improvement' : 'poor'
    };

    const overall = scores.ttfb === 'good' && scores.fcp === 'good' && scores.total === 'good' 
      ? 'excellent' 
      : scores.ttfb === 'poor' || scores.fcp === 'poor' || scores.total === 'poor'
      ? 'poor'
      : 'needs-improvement';

    return {
      scores,
      overall
    };
  }

  async runTests() {
    console.log('🧪 Starting performance tests...\n');

    const baseUrl = process.env.TEST_URL || 'http://localhost:3000';
    
    const tests = [
      { url: `${baseUrl}`, name: 'Home Page' },
      { url: `${baseUrl}/servers`, name: 'Servers List' },
      { url: `${baseUrl}/direct-messages`, name: 'Direct Messages' },
      { url: `${baseUrl}/friends`, name: 'Friends Page' },
      { url: `${baseUrl}/discovery`, name: 'Discovery Page' },
    ];

    for (const test of tests) {
      try {
        await this.measurePageLoad(test.url, test.name);
        await this.page.waitForTimeout(2000); // Wait between tests
      } catch (error) {
        console.error(`❌ Error testing ${test.name}:`, error.message);
      }
    }
  }

  generateReport() {
    console.log('\n📋 Generating performance report...\n');

    const report = {
      summary: {
        totalTests: this.results.length,
        excellent: this.results.filter(r => r.performance.overall === 'excellent').length,
        good: this.results.filter(r => r.performance.overall === 'good').length,
        needsImprovement: this.results.filter(r => r.performance.overall === 'needs-improvement').length,
        poor: this.results.filter(r => r.performance.overall === 'poor').length,
      },
      averageMetrics: this.calculateAverages(),
      results: this.results,
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    const reportPath = path.join(__dirname, '../performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    console.log('📊 Performance Test Summary:');
    console.log(`   Total Tests: ${report.summary.totalTests}`);
    console.log(`   Excellent: ${report.summary.excellent}`);
    console.log(`   Good: ${report.summary.good}`);
    console.log(`   Needs Improvement: ${report.summary.needsImprovement}`);
    console.log(`   Poor: ${report.summary.poor}`);
    console.log(`\n📄 Full report saved to: ${reportPath}`);

    return report;
  }

  calculateAverages() {
    if (this.results.length === 0) return {};

    const totals = this.results.reduce((acc, result) => {
      Object.keys(result.metrics).forEach(key => {
        acc[key] = (acc[key] || 0) + result.metrics[key];
      });
      return acc;
    }, {});

    const averages = {};
    Object.keys(totals).forEach(key => {
      averages[key] = Math.round(totals[key] / this.results.length);
    });

    return averages;
  }

  generateRecommendations() {
    const recommendations = [];

    const avgMetrics = this.calculateAverages();

    if (avgMetrics.ttfb > 800) {
      recommendations.push({
        priority: 'high',
        category: 'server',
        title: 'Optimize Time to First Byte',
        description: 'TTFB is above 800ms. Consider database indexing, caching, and server optimization.',
        impact: 'high'
      });
    }

    if (avgMetrics.firstContentfulPaint > 1800) {
      recommendations.push({
        priority: 'high',
        category: 'frontend',
        title: 'Improve First Contentful Paint',
        description: 'FCP is above 1.8s. Consider code splitting, image optimization, and critical CSS.',
        impact: 'high'
      });
    }

    if (avgMetrics.totalTime > 3000) {
      recommendations.push({
        priority: 'medium',
        category: 'general',
        title: 'Reduce Total Load Time',
        description: 'Total load time is above 3s. Review bundle size, network requests, and rendering.',
        impact: 'medium'
      });
    }

    return recommendations;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  const tester = new PerformanceTester();
  
  try {
    await tester.init();
    await tester.runTests();
    const report = tester.generateReport();
    
    console.log('\n🎉 Performance testing complete!');
    
    // Exit with appropriate code
    const hasPoorPerformance = report.summary.poor > 0;
    process.exit(hasPoorPerformance ? 1 : 0);
  } catch (error) {
    console.error('❌ Performance testing failed:', error);
    process.exit(1);
  } finally {
    await tester.cleanup();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default PerformanceTester;
