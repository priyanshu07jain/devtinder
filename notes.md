🚀 Phase 1: Project Setup & Git
Foundational setup for the Node.js environment and version control.

[ ] Create a repository
[ ] Initialize the repository (npm init)
[ ] Understanding: node_modules, package.json, package-lock.json
[ ] Install Express
[ ] Create a server
[ ] Listen to port 7777
[ ] Write request handlers for /test, /hello
[ ] Install nodemon and update scripts inside package.json
[ ] Theory: What are dependencies?
[ ] Theory: What is the use of "-g" while npm install?
[ ] Theory: Difference between caret and tilde (^ vs ~)
[ ] Initialize git
[ ] Create .gitignore
[ ] Create a remote repo on GitHub
[ ] Push all code to remote origin

🛤️ Phase 2: Routing Deep Dive
Mastering how Express handles different URL patterns and HTTP methods.

[ ] Play with routes and route extensions (e.g., /hello, /, /hello/2, /xyz)
[ ] Important: Understand why the Order of the routes matters
[ ] Install Postman and create a workspace/collection > Test API call
[ ] Write logic to handle GET, POST, PATCH, DELETE API Calls
[ ] Explore routing and use of ?, +, (), * in the routes
[ ] Use of regex in routes (e.g., /a/, /.*fly$/)
[ ] Reading Query Params in the routes
[ ] Reading Dynamic Routes (req.params)

🛡️ Phase 3: Middleware & Request Handling
Understanding the "glue" of Express applications.

[ ] Multiple Route Handlers - Play with the code
[ ] next() function usage
[ ] next() function and errors along with res.send()
[ ] app.use("/route", rH, [rH2, rH3], rH4, rh5)
[ ] Theory: What is Middleware? Why do we need it?
[ ] Theory: How Express JS handles requests behind the scenes
[ ] Difference between app.use and app.all
[ ] Write a dummy auth middleware for admin
[ ] Write a dummy auth middleware for all user routes, except /user/login
[ ] Error Handling using app.use("/", (err, req, res, next) => {})

🗄️ Phase 4: Database (MongoDB & Mongoose)
Connecting your app to a persistent data store.

[ ] Create a free cluster on MongoDB official website (Mongo Atlas)
[ ] Install mongoose library
[ ] Connect your application to the Database (Connection URL / devTinder)
[ ] Call the connectDB function before starting application on port 7777
[ ] Create a UserSchema & User Model
[ ] Create POST /signup API to add data to database
[ ] Push some documents using API calls from Postman
[ ] Error Handling using try...catch
[ ] Theory: JS Object vs JSON (difference)
[ ] Add the express.json middleware to your app
[ ] Make your signup API dynamic to receive data from the end user
[ ] Experiment: User.findOne with duplicate email IDs (which object is returned?)

🛠️ Phase 5: CRUD Operations & Data Integrity
Building the core user management features.

[ ] API: Get user by email
[ ] API: Feed API - GET /feed (get all users from the database)
[ ] API: Get user by ID
[ ] API: Delete user
[ ] API: Update a user
[ ] Theory: Difference between PATCH and PUT
[ ] Explore Mongoose Documentation for Model methods
[ ] Options in Model.findOneAndUpdate method (explore returnNewDocument, etc.)
[ ] API: Update the user by Email ID

✅ Phase 6: Validation & Sanitization
Ensuring only clean, safe data enters your system.

[ ] Explore SchemaType options from documentation
[ ] Add required, unique, lowercase, min, minLength, trim
[ ] Add default values
[ ] Create a custom validate function for gender
[ ] Improve the DB Schema: Put appropriate validations on each field
[ ] Add timestamps to the userSchema
[ ] Add API level validation on PATCH request & Signup POST API
[ ] Data Sanitizing: Add API validation for each field
[ ] Install validator library
[ ] Use validator functions for password, email, photoURL
[ ] Golden Rule: NEVER TRUST req.body

🔐 Phase 7: Authentication & Security
Securing the application using industry-standard practices.

