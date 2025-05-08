/**
 * Utility functions for chart components
 */

// Format large numbers with K, M, B suffixes
export const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
  
  // Generate color array for charts
  export const generateColors = (count) => {
    const baseColors = ['#1e3d59', '#ff6e40', '#ffc13b', '#5ab9ea', '#8860d0'];
    const colors = [];
    
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    
    return colors;
  };
  
  // Calculate percentage from a value and total
  export const calculatePercentage = (value, total) => {
    if (!total) return '0%';
    return ((value / total) * 100).toFixed(1) + '%';
  };
  
  // Get growth rate between two values
  export const calculateGrowthRate = (oldValue, newValue) => {
    if (!oldValue) return 'N/A';
    const growthRate = ((newValue - oldValue) / oldValue) * 100;
    return growthRate.toFixed(1) + '%';
  };
  
  // Group data by time periods
  export const groupDataByPeriod = (data, period) => {
    // Implementation would depend on your data structure
    return data;
  };
  