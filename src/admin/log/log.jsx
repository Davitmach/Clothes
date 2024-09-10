import { useEffect, useState } from 'react';
import GetData from '../../hook/getData/getData';
import axios from 'axios';
import './log.scss';
import { SetDataWithQueryClient } from '../../hook/setData/setData';

function Log() {
    const [search, setSearch] = useState('');

    // Function to get logs
    const GetLog = async () => {
        const { data } = await axios.get('http://clothes/admin/getLog.php');
        return data;
    };

    // Hook to fetch data
    const { data , isSuccess, error } = GetData(GetLog, 'GetLog');

    // Function to search logs
    const SearchLog = async (info) => {
        const response = await axios.post('http://clothes/admin/GetLog.php', info, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;   
    };

    const { mutate, data: SearchData  } = SetDataWithQueryClient(SearchLog, 'searchLog', 'GetLog');



    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        mutate({ search: searchValue });
    };

 
    const logsToDisplay = search.length === 0 ? data : Array.isArray(SearchData) ? SearchData : [];

    return (
        <div className='Log_container'>
            <input onChange={handleSearch} placeholder='Search' type="text" value={search} />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Admin</td>
                        <td>Role</td>
                        <td>Action</td>
                        <td>UserId</td>
                        <td>Time</td>
                    </tr>
                </thead>
                <tbody>
                    {logsToDisplay.length > 0 ? (
                        logsToDisplay.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.adminName}</td>
                                <td>{log.adminRole}</td>
                                <td>{log.action}</td>
                                <td>{log.userId}</td>
                                <td>{log.time}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No logs found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Log;
