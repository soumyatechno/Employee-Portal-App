import {gql} from "@apollo/client";

const  ADD_EMPLOYEE = gql`
mutation addEmployee($name: String!,$email: String!,$phone: String!,$designation: String!){
    addEmployee(name: $name,email: $email,phone: $phone,designation:$designation){
        id
        name
        email
        phone
        designation
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
        designation
    }
}
`;

export {DELETE_EMPLOYEE,ADD_EMPLOYEE};