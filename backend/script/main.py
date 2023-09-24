from google.cloud import vision

from Symbol import Symbol
from Point import Point

import cv2

import os

credential_path = "../../../key/groovy-visitor-310005-2efb34d849b1.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
client_options = {"api_endpoint": "eu-vision.googleapis.com"}

client = vision.ImageAnnotatorClient(client_options=client_options)
l_c = []
resize_points_tmp = []
def detect_document(path):
    """Detects document features in an image."""
    client = vision.ImageAnnotatorClient()
    with open(path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)
    for page in response.full_text_annotation.pages:
        resize_points_tmp.append(page.width)
        resize_points_tmp.append(page.height)
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    for symbol in word.symbols:
                        duplicate_check = False
                        c = symbol.confidence
                        t = symbol.text
                        [p1, p2, p3, p4] = symbol.bounding_box.vertices.pb
                        x1, y1 = p1.x, p1.y
                        x2, y2 = p2.x, p2.y
                        x3, y3 = p3.x, p3.y
                        x4, y4 = p4.x, p4.y
                        if len(l_c) != 0:
                            for sym in l_c:
                                if sym.character == t:
                                    duplicate_check = True
                                    if sym.confidence < c:
                                        sym.confidence = c
                                        sym.p_lb = Point(x1, y1)
                                        sym.p_rb = Point(x2, y2)
                                        sym.p_rt = Point(x3, y3)
                                        sym.p_lt = Point(x4, y4)
                                        break

                        if not duplicate_check:
                            l_c.append(Symbol(
                            character = t,
                            confidence = c,
                            p_lb = Point(x1, y1),
                            p_rb = Point(x2, y2),
                            p_rt = Point(x3, y3),
                            p_lt = Point(x4, y4),
                        ))

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

detect_document("./image.jpg")
img = cv2.imread('./image.jpg')

resize_points = (resize_points_tmp[0], resize_points_tmp[1])

img_resize = cv2.resize(img, resize_points, cv2.INTER_LINEAR)

cropped_letters = []
for l in l_c:
    cropped_letters.append(img_resize[l.p_lb.y:l.p_lt.y, l.p_lt.x:l.p_rt.x])

for img in cropped_letters:
    cv2.imshow("original", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

a = 1