import pandas as pd

df = pd.read_csv('patient-visits-large.csv')
df.to_parquet('patient-visits-large.parquet')