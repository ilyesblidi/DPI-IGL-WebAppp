import requests

def test_crea_diagnostic():
    data = {
        'id_dpi': 1,
        "dpi": "", 
        "diagnostic":"",
        "medecin": 1,
        "ordanance": ""
    }
    response = requests.post('http://127.0.0.1:8000/app/create_diagnostic/')
    assert response.status_code == 201
