import requests
import pytest

URL= "http://127.0.0.1:8000/app/login/"
CORRECT= {
    "email":"admin@gmail.com",
    "password":"bndbndbnd"
}
WRONG={
    "email":"nouser@gmail.com",
    "password":"wrong_pass"
}
EMPTY={
    "email":"",
    "password":""
}

@pytest.mark.parametrize(
    "test_name, creds, status_code",
    [
        ("login with valid credentials", CORRECT, 200),
        ("login with wrong credentials", WRONG, 401),
        ("login with empty credentials", EMPTY, 400)
    ]
)
def test_login(test_name, creds, status_code):
    print(f"\n{test_name}: ", end="")
    response = requests.post(
        url=URL,
        json=creds
    )

    assert response.status_code == status_code
    print("passed")