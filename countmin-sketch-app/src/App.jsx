import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { ArtificialTest } from "./components/ArtificialTest";
import RealWorldTest from "./components/RealWorldTest";
import Overview from "./components/Overview";

const App = () => {
  const [tab, setTab] = useState(0);
  const [width, setWidth] = useState(100);
  const [depth, setDepth] = useState(5);

  const handleWidthChange = (e) => setWidth(Number(e.target.value));
  const handleDepthChange = (e) => setDepth(Number(e.target.value));

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="" className="text-center my-6">
        Count-min Sketch Visualization
      </Typography>

      <Box className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="mb-10 text-lg font-medium">
          Parameters
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <TextField
            label="Width (number of buckets)"
            type="number"
            value={width}
            onChange={handleWidthChange}
            size="small"
            className="w-48"
          />
          <TextField
            label="Depth (number of hash functions)"
            type="number"
            value={depth}
            onChange={handleDepthChange}
            size="small"
            className="w-48"
          />
        </div>
      </Box>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} className="mb-6">
        <Tab label="Overview" />
        <Tab label="Artificial Test" />
        <Tab label="Real-World Test" />
      </Tabs>

      {tab === 0 && <Overview />}

      {tab === 1 && width > 0 && depth > 0 && (
        <ArtificialTest width={width} tab={tab} depth={depth} />
      )}

      {tab === 2 && width > 0 && depth > 0 && (
        <RealWorldTest width={width} tab={tab} depth={depth} />
      )}
    </Container>
  );
};

export default App;
