import fitz

def extract_text(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    print(extract_text('Thriving_In_Place_alpha_v1.1_mobile.pdf'))
