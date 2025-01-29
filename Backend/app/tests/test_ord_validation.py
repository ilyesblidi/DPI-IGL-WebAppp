import requests
import pytest

ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5NjgzMDk0LCJpYXQiOjE3MzgxNDcwOTQsImp0aSI6ImM1MWU5NGQ1N2FmNTQyYWQ4OWY5ZWFkNjAwZDNhY2I2IiwidXNlcl9pZCI6Nywicm9sZSI6InBoYXJtYWNpZW4ifQ.dIV3yC-AMI79UQ8CFH113TvjRzxSDBTTgxQFqfM2uQU"
URL = "http://127.0.0.1:8000/app/ordonnance/validate/"
headers = {
    'Conten-Type': 'application/json',
    'Authorization': f'Bearer {ACCESS_TOKEN}'
}

@pytest.mark.parametrize(
    "test_name, ordonnance_id, status_code", [
        ("validate existing ordonnance", "1", 200),
        ("validate non-existing ordonnance", "2343", 404),
    ]
)

def test_validation(test_name, ordonnance_id, status_code):
    print(f"\n{test_name}: ", end=" ")
    data = {
        'ordonnance_id': ordonnance_id
    }
    response = requests.post(
        url=URL,
        json=data,
        headers=headers
    )
    assert response.status_code == status_code
    print("passed")
    