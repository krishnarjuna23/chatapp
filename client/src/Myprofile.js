import React, { useContext, useState, useEffect } from 'react'
import { store } from './App';
import { Navigate, } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment'
import { toast } from 'react-toastify';
import './MyProfile.css'


const Myprofile = () => {

  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [allmsg, setAllmsg] = useState([])
  const [newmsg, setNewmsg] = useState()
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/myprofile', {
      headers: {
        'k-token': token
      }
    }).then(res => setData(res.data)).catch((err) => console.log(err))
    axios.get('http://localhost:5000/getmsg', {
      headers: {
        'k-token': token
      }
    }).then(res => {
      setAllmsg(res.data)
      console.log(res.data)
    }).catch((err) => console.log(err))
  }, [token])

  const filteredMessages = allmsg.filter((message) => {
   
    return message.text.toLowerCase().includes(searchInput.toLowerCase());
  });

  const deleteMessage = (msgId) => {
    axios.delete(`http://localhost:5000/deletemsg/${msgId}`, {
      headers: {
        'k-token': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAllmsg(allmsg.filter(message => message._id !== msgId));
          toast.success('msg delete successfully!')
       
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error delete msg.')
      });
  };



  const submitHandler = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/addmsg', { text: newmsg }, {
      headers: {
        'k-token': token
      }
    }).then(res => setAllmsg(res.data)).catch((err) => console.log(err))

  }



  if (!token) {
    return <Navigate to='/login' />

  }
  return (
    <div div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      
      <input
        type="text"
        placeholder="Search messages..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        {data ? (
          <div>
            <header style={{ textAlign: "center" }}>
              Welcome user: {data.username}
            </header>
            <div style={{ height: '300px', overflowY: 'auto' }}>
              <div className="ui celled table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{filteredMessages.length >= 1 ? (
                  filteredMessages.map((message, index) => (
                    <tr key={index}>
                      <td>{message.username}</td>
                      <td>
                        <Moment format="hh:mm:ss">{message.date}</Moment>
                      </td>
                      <td>{message.text}</td>
                      <td>
                        <div className="ui basic red button" onClick={() => deleteMessage(message._id)}>
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No matching messages found.</td>
                  </tr>
                )}

                </tbody>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="ui action input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5mm' }}>
                <input type="text" onChange={e => setNewmsg(e.target.value)} />
                <button type="submit" className="ui button">Send Message</button>
              </div>
            </form>
            <footer style={{ textAlign: "center" }}>
              <button onClick={() => setToken(null)} className="ui button">Logout</button>
            </footer>
          </div>
        ) : (
          <p>User data is not available.</p>
        )}
      </div>
    </div>
  )

}
export default Myprofile
