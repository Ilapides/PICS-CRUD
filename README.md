<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 4.506 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Sun May 16 2021 14:24:56 GMT-0700 (PDT)
* Source doc: Copy of CRUD App 1
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 15.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>
<a href="#gdcalert7">alert7</a>
<a href="#gdcalert8">alert8</a>
<a href="#gdcalert9">alert9</a>
<a href="#gdcalert10">alert10</a>
<a href="#gdcalert11">alert11</a>
<a href="#gdcalert12">alert12</a>
<a href="#gdcalert13">alert13</a>
<a href="#gdcalert14">alert14</a>
<a href="#gdcalert15">alert15</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



# Fullstack CRUD Application - Platform For Managing Students and Campuses



*   **Due**: July 16th, 2020 by 11:59 PM
*   **Points**: 60
*   **Submitting:** Send GitHub repo via Slack
*   **Recommendation: **Use `create-react-app `to bootstrap the front-end portion of the application and use `a basic Express server `to bootstrap the back-end portion of the application
    *   You might also need to look into setting up a ``proxy`` in the package.json of the front-end or the ``cors`` npm module in the back-end
*   If there is a time-crunch regarding setting up a back-end (database and routes), feel free to use dummy data on the front-end as a last resort
*   **Group/Team Sizes**: 3 to 4

**<span style="text-decoration:underline;">Goal</span>**

Using Node, Express, React, Redux, PostgreSQL, and Sequelize, build a RESTful full-stack web application to manage students and campuses. This will cover all of the CRUD operations such as Creation, Reading, Updating, and Deletion. This will encompass models, querying a database with an ORM, designing routes/endpoints and handler functions to process user requests and generate responses, writing out React Components, managing the state of the application with React-Redux, and much more. This will also involve having two individual repositories/applications (a separate server and a separate client), which encourages separation of concerns and modularity. 

**<span style="text-decoration:underline;">Assignment</span>**

Complete the following user stories:

As a user I:



*   [   ] will land on a visually pleasing homepage by default, which allows navigation to view **all campuses** and **all students**
*   can navigate to **all campuses view**, and
    *   [   ] see a list of all campuses in the database
    *   [   ] see an informative message if no campuses exist
    *   [   ] add a new campus
        *   [   ] with a validated form displaying real-time error messages
        *   [   ] which redirects to the new campus’ **single campus view**
*   can navigate to a **single campus view**, and
    *   [   ] see details about a single campus, including enrolled students (if any)
    *   [   ] see an informative message if no students are enrolled at that campus
    *   [   ] navigate to any student’s **single student view **
    *   [   ] delete the campus (and elegantly handle associated students)
    *   [   ] edit campus information (including adding/removing students)
        *   [   ] with a validated form displaying real-time error messages
        *   [   ] which redirects back to the **single campus view**
*   can navigate to **all students view**, and
    *   [   ] see a list of all students in the database
    *   [   ] see an informative message if no students exist
    *   [   ] add a new student
        *   [   ] with a validated form displaying real-time error messages
        *   [   ] which redirects the new student’s **single student view**
*   can navigate to a **single student view**, and
    *   [   ] see details about a single student, including the campus at which they are enrolled (if exists)
    *   [   ] see an informative message if student is not enrolled at a campus
    *   [   ] navigate to **single campus view **of the student’s enrolled campus
    *   [   ] delete the student
    *   [   ] edit the student’s information (including campus s/he is enrolled at)
        *   [   ] with a validated form displaying real-time error messages
        *   [   ] which redirects back to the **single student view**

**Complete =** Completes all User Stories above

**Incomplete =** Does not complete all User Stories above; needs improvement or missing submission

**Here is a more technical breakdown/guideline of what’s expected from the above User Stories...**

**All Campuses and Students (21/57)**

**Backend (Sequelize)** \
- [ ] Write a `campuses` model with the following information: \
  - [ ] name - not empty or null \
  - [ ] imageUrl - with a default value \
  - [ ] address - not empty or null \
  - [ ] description - extremely large text

 \
- [ ] Write a `students` model with the following information: \
  - [ ] firstName - not empty or null \
  - [ ] lastName - not empty or null \
  - [ ] email - not empty or null; must be a valid email \
  - [ ] imageUrl - with a default value \
  - [ ] gpa - decimal between 0.0 and 4.0

 \
- [ ] Students may be associated with at most one campus. Likewise, campuses may be associated with many students \


