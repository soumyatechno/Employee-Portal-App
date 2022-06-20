import {useQuery} from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_EMPLOYEES } from './queries/clientQueries';
import Spinner from './Spinner';

export default function Clients() {
   const {loading, error, data} = useQuery(GET_EMPLOYEES)

   if(loading) return <Spinner/>;
   if(error) return <p>Something went wrong</p>;
  return (
      <>
        {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.employees.map(employee =>(
                        <ClientRow key={employee.id} employee={employee} />
                    ))}
                </tbody>
            </table>
        )}
      </> 
  )
}