[ ] Validate data in Signup API
[ ] Install bcrypt package
[ ] Create PasswordHash using bcrypt.hash & save encrypted password
[ ] Create Login API
[ ] Compare passwords and throw errors if email or password is invalid
[ ] Install cookie-parser
[ ] Send a dummy cookie to user
[ ] Create GET /profile API and check if you get the cookie back
[ ] Install jsonwebtoken (JWT)
[ ] In Login API: Create JWT token and send it to user in cookies
[ ] In Profile API: Read cookies and find the logged-in user
[ ] Create userAuth Middleware
[ ] Add userAuth middleware in Profile API and Send Connection Request API
[ ] Set expiry of JWT token and cookies to 7 days
[ ] Create UserSchema method getJWT()
[ ] Create UserSchema method comparePassword(passwordInputByUser)

🏗️ Phase 8: Refactoring & Architecture
Cleaning up the code for scalability.

[ ] Explore Tinder APIs (Reverse Engineering)
[ ] Create a list of all APIs you can think of in "Dev Tinder"
[ ] Group multiple routes under respective routers
[ ] Read documentation for express.Router
[ ] Create routes folder for managing auth, profile, request routers
[ ] Create authRouter, profileRouter, requestRouter
[ ] Import these routers in app.js
[ ] Create POST /logout API
[ ] Create PATCH /profile/edit
[ ] Create PATCH /profile/password API (Forgot Password)
[ ] Validate all data in every POST/PATCH API

🤝 Phase 9: Logic Building (Connections)
The core business logic of a "Tinder-like" app.

[ ] Create ConnectionRequest Schema
[ ] API: Send Connection Request
[ ] Proper validation of data (Think about ALL corner cases)
[ ] Learn: $or query, $and query in Mongoose
[ ] Schema Middleware: schema.pre("save") function
[ ] Read about Indexes in MongoDB (Why do we need them? Pros/Cons?)
[ ] Read article about Compound Indexes
[ ] API: POST /request/review/:status/:requestId (Review connection requests)
[ ] Thought process: POST vs GET for review
[ ] Read about ref and populate in Mongoose
[ ] API: GET /user/requests/received (with all checks)
[ ] API: GET /user/connections

📜 Phase 10: Advanced Features (Feed & Pagination)
Optimizing data retrieval.

[ ] Logic for GET /feed API
[ ] Explore $nin, $and, $ne and other query operators
[ ] Pagination Logic:
[ ] /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
[ ] /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
[ ] /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
[ ] Formula: skip = (page-1) * limit

## //to get user data through email
app.get("/user",async(req,res)=>{
const userEmail=req.body.emailId;
try
{
const user=await User.find({emailId:userEmail})
if(user.length===0){
return res.status(404).send("user not found");
}
else{
res.status(200).send(user);
}

}
catch(err){
res.status(400).send("something went wrong",err.message);
}
})

## //to delete user
app.delete("/user/:id",async(req,res)=>{
const userId=req.params.id;
try{
const user=await User.findByIdAndDelete(userId );
if(!user){
res.status(400).send("user not found");
}
else{
res.status(200).json({
message: "User deleted successfully",
user:user
});
}
}
catch(err){
res.status(400).send("something went wrong",err.message);
}
})

## //to update user
app.put("/user/:id", async (req, res) => {
const userId = req.params.id;
const updateData = req.body;

    try {
        const allowedUpdates = ["firstName", "lastName", "age", "photoUrl", "about", "skills"];
        const isUpdateValid = Object.keys(updateData).every((k) => allowedUpdates.includes(k));

        if (!isUpdateValid) {
            return res.status(400).send("Invalid updates");
        }
        if(updateData.skills.length>10){
           throw new Error("skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });

    } catch (err) {
        console.error(err);
        res.status(400).send("Something went wrong");
    }

});

## //to get all user
app.get("/feed",async(req,res)=>{
try{
const users=await User.find();
if(users.length===0){
return res.status(400).send("user not found ");
}
else{
return res.status(200).send(users);
}
}
catch(err){
res.status(400).send("something went wrong",err.message)
}
})
