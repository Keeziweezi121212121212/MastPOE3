import React, { createContext, useState } from 'react';

// Defines what a single menu item looks like
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

// Shape of the context — how components can interact with menu data
interface MenuContextProps {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
}

// Create the context for global state management
export const MenuContext = createContext<MenuContextProps | undefined>(undefined);

// Provider component — wraps the app and gives access to menu data/functions
export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default starter menu data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Tomato Soup', description: 'Fresh tomatoes, basil', course: 'Starters', price: 50 },
    { id: '2', name: 'Roast Chicken', description: 'Herb-seasoned, roasted', course: 'Mains', price: 100 },
    { id: '3', name: 'Cheesecake', description: 'Creamy vanilla with berry sauce', course: 'Dessert', price: 150 },
  ]);

  // Add new dish to the menu
  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prevItems => [...prevItems, item]);
  };

  // Remove a dish by its ID
  const removeMenuItem = (id: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Pass data and functions to child components
  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
