const {clients,projects} = require('../sampleData');

// Mongoose models
const Project = require('../models/Project');
const Employee = require('../models/Employee');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList,GraphQLNonNull, GraphQLEnumType} = require('graphql');



// Employee Type
const EmployeeType = new GraphQLObjectType({
    name:'Employee',
    fields:() => ({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
        designation: {type:GraphQLString}

    })
});

// Project Type
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields:() => ({
        id: {type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        employee: {
            type: EmployeeType,
            resolve(parent,args) {
                return Employee.findById(parent.employeeId);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args) {
             return Project.find();
            }
        },
        project:{
            type: ProjectType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id);
            }
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            resolve(parent,args) {
             return Employee.find();
            }
        },
        employee:{
            type: EmployeeType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return Employee.findById(args.id);
            }
        }
    }
});

// Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add Employee
        addEmployee: {
            type: EmployeeType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: GraphQLNonNull(GraphQLString)
                },
                designation:{
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent,args) {
                const employee = new Employee({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    designation: args.designation
                });
                return employee.save();
            }
        },
        // Delete Employee
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id:{
                    type: GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent,args){
                return Employee.findByIdAndRemove(args.id);
            },
        },
            // Add a Project
            addProject:{
                type: ProjectType,
                args:{
                    name:{type:GraphQLNonNull(GraphQLString)},
                    description:{type: GraphQLNonNull(GraphQLString)},
                    status:{
                        type: new GraphQLEnumType({
                            name: 'ProjectStatus',
                            values: {
                                new: {value: 'Not Started'},
                                progress: {value: 'In Progress'},
                                completed: {value: 'Completed'},
                            }
                        }),
                        defaultValue: 'Not Started'
                    },
                    employeeId: { type: GraphQLNonNull(GraphQLID)},
                },
                resolve(parent,args){
                    const project = new Project ({
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        employeeId: args.employeeId
                    });
                    return project.save();

                },
            },
            // Delete Project
            deleteProject: {
            type: ProjectType,
            args: {
                id:{
                    type: GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent,args){
                return Project.findByIdAndRemove(args.id);
            }
        },
        // update a Project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type:GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type:GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    }),
                },
            },
            resolve(parent,args){
             return Project.findByIdAndUpdate(
                 args.id,
                 {
                     $set:{
                         name: args.name,
                         description:args.description,
                         status: args.description
                     }
                 },
                 {new:true}
             );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});