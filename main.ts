#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;

    }

    enroll_courses(course: string){
        this.courses.push(course);
    }

    view_balance(){
        console.log(chalk.bold.green(`Balance for ${this.name} : $${this.balance}`));
        
    }

    pay_fees(amount:number){
        this.balance -= amount;
        console.log(chalk.blue(`$${amount} fee paid successfully for ${this.name}`));
        console.log(chalk.green(`Remaining Balance : $${this.balance}`));
        
    }

    show_status(){
        console.log(chalk.italic.yellowBright(`ID: ${this.id}`));
        console.log(chalk.italic.yellowBright(`Name: ${this.name}`));
        console.log(chalk.italic.yellowBright(`Courses: ${this.courses}`));
        console.log(chalk.italic.yellowBright(`Balance: ${this.balance}`));
                
    }
}

class Student_manager {
    students : Student[]
    constructor() {
        this.students = [];

    }

    add_student(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.yellow(`Student: ${name} added successfully. Student ID: ${student.id}`));
        
    }

    enroll_student(student_id: number, course: string){
        let student=this.find_student(student_id)
        if (student) {
            student.enroll_courses(course)
            console.log(chalk.whiteBright.bold(`${student.name} enrolled in ${course} successfully`));
            
        }
    }

    view_student_balance(student_id: number){
        let student=this.find_student(student_id)
        if (student) {
            student.view_balance();
        } else {
            console.log(chalk.red("Student not found. Please enter a correct student ID"));
            
        }
    }

    // method to pay student fee
    pay_student_fee(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
            student.pay_fees(amount);
        } else {
            console.log(chalk.red("Student not found. Please enter a correct student ID"));
        }
    }

    // method to display student status
    show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.show_status()
        }
    }

    find_student(student_id: number){
        return this.students.find(std => std.id === student_id)
    }
}

async function main() {
    console.log(chalk.bold.bgBlackBright("Welcome to 'Shahi' Student Management System"));
    console.log(chalk.blackBright.bold("-".repeat(44)));
    
    let student_manager = new Student_manager()


while (true) {
    let choice = await inquirer.prompt(
        [
            {
                name: "choice",
                type: "list",
                message: chalk.greenBright("Select an option"),
                choices: [
                    chalk.blue("Add Student"),
                    chalk.blue("Enroll Student"),
                    chalk.blue("View Student Balance"),
                    chalk.blue("Pay Fee"),
                    chalk.blue("Show Status"),
                    chalk.red("Exit")
                ]
            }
        ]

    );

    // 
    switch (choice.choice) {
        case chalk.blue("Add Student"):
            let name_input = await inquirer.prompt(
                [
                    {
                        name: "name",
                        type: "input",
                        message: chalk.magenta("Enter a Student's Name"),


                    }
                ]
            );
            student_manager.add_student(name_input.name);
            
            break;

            case chalk.blue("Enroll Student"):
                let course_input = await inquirer.prompt(
                    [
                        {
                            name: "student_id",
                            type: "number",
                            message: chalk.cyanBright("Enter a Student ID")
                        },
                        {
                            name: "course",
                            type: "input",
                            message: chalk.cyan("Enter a Course Name"),

                        }
                    ]
                );
                student_manager.enroll_student(course_input.student_id, course_input.course)

                break;

                case chalk.blue("View Student Balance"):
                    let balance_input = await inquirer.prompt(
                        [
                            {
                                name: "student_id",
                                type: "number",
                                message: chalk.magenta("Enter a Student ID")
                            }

                        ]
                    );
                    student_manager.view_student_balance(balance_input.student_id);

                break;

                case chalk.blue("Pay Fee"):
                    let fees_input = await inquirer.prompt(
                        [
                            {
                                name: "student_id",
                                type: "number",
                                message: chalk.magenta("Enter a Student ID"),
                            },
                            {
                                name: "amount",
                                type: "number",
                                message: chalk.yellowBright("Enter the amount to pay")
                            }
                        ]
                    );
                    student_manager.pay_student_fee(fees_input.student_id, fees_input.amount);

                case chalk.blue("Show Status"):
                    let status_input = await inquirer.prompt(
                        [
                            {
                                name: "student_id",
                                type: "number",
                                message: chalk.magenta("Enter a Student ID")
                            }
                        ]
                    );
                    student_manager.show_student_status(status_input.student_id);

                break;

                case chalk.red("Exit"):
                console.log(chalk.redBright("Exiting..."));
                process.exit();
                

    
        default:
            break;
    }
}

}

main();

