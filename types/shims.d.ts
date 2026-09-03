declare module 'expo-status-bar' {
  import React from 'react';
  export interface StatusBarProps {
    style?: 'auto' | 'inverted' | 'light' | 'dark';
    animated?: boolean;
    hidden?: boolean;
    backgroundColor?: string;
    translucent?: boolean;
    networkActivityIndicatorVisible?: boolean;
  }
  export const StatusBar: React.ComponentType<StatusBarProps>;
}

declare module '@expo/vector-icons' {
  import React from 'react';
  export const Ionicons: React.ComponentType<any>;
  export const MaterialCommunityIcons: React.ComponentType<any>;
  export const Feather: React.ComponentType<any>;
  export const FontAwesome: React.ComponentType<any>;
}
