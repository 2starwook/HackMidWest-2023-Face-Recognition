from ultralytics import YOLO
import pandas as pd
import cv2
from copy import deepcopy

from config import Config

config = Config()

class Face_recognition_model:
    def __init__(self):
        self.model = YOLO(config.PATH_YOLO_MODEL)

    def count_human(self, image_path: str, save_image: bool = True) -> int:
        count = 0
        results = self.model(image_path)  # predict on an image
        original_image = cv2.imread(image_path)
        image = deepcopy(original_image)
        a = results[0].boxes.data
        px = pd.DataFrame(a).astype("float")

        for index, row in px.iterrows():
            x1 = int(row[0])
            y1 = int(row[1])
            x2 = int(row[2])
            y2 = int(row[3])
            d = int(row[5])
            if d == 0:  # human is zero index
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 4)
                count += 1
        if save_image:
            cv2.imwrite(f"{config.PATH_RESULT_IMAGE}", image)
        return count
