import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { dateUtil } from '../../utils/dateUtil';

const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {dateUtil.getCurrentYear()}
      {'.'}
    </Typography>
  );
};

export default Footer;