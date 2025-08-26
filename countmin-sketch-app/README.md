# Count-Min Sketch Visualization

An interactive web application demonstrating the Count-Min Sketch probabilistic data structure for frequency estimation in data streams.

![Overview Tab](https://github.com/user-attachments/assets/dd92b5ac-01f6-4615-b05b-43c76599a1d8)

## Overview

This project implements and visualizes the Count-Min Sketch (CMS) algorithm, a space-efficient probabilistic data structure that estimates the frequency of events in a data stream. The application provides an educational platform to understand the theoretical foundations, implementation details, and practical applications of CMS.

## Features

### 🎓 Educational Content
- Comprehensive theoretical overview of Count-Min Sketch
- Mathematical foundations and error analysis
- Trade-off discussions and parameter selection guidance

### 🧪 Interactive Testing
- **Artificial Dataset Testing**: Controlled experiments with known distributions
- **Real-World Simulation**: Realistic data streams with statistical analysis
- **Parameter Adjustment**: Interactive width and depth configuration

### 📊 Visual Analysis
- Real-time frequency estimation results
- Error distribution analysis
- Theoretical vs. empirical performance comparison

## Screenshots

### Artificial Test Results
![Artificial Test](https://github.com/user-attachments/assets/94a26f6e-54bb-411a-aebf-f6e13a2c4012)

### Real-World Test Results
![Real-World Test](https://github.com/user-attachments/assets/3edb95e3-ed9c-44a6-ba6d-aae0f73d95bb)

## Technical Implementation

### Core Algorithm
The Count-Min Sketch implementation includes:

- **Hash Functions**: FNV-1a based hash functions with additional mixing for independence
- **Data Structure**: 2D array of counters with configurable dimensions
- **Operations**: O(d) time increment and estimate operations
- **Error Guarantees**: Theoretical bounds with no underestimation

```javascript
class CountMinSketch {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.table = Array(depth).fill().map(() => Array(width).fill(0));
    this.hashFunctions = Array(depth).fill()
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
}
```

### Technology Stack
- **Frontend**: React 19.1.1 with functional components
- **UI Framework**: Material-UI 7.3.1
- **Styling**: Tailwind CSS 3.4.17
- **Build Tool**: Vite 7.1.3
- **Language**: Modern JavaScript (ES6+)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zayn-tech-info/count-min-sketch.git
cd count-min-sketch/countmin-sketch-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Usage

### Interactive Parameters
- **Width**: Number of buckets per hash function (affects accuracy)
- **Depth**: Number of hash functions (affects confidence)

### Test Scenarios

#### Artificial Dataset
- Fixed frequencies: A(1000), B(500), C(200), D(100), E(50)
- Perfect for algorithm validation
- Demonstrates ideal performance conditions

#### Real-World Simulation
- 10,000 user actions with Pareto distribution
- Realistic frequency patterns
- Statistical analysis with multiple trials

### Understanding Results
- **No Underestimation**: CMS never underestimates true frequencies
- **Error Bounds**: Overestimation bounded by stream_size/width
- **Probability Guarantees**: Error probability decreases exponentially with depth

## Theoretical Background

### Mathematical Guarantees
For an item with true frequency f and estimate f̂:
- **Accuracy**: f̂ ≥ f (no false negatives)
- **Error Bound**: f̂ ≤ f + ε·n with probability ≥ 1-δ
  - ε = e/w (error parameter)
  - δ = (1/2)^d (failure probability)
  - n = total stream size

### Space-Time Complexity
- **Space**: O(d·w) = O(log(1/δ)·1/ε)
- **Update Time**: O(d)
- **Query Time**: O(d)

## Applications

### Real-World Use Cases
- **Network Monitoring**: Traffic analysis and heavy hitter detection
- **Web Analytics**: Page view counting and user behavior analysis
- **Database Systems**: Cardinality estimation for query optimization
- **Fraud Detection**: Transaction pattern monitoring

### Advantages
- **Memory Efficient**: Constant space regardless of universe size
- **Streaming Friendly**: One-pass processing with real-time updates
- **Simple Implementation**: Few parameters and straightforward logic
- **Theoretical Guarantees**: Provable error bounds

## Academic Report

For a comprehensive academic analysis of this project, see the complete college report: [`Count_Min_Sketch_Report.md`](../Count_Min_Sketch_Report.md)

The report includes:
- Theoretical foundations and mathematical analysis
- Implementation details and design decisions
- Experimental validation and results
- Literature review and related work
- Applications and future extensions

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure backward compatibility

## License

This project is available under the MIT License. See the LICENSE file for more details.

## References

1. Cormode, G., & Muthukrishnan, S. (2005). An improved data stream summary: the count-min sketch and its applications. *Journal of Algorithms*, 55(1), 58-75.

2. Muthukrishnan, S. (2005). Data streams: Algorithms and applications. *Foundations and Trends in Theoretical Computer Science*, 1(2), 117-236.

## Contact

For questions or suggestions, please open an issue on GitHub or contact the repository maintainers.
