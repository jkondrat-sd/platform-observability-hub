from fastapi import APIRouter, Query
router = APIRouter()
@router.get('/metrics')
def get_metrics(query: str = Query(...)):
    return {'result': [{'metric': 'cpu_usage', 'value': 45.2}]}
@router.get('/logs')
def get_logs():
    return {'logs': [{'msg': 'Service started', 'lvl': 'INFO'}]}
