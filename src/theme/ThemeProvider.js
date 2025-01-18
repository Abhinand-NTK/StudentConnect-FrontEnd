import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";


const ThemeProvider = ({ childern }) => (
    <StyledThemeProvider>
        {childern}
    </StyledThemeProvider>
)

export default ThemeProvider