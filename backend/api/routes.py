import re
from datetime import date
from fastapi import APIRouter, UploadFile, File
from services.analysis_service import get_dashboard, run_analysis

router = APIRouter()


@router.get('/health')
def health():
    return {'status': 'UP'}


@router.get('/dashboard')
def dashboard():
    return get_dashboard()


@router.post('/upload/image')
async def upload_image(file: UploadFile = File(...)):
    return {'file': file.filename, 'extracted': 'Gemini Vision detected: water tank, farmland, school building.'}


@router.post('/analyze')
def analyze():
    return run_analysis()


@router.post('/report/generate')
def generate_report():
    data = run_analysis()
    total_lakhs = sum(int(re.sub(r'[^\d]', '', r['cost'])) for r in data['recommendations'])
    return {
        'refNo': f"GVA/CSR/{date.today().strftime('%Y%m')}/104",
        'date': date.today().strftime('%d %b %Y'),
        'village': data['village'],
        'overallScore': data['overallScore'],
        'sectors': data['sectors'],
        'summary': data['insight'],
        'recommendations': data['recommendations'],
        'projectedImpact': data['projectedImpact'],
        'totalInvestment': f"₹{total_lakhs} Lakhs",
        'preparedBy': 'GramVision AI — Multi-Agent Digital Twin Platform',
    }
