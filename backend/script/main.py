from ultralytics import YOLO
import pandas as pd
import cv2

model = YOLO("yolov8n.pt")
# my_file = open("coco.txt", "r")
# data = my_file.read()
# class_list = data.split("\n")

count = 0

results = model("./IMG_2509.jpg")  # predict on an image
image = cv2.imread("./IMG_2509.jpg")
a = results[0].boxes.data
px = pd.DataFrame(a).astype("float")

for index, row in px.iterrows():
    x1 = int(row[0])
    y1 = int(row[1])
    x2 = int(row[2])
    y2 = int(row[3])
    d = int(row[5])
    if d == 0:
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 4)

cv2.imshow("image", image)
cv2.waitKey(0)
cv2.destroyAllWindows()