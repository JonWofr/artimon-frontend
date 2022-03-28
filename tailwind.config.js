module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#FFFFFF',
        secondary: '#F2F2F2',
      },
      backgroundColor: {
        primary: '#262626',
        secondary: '#333333',
      },
      fontFamily: {
        primary: 'Poppins',
        secondary: 'Raleway',
      },
      gradientColorStops: {
        accentFrom: '#79ACE6',
        accentTo: '#79E684',
        fireFrom: '#E6B479',
        fireTo: '#E67979',
        waterFrom: '#79A5E6',
        waterTo: '#A979E6',
        leafFrom: '#B5BF40',
        leafTo: '#40BF73',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '.75rem',
        sm: '0',
      },
    },
  },
  plugins: [],
};
