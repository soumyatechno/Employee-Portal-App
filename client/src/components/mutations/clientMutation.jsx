import {gql} from "@apollo/client";

const  ADD_EMPLOYEE = gql`
mutation addEmployee($name: String!,$email: String!,$phone: String!){
    addEmployee(name: $name,email: $email,phone: $phone){
        id
        name
        email
        phone
    }
}`
;



const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
        id
        name
        email
        phone
    }
}
`;

export {DELETE_EMPLOYEE,ADD_EMPLOYEE};