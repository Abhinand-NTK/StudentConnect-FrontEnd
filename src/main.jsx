// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import store from './store/configureStore.js'
// import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider theme={demoTheme}>
//       <BrowserRouter>
//         <CssBaseline />
//         <ThemeProvider>
//           <Provider store={store}>
//             <App />
//           </Provider>
//         </ThemeProvider>
//       </BrowserRouter>
//     </ThemeProvider>
//   </React.StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/configureStore.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import theme from './theme/index.js'
// import index from './index.css'

// const demoTheme = extendTheme({
//   palette: {
//     mode: 'light', // or 'dark' for dark mode
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 960, // Adjusted to the default value in MUI
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
