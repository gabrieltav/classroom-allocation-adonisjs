/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

//Routers Students
Route.post("/student", "StudentsController.create");
Route.put("/student/:id", "StudentsController.update");
Route.get("/students", "StudentsController.index");
Route.get("/student/:id", "StudentsController.show");
Route.delete("/student/:id", "StudentsController.destroy");
Route.get("student/:id/class","ClasseStudentsController.classStudent")

//Routers Teachers
Route.post("/teacher", "TeachersController.create");
Route.put("/teacher/:id", "TeachersController.update");
Route.get("/teachers", "TeachersController.index");
Route.get("/teacher/:id", "TeachersController.show");
Route.delete("/teacher/:id", "TeachersController.destroy");

//Routes Classes
Route.put("/class/add/:id", "ClasseStudentsController.addStudent");
Route.put("/class/remove/:id", "ClasseStudentsController.removeStudent");
// Route.put("/teacher/:teacher_id/class/:id", "ClasseStudentsController.update");

Route.get("/classes", "ClassesController.findAll");
Route.group(() => {
  Route.resource("teacher.class", "ClassesController").apiOnly();
});
