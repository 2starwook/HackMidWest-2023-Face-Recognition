from google.cloud import vision

from Symbol import Symbol
from Point import Point


client_options = {"api_endpoint": "eu-vision.googleapis.com"}

client = vision.ImageAnnotatorClient(client_options=client_options)

def detect_document(path):
    """Detects document features in an image."""
    client = vision.ImageAnnotatorClient()
    with open(path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    for symbol in word.symbols:
                        c = symbol.confidence
                        t = symbol.text
                        [p1, p2, p3, p4] = symbol.bounding_box.vertices.pb
                        x1, y1 = p1.x, p1.y
                        x2, y2 = p2.x, p2.y
                        x3, y3 = p3.x, p3.y
                        x4, y4 = p4.x, p4.y
                        Symbol(
                            character = t,
                            confidence = c,
                            p_lb = Point(x1, y1),
                            p_rb = Point(x2, y2),
                            p_rt = Point(x3, y3),
                            p_lt = Point(x4, y4),
                        )
    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

detect_document("./image.jpg")
a = 1