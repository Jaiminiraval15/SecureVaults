import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Profile from './Settings/Profile';
import Account from './Settings/Account';
import Security from './Settings/Security';
export default function UserProfile() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  return (
    <div>
       <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Profile"  />
        <Tab label="Account"  />
        <Tab label="Security"  />
       
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Account />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Security/>
      </TabPanel>
      </Box>
    </div>
  );
}