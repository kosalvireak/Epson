![Login](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_1.png)
![Register](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_2.png)
![Forgot-Password](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_3.png)
![Reset-Password](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_4.png)
![Reset-Password](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_5.png)
![Reset-Password](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_6.png)
![Edit-Profile](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_7.png)
![Profile](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_8.png)
![Dashboard](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_9.png)
![Data-board](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_10.png)
![Upload CSV](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_11.png)
![Upload Table](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_12.png)
![Detail](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_13.png)
![Detail-2](https://raw.githubusercontent.com/kosalvireak/Plot-Graph/main/images/Screenshot_14.png)

# **Documentation**

1. [End-User Documentation](#1-end-user-documentation)

2. [Application Documentation](#2-application-documentation)

    2.1.  [DashBoard Page](#21-dashboard-page)

    2.2.  [DataBoard Page](#22-databoard-page)

    2.3.  [DashBoard Detail Page](#23-dashboard-detail-page)

    2.4.  [Profile Page](#24-profile-page)

    2.5.  [Login or Register Page](#25-login-or-register-page)

3. [Technical Documentation](#3-technical-documentation)

    3.1.  [Front-end](#31-front-end)

    - 3.1.1

    - 3.1.2

    - 3.1.3 

    - 3.1.4 [Vuex State Management](#314-vuex-state-management)

    
    3.2.  [Back-end](#32-back-end)

    -  3.2.1 [Models](#models)

    -  3.2.1 [Route](#route)
 
    3.3.  [Files and Project Structure](#33-files-and-project-structure)

# 1. End-User Documentation

1. Clone Repository.

        git clone git@github.com:HDSD-PROJECT/Punvireakroth-Khoenkosalvireak-FP.git

2. Extract The Folder.
3. Go to both folder (server & client) to install require npm packages.
        
        npm install

4. Run the Application (Development). 

    url: [http://localhost:5173/](http://localhost:5173/)

        client > npm run dev
        server > npm start

5. Run for Production.

    url: [http://172.16.2.62:4173/](http://172.16.2.62:4173/)

        client > npm run build
               > npm run preview
        server > npm start


# 2. Application Documentation

There are 4 pages inside this application namely DashBoard, DataBoard, DashBoard Detail and Profile.

## 2.1 DashBoard Page

Display all the csvs file in a list form inside a container. Each Csv container has 

    - File name
    - Upload Date
    - Data of Column names
    - Data of Column numbers
    - A "Delete Csv" button that remove that csv 

When click on a container it will redirect to a Dashboard Detail page.

A round button with in upload icon located at the bottom right of the screen that user could upload csv. 

When User click on that button a "Upload CSV file" page will pop up on the middle of the screen. In that page user could

    - Enter the csv title
    - Choose csv file
    - Close the page
    - Click "Upload" button to upload the csv file

**Instruction of upload Csv**

    - Enter the title of their CSV first, so that upload button will enable
    - Choose an Csv file that have only 2 Columns 
    - First column name must be "names" and tha data of must be a Text
    - Second column name must be "number" and tha data of must be a Number
    - After upload the data preview will show inside a white box under "Choose File" section
    - If the data is not valid "{}" will show in the white box




## 2.2 DataBoard Page

Display all the csvs file in a table form. In each table user could

    - Search the data in table
    - Sort Name and Number
    - Choose number of "Row per page"

## 2.3 DashBoard Detail Page

This page will take the csv and Plot into various type of graphs.

## 2.4 Profile Page

Display User information on the left side of the screen. User can change their personal information by clicking on a `Change Profile Information` text.

On the right side of the screen. All of the csv that belong to that specific user will show.

If user click on any container it will redirect to [DashBoard Detail Page](#23-dashboard-detail-page) of that csv.

If user click on the trash icon that csv will delete.

## 2.5 Login or Register Page

This is where user need to register or login before get into the application.

### Register Page

There are 5 fields that user need to fill.

        - Name (Cannot be over 20 or Less than 5 Digits)
        - Email (An Valid Email Address, must be end by @something.com)
        - Password (Must be more than 6 characters)
        - Confirm Password (Must be the same as Password)

### Login Page

There are 2 fields that user need to fill.

        - Email
        - Password
# 3. Technical Documentation


## 3.1 Front-end

#### Start Front-end

    npm start


There are 3 vue main components. `DashBoard.vue` | `DashBoardDetail.vue` | `DataBoard.vue`

### 3.1.1 DashBoard.vue
In this component There are 2 child components inside `Preloader` and `DashBoardContainerWrapper`

`Preloader` is a round loading button that show before all of the container load

`DashBoardContainerWrapper` is individual container that display csv information. This components accept a few props such as.

    - id  (String)
    - title  (String)
    - fileName (String)
    - uploadDate (String)
    - names (Array)
    - number (Array)

This component use a function *deleteCsv* for delete a csv base on it's id.

All of the props are the property of Csv Models.






### 3.1.2 DataBoard.vue

### 3.1.3 DashBoardDetail.vue
In this component There are a lot of child components inside `EditableContainer`, `Chart`, `VueGoodTableWrapper` and `EditableTable`

`EditableContainer` is a component that user could edit csv title location on the top of the page. 

### 3.1.4 Vuex (State Management)


`...mapGetters()`

    Errors
    User
    ---
    AllCsvs
    OneCsv
    CsvTitle
    NewCsv

`...mapMutations()`

    userAdded (token)
    loggedIN (token)
    setUser (user)
    Logout ()
    Alert (error)
    ClearAlert ()
    ---
    addAllCsvs (allcsvs)
    addOneCsv (onecsv)
    addNewCsv (newcsv)
    addCsvTitle (csvtitle)
    clearNewCsvState

`...mapActions()`

    loadUser
    registerUser
    LoginUser
    ---
    handleFileChange (event)
    handleSubmit
    getAllCsvs
    getSpecificCsvById (id)
    deleteCsv (id,author)
    editCsv (id)
    changeTitle (newCsvTitle)
    sortAscending ()
    sortDescending ()
    deleteRow (rowIndex)
 



## 3.2 Back-end


#### Start Back-end

    npm start

Seed

    Punvireakroth-Khoenkosalvireak-FP\BI-Board_backend>node seed

### Models

#### Csv Model

    title: String,  (title of the csv)
    file: String,  (name of the file uploaded)
    upload: type Date,  (date that csv being uploaded)
    names: [String],
    numbers: [Number]
    author: ObjectId (id of user that is csv owner)
 
#### User Model

    name: String
    email: String
    password: String
    date: type Date, (data that user login)

### Route

**For production change localhost to 172.16.2.62**


####  1. Upload a csv.

**POST** `/new` 

    http://localhost:3000/api/csv/new

####  2. Get all csv.

**GET** `/get` 

    http://localhost:3000/api/csv/get

#### 3. Get a csv by Id.

**GET** `/get/:id`

    http://localhost:3000/api/csv/get/650027f0ce28ea016f922a13

#### 4. Delete a csv by Id.

**DELETE** `/delete/:id`

    http://localhost:3000/api/csv/get/650027f0ce28ea016f922a13

#### 5. Update a csv by Id.

**PUT** `/update/:id`

    http://localhost:3000/api/csv/update/650027f0ce28ea016f922a13

#### 6. Register User

**POST** `/api/user/register`

    http://localhost:3000/api/user/register

#### 7. Load User

**Get** `/api/user/get`

    http://localhost:3000/api/user/get

#### 8. Login User

**Post** `/api/user/login`

    http://localhost:3000/api/user/login

## 3.3 Files and Project Structure

### `Color Scheme`

    --bi_lightblue: #0e2f55;
    --bi_darkblue: #0b2748;
    --bi_gray: #b2b6ba;
    --bi_gray_hover: #6e7073;
    --bi_white_hover: #f2f4f7;
    --bi_white_active: #e5e5e5;


### `How to use Icon.`



We are using [Google Fonts Icon](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:close:FILL@0;wght@700;GRAD@200;opsz@48)

The stylesheet link are located in `BI_Board/index.html`

Example:
```
<span class="material-symbols-outlined">search</span>
```

### File Structure 
    src
    |--assets
    |--components
    |  |--auth
    |  |--charts
    |  |--common (tiny components)
    |  |--datagrid
    |  |--sidebar
    |  |--theme
    |--layouts
    |--modules
    |--router
    |--store
    |--util
    |--view


### Folder datagrid 

`DashboardContainerWrapper.vue` : A container that display csv information.Use in DashBoard page

`DashBoardDetailEditableText.vue` : A container that display csv title and user could change that by just edit directly.Use in Dashboard Detail page.

`EditableTable.vue` : A table that user could delete specific row.Use in DashBoard Detail page when we click on a `Edit Table`  button on top of existing table.

`ProfileCsvHeader.vue` : A folder preview of csv contain title and csv name use in Profile page.

