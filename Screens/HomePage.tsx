import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MenuContext } from './MenuContext';

// Navigation stack type definitions
type RootStackParamList = {
  Home: { newMenuItem?: MenuItem };
  AddMenuItems: undefined;
  FilterMenu: undefined;
  AboutUs: undefined;
};

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomePageProps {
  navigation: HomePageNavigationProp;
}

// Menu item structure
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

// Used to display menu statistics
interface Totals {
  totalItems: number;
  averagePrices: { [course: string]: string };
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const menuContext = useContext(MenuContext)!;
  const { menuItems } = menuContext;

  // State for menu totals and averages
  const [totals, setTotals] = useState<Totals>({ totalItems: 0, averagePrices: {} });

  // Calculate total items and average prices whenever the menu updates
  useEffect(() => {
    const totalItems = menuItems.length;

    const sums = menuItems.reduce((acc, item) => {
      if (!acc[item.course]) acc[item.course] = { total: 0, count: 0 };
      acc[item.course].total += item.price;
      acc[item.course].count++;
      return acc;
    }, {} as { [key: string]: { total: number; count: number } });

    const averagePrices: { [course: string]: string } = {};
    Object.keys(sums).forEach(course => {
      averagePrices[course] = (sums[course].total / sums[course].count).toFixed(2);
    });

    setTotals({ totalItems, averagePrices });
  }, [menuItems]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* App logo and heading */}
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>The Chef's Menu</Text>

      {/* Welcome text */}
      <Text style={styles.welcomeText}>
        Welcome to FlavorScape – your partner for effortless menu creation and management.
      </Text>

      {/* Display menu stats */}
      <Text style={styles.stats}>Total Menu Items: {totals.totalItems}</Text>
      <Text style={styles.stats}>Starters Avg Price: R{totals.averagePrices['Starters'] || 'N/A'}</Text>
      <Text style={styles.stats}>Mains Avg Price: R{totals.averagePrices['Mains'] || 'N/A'}</Text>
      <Text style={styles.stats}>Dessert Avg Price: R{totals.averagePrices['Dessert'] || 'N/A'}</Text>

      {/* Display menu items in styled cards */}
      <View style={styles.coursesContainer}>
        {menuItems.map(item => (
          <View key={item.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.course}</Text>
            <Text style={styles.coursePrice}>{item.name} - R{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </View>

      {/* Bottom navigation buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('AddMenuItems')}>
          <Text style={styles.buttonText}>ADD MENU ITEMS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('FilterMenu')}>
          <Text style={styles.buttonText}>FILTER MENU</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.buttonText}>ABOUT US</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  stats: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
  },
  courseCard: {
    minWidth: '30%',
    maxWidth: '45%',
    backgroundColor: '#424242',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  navigationButton: {
    backgroundColor: '#FF6E6E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
});

export default HomePage;

