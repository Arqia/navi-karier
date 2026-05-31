from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from .. import services, models

def process_cv_upload(file: UploadFile, db: Session, user_id: int):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    extracted_text = services.extract_text_from_pdf(file.file)
    cv_data = models.CVData(extracted_text=extracted_text, user_id=user_id)
    db.add(cv_data)
    db.commit()
    db.refresh(cv_data)
    return {"message": "CV uploaded successfully", "cv_id": cv_data.id}

def calculate_gap(cv_id: int, target_role: str, db: Session, user_id: int):
    cv_data = db.query(models.CVData).filter(models.CVData.id == cv_id, models.CVData.user_id == user_id).first()
    if not cv_data:
        raise HTTPException(status_code=404, detail="CV not found")
    result = services.analyze_gap_with_llm(cv_data.extracted_text, target_role)
    analysis = models.AnalysisResult(
        match_score=result["match_score"],
        missing_skills=",".join(result["missing_skills"]),
        recommended_courses=",".join(result["recommended_courses"]),
        user_id=user_id
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return {
        "analysis_id": analysis.id,
        "match_score": analysis.match_score,
        "missing_skills": analysis.missing_skills.split(","),
        "recommended_courses": analysis.recommended_courses.split(",")
    }
