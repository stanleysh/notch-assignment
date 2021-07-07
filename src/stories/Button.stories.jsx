import React from 'react';

import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Paid = Template.bind({});
Paid.args = {
  backgroundColor: '#b0ddcb',
  label: 'PAID',
};

export const Delivered = Template.bind({});
Delivered.args = {
  backgroundColor: '#c4c4fe',
  label: 'DELIVERED',
};

export const First = Template.bind({});
First.args = {
  backgroundColor: '#ffea6a',
  label: '1st'
}

export const Market = Template.bind({});
Market.args = {
  primary: true,
  backgroundColor: 'black',
  label: 'MARKET',
}

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
