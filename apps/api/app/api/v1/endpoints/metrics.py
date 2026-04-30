from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_metrics():
    return {'status': 'ok', 'component': 'metrics'}
