import '../src/app/globals.css';

const preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Assets', // Colors, Typography, Icons
          'UI', // Button, Input 등
          'Layout', // GNB, PageTitle 등
          'Domain', // PhotoCard 등
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0f0f0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="font-noto">
        <Story />
      </div>
    ),
  ],
};

export default preview;
