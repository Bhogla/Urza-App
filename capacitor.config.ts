import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.urzaindia.rewards',
  appName: 'Urza Rewards',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F5B700',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  }
};

export default config;