# Placement_Cell
Hosted on Heroku Link:- https://placement-cell-ms.herokuapp.com/

# Task
    • For Students we store the following details:
        ◦ Batch
        ◦ Student Details (including college, status: [placed, not_placed])
        ◦ Course Scores (including DSA Final Score, WebD Final Score, React Final Score)
        ◦ Interviews (including company name and Date)
        ◦ Results (this is a mapping between company, and student, contains result: [PASS, FAIL, On Hold, Didn’t Attempt])
    • Pages
        ◦ Sign Up and Sign In (only for employees)
        ◦ List of students + add new student (this is similar to adding and viewing posts in codeial)
        ◦ List of Interviews + form to create an interview (with date)
            ▪ Allocate a student to an interview
            ▪ Select an interview to view the list of all students and mark a result status from the list page itself
    • Download a complete CSV of all the data with the following columns:
        ◦ Student id, student name, student college, student status, DSA Final Score, WebD Final Score, React Final Score, interview date, interview company, interview student result
        ◦ A student can have multiple entries based on the interviews she/he has given.

# Routes & URL's
localhost:8882/ -> Home Page
localhost:8882/employees/sign_in -> For Sign In and Sign Up
localhost:8882/employees/profile -> For displaying the profile of logged in Employee
localhost:8882/students/list -> For Student list and creating form
localhost:8882/interviews/list -> For fetching interview list, creating interview and alloting the interview
localhost:8882/interviews/:id/students -> For updating the results of interview
