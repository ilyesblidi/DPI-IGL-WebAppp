#### Backend (Django)
1. **Install Dependencies**
   ```sh
   pip install -r Backend/requirements.txt
   ```

2. **Apply Migrations**
   ```sh
   python Backend/manage.py migrate
   ```

3. **Run the Django Development Server**
   ```sh
   python Backend/manage.py runserver
   ```

#### Frontend (Angular)
1. **Navigate to the Frontend Directory**
   ```sh
   cd Frontend/dpi
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Angular Development Server**
   ```sh
   ng serve
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

#### API Documentation
**Navigate to the documentation file**
   ```sh
   cd Backend/test.http
   ```
You will see examples of how to interact with the API endpoints.

#### Database Setup
1. **Create the Database**
   Import the `db.sql` file located in the `Backend` folder into your database management system (e.g., MySQL Workbench):
   ```sh
   mysql -u your_username -p your_database_name < Backend/db.sql
   ```

This will create all the necessary tables and relationships for the application.