import { useState, useCallback, useEffect } from "react";
import CountMinSketch from "../utils/count-min-sketch";
import Chart from "./Chart";
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

const RealWorldTest = ({width, depth, tab}) => {
  const [realResults, setRealResults] = useState([]);
  const [errorDistribution, setErrorDistribution] = useState([]);
  const [analysis, setAnalysis] = useState({});

  const runRealWorldTest = useCallback(() => {
    // Simulate real-world data: user actions (e.g., button clicks)
    const totalItems = 10000;
    const stream = [];

    // Generate skewed distribution (Pareto principle)
    for (let i = 0; i < totalItems; i++) {
      const rand = Math.random();
      if (rand < 0.5) stream.push("click:home");
      else if (rand < 0.75) stream.push("login");
      else if (rand < 0.85) stream.push("click:profile");
      else if (rand < 0.92) stream.push("logout");
      else if (rand < 0.97) stream.push("click:settings");
      else stream.push("click:help");
    }

    const trueFreq = {};
    stream.forEach((item) => {
      trueFreq[item] = (trueFreq[item] || 0) + 1;
    });

    const sketch = new CountMinSketch(width, depth);
    stream.forEach((item) => sketch.increment(item));

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

    // Collect error distribution over many trials
    const errorHist = {};
    const trials = 100;
    const errors = [];

    for (let t = 0; t < trials; t++) {
      const trialSketch = new CountMinSketch(width, depth);
      stream.forEach((item) => trialSketch.increment(item));
      Object.keys(trueFreq).forEach((key) => {
        const est = trialSketch.estimate(key);
        const err = est - trueFreq[key];
        errors.push(err);
        errorHist[err] = (errorHist[err] || 0) + 1;
      });
    }

    // Theoretical analysis
    const totalStreamSize = totalItems;
    const theoreticalBound = Math.ceil(totalStreamSize / width);
    const markovBound = 0.5; // Markov's inequality gives us 1/2 probability bound

    setAnalysis({
      totalStreamSize,
      theoreticalBound,
      markovBound,
      averageError: (errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(2),
      maxError: Math.max(...errors),
      minError: Math.min(...errors),
      overestimationRate: (errors.filter(e => e > 0).length / errors.length * 100).toFixed(2) + '%'
    });

    setErrorDistribution(
      Object.entries(errorHist)
        .map(([err, freq]) => ({ error: Number(err), frequency: freq }))
        .sort((a, b) => a.error - b.error)
    );

    setRealResults(results);
  }, [width, depth]);

  useEffect(() => {
    if (tab === 2) runRealWorldTest();
  }, [tab, width, depth]);

  return (
    <div>
      <div>
        <Typography variant="h6" className="mb-4">
          Real-World Dataset Results
        </Typography>
        
        {/* Theoretical Analysis */}
        <Box className="mb-4 p-4 bg-blue-50 rounded-lg">
          <Typography variant="subtitle2" className="mb-2 font-semibold text-blue-800">
            Theoretical Analysis:
          </Typography>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Typography variant="body2" className="text-blue-700">
                Total stream size: {analysis.totalStreamSize || 0}
              </Typography>
              <Typography variant="body2" className="text-blue-700">
                Theoretical error bound: ≤ {analysis.theoreticalBound || 0}
              </Typography>
              <Typography variant="body2" className="text-blue-700">
                Markov bound probability: ≤ {analysis.markovBound || 0}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" className="text-blue-700">
                Average error: {analysis.averageError || 0}
              </Typography>
              <Typography variant="body2" className="text-blue-700">
                Error range: [{analysis.minError || 0}, {analysis.maxError || 0}]
              </Typography>
              <Typography variant="body2" className="text-blue-700">
                Overestimation rate: {analysis.overestimationRate || '0%'}
              </Typography>
            </div>
          </div>
        </Box>

        <TableContainer component={Paper} className="mb-6">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>True Count</TableCell>
                <TableCell>Estimated</TableCell>
                <TableCell>Error</TableCell>
                <TableCell>Error %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {realResults.map((row, i) => (
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

        <Typography variant="h6" className="mb-4">
          Error Distribution (Overestimation Frequency)
        </Typography>
        <Chart data={errorDistribution} />
      </div>
    </div>
  );
};

export default RealWorldTest;
