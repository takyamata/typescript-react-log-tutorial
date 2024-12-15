import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import React, { type FC } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';
import type { CSSProperties } from '@mui/material/styles/createMixins';

interface SidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerTransitionEnd?: () => void; // 関数の型はこの書き方。戻り値がない関数という意味
    handleDrawerClose?: () => void;
}

// サイドバーメニューのinterface
interface menuItem {
    text: string;
    path: string;
    icon: React.ComponentType;
}

const Sidebar: FC<SidebarProps> = ({
    // FCはfunction componentの略。関数コンポーネントにする場合に使う
    // 受け取るprops
    drawerWidth,
    mobileOpen,
    handleDrawerTransitionEnd,
    handleDrawerClose,
}) => {
    // interfaceを使ってメニュー項目を定義
    const MenuItems: menuItem[] = [
        { text: 'Home', path: '/', icon: HomeIcon },
        { text: 'Report', path: '/report', icon: EqualizerIcon },
    ];

    //  CSSPropertiesはMUIで使える機能
    const baseLinkStyle: CSSProperties = {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
    };

    const activeLinkStyle: CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {MenuItems.map((item, index) => (
                    // NavLinkはaタグの代替。hrefはtoで指定する。isActiveは用意されているcurrent機能
                    <NavLink
                        key={item.text}
                        to={item.path}
                        style={({ isActive }) => {
                            // console.log(
                            //     '選択されたメニューは',
                            //     item.text,
                            //     isActive
                            // );
                            return {
                                ...baseLinkStyle,
                                ...(isActive ? activeLinkStyle : {}),
                            };
                        }}
                    >
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </div>
    );

    return (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            {/* SP */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/* PC */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
