import { useEffect } from 'react';
import GetData from '../../hook/getData/getData';
import axios from 'axios';
import './log.scss';

function Log() {
    const GetLog = async (id) => {
        const { data } = await axios.get(`http://clothes/admin/getLog.php`);
        return data;
      };
    const {data,isSuccess,error} = GetData(GetLog,'GetLog')


return(<div className='Log_container'>
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
        <tbody>{
            data?.map((log)=> (
                <tr>
                    <td>{log.id}</td>
                    <td>{log.adminName}</td>
                    <td>{log.adminRole}</td>
                    <td>{log.action}</td>
                    <td>{log.id}</td>
                    <td>{log.time}</td>
                </tr>
            ))
            }</tbody>
    </table>
</div>)
}
export default Log