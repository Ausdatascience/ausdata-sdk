import themeConfig from '@/config/theme.json';

export function useTheme() {
  const theme = themeConfig;

  const getClasses = (section: keyof typeof theme.contactForm) => {
    const config = theme.contactForm[section];
    
    if (typeof config === 'string') {
      return config;
    }

    if ('light' in config && 'dark' in config) {
      return `${config.light} ${config.dark}`;
    }

    // Handle nested objects like input, button, etc.
    const classes: string[] = [];
    Object.values(config).forEach((value) => {
      if (typeof value === 'string') {
        classes.push(value);
      } else if (typeof value === 'object' && 'light' in value && 'dark' in value) {
        classes.push(`${value.light} ${value.dark}`);
      }
    });
    
    return classes.join(' ');
  };

  return {
    theme,
    getClasses
  };
}
