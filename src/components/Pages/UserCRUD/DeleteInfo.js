import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeleteInfo() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userDelete = async () => {
          const isConfirmed = window.confirm('정말로 탈퇴하시겠습니까? 탈퇴 시 해당 정보가 완전히 삭제됩니다.');
      
          if (isConfirmed) {
            try {
              await axios.delete('https://672c26ca1600dda5a9f76967.mockapi.io/api/v1/Students/'+id);
              alert('탈퇴되었습니다.');
              navigate('/');
            } catch (error) {
              console.error('Error:', error);
              alert('죄송합니다. 잠시후 시도해주세요.');
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
