stats = ['SUPPLY FAN OUTLET Temperature', 'Power', 'SUPPLY FAN:Fan Power', 'Thermostat Heating Setpoint', 'Thermostat Temp', 'REHEAT COIL Power', 'AIR LOOP INLET Temperature', 'SUPPLY INLET Temperature', 'HEATING COIL Power', 'Outdoor Air Flow Fraction', 'Mechanical Ventilation Mass Flow Rate', 'VAV REHEAT Damper Position', 'Outdoor Air Mass Flow Rate', 'VAV Availability Manager Night Cycle Control Status', 'Lights Power', 'COOLING COIL Power', 'Equipment Power', 'Thermostat Cooling Setpoint', 'SUPPLY FAN OUTLET Mass Flow Rate', 'RETURN OUTLET CO2 Concentration', 'AIR LOOP INLET Mass Flow Rate', 'SUPPLY INLET Mass Flow Rate']

# for stat in stats:
#     print('<option value="%s" selected>%s</option>' %(stat, stat))

# for stat in stats:
#     print('<canvas id="%s" height="450" width="800"></canvas>' %(stat))

for stat in stats:
    print('<div id="%s div"><canvas id="%s" height="450" width="800"></canvas></div>' %(stat, stat))