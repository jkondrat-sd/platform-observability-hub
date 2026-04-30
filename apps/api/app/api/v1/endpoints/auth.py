from fastapi import APIRouter
router = APIRouter()
@router.post('/login')
def login():
    return {'access_token': 'mock-token', 'token_type': 'bearer'}