(**Express and Sequelize**) \
- [ ] Write a route to serve up all students \
- [ ] Write a route to serve up all campuses \
 \
**Frontend (React-Redux, React, and React Router)** \
- [ ] Write a campuses sub-reducer to manage campuses in your Redux store \
- [ ] Write a students sub-reducer to manage students in your Redux store

 \
- [ ] Write a component to display a list of all campuses (just their names and images) \
- [ ] Write a component to display a list of all students (just their names) \
- [ ] Display the all-campuses component when the url matches `/campuses` \
- [ ] Display the all-students component when the url matches `/students` \
- [ ] Add links to the navbar that can be used to navigate to the all-campuses view and the all-students view

**Single Student and Single Campus (14/57)** \
 \
**Backend (Express and Sequelize)** \
- [ ] Write a route to serve up a single campus (based on its id), _including that campuses' students_ \
- [ ] Write a route to serve up a single student (based on their id), _including that student's campus_ \
 \
**Frontend (React and React Router)** \
- [ ] Write a component to display a single campus with the following information: \
  - [ ] The campus's name, image, address and description \
  - [ ] A list of the names of all students in that campus (or a helpful message if it doesn't have any students) \
- [ ] Display the appropriate campus's info when the url matches `/campuses/:campusId` \
- [ ] Clicking on a campus from the all-campuses view should navigate to show that campus in the single-campus view \
 \
- [ ] Write a component to display a single student with the following information: \
  - [ ] The student's full name, email, image, and gpa \
  - [ ] The name of their campus (or a helpful message if they don't have one) \
- [ ] Display the appropriate student when the url matches `/students/:studentId` \
- [ ] Clicking on a student from the all-students view should navigate to show that student in the single-student view \
 \
- [ ] Clicking on the name of a student in the single-campus view should navigate to show that student in the single-student view \
- [ ] Clicking on the name of a campus in the single-student view should navigate to show that campus in the single-campus view \
 \
**Adding a Campus and Adding a Student (12/57)** \
 \
**Backend (Express and Sequelize)** \
- [ ] Write a route to add a new campus \
- [ ] Write a route to add a new student \
 \
**Frontend (React and React Router)** \
- [ ] Write a component to display a form for adding a new campus that contains inputs for _at least_ the name and address. \
- [ ] Display this component EITHER as part of the all-campuses view, or as its own view \
- [ ] Submitting the form with a valid name/address should: \
  - [ ] Make an AJAX request that causes the new campus to be persisted in the database \
  - [ ] Add the new campus to the list of campuses without needing to refresh the page \
 \
- [ ] Write a component to display a form for adding a new student that contains inputs for _at least_ first name, last name and email \
- [ ] Display this component EITHER as part of the all-students view, or as its own view \
- [ ] Submitting the form with a valid first name/last name/email should: \
  - [ ] Make an AJAX request that causes the new student to be persisted in the database \
  - [ ] Add the new student to the list of students without needing to refresh the page \
 \
**Removing a Campus and Removing a Student (10/57)** \
 \
**Backend (Express and Sequelize)** \
- [ ] Write a route to remove a campus (based on its id) \
- [ ] Write a route to remove a student (based on their id) \
 \
**Frontend (React and Axios/Fetch)** \
- [ ] In the all-campuses view, include an `X` button next to each campus \
- [ ] Clicking the `X` button should: \
  - [ ] Make an AJAX request that causes that campus to be removed from database \
  - [ ] Remove the campus from the list of campuses without needing to refresh the page \
 \
- [ ] In the all-students view, include an `X` button next to each student \
- [ ] Clicking the `X` button should: \
  - [ ] Make an AJAX request that causes that student to be removed from database \
  - [ ] Remove the student from the list of students without needing to refresh the page

**Total: - / 57**

The following 15 images (wireframes) can help guide your decisions regarding UI/UX:



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.jpg "image_tooltip")




<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.jpg "image_tooltip")




<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.jpg "image_tooltip")




<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.jpg "image_tooltip")




<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.jpg "image_tooltip")




<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.jpg "image_tooltip")




<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.jpg "image_tooltip")




<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.jpg "image_tooltip")


<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.jpg "image_tooltip")




<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image10.jpg "image_tooltip")




<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image11.jpg "image_tooltip")




<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image12.jpg "image_tooltip")




<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image13.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image13.jpg "image_tooltip")




<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image14.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image14.jpg "image_tooltip")




<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image15.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image15.jpg "image_tooltip")

