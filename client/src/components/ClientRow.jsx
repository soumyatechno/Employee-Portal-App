import {FaTrash} from 'react-icons/fa';
import { DELETE_EMPLOYEE } from './mutations/clientMutation';
import { useMutation } from '@apollo/client';
import { GET_EMPLOYEES } from './queries/clientQueries';

export default function ClientRow({employee}) {
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: {id:employee.id},
    // refetchQueries: [{ query: GET_EMPLOYEES}]
    update(cache, {data: {deleteEmployee}}){
      const {employees} = cache.readQuery({query: GET_EMPLOYEES});
      cache.writeQuery({
        query:GET_EMPLOYEES,
        data:{employees: employees.filter(employee => employee.id !== deleteEmployee.id)},
      });
    }
  });
  return (
    <tr>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.designation}</td>
        <td>
            <button className="btn btn-danger btn-sm"
               onClick={deleteEmployee}>
               <FaTrash/>
            </button>
        </td>
    </tr>
  )
}
