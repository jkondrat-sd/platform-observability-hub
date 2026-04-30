from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_analytics():
    return {'status': 'ok', 'component': 'analytics'}
