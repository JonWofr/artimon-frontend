module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F2F2F2',
        muted: '#5A5A5A',
        accentFrom: '#79ACE6',
        accentTo: '#79E684',
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
        fireFrom: '#E6B479',
        fireTo: '#E67979',
        waterFrom: '#79A5E6',
        waterTo: '#A979E6',
        leafFrom: '#B5BF40',
        leafTo: '#40BF73',
      },
      animation: {
        'fade-in': 'fade-in .5s ease-in-out',
        'spin-slow': 'spin 2s linear infinite',
        dash: 'dash 1.5s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        dash: {
          '0%': {
            'stroke-dasharray': '1, 150',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-35',
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-124',
          },
        },
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
