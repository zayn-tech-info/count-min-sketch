import { Typography, Paper, Box, Divider } from "@mui/material";

const Overview = () => {
  return (
    <Paper className="p-6">
      <Typography variant="h5" className="mb-6 text-center font-bold">
        CountMin Sketch: Theory and Implementation
      </Typography>

      <div className="space-y-6">
        {/* What is CountMin Sketch */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-green-700">
            What is CountMin Sketch?
          </Typography>
          <Typography paragraph className="text-gray-700">
            CountMin Sketch is a probabilistic data structure that estimates the frequency of events in a data stream. 
            It provides fast updates and queries with guaranteed upper bounds on error, making it ideal for analyzing 
            high-volume streaming data where exact counting is impractical.
          </Typography>
        </Box>

        <Divider />

        {/* How it works */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-blue-700">
            How It Works
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Structure:
              </Typography>
              <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
                <li>2D table with <strong>D</strong> rows (depth) and <strong>W</strong> columns (width)</li>
                <li>Each row uses a different, independent hash function</li>
                <li>Total space: <strong>D × W</strong> counters</li>
              </ul>
            </div>
            <div>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Operations:
              </Typography>
              <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
                <li><strong>Increment:</strong> Hash item to D positions, increment counters</li>
                <li><strong>Estimate:</strong> Take minimum of D counter values</li>
                <li>Always overestimates (never underestimates)</li>
              </ul>
            </div>
          </div>
        </Box>

        <Divider />

        {/* Theoretical Guarantees */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-purple-700">
            Theoretical Guarantees
          </Typography>
          <div className="bg-purple-50 p-4 rounded-lg">
            <Typography variant="subtitle1" className="font-medium mb-2">
              Error Bounds:
            </Typography>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              <li><strong>Expected error:</strong> ≤ S/W where S = total stream size</li>
              <li><strong>Probability bound:</strong> P(error ≥ 2S/W) ≤ 1/2^D</li>
              <li><strong>Space complexity:</strong> O(D × W) = O(log(1/δ) × 1/ε)</li>
            </ul>
            <Typography variant="body2" className="mt-3 text-gray-600">
              Where ε is the error bound and δ is the failure probability.
            </Typography>
          </div>
        </Box>

        <Divider />

        {/* Trade-offs */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-orange-700">
            N vs K Trade-offs
          </Typography>
          <Typography paragraph className="text-gray-700 mb-3">
            When fixing total space (N × K = constant), you can trade between:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Typography variant="subtitle2" className="font-medium text-orange-800">
                High N (more hash functions):
              </Typography>
              <ul className="list-disc ml-6 text-sm text-orange-700 mt-1">
                <li>Lower probability of large errors</li>
                <li>Better worst-case guarantees</li>
                <li>Higher computational cost</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Typography variant="subtitle2" className="font-medium text-orange-800">
                High K (more buckets):
              </Typography>
              <ul className="list-disc ml-6 text-sm text-orange-700 mt-1">
                <li>Lower expected error</li>
                <li>Better average-case performance</li>
                <li>Higher memory usage per hash function</li>
              </ul>
            </div>
          </div>
        </Box>

        <Divider />

        {/* Interpreting Results */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-red-700">
            Interpreting Your Results
          </Typography>
          <div className="bg-red-50 p-4 rounded-lg">
            <Typography variant="subtitle1" className="font-medium mb-2 text-red-800">
              What to Look For:
            </Typography>
            <ul className="list-disc ml-6 text-sm text-red-700 space-y-1">
              <li><strong>Overestimation:</strong> All estimates should be ≥ true values</li>
              <li><strong>Error distribution:</strong> Should show typical errors around S/W</li>
              <li><strong>Hash independence:</strong> Different items should hash to different positions</li>
              <li><strong>Space efficiency:</strong> Error should decrease as you increase total space</li>
            </ul>
          </div>
        </Box>

        <Divider />

        {/* Key Functions */}
        <Box>
          <Typography variant="h6" className="mb-3 font-semibold text-indigo-700">
            Key Functions to Explain to Colleagues
          </Typography>
          <div className="space-y-3">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <Typography variant="subtitle2" className="font-medium text-indigo-800">
                1. <code>increment(item, count)</code>
              </Typography>
              <Typography variant="body2" className="text-indigo-700 text-sm">
                Adds an item to the sketch. For each hash function, computes hash(item) % width 
                and increments the corresponding counter. This is O(depth) time complexity.
              </Typography>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg">
              <Typography variant="subtitle2" className="font-medium text-indigo-800">
                2. <code>estimate(item)</code>
              </Typography>
              <Typography variant="body2" className="text-indigo-700 text-sm">
                Estimates the frequency of an item by taking the minimum of all D counter values 
                for that item. This gives us the best (lowest) estimate, ensuring we never 
                underestimate. Time complexity is O(depth).
              </Typography>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg">
              <Typography variant="subtitle2" className="font-medium text-indigo-800">
                3. <code>createHashFunction(seed)</code>
              </Typography>
              <Typography variant="body2" className="text-indigo-700 text-sm">
                Creates independent hash functions using FNV-1a with additional mixing. 
                Independence is crucial - if hash functions are correlated, the sketch 
                becomes ineffective. Each function maps items to different bucket distributions.
              </Typography>
            </div>
          </div>
        </Box>
      </div>
    </Paper>
  );
};

export default Overview;
