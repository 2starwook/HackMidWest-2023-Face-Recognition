import requests
import json

from server import config


def create_user(first_name, last_name, email, mobile_phone):
  headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": f"SSWS {config.OKTA_API_TOKEN}"
  }
  data = {
      "profile": {
          "firstName": first_name,
          "lastName": last_name,
          "email": email,
          "login": email,
          "mobilePhone": mobile_phone,
      }
  }
  url = f"https://{config.OKTA_DOMAIN}/api/v1/users?activate=true"
  response = requests.post(url=url, headers=headers, data=json.dumps(data))
  return response.status_code == 200
