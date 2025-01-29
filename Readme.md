## Creation of a Web Application for DPI Management

### Overview
DPI stands for "Dossier Patient Informatisé." It is a digital file that centralizes all the information related to a patient, such as: medical history, treatments, exam results, and medical prescriptions. The DPI facilitates care management, improves communication between healthcare professionals, and enables better continuity of care.

### Setup
#### Database Setup
   Create a MySQL instance, then set the `database name`, `user`, `password`, and `port` in [settings.py](Backend/TP_IGL/settings.py)

#### Backend (Django)
1. **Install Dependencies**
   ```sh
   pip install -r Backend/requirements.txt
   ```
2. **Make Migrations**
   ```sh
   cd Backend && python manage.py makemigrations
   ```

3. **Apply Migrations**
   ```sh
   python manage.py migrate
   ```

4. **Run the Django Development Server**
   ```sh
   python Backend/manage.py runserver
   ```

5. **Create Admin User**
   ```sh
   python manage.py createsuperuser --first_name <FIRST_NAME> --last_name <LAST_NAME> --email <EMAIL>
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
   Open your browser and navigate to `http://localhost:4200/`.  

### API Documentation
[API Documentation](Backend/api-docs.http)
You will see examples of how to interact with the API endpoints.

### Tests
Some functionalities have been tested using **pytest** and **selenium**, in [tests](Backend/app/tests/)


### Backend Documentation
The backend documentation is generated using Sphinx and can be found in the [docs](Backend/docs/) directory. To build the documentation, navigate to the `docs` directory and run:
```sh
make html
```
The generated documentation will be available in the `_build/html` directory.

### Frontend Documentation
The frontend documentation is generated using TypeDoc and can be found in the [docs](Frontend/dpi/docs/) directory. To build the documentation, navigate to the `dpi` directory and run:
```sh
npx typedoc
```
The generated documentation will be available in the `docs` directory.