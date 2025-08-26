// Independent hash functions for CountMin sketch
const createHashFunction = (seed) => {
  return (item) => {
    let hash = 0x811c9dc5; // FNV-1a offset basis
    const prime = 0x01000193; // FNV-1a prime
    
    // Mix in the seed
    hash = hash ^ seed;
    
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = hash ^ char;
      hash = (hash * prime) >>> 0; // Keep 32-bit
    }
    
    // Additional mixing for independence
    hash = hash ^ (hash >>> 16);
    hash = hash * 0x85ebca6b;
    hash = hash ^ (hash >>> 13);
    hash = hash * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
    
    return hash >>> 0; // Ensure positive 32-bit
  };
};

class CountMinSketch {
  constructor(width, depth) {
    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(depth) || depth <= 0) {
      throw new Error('Width and depth must be positive integers');
    }
    this.width = width;
    this.depth = depth;
    this.table = Array(depth)
      .fill()
      .map(() => Array(width).fill(0));
    
    // Create independent hash functions with better seeds
    this.hashFunctions = Array(depth)
      .fill()
      .map((_, i) => createHashFunction(0x100000000 + i * 0x20000000));
  }

  increment(item, count = 1) {
    for (let i = 0; i < this.depth; i++) {
      const hash = this.hashFunctions[i](item);
      this.table[i][hash % this.width] += count;
    }
  }

  estimate(item) {
    let minEstimate = Infinity;
    for (let i = 0; i < this.depth; i++) {
      const hash = this.hashFunctions[i](item);
      minEstimate = Math.min(minEstimate, this.table[i][hash % this.width]);
    }
    return minEstimate;
  }

  // For testing: get internal state
  getTable() {
    return this.table;
  }
}

export default CountMinSketch;
