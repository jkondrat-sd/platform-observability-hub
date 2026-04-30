from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_correlation():
    return {'status': 'ok', 'component': 'correlation'}
