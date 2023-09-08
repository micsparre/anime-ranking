import React from 'react';
import { useTheme, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const themeLight = createTheme({
  palette: {
    mode: 'light',
  }
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  }
});

interface ToggleThemeProps {
  light: boolean;
  setLight: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({light, setLight}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={() => setLight(!light)} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}
export { themeLight, themeDark, ToggleTheme }; 