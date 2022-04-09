import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <Button color="primary">dd</Button>
      <button>가</button>
      <li>
        <Link to="/page1">go page1</Link>
      </li>
      <button>나</button>
      <button>다</button>
    </div>
  );
};
