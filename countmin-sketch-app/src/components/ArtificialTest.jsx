import { useState, useCallback, useEffect } from "react";
import CountMinSketch from "../utils/count-min-sketch";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

export const ArtificialTest = ({ width, depth}) => {
  const [artificialResults, setArtificialResults] = useState([]);
  const [debugInfo, setDebugInfo] = useState({});
  
  const runArtificialTest = useCallback(() => {
    const trueFreq = {
      A: 1000,
      B: 500,
      C: 200,
      D: 100,
      E: 50,
    };

    const sketch = new CountMinSketch(width, depth);

    // Simulate stream
    Object.entries(trueFreq).forEach(([item, count]) => {
      for (let i = 0; i < count; i++) {
        sketch.increment(item);
      }
    });

    const results = Object.keys(trueFreq).map((item) => {
      const est = sketch.estimate(item);
      const trueCount = trueFreq[item];
      return {
        item,
        true: trueCount,
        estimated: est,
        error: est - trueCount,
        errorPercent: ((est - trueCount) / trueCount * 100).toFixed(2) + '%'
      };
    });

    // Debug: Check hash function independence
    const hashValues = {};
    Object.keys(trueFreq).forEach(item => {
      hashValues[item] = [];
      for (let i = 0; i < depth; i++) {
        const hash = sketch.hashFunctions[i](item);
        hashValues[item].push(hash % width);
      }
    });

    setDebugInfo({
      hashValues,
      table: sketch.getTable(),
      totalItems: Object.values(trueFreq).reduce((a, b) => a + b, 0)
    });

    setArtificialResults(results);
  }, [width, depth]);

  useEffect(() => {
    runArtificialTest();
  }, [runArtificialTest]);

  return (
    <>
      <div>
        <Typography variant="h6" className="mb-4">
          Artificial Dataset Results
        </Typography>
        
        {/* Debug Information */}
        <Box className="mb-4 p-4 bg-gray-50 rounded-lg">
          <Typography variant="subtitle2" className="mb-2 font-semibold">
            Debug Info:
          </Typography>
          <Typography variant="body2" className="text-sm">
            Total items processed: {debugInfo.totalItems || 0}
          </Typography>
          <Typography variant="body2" className="text-sm">
            Sketch dimensions: {depth} × {width} = {depth * width} total buckets
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>True Frequency</TableCell>
                <TableCell>Estimated</TableCell>
                <TableCell>Error</TableCell>
                <TableCell>Error %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artificialResults.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.true}</TableCell>
                  <TableCell>{row.estimated}</TableCell>
                  <TableCell className={row.error > 0 ? 'text-red-600' : 'text-green-600'}>
                    {row.error > 0 ? '+' : ''}{row.error}
                  </TableCell>
                  <TableCell className={row.error > 0 ? 'text-red-600' : 'text-green-600'}>
                    {row.errorPercent}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
