import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeleteInfo() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userDelete = async () => {
          const isConfirmed = window.confirm('정말로 탈퇴하시겠습니까?');
      
          if (isConfirmed) {
            try {
              await axios.delete('https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/'+id);
              alert('탈퇴되었습니다.');
              navigate('/');
            } catch (error) {
              console.error('Error:', error);
              alert('오류가 발생했습니다.');
            }
          } else {
            navigate('/user/myInfo/' + id);
          }
        };
        
        userDelete();
        
      }, [id, navigate]);

  return (
    <div>DeleteInfo</div>
  )
}
