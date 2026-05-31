from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
from ..database import get_db
from . import controllers

router = APIRouter()

@router.post("/upload-cv")
def upload_cv(file: UploadFile = File(...), user_id: int = Form(...), db: Session = Depends(get_db)):
    return controllers.process_cv_upload(file, db, user_id)

@router.post("/analyze-gap")
def analyze_gap(cv_id: int = Form(...), target_role: str = Form(...), user_id: int = Form(...), db: Session = Depends(get_db)):
    return controllers.calculate_gap(cv_id, target_role, db, user_id)

@router.get("/recommendations/{analysis_id}")
def get_recommendations(analysis_id: int, db: Session = Depends(get_db)):
    from .. import models
    analysis = db.query(models.AnalysisResult).filter(models.AnalysisResult.id == analysis_id).first()
    if not analysis:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Analysis not found")
    return {
        "match_score": analysis.match_score,
        "missing_skills": analysis.missing_skills.split(","),
        "recommended_courses": analysis.recommended_courses.split(",")
    }
