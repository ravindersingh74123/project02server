// import { useEffect, useState } from "react";
// import axios from "axios";

// function phot() {
//   const [image, setImage] = useState(null);
//   const [allImage, setAllImage] = useState(null);

//   useEffect(() => {
//     getImage();
//   }, []);
//   const submitImage = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);

//     const result = await axios.post(
//       "http://localhost:4000/upload-image",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//   };

//   const onInputChange = (e) => {
//     console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//   };

//   const getImage = async () => {
//     const result = await axios.get("http://localhost:4000/get-image");
//     console.log(result);
//     setAllImage(result.data.data);
//   };

//   return (
//     <div>
//       <form onSubmit={submitImage}>
//         <input type="file" accept="image/*" onChange={onInputChange}></input>
//         <button type="submit">Submit</button>
//       </form>
//       {allImage == null
//         ? ""
//         : allImage.map((data,index) => {
//             return (
//               <img
//               key={index}
              
//               src={(`/images/${data.image}`)}
//               alt={`Image ${index}`}
//               height={100}
//               width={100}
//               />
//             );
//           })}
//     </div>
//   );
// }
// export default phot;




// import { useEffect, useState } from "react";
// import axios from "axios";

// function Photo() {
//   const [image, setImage] = useState(null);
//   const [allImage, setAllImage] = useState(null);

//   useEffect(() => {
//     getImage();
//   }, []);

//   const submitImage = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const result = await axios.post(
//         "http://localhost:4000/upload-image",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log("Image uploaded successfully:", result.data);
//       getImage(); // Refresh the image list after uploading
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const onInputChange = (e) => {
//     console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//   };

//   const getImage = async () => {
//     try {
//       const result = await axios.get("http://localhost:4000/get-image");
//       console.log(result);
//       setAllImage(result.data.data);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={submitImage}>
//         <input type="file" accept="image/*" onChange={onInputChange}></input>
//         <button type="submit">Submit</button>
//       </form>
//       {allImage === null
//         ? ""
//         : allImage.map((data, index) => {
//             return (
//               <img
//                 key={index}
//                 src={`/images/${data.image}`}
//                 alt={`Image ${index}`}
//                 height={100}
//                 width={100}
//               />
//             );
//           })}
//     </div>
//   );
// }

// export default Photo;









// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [image, setImage] = useState(null);
//   const [allImage, setAllImage] = useState(null);

//   useEffect(() => {
//     getImage();
//   }, []);
//   const submitImage = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);

//     const result = await axios.post(
//       "http://localhost:2000/upload-image",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//   };

//   const onInputChange = (e) => {
//     console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//   };

//   const getImage = async () => {
//     const result = await axios.get("http://localhost:2000/get-image");
//     console.log(result);
//     setAllImage(result.data.data);
//   };

//   return (
//     <div>
//       <form onSubmit={submitImage}>
//         <input type="file" accept="image/*" onChange={onInputChange}></input>
//         <button type="submit">Submit</button>
//       </form>
//       {allImage == null
//         ? ""
//         : allImage.map((data) => {
//             return (
//               <img
//                 src={(`./images/${data.image}`)}
//                 height={100}
//                 width={100}
//               />
//             );
//           })}
//     </div>
//   );
// }
// export default App;







import React, { useEffect, useState,useRef } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const inputRef=useRef(null)

  useEffect(() => {
    // axios.get("http://localhost:2000/get-image")
    // // .then(res=>setAllImage(res.data))
    // .then(res=>console.log(res.data.data))
    // .then(res=>setAllImage(res.data.data))
    getImage();
    
    
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      axios.post("http://localhost:2000/upload-image", formData 
       
      )
      console.log(formData)
      // .then(res=>console.log(res.data[0].image))

      // Refresh the list of images after successful upload
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };
  const getImage = async () => {
    const result = await axios.get("http://localhost:2000/get-image");
    console.log(result);
    setAllImage(result.data.data);
  };

 

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" ref={inputRef} onChange={onInputChange} />
        <button type="submit">Submit</button>
      </form>
      {allImage.map((data, index) => (
        <img
          key={index}

          src={`http://localhost:2000/images/${data.image}`}
          height={100}
          width={100}
          alt={`Image ${index}`}
          
        />
        
      ))}
      
    </div>
  );
}

export default App;









