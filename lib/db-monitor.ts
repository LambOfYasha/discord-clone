import { postgres, mongo } from "@/lib/db";

interface QueryLog {
  query: string;
  duration: number;
  timestamp: Date;
  database: 'postgres' | 'mongo';
  operation: 'read' | 'write' | 'delete';
}

class DatabaseMonitor {
  private static instance: DatabaseMonitor;
  private queryLogs: QueryLog[] = [];
  private isEnabled: boolean = process.env.NODE_ENV === 'development';

  private constructor() {
    this.setupPostgresMonitoring();
    this.setupMongoMonitoring();
  }

  static getInstance(): DatabaseMonitor {
    if (!DatabaseMonitor.instance) {
      DatabaseMonitor.instance = new DatabaseMonitor();
    }
    return DatabaseMonitor.instance;
  }

  private setupPostgresMonitoring() {
    if (!this.isEnabled) return;

    postgres.$on('query', (e) => {
      const log: QueryLog = {
        query: e.query,
        duration: e.duration,
        timestamp: new Date(),
        database: 'postgres',
        operation: this.determineOperation(e.query),
      };

      this.logQuery(log);
    });

    postgres.$on('error', (e) => {
      console.error('❌ PostgreSQL Error:', e);
    });
  }

  private setupMongoMonitoring() {
    if (!this.isEnabled) return;

    // Note: MongoDB monitoring would require additional setup
    // This is a placeholder for future implementation
    console.log('📊 MongoDB monitoring enabled (basic)');
  }

  private determineOperation(query: string): 'read' | 'write' | 'delete' {
    const upperQuery = query.toUpperCase();
    if (upperQuery.startsWith('SELECT')) return 'read';
    if (upperQuery.startsWith('INSERT') || upperQuery.startsWith('UPDATE')) return 'write';
    if (upperQuery.startsWith('DELETE')) return 'delete';
    return 'read'; // default
  }

  private logQuery(log: QueryLog) {
    this.queryLogs.push(log);

    // Keep only last 100 queries
    if (this.queryLogs.length > 100) {
      this.queryLogs = this.queryLogs.slice(-100);
    }

    // Log slow queries (> 100ms)
    if (log.duration > 100) {
      console.warn(`🐌 Slow Query (${log.duration}ms):`, {
        query: log.query.substring(0, 100) + '...',
        database: log.database,
        operation: log.operation,
      });
    }

    // Log very slow queries (> 500ms)
    if (log.duration > 500) {
      console.error(`🚨 Very Slow Query (${log.duration}ms):`, {
        query: log.query,
        database: log.database,
        operation: log.operation,
      });
    }
  }

  getQueryStats() {
    if (!this.isEnabled) return null;

    const stats = {
      totalQueries: this.queryLogs.length,
      averageDuration: 0,
      slowQueries: 0,
      verySlowQueries: 0,
      byDatabase: {
        postgres: 0,
        mongo: 0,
      },
      byOperation: {
        read: 0,
        write: 0,
        delete: 0,
      },
      recentQueries: this.queryLogs.slice(-10),
    };

    if (this.queryLogs.length > 0) {
      const totalDuration = this.queryLogs.reduce((sum, log) => sum + log.duration, 0);
      stats.averageDuration = totalDuration / this.queryLogs.length;
      stats.slowQueries = this.queryLogs.filter(log => log.duration > 100).length;
      stats.verySlowQueries = this.queryLogs.filter(log => log.duration > 500).length;

      this.queryLogs.forEach(log => {
        stats.byDatabase[log.database]++;
        stats.byOperation[log.operation]++;
      });
    }

    return stats;
  }

  getSlowQueries(threshold: number = 100) {
    return this.queryLogs.filter(log => log.duration > threshold);
  }

  clearLogs() {
    this.queryLogs = [];
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

// Export singleton instance
export const dbMonitor = DatabaseMonitor.getInstance();

// Utility functions
export const logQuery = (query: string, duration: number, database: 'postgres' | 'mongo', operation: 'read' | 'write' | 'delete') => {
  if (process.env.NODE_ENV === 'development') {
    dbMonitor['logQuery']({
      query,
      duration,
      timestamp: new Date(),
      database,
      operation,
    });
  }
};

export const getQueryPerformance = () => {
  return dbMonitor.getQueryStats();
};

export const getSlowQueries = (threshold: number = 100) => {
  return dbMonitor.getSlowQueries(threshold);
};
