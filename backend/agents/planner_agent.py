def plan(sectors):
    recommendations = [
        {'id': 1, 'title': 'Invest in rainwater harvesting', 'detail': 'Benefits 2,100 residents | +18% agricultural yield',
         'cost': '₹20 Lakhs', 'impact': 'High'},
        {'id': 2, 'title': 'Upgrade primary health center', 'detail': 'Reduce disease burden | 30% better health outcomes',
         'cost': '₹15 Lakhs', 'impact': 'High'},
        {'id': 3, 'title': 'Expand solar microgrid', 'detail': 'Reliable clean energy | Reduce 120 tons CO₂/year',
         'cost': '₹40 Lakhs', 'impact': 'Medium'},
        {'id': 4, 'title': 'Improve irrigation systems', 'detail': 'Increase crop yield by 25%',
         'cost': '₹10 Lakhs', 'impact': 'Medium'},
        {'id': 5, 'title': 'Upgrade rural roads (3.2 km)', 'detail': 'Improves market access, school attendance and healthcare reach',
         'cost': '₹30 Lakhs', 'impact': 'Medium'},
    ]
    impact = [
        {'label': 'Agricultural Yield', 'value': '+18%', 'icon': '🌾', 'tone': 'good'},
        {'label': 'Water Stress', 'value': '-40%', 'icon': '💧', 'tone': 'good'},
        {'label': 'Health Risk', 'value': '-30%', 'icon': '❤️', 'tone': 'good'},
        {'label': 'Lives Positively Impacted', 'value': '2,100', 'icon': '👥', 'tone': 'neutral'},
        {'label': 'School Attendance', 'value': '+25%', 'icon': '🎓', 'tone': 'good'},
        {'label': 'Local Jobs', 'value': '+60', 'icon': '💼', 'tone': 'neutral'},
    ]
    return {'recommendations': recommendations, 'projectedImpact': impact}
