import {gql} from '@apollo/client';

const GET_EMPLOYEES = gql`
query getEmployees {
    employees {
        id
        name
        email
        phone
        designation
    }
}
`;

export {GET_EMPLOYEES};