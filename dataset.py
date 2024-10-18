import pandas as pd
import numpy as np

def generate_data(csv_path, num_rows=None):
    df = pd.read_csv(csv_path)
    # set num_rows generated to same size as input df
    if not num_rows:
        num_rows = df.shape[0]
    # split into symptom and disease dfs
    irregular_symptoms_all = (df.groupby('Disease').sum() == 0)
    symptoms = df.iloc[:, 1:]
    diseases = pd.get_dummies(df['Disease'])
    # generate data
    gen_irr = generate_irregulars(symptoms, diseases, num_rows // 2, 
                                  irregular_symptoms_all, df)
    gen_reg = generate_regulars(symptoms, diseases, num_rows // 2)
    reg_irreg = pd.concat([gen_reg, gen_irr])
    return reg_irreg
    
def generate_irregulars(symptoms, diseases, num_rows, irregular_symptoms_all, df):
    irregular_indices = np.random.choice(
        range(diseases.shape[0]), size=num_rows)
    
    result = []
    for index in irregular_indices:
        reg = symptoms.iloc[index]
        irr = symptoms.columns[~reg.astype(bool)]
        disease = df['Disease'][index]
        while True:
            irr_symptom = np.random.choice(irr)
            if (irregular_symptoms_all.loc[disease, irr_symptom]):
                reg[irr_symptom] = 1
                break
            else:
                continue
        result.append(reg)
    gen_irr_symptoms = pd.concat(result, axis=1).T

    sampled_diseases = diseases.loc[irregular_indices]
    gen_irr_symptoms = pd.concat([sampled_diseases, gen_irr_symptoms], axis=1)
    gen_irr_symptoms['Irregular'] = 1
    return gen_irr_symptoms

def generate_regulars(symptoms, diseases, num_rows):
    gen_reg_symptoms = diseases.sample(num_rows, replace=True)
    sampled_symptoms = symptoms.loc[gen_reg_symptoms.index]
    gen_reg_symptoms = pd.concat([gen_reg_symptoms, sampled_symptoms], axis=1)
    gen_reg_symptoms['Irregular'] = 0
    return gen_reg_symptoms