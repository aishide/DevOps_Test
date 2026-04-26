import os
import sys
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


def get_target_url():
    env_url = os.getenv("TEST_URL")
    if env_url:
        return env_url

    base_path = Path(__file__).resolve().parent
    login_path = base_path / "login.html"
    return login_path.as_uri()


def create_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-popup-blocking")
    options.add_argument("--allow-file-access-from-files")
    options.add_argument("--allow-file-access")

    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)


def main():
    url = get_target_url()
    print(f"Using login page URL: {url}")

    driver = create_driver()
    driver.implicitly_wait(5)

    try:
        driver.get(url)
        wait = WebDriverWait(driver, 10)

        username = wait.until(EC.visibility_of_element_located((By.ID, "username")))
        password = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

        username.send_keys("testuser")
        password.send_keys("password123")
        login_button.click()

        wait.until(EC.url_contains("index.html"))
        user_name_span = wait.until(EC.visibility_of_element_located((By.ID, "userName")))

        user_text = user_name_span.text
        assert user_text == "testuser", f"Expected logged-in user to be testuser, got {user_text}"

        print("Login test passed. User logged in successfully.")
        return 0

    except Exception as exc:
        print("Login test failed:", exc)
        return 1

    finally:
        driver.quit()


if __name__ == "__main__":
    sys.exit(main())
