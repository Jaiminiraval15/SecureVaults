
import { useEffect,useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Folder(){
    const { user } = useAuthContext()
const [folders,setFolders] = useState([])
const token = sessionStorage.getItem("user.token");

useEffect(() => {
    // Make sure to use the correct URL and wrap the fetch inside useEffect
    console.log('Effect triggered');
    fetch("http://localhost:2003/api/folder/", {
        method: "GET",
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    .then(response => response.json())
    .then(data => setFolders(data))
    .catch(error => console.error('Error fetching folders:', error));
}, [user]);
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