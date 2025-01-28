CREATE DATABASE dpi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'bndbndbnd';
GRANT ALL PRIVILEGES ON dpi_db.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
