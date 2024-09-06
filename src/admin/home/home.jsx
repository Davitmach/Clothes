import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    // const [imageSrc, setImageSrc] = useState('');

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const response = await axios.get('http://clothes/admin/test.php', {
    //                 responseType: 'blob' 
    //             });

    //             // Создаем объект URL для отображения изображения
    //             const imageUrl = URL.createObjectURL(response.data);
    //             setImageSrc(imageUrl);
    //         } catch (error) {
    //             console.error('Error fetching image:', error);
    //         }
    //     };

    //     fetchImage();
    // }, []);

    return (
        // <div className='Home_box'>
        //     {imageSrc ? <img src={imageSrc} alt="Uploaded" /> : <p>Loading image...</p>}
        // </div>
        <div className='Choose_home_product'>
            <div className='Choose_zone'></div>
            <div></div>
        </div>
    );
}

export default Home;
