import {
    createTheme,
    type PaletteColor,
    type PaletteColorOptions,
} from '@mui/material';
import { blue, green, red } from '@mui/material/colors';

// muiでカスタムカラーを設定する場合、Paletteを用意する必要がある
declare module '@mui/material/styles' {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
    }
    interface PaletteOptions {
        incomeColor: PaletteColorOptions;
        expenseColor: PaletteColorOptions;
        balanceColor: PaletteColorOptions;
    }
}
// base.cssのようなもの
export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },

    palette: {
        // 収入色
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        // 支出色
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        // 残高色
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        },
    },
});
