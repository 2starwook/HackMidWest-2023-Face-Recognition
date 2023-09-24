from typing import Optional
import requests
import json

from server import config


def create_user(first_name, last_name, email, mobile_phone) -> bool:
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

def reset_password(email) -> bool:
  headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": f"SSWS {config.OKTA_API_TOKEN}"
  }
  user_id = get_user_id(email)
  url = f"https://{config.OKTA_DOMAIN}/api/v1/users/{user_id}/lifecycle/reset_password"
  response = requests.post(url=url, headers=headers)
  return response.status_code == 200

def get_user_id(email) -> Optional[str]:
  headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": f"SSWS {config.OKTA_API_TOKEN}"
  }
  url = f"https://{config.OKTA_DOMAIN}/api/v1/users?q={email}&limit=1"
  response = requests.get(url=url, headers=headers)
  if response.status_code == 200:
    return response.json()[0].get('id')
  else: 
    return None

