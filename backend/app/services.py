import PyPDF2
from typing import Dict, Any

def extract_text_from_pdf(file_stream) -> str:
    reader = PyPDF2.PdfReader(file_stream)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    return text

def analyze_gap_with_llm(cv_text: str, target_role: str) -> Dict[str, Any]:
    return {
        "match_score": 75.5,
        "missing_skills": ["Docker", "Kubernetes", "GraphQL"],
        "recommended_courses": ["Docker for Beginners", "Kubernetes 101"]
    }
