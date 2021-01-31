import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core'

const Header: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" disableRipple>
            リスト
          </Button>
          <Button color="inherit" component={Link} to="/create" disableRipple >
            新規作成
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
