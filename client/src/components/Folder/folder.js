
import { useEffect,useState } from "react"
export default function Folder(){
    
const [folders,setFolders] = useState([])
const token = sessionStorage.getItem("token");
// useEffect(()=>{
//     fetch("http://localhost:2003/api/folder/",{
//             method : "GET",
//             headers : {
//                 'Content-Type' : 'application/json',
//                 Authorization: `Token ${token}`
//             }
//     }
// )
// .then(response => response.json())
// .then(data => setFolders(data))
// .catch(error => console.error('Error fetching folders:', error));
// },[token]);
useEffect(() => {
    // Make sure to use the correct URL and wrap the fetch inside useEffect
    fetch("http://localhost:2003/api/folder/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => setFolders(data))
    .catch(error => console.error('Error fetching folders:', error));
}, [token]);
    return(
        <>
              <div>
                {Array.isArray(folders) && folders.length > 0 ? (
                    folders.map(folder => (
                        <div key={folder._id} className="folder-card">
                            <h2>{folder.folderName}</h2>
                            {/* Add more details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No folders available</p>
                )}
            </div>
        </>
    )
}