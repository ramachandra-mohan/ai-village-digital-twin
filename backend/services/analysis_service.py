import random
from agents.water_agent import analyze as water
from agents.health_agent import analyze as health
from agents.agriculture_agent import analyze as agri
from agents.infrastructure_agent import analyze as infra
from agents.planner_agent import plan

VILLAGE = {
    'name': 'Rampur Kalan', 'state': 'Karnataka, India', 'population': 2104,
    'households': 428, 'area': '12.4 km²', 'farmland': '864 acres',
}

EXTRA_SECTORS = [
    {'key': 'education', 'label': 'Education', 'icon': '🎓', 'score': 72,
     'headline': 'Analyzing school infrastructure and attendance...',
     'insights': ['320 students across 2 schools', 'Good condition, needs digital learning center', 'Attendance improving year-on-year']},
    {'key': 'environment', 'label': 'Environment', 'icon': '🌳', 'score': 66,
     'headline': 'Analyzing land use and green cover...',
     'insights': ['Good green cover overall', 'Protect water bodies from encroachment', 'Prevent deforestation near farmland edges']},
]

INSIGHT_TEXT = (
    "This village shows strong potential for sustainable growth. Improving water "
    "security and irrigation can increase agricultural yield by 18% and positively "
    "impact 2,100 residents."
)

SDGS = [1, 3, 4, 6, 8, 13, 15, 17]


def _build(sectors):
    overall = round(sum(s['score'] for s in sectors) / len(sectors))
    plan_data = plan(sectors)
    return {
        'village': VILLAGE,
        'overallScore': overall,
        'scoreDelta': 12,
        'sectors': sectors,
        'recommendations': plan_data['recommendations'],
        'projectedImpact': plan_data['projectedImpact'],
        'insight': INSIGHT_TEXT,
        'sdgs': SDGS,
        'generatedAt': 'just now',
    }


def get_dashboard():
    sectors = [water(), health(), agri(), infra(), *EXTRA_SECTORS]
    return _build(sectors)


def run_analysis():
    sectors = [water(), health(), agri(), infra(), *EXTRA_SECTORS]
    for s in sectors:
        s['score'] = max(10, min(99, s['score'] + random.randint(-3, 5)))
    return _build(sectors)
