from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_alerts():
    return {'status': 'ok', 'component': 'alerts'}
