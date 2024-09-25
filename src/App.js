import AppBar from '@mui/material/AppBar';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
import './App.css';
                                                                                                                                                                                                                                                                                                                                  
function App() {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <div className="App">
          <header className="App-header">
            <ShoppingCartIcon style={{ 'color': "white" }} /><br></br>
            <Typography variant="h6" component="div" align="left" marginLeft="10px" sx={{ flexGrow: 1 }}>
              UpGrad-Eshop
            </Typography>

            <SearchIcon style={{ 'color': "white" }} /><br></br>
            <div className='search-label'>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

                <Button>
                  <Link to='./Login' className="App-link">Login</Link>
                </Button>

                <Button>
                  <Link to='./SignUp' className="App-link">sign Up </Link>
                </Button>
            
          </header>
        </div>

      </Toolbar>
    </AppBar>

  );
}

export default App;
