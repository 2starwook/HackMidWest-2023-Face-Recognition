import os
from os.path import sep 



class Config:
  PROJECT_DIR = "okta-react-sample"
  BACKEND_DIR = "backend"
  UPLOAD_DIR = "upload"
  def __init__(self):
    self.PATH_PROJECT_DIR = self._get_project_dir()
    self.PATH_BACKEND_DIR = f"{self.PATH_PROJECT_DIR}{sep}{Config.BACKEND_DIR}"
    self.PATH_UPLOAD_DIR = f"{self.PATH_BACKEND_DIR}{sep}{Config.UPLOAD_DIR}"

  def _get_project_dir(self):
    l = os.getcwd().split('/')
    res = list()
    for d in l:
      if d == Config.PROJECT_DIR:
        break
      res.append(d)
    res.append(Config.PROJECT_DIR)
    return '/'.join(res)

if __name__ == "__main__":
  config = Config()
  pass