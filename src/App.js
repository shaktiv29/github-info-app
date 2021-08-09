import { Input, Button, Card, CardMedia, CardContent, Typography, CardHeader } from '@material-ui/core';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { AtomSpinner } from 'react-epic-spinners';
import { LocationCity } from '@material-ui/icons';

function App() {
  const [uname, cuname] = useState('')
  const [anyuser, changeuser] = useState('')
  const [loading, changeloading] = useState(false)
  const [userdata, setuserdata] = useState({})
  const getInfo = (e) => {
    if(uname){
      changeloading(true)
    axios.get('https://api.github.com/users/'+uname)
    .then(res => { setuserdata(res.data);console.log(res.data);changeuser(uname);changeloading(false)})
    .catch(e=>{alert(e);changeloading(false)})
    }
  }
  return (
    <div>
        <div>
        <div className="header">
          <span style={{fontSize:'200%',fontWeight:'700', color:'#9211ce'}}> GitHub User Info App </span>
        </div>
        
        
        {loading?
        <div className="inputing">
        <AtomSpinner color="red"/>
        </div>
        :
        <div className="inputing">
          <Input className="inputtask" type="text" style={{margin:'0% 2%'}} value={uname} placeholder="Please Enter Username Here." onChange={(e)=>{cuname(e.target.value)}} />
          <Button variant="contained" color="secondary" onClick={getInfo}>Get Info</Button>
          </div>
        }
    <div className='card'>
    { anyuser ?
    <Card className='root'>
    <CardMedia>
      <img className="media" src={userdata.avatar_url} alt='pella' />
    </CardMedia>
      <CardHeader
        title={userdata.name}
        subheader={userdata.bio}
        action = {<span style={{display:'flex',justifyContent:'baseline'}}> <LocationCity style={{paddingRight:'3px'}}/> {userdata.location}</span>}
      />
      <CardContent>
        <Typography variant="body2" color="secondary" component="p">
          Followers: {userdata.followers}
        </Typography>
        <Typography variant="body2" style={{color:'cyan'}} component="p">
          Following: {userdata.following}
        </Typography>
        <Typography variant="body2" style={{color:'blue'}} component="p">
          Public Repos: {userdata.public_repos}
        </Typography>
      </CardContent>
      </Card>:
      <div style={{marginLeft:'auto',marginRight:'auto'}}>Please enter a username here</div>
}

  </div> 
  </div>
      </div>
  );
}

export default App;
