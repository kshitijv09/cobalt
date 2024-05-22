import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SlackForm from '../../components/SlackForm';
import "./Profile.css"

export default function Profile() {

  const [user, setUser] = useState(null);
  const {userId}=useParams()

  useEffect(() => {
    // Fetch the user information using the userId
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(user)
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className='outer-container'>

   {user?(
    <div className="vh-100 lefty" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard className="card-b" style={{ borderRadius: '15px',width:"300px",fontSize:"20px"}}>
              <MDBCardBody className="text-center ">
                <div className="mt-3 mb-4">
                  <img src={user.picture}
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h1">{user.name}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  {user.email} 
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    </div>
    ):(
      <p>Loading...{userId}</p>
    )}
    <SlackForm/>
    </div>
  );
}















