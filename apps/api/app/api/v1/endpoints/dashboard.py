from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_dashboard():
    return {'status': 'ok', 'component': 'dashboard'}
