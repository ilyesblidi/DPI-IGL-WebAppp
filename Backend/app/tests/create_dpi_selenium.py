from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random


URL = "http://localhost:4200/"
# medecin information
MEDECIN_EMAIL = "medecin@gmail.com"         
# patient information
NSS = random.randint(1, 999999999)
print(f"NSS is: {NSS}")
NOM = f"patient{NSS}"
PRENOM = f"patient{NSS}"
PATIENT_EMAIL = f"patient{NSS}@gmail.com"
TELEPHONE = "0799999999"
DATE = "01/01/2000"
ADRESSE = "Alger"
MUTUELLE = "Mutuelle"
CONTACT_NOM = "Contact1"
CONTACT_TELEPHONE = "0799999999"

PASSWORD = "bndbndbnd"         

driver = webdriver.Firefox()

try:
    driver.get(URL)
    time.sleep(2)  

    # going to login page
    explore_button = driver.find_element(By.XPATH, "//button[text()='Explore Now']")
    explore_button.click()
    
    # enter credentials
    email_field = driver.find_element(By.NAME, "username")
    password_field = driver.find_element(By.NAME, "password")
    login_button = driver.find_element(By.XPATH, '//button[text()="Login"]')
    email_field.send_keys(MEDECIN_EMAIL)
    password_field.send_keys(PASSWORD)
    login_button.click()

    # going to dpi listing
    dpi_list = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//li[span[text()='DPI List']]"))
    )
    dpi_list.click()

    # go to dpi add page
    dpi_add = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[i[contains(@class, 'fa-plus')]]"))
    )
    dpi_add.click()

    # fill dpi information and confirm creation
    nss = driver.find_element(By.NAME, "nss")
    nom = driver.find_element(By.NAME, "nom")
    prenom = driver.find_element(By.NAME, "prenom")
    email = driver.find_element(By.NAME, "email")
    password = driver.find_element(By.NAME, "password")
    telephone = driver.find_element(By.NAME, "telephone")
    date_naissance = driver.find_element(By.NAME, "dateNaissance")
    adresse = driver.find_element(By.NAME, "adresse")
    mutuelle = driver.find_element(By.NAME, "mutuelle")
    contact_nom = driver.find_element(By.NAME, "personneContactNom")
    contact_phone = driver.find_element(By.NAME, "personneContactTelephone")
    medecin_email = driver.find_element(By.NAME, "medecinemail")
    nss.send_keys(NSS)
    nom.send_keys(NOM)
    prenom.send_keys(PRENOM)
    email.send_keys(PATIENT_EMAIL)
    password.send_keys(PASSWORD)
    telephone.send_keys(TELEPHONE)
    date_naissance.send_keys(DATE)
    adresse.send_keys(ADRESSE)
    mutuelle.send_keys(MUTUELLE)
    contact_nom.send_keys(CONTACT_NOM)
    contact_phone.send_keys(CONTACT_TELEPHONE)
    medecin_email.send_keys(MEDECIN_EMAIL)

    create_button = driver.find_element(By.XPATH, "//button[text()=' Save DPI ']")
    create_button.click()


except Exception as e:
    print(f"An error occurred: {e}")

