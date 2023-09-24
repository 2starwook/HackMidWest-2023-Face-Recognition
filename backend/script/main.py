from google.cloud import vision

from Symbol import Symbol
from Point import Point

import cv2

import os
import convertapi

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
                        if c < 0.3:
                            continue
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

detect_document("./my_font.jpeg")
img = cv2.imread('./my_font.jpeg')

resize_points = (resize_points_tmp[0], resize_points_tmp[1])

img_resize = cv2.resize(img, resize_points, cv2.INTER_LINEAR)

if not os.path.exists("./letters"):
    os.mkdir("letters")

os.chdir("./letters")

for l in l_c:
    cropped_letter = img_resize[l.p_lb.y:l.p_lt.y, l.p_lt.x:l.p_rt.x]
    if l.character.isupper():
        l.character += "_up"
    if l.character == ".":
        l.character = "dot"
    cv2.imwrite(l.character + ".jpg", cropped_letter)

os.chdir("../")
# for img in cropped_letters:
#     cv2.imshow("original", img)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

convertapi.api_secret = 'RpGgeEKNY48h6xFz'
def convert_all_pngs_to_svgs(input_folder, output_folder):
    # Ensure the output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate through all files in the input folder
    for filename in os.listdir(input_folder):
        # Check if the file is a PNG file
        if filename.endswith(".jpg"):
            # Build full path of input PNG file
            png_path = os.path.join(input_folder, filename)

            # Build full path of output SVG file
            svg_filename = os.path.splitext(filename)[0] + '.svg'
            svg_path = os.path.join(output_folder, svg_filename)
            
            # Convert PNG to SVG using convertapi
            convertapi.convert('svg', {
                'File': png_path
            }, from_format = 'jpg').save_files(svg_path)
            
            print(f'Converted {filename} to SVG.')

# Paths of input and output folders
input_folder = 'letters'
output_folder = 'svg_output'

# Convert all PNGs to SVGs
convert_all_pngs_to_svgs(input_folder, output_folder)

a = 1