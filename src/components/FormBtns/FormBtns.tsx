import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_LIST } from 'constants/paths';

export function FormBtns() {
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Button component={Link} to={PATH_LIST.ROOT} variant="contained" size="large">
        <Typography color={'#fff'}>Go Back</Typography>
      </Button>
      <Button type="submit" variant="contained" size="large">
        Add Task
      </Button>
    </Box>
  );
}
